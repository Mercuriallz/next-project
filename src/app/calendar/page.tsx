import { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import CalendarBox from "@/components/CalenderBox";


export const metadata: Metadata = {
  title: "Next.js Calendar Page | NextAdmin - Next.js Dashboard Kit",
  description:
    "This is Next.js Calendar page for NextAdmin Tailwind CSS Admin Dashboard Kit",
  // other metadata
};

const CalendarPage = () => {
  const title = (metadata.title as string) || "Default Title";
  const description = (metadata.description as string) || "Default Description";

  return (
    <DefaultLayout title={title} description={description}>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />
        <CalendarBox />
      </div>
    </DefaultLayout>
  );
};

export default CalendarPage;
