import { createFileRoute, Link } from "@tanstack/react-router";
import newsData from "@/data/news.json";
import { imageMap } from "@/data/newsImages";
export const Route = createFileRoute("/journal/$postId")({ component: JournalPost });
const posts = (newsData as any[]).map((n: any) => ({ ...n, src: imageMap[n.image] }));
function JournalPost() {
  const { postId } = Route.useParams();
  const post = posts.find((p: any) => p.id === postId);
  if (!post) return <div className="p-20 bg-black text-white">Articolo non trovato: {postId}</div>;
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <Link to="/" className="text-[#95BFE5]">← Torna</Link>
      <h1 className="text-4xl mt-10">{post.title}</h1>
      <img src={post.src} className="mt-6 w-full rounded-2xl" />
      <p className="mt-6 text-white/70">{post.fullBody}</p>
    </div>
  );
}
