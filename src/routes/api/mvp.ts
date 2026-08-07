import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const postSchema = z.object({
  match_label: z.string().trim().min(2).max(80),
  player_number: z.string().trim().min(1).max(4),
  player_name: z.string().trim().min(1).max(80),
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

export const Route = createFileRoute("/api/mvp")({
  server: {
    handlers: {
      GET: async () => {
        const { data, error } = await getClient()
          .from("mvp_votes")
          .select("player_number, player_name")
          .order("created_at", { ascending: false })
          .limit(2000);

        if (error) {
          console.error("[mvp] read failed", error.message);
          return Response.json({ tallies: [], total: 0, error: "Impossibile caricare i voti" }, { status: 500 });
        }

        const counts = new Map<string, { player_number: string; player_name: string; votes: number }>();
        for (const row of data ?? []) {
          const key = row.player_number;
          const entry = counts.get(key) ?? {
            player_number: row.player_number,
            player_name: row.player_name,
            votes: 0,
          };
          entry.votes += 1;
          counts.set(key, entry);
        }

        return Response.json({
          tallies: [...counts.values()].sort((a, b) => b.votes - a.votes),
          total: data?.length ?? 0,
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

        const { error } = await getClient().from("mvp_votes").insert(parsed.data);
        if (error) {
          console.error("[mvp] insert failed", error.message);
          return Response.json({ error: "Impossibile salvare il voto" }, { status: 500 });
        }

        return Response.json({ ok: true }, { status: 201 });
      },
    },
  },
});
