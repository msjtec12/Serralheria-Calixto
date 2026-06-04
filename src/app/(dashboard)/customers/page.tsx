import { getCustomers } from "@/app/actions/customers";
import { CustomerClient } from "./customer-client";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div>
      <CustomerClient customers={customers} />
    </div>
  );
}
