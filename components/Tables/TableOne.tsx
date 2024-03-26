"use client"
import { useState, useEffect } from "react";
import { BRAND } from "@/types/brand";
import Image from "next/image";
import useFormFunction from "@/app/helper/globle_helper";

const brandData: BRAND[] = [
  // Your brand data here...
];

const TableOne = () => {
  const token = localStorage.getItem('token');
  const [siteList, setSiteList] = useState([]);

  const { formData, formFunction } = useFormFunction();

  let payload = {
    apitype: 'dropdown',
    category: 'city'
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const temp = await formFunction({
          type1: "apiCall",
          endpoint: "/api/admin/v2/sites",
          token: `${token}`,
          method: 'POST',
          payload: payload
        });
        setSiteList(temp.data.data); // Update the siteList state with the fetched data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        All Routes
      </h4>

      <div className="flex flex-col">
        {siteList.map((site, index) => (
          <div className="grid grid-cols-6 sm:grid-cols-5" key={index}>
            <div className="flex items-center gap-3 p-2.5 xl:p-5">
              <p className="hidden text-black dark:text-white sm:block">
                {site?.name} <br/> ({site.mr_name})
              </p>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableOne;
