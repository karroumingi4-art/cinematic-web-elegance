import { createFileRoute } from "@tanstack/react-router";
import { json } from "@tanstack/react-start";


export const Route = createFileRoute("/api/save-slides")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const slides = await request.json();


        const token = process.env.GITHUB_TOKEN;
        const repo = "karroumingi4-art/cinematic-web-elegance";
        const path = "src/data/slides-ritorno.json";


        if (!token) {
          return json({ error: "Manca GITHUB_TOKEN su Vercel" }, { status: 500 });
        }


        // Prendi SHA attuale del file
        const getRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const fileData = await getRes.json();
        const sha = fileData.sha;


        // Aggiorna file
        const content = Buffer.from(JSON.stringify(slides, null, 2)).toString("base64");


        const putRes = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: "admin: aggiornato slide maglia ritorno",
            content: content,
            sha: sha,
            branch: "main"
          })
        });


        if (!putRes.ok) {
          const err = await putRes.text();
          return json({ error: err }, { status: 500 });
        }


        return json({ ok: true });
      }
    }
  }
});
