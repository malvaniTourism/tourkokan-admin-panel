import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/Tables/TableThree";
import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sites Page | Next.js E-commerce Dashboard Template",
  description: "This is Sites page for TailAdmin Next.js",
  // other metadata
};

const SitesPage = () => {
  return (
    <>
      <Breadcrumb pageName="Routes" />

      <div className="flex flex-col gap-10">
        <TableOne />
      </div>
    </>
  );
};

export default SitesPage;
