"use client";
import { useEffect } from "react";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableThree from "@/components/Tables/TableThree";
import useFormFunction, { FormData } from "@/app/helper/globle_helper";

const RoutesPage = () => {
  const { formData, formFunction } = useFormFunction();
  const token ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2Rldi50b3Vya29rYW4uY29tL2FkbWluL3YyL2F1dGgvbG9naW4iLCJpYXQiOjE3MDcwMzQxNjcsImV4cCI6MjIyNTQzNDE2NywibmJmIjoxNzA3MDM0MTY3LCJqdGkiOiJHUUlwNDFRWmVjSXZRRmlSIiwic3ViIjoiMSIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.p9grSairqfr2YbgoYj6AOR4UrK3blSFEFfDsl_GVLQE';

  useEffect(() => {
    formFunction({ type1: "apiCall", endpoint: "/api/admin/v2/sites", token }); // Pass token to formFunction
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
