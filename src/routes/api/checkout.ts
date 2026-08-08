import { createServerFileRoute } from "@tanstack/react-start";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, { apiVersion: "2025-06-30.basil" as any });

export const ServerRoute = createServerFileRoute("/api/checkout").methods({
  POST: async ({ request }) => {
    const { items, email } = await request.json();
    const line_items = items.map((i: any) => ({
      price_data: {
        currency: "eur",
        product_data: { name: `${i.name} - ${i.size}` },
        unit_amount: Math.round(i.p * 100),
      },
      quantity: i.q,
    }));
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      customer_email: email,
      success_url: `${request.headers.get("origin")}/shop?success=true`,
      cancel_url: `${request.headers.get("origin")}/shop?canceled=true`,
    });
    return Response.json({ url: session.url });
  },
});
