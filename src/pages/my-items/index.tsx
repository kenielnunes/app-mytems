import { OrderCard } from "@/components/card/order-card";
import { api } from "@/services/api/api";
import { findItemsByUser } from "@/services/api/modules/item/find-items-by-user";
import { parseCookies } from "nookies";
import React, { useEffect, useState } from "react";

export default function MyItems() {
  const [items, setItems] = useState([]);
  const { auth } = parseCookies();

  useEffect(() => {
    async function get() {
      api.defaults.headers["Authorization"] = `Bearer ${auth}`;
      const data = await findItemsByUser();

      setItems(data);
    }
    get();
  }, []);

  return (
    <>
      <section className="grid grid-cols-4">
        {items?.map((item) => {
          return (
            <OrderCard
              description={item.description}
              seller={"asdasd"}
              imageUrl={item?.itemImages[0]?.imageUrl}
              price={item.basePrice}
              title={item.name}
              game={"asd"}
            />
          );
        })}
      </section>
    </>
  );
}
