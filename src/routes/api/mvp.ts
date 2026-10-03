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
        return fetch(input, {...init, headers });
      },
    },
  });
}


// Chi vince quando è venerdì - distribuzione finta
const BASE_PCT: Record<string, { name: string; pct: number }> = {
  "10": { name: " 【entity-Del Piero¦canonical_name=Alessandro Del Piero】", pct: 0.28 },
  "9": { name: " 【entity-Trezeguet¦canonical_name=David Trezeguet】", pct: 0.21 },
  "7": { name: "Nedved", pct: 0.18 },
  "8": { name: "Camoranesi", pct: 0.12 },
  "21": { name: " 【entity-Thuram¦canonical_name=Thuram】", pct: 0.08 },
  "3": { name: " 【entity-Chiellini¦canonical_name=Chiellini】", pct: 0.06 },
};


function getWeeklyGrowth(): number {
  const now = new Date();
  const day = now.getDay(); // 1 Lun... 5 Ven
  const hour = now.getHours() + now.getMinutes() / 60;
  let progress = 0;
  if (day === 1) progress = 0.05; // lunedì quasi 0
  else if (day === 2) progress = (hour / 24) * 0.25;
  else if (day === 3) progress = 0.25 + (hour / 24) * 0.25;
  else if (day === 4) progress = 0.5 + (hour / 24) * 0.25;
  else if (day === 5) progress = 0.75 + (hour / 24) * 0.25;
  else progress = 1.0; // sab/dom = 10k
  const minVotes = 1500;
  const maxVotes = 10000;
  return Math.floor(minVotes + (maxVotes - minVotes) * progress);
}


export const Route = createFileRoute("/api/mvp")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const label = url.searchParams.get("label") || "G2"; // fallback


        // PRENDI SOLO VOTI DI QUESTA GIORNATA -> quando cambi label si azzera da solo
        const { data, error } = await getClient()
        .from("mvp_votes")
        .select("player_number, player_name, match_label")
        .eq("match_label", label)
        .limit(5000);


        if (error) {
          return Response.json({ tallies: [], total: 0, match_label: label }, { status: 500 });
        }


        const counts = new Map<string, { player_number: string; player_name: string; votes: number }>();
        const fakeTotal = getWeeklyGrowth();


        for (const [num, base] of Object.entries(BASE_PCT)) {
          counts.set(num, {
            player_number: num,
            player_name: base.name,
            votes: Math.floor(fakeTotal * base.pct),
          });
        }


        for (const row of data?? []) {
          const entry = counts.get(row.player_number)?? {
            player_number: row.player_number,
            player_name: row.player_name,
            votes: 0,
          };
          entry.votes += 25; // ogni voto vero vale 25
          entry.player_name = row.player_name;
          counts.set(row.player_number, entry);
        }


        const tallies = [...counts.values()].sort((a, b) => b.votes - a.votes);
        const total = tallies.reduce((s, t) => s + t.votes, 0);


        return Response.json({ tallies, total, match_label: label });
      },


      POST: async ({ request }) => {
        let body: unknown;
        try { body = await request.json(); } catch { return Response.json({ error: "Richiesta non valida" }, { status: 400 }); }
        const parsed = postSchema.safeParse(body);
        if (!parsed.success) return Response.json({ error: "Campi non validi" }, { status: 400 });
        const { error } = await getClient().from("mvp_votes").insert(parsed.data);
        if (error) return Response.json({ error: "Impossibile salvare" }, { status: 500 });
        return Response.json({ ok: true }, { status: 201 });
      },
    },
  },
});
