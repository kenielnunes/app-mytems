import { OrderCard } from "@/components/card/order-card";

export default function Market() {
  return (
    <>
      <div className="grid gap-4 lg:gap-8 xl:gap-12 lg:grid-cols-2 xl:grid-cols-4 p-4 md:p-6">
        <OrderCard order={{ seller: "Kenas" }} />
        <OrderCard order={{ seller: "Vinas" }} />
        <OrderCard order={{ seller: "Vinas" }} />
        <OrderCard order={{ seller: "Vinas" }} />
      </div>
    </>
  );
}
