export type PlayerStats = {
  altezza: string; // es: "185cm"
  peso: string; // es: "78kg"
  piede: "Destro" | "Sinistro" | "Ambidestro";
  eta: number;
  presenze: number;
  gol: number;
  assist: number;
  minuti: number;
};

export const players = [
  { id: "p1", name: "Giocatore 1", number: 1, role: "Portiere", photo: "/players/p1.jpg", stats: { altezza: "190cm", peso: "85kg", piede: "Destro", eta: 24, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p2", name: "Giocatore 2", number: 2, role: "Difensore", photo: "/players/p2.jpg", stats: { altezza: "182cm", peso: "78kg", piede: "Destro", eta: 22, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p3", name: "Giocatore 3", number: 3, role: "Difensore", photo: "/players/p3.jpg", stats: { altezza: "180cm", peso: "75kg", piede: "Sinistro", eta: 23, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p4", name: "Giocatore 4", number: 4, role: "Difensore", photo: "/players/p4.jpg", stats: { altezza: "184cm", peso: "80kg", piede: "Destro", eta: 25, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p5", name: "Giocatore 5", number: 5, role: "Difensore", photo: "/players/p5.jpg", stats: { altezza: "183cm", peso: "79kg", piede: "Destro", eta: 21, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p6", name: "Giocatore 6", number: 6, role: "Centrocampista", photo: "/players/p6.jpg", stats: { altezza: "178cm", peso: "73kg", piede: "Destro", eta: 24, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p7", name: "Giocatore 7", number: 7, role: "Attaccante", photo: "/players/p7.jpg", stats: { altezza: "176cm", peso: "70kg", piede: "Sinistro", eta: 22, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p8", name: "Giocatore 8", number: 8, role: "Centrocampista", photo: "/players/p8.jpg", stats: { altezza: "180cm", peso: "76kg", piede: "Destro", eta: 26, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  //... copia fino a 28, ti ho messo 4 per farti capire, aggiungi gli altri uguali cambiando numero
  { id: "p9", name: "Giocatore 9", number: 9, role: "Attaccante", photo: "/players/p9.jpg", stats: { altezza: "185cm", peso: "82kg", piede: "Destro", eta: 27, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p10", name: "Giocatore 10", number: 10, role: "Centrocampista", photo: "/players/p10.jpg", stats: { altezza: "174cm", peso: "68kg", piede: "Sinistro", eta: 20, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p11", name: "Giocatore 11", number: 11, role: "Attaccante", photo: "/players/p11.jpg", stats: { altezza: "179cm", peso: "74kg", piede: "Destro", eta: 23, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p12", name: "Giocatore 12", number: 12, role: "Portiere", photo: "/players/p12.jpg", stats: { altezza: "192cm", peso: "88kg", piede: "Destro", eta: 28, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p13", name: "Giocatore 13", number: 13, role: "Difensore", photo: "/players/p13.jpg", stats: { altezza: "186cm", peso: "81kg", piede: "Destro", eta: 24, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p14", name: "Giocatore 14", number: 14, role: "Difensore", photo: "/players/p14.jpg", stats: { altezza: "181cm", peso: "77kg", piede: "Destro", eta: 22, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p15", name: "Giocatore 15", number: 15, role: "Centrocampista", photo: "/players/p15.jpg", stats: { altezza: "177cm", peso: "72kg", piede: "Destro", eta: 23, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p16", name: "Giocatore 16", number: 16, role: "Centrocampista", photo: "/players/p16.jpg", stats: { altezza: "179cm", peso: "74kg", piede: "Sinistro", eta: 25, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p17", name: "Giocatore 17", number: 17, role: "Attaccante", photo: "/players/p17.jpg", stats: { altezza: "183cm", peso: "79kg", piede: "Destro", eta: 21, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p18", name: "Giocatore 18", number: 18, role: "Centrocampista", photo: "/players/p18.jpg", stats: { altezza: "180cm", peso: "75kg", piede: "Destro", eta: 24, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p19", name: "Giocatore 19", number: 19, role: "Attaccante", photo: "/players/p19.jpg", stats: { altezza: "184cm", peso: "80kg", piede: "Destro", eta: 26, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p20", name: "Giocatore 20", number: 20, role: "Difensore", photo: "/players/p20.jpg", stats: { altezza: "182cm", peso: "78kg", piede: "Destro", eta: 22, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p21", name: "Giocatore 21", number: 21, role: "Centrocampista", photo: "/players/p21.jpg", stats: { altezza: "178cm", peso: "73kg", piede: "Destro", eta: 23, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p22", name: "Giocatore 22", number: 22, role: "Portiere", photo: "/players/p22.jpg", stats: { altezza: "188cm", peso: "84kg", piede: "Destro", eta: 29, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p23", name: "Giocatore 23", number: 23, role: "Difensore", photo: "/players/p23.jpg", stats: { altezza: "185cm", peso: "80kg", piede: "Sinistro", eta: 24, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p24", name: "Giocatore 24", number: 24, role: "Difensore", photo: "/players/p24.jpg", stats: { altezza: "183cm", peso: "79kg", piede: "Destro", eta: 21, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p25", name: "Giocatore 25", number: 25, role: "Centrocampista", photo: "/players/p25.jpg", stats: { altezza: "176cm", peso: "71kg", piede: "Destro", eta: 22, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p26", name: "Giocatore 26", number: 26, role: "Attaccante", photo: "/players/p26.jpg", stats: { altezza: "180cm", peso: "76kg", piede: "Destro", eta: 24, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p27", name: "Giocatore 27", number: 27, role: "Centrocampista", photo: "/players/p27.jpg", stats: { altezza: "179cm", peso: "74kg", piede: "Destro", eta: 23, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
  { id: "p28", name: "Giocatore 28", number: 28, role: "Attaccante", photo: "/players/p28.jpg", stats: { altezza: "181cm", peso: "77kg", piede: "Sinistro", eta: 22, presenze: 0, gol: 0, assist: 0, minuti: 0 } as PlayerStats },
];

export const staff = [
  { id: "s1", name: "Mister 1", role: "Allenatore", photo: "/players/mister1.jpg", bio: "Allenatore principale" },
  { id: "s2", name: "Mister 2", role: "Vice Allenatore", photo: "/players/mister2.jpg", bio: "Vice Allenatore" },
];
