export type Player = {
  id: string;
  number: string;
  name: string;
  position: string;
  image: string;
  vitals: { age: string; height: string; foot: string; joined: string };
  season: { label: string; value: string | number }[];
  bio: string;
  timeline: { year: string; title: string; detail: string }[];
  honours: string[];
};

export const players: Player[] = [
  {
    id: "0-mister",
    number: "0",
    name: "Alberto Malesani",
    position: "Mister",
    image: "/malesani.png", // se non lo vedi, mettilo in public/malesani.png
    vitals: { age: "71", height: "1.84m", foot: "—", joined: "2025" },
    season: [
      { label: "Partite", value: 12 },
      { label: "Vittorie", value: 8 },
      { label: "Pareggi", value: 2 },
      { label: "Sconfitte", value: 2 },
    ],
    bio: "Esperienza, leadership e identità. Guida la squadra con la sua filosofia di calcio intenso e organizzato.",
    timeline: [
      { year: "2025", title: "Head Coach", detail: "Nominato allenatore della Prima Squadra." },
      { year: "1999", title: "Coppa UEFA", detail: "Vittoria storica con il Parma." },
    ],
    honours: ["Coppa UEFA", "Coppa Italia", "Supercoppa Italiana"],
  },
  {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  },
 {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  },
 {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  }, {
    id: "1",
    number: "1",
    name: "Marco Fontana",
    position: "Portiere",
    image: "https://picsum.photos/seed/marco1/400/500", // CAMBIA QUESTO con /players/1.jpg quando hai la foto
    vitals: { age: "28", height: "1.92m", foot: "Destro", joined: "2023" },
    season: [
      { label: "Presenze", value: 24 },
      { label: "Clean Sheet", value: 9 },
      { label: "Parate", value: 68 },
      { label: "Gol Subiti", value: 21 },
    ],
    bio: "Reattivo tra i pali, leader silenzioso della difesa. Fondamentale nelle uscite alte.",
    timeline: [
      { year: "2023", title: "Arrivo al Club", detail: "Titolare dalla prima giornata." },
      { year: "2021", title: "Serie B", detail: "Miglior portiere della stagione." },
    ],
    honours: ["Miglior Portiere B 2021"],
  },
  {
    id: "9",
    number: "9",
    name: "Andrea Belotti",
    position: "Attaccante",
    image: "https://picsum.photos/seed/belotti/400/500",
    vitals: { age: "31", height: "1.81m", foot: "Destro", joined: "2025" },
    season: [
      { label: "Presenze", value: 18 },
      { label: "Gol", value: 11 },
      { label: "Assist", value: 3 },
      { label: "Tiri", value: 42 },
    ],
    bio: "Il Gallo. Grinta, pressing e senso del gol da vero bomber d'area.",
    timeline: [
      { year: "2025", title: "Ritorno in Italia", detail: "Firma e diventa subito il 9 titolare." },
    ],
    honours: ["Capocannoniere Serie A"],
  },
  // COPIA E INCOLLA QUESTO BLOCCO PER GLI ALTRI 25
];
