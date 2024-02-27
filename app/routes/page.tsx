"use client";
import { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import useFormFunction, { FormData } from "@/app/helper/globle_helper";

const RoutesPage = () => {
  const { formData, formFunction } = useFormFunction();
  const token =localStorage.getItem('token');

  useEffect(() => {
    formFunction({ type1: "apiCall", endpoint: "/api/admin/v2/sites", token:`${token}` }); // Pass token to formFunction
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <>
      <Breadcrumb pageName="Routes" />

      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default RoutesPage;
