import { createFileRoute } from "@tanstack/react-router";
import { ShopPage } from "@/components/shop/ShopPage";
export const Route = createFileRoute("/shop")({ component: ShopPage });
