import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

export type Player = {
  number: string;
  name: string;
  position: string;
  image: string;
  vitals: { age: string; height: string; foot: string; joined: string };
  season: { label: string; value: string }[];
  bio: string;
  timeline: { year: string; title: string; detail: string }[];
  honours: string[];
};

export const players: Player[] = [
  {
    number: "10",
    name: "Matteo Rinaldi",
    position: "Attacking midfield · Captain",
    image: gallery1,
    vitals: { age: "27", height: "1.79 m", foot: "Left", joined: "2016" },
    season: [
      { label: "Appearances", value: "38" },
      { label: "Goals", value: "17" },
      { label: "Assists", value: "21" },
      { label: "Minutes", value: "3,204" },
    ],
    bio: "He plays the way the club was built — patiently, then all at once. Rinaldi came through the academy at eleven, wore the ten at twenty-one, and has never asked for a season off from responsibility.",
    timeline: [
      { year: "2010", title: "Academy intake", detail: "Signed from a district side two kilometres from the stadium." },
      { year: "2016", title: "First-team debut", detail: "Introduced at half-time and scored inside nine minutes." },
      { year: "2019", title: "Given the ten", detail: "Inherited the shirt from Aldo Ferretti on the day he retired." },
      { year: "2023", title: "Named captain", detail: "Elected by the dressing room after a unanimous vote." },
    ],
    honours: ["League champion ×3", "Domestic cup ×2", "Player of the season", "Club record: assists"],
  },
  {
    number: "07",
    name: "Idris Kane",
    position: "Right wing",
    image: gallery2,
    vitals: { age: "23", height: "1.81 m", foot: "Right", joined: "2022" },
    season: [
      { label: "Appearances", value: "34" },
      { label: "Goals", value: "12" },
      { label: "Assists", value: "14" },
      { label: "Minutes", value: "2,610" },
    ],
    bio: "A player of first touches and last seconds. Kane arrived as a raw sprinter and became a craftsman inside two seasons, learning the pause before the pass.",
    timeline: [
      { year: "2018", title: "Youth international", detail: "Capped at every age group from under-seventeen upward." },
      { year: "2022", title: "Signed", detail: "Joined on a five-year agreement after a record scouting report." },
      { year: "2024", title: "Breakout campaign", detail: "Twenty-six goal involvements in a single league season." },
    ],
    honours: ["League champion ×1", "Young player of the year", "Supporters' goal of the season"],
  },
  {
    number: "04",
    name: "Elias Mork",
    position: "Centre back",
    image: gallery3,
    vitals: { age: "30", height: "1.92 m", foot: "Right", joined: "2018" },
    season: [
      { label: "Appearances", value: "36" },
      { label: "Clean sheets", value: "19" },
      { label: "Duels won", value: "78%" },
      { label: "Minutes", value: "3,180" },
    ],
    bio: "The quiet architecture of every good season. Mork organises without shouting, defends without theatre, and has missed three matches in six years.",
    timeline: [
      { year: "2014", title: "Professional debut", detail: "Nineteen years old, away from home, in freezing rain." },
      { year: "2018", title: "Signed", detail: "Brought in to rebuild a defence that had conceded sixty." },
      { year: "2021", title: "Centenary XI", detail: "Voted into the club's hundred-year team by members." },
    ],
    honours: ["League champion ×2", "Defender of the season ×2", "Centenary XI"],
  },
  {
    number: "01",
    name: "Rafael Duarte",
    position: "Goalkeeper",
    image: gallery4,
    vitals: { age: "29", height: "1.90 m", foot: "Right", joined: "2020" },
    season: [
      { label: "Appearances", value: "38" },
      { label: "Clean sheets", value: "21" },
      { label: "Save rate", value: "81%" },
      { label: "Minutes", value: "3,420" },
    ],
    bio: "Goalkeeping as composure rather than acrobatics. Duarte says the job is to make the stadium believe nothing is happening, even when everything is.",
    timeline: [
      { year: "2016", title: "First cup final", detail: "Saved twice in the shoot-out for his boyhood club." },
      { year: "2020", title: "Signed", detail: "Arrived in January and did not concede for four hundred minutes." },
      { year: "2025", title: "Two hundred games", detail: "Reached the double century in club colours." },
    ],
    honours: ["League champion ×2", "Golden glove ×3", "Two hundred appearances"],
  },
];
