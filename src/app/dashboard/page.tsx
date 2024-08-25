import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Farmioty Dashboard",
  description: "Farmioty Dashboard",
};

export default function Dashboard() {
  return (
    <DefaultLayout title="Dashboard Farmioty" description="Dashboard Farmioty">
      <ECommerce />
    </DefaultLayout>
  );
}
