import { getProducts } from "@/app/actions/products";
import { getCustomers } from "@/app/actions/customers";
import { getCurrentCashRegister } from "@/app/actions/cash-register";
import { PDVClient } from "./pdv-client";

export default async function PDVPage() {
  const [products, customers, cashRegister] = await Promise.all([
    getProducts(),
    getCustomers(),
    getCurrentCashRegister(),
  ]);

  return (
    <div className="h-full flex flex-col -m-6 p-6 bg-zinc-100 dark:bg-zinc-950">
      <PDVClient 
        products={products} 
        customers={customers} 
        cashRegister={cashRegister} 
      />
    </div>
  );
}
