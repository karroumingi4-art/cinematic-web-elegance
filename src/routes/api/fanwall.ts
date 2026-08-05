import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import type { Database } from "@/integrations/supabase/types";

const postSchema = z.object({
  name: z.string().trim().min(2).max(60),
  country: z.string().trim().min(2).max(60),
  message: z.string().trim().min(4).max(180),
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

export const Route = createFileRoute("/api/fanwall")({
  server: {
    handlers: {
      GET: async () => {
        const { data, error } = await getClient()
          .from("fan_wall_messages")
          .select("id, name, country, message, created_at")
          .order("created_at", { ascending: false })
          .limit(48);

        if (error) {
          console.error("[fanwall] read failed", error.message);
          return Response.json({ messages: [], error: "Unable to load the wall" }, { status: 500 });
        }

        return Response.json({ messages: data ?? [] });
      },

      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid request body" }, { status: 400 });
        }

        const parsed = postSchema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: "Please check the highlighted fields" }, { status: 400 });
        }

        const { data, error } = await getClient()
          .from("fan_wall_messages")
          .insert(parsed.data)
          .select("id, name, country, message, created_at")
          .single();

        if (error) {
          console.error("[fanwall] insert failed", error.message);
          return Response.json({ error: "Unable to save your message" }, { status: 500 });
        }

        return Response.json({ message: data }, { status: 201 });
      },
    },
  },
});
