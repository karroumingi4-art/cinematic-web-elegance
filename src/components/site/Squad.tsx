import { players, staff } from "./squad-data";

function Card({ name, role, number, photo }: any) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white/[0.04] border border-white/10 group">
      <div className="aspect-[3/4] bg-white/5 overflow-hidden">
        <img src={photo} alt={name} className="h-full w-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} />
      </div>
      <div className="p-4">
        <div className="flex gap-2 text-xs uppercase tracking-widest opacity-50">
          {number && <span>#{number}</span>}
          <span>{role}</span>
        </div>
        <p className="mt-1 font-semibold">{name}</p>
      </div>
    </div>
  );
}

export function Squad() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <h2 className="text-4xl font-bold">La Rosa - 28 Giocatori</h2>
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {players.map((p) => <Card key={p.id} {...p} />)}
        </div>
        <h2 className="mt-20 text-4xl font-bold">Staff Tecnico</h2>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {staff.map((s) => <Card key={s.id} {...s} />)}
        </div>
      </div>
    </section>
  );
}
