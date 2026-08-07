import { createFileRoute } from "@tanstack/react-router";
import { Academy } from "../components/site/Academy";

export const Route = createFileRoute("/academy")({
  component: AcademyPage,
});

function AcademyPage() {
  return <Academy />;
}
