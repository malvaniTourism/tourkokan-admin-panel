import { useState } from "react";

export interface FormData {
    [key: string]: string | number;
}

interface FormFunctionProps {
    type1: "input" | "apiCall";
    type2?: "string" | "number";
    name?: string;
    value?: string;
    endpoint?: string;
}

const useFormFunction = () => {
  const [formData, setFormData] = useState<FormData>({});

  const formFunction = ({ type1, type2, name, value, endpoint }: FormFunctionProps): void => {
    if (type1 === "input") {
      if (type2 === "string" || type2 === "number") {
        setFormData((prevFormData: FormData) => ({
          ...prevFormData,
          [name as string]: type2 === "number" ? parseInt(value as string, 10) : (value as string),
        }));
      }
    }

    if (type1 === "apiCall" && endpoint) {
      makeApiCall(endpoint);
    }
  };

  const makeApiCall = async (endpoint: string): Promise<void> => {
    try {
      // Assuming you have a function for making API calls
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      // Process the API response if needed
      const result = await response.json();
      console.log("API call successful:", result);
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  return { formData, formFunction };
};

export default useFormFunction;
