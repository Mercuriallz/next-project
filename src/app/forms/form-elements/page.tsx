import React from "react";
import FormElements from "@/components/FormElements";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Form Elements Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const FormElementsPage = () => {
  const title = (metadata.title as string) || "Default Title";
  const description = (metadata.description as string) || "Default Description";
  return (
    <DefaultLayout title={title} description={description}>
      <FormElements />
    </DefaultLayout>
  );
};

export default FormElementsPage;
