import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const postSchema = z.object({
  match_label: z.string().trim().min(2).max(80),
  pick: z.enum(["1", "X", "2"]),
  voter_name: z.string().trim().min(2).max(60),
});

function getClient() {
  const url = process.env["SUPABASE_URL"]!;
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"]!;

  return createClient<Database>(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
          headers.delete("Authorization");
        }
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      },
    },
  });
}

export const Route = createFileRoute("/api/predictions")({
  server: {
    handlers: {
      GET: async () => {
        const { data, error } = await getClient()
          .from("match_predictions")
          .select("pick, voter_name, created_at")
          .order("created_at", { ascending: false })
          .limit(2000);

        if (error) {
          console.error("[predictions] read failed", error.message);
          return Response.json(
            { counts: { "1": 0, X: 0, "2": 0 }, total: 0, recent: [], error: "Impossibile caricare i pronostici" },
            { status: 500 },
          );
        }

        const rows = data ?? [];
        const counts = { "1": 0, X: 0, "2": 0 } as Record<"1" | "X" | "2", number>;
        for (const row of rows) {
          if (row.pick === "1" || row.pick === "X" || row.pick === "2") counts[row.pick] += 1;
        }

        return Response.json({
          counts,
          total: rows.length,
          recent: rows.slice(0, 8).map((r) => ({ voter_name: r.voter_name, pick: r.pick })),
        });
      },

      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Richiesta non valida" }, { status: 400 });
        }

        const parsed = postSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Controlla i campi evidenziati" }, { status: 400 });
        }

        const { error } = await getClient().from("match_predictions").insert(parsed.data);
        if (error) {
          console.error("[predictions] insert failed", error.message);
          return Response.json({ error: "Impossibile salvare il pronostico" }, { status: 500 });
        }

        return Response.json({ ok: true }, { status: 201 });
      },
    },
  },
});
