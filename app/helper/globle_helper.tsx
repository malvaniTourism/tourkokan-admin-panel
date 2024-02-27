import { useState } from "react";
import { useRouter } from 'next/navigation';

export interface FormData {
  [key: string]: string | number;
}

interface FormFunctionProps {
  type1: "input" | "apiCall";
  type2?: "string" | "number";
  name?: string;
  value?: string;
  endpoint?: string;
  token?: string;
}

const useFormFunction = () => {
  const [formData, setFormData] = useState<FormData>({});
  const router = useRouter();

//type1=apiCall/input
//type2=number/string
//name=e.target.name
//value=e.target.value
//endpoint
//token(for api call)

  const formFunction = ({ type1, type2, name, value, endpoint, token  }: FormFunctionProps): void => {
    
    if (type1 === "input") {
      if (type2 === "string" || type2 === "number") {
        setFormData((prevFormData: FormData) => ({
          ...prevFormData,
          [name as string]: type2 === "number" ? parseInt(value as string, 10) : (value as string),
        }));
      }
    }

    if (type1 === "apiCall" && endpoint) {
      // Example usage:
      // const endpoint = 'https://example.com/api';
      const method = 'POST';
      // const payload = { key: 'value' }; // Your payload object
      makeApiCall(endpoint, method, formData, token);
    }
  };


  const makeApiCall = async (endpoint: string, method: string, payload?: any, token?: string ): Promise<void> => {  
    try {
      const headers: HeadersInit = {
        'Content-Type': 'application/json', // Assuming JSON payload, adjust if needed
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
      
      const options: RequestInit = {
        method: method,
        headers:headers,
        body: payload ? JSON.stringify(payload) : undefined
      };

      const response = await fetch(endpoint, options);
      const result = await response.json();
      if (!response.ok||!result.success) {
        window.alert(`API request failed ${result.message}`)
        throw new Error(`API request failed with status ${response.status}`);
      }

      console.log("API call successful:", result);
      if(result.success && result?.data?.access_token){
        localStorage.setItem('token',result?.data?.access_token)
        location.reload();
      }
    } catch (error) {
      console.error("API call failed:", error);
    }
  };



  // const makeApiCall = async (endpoint: string): Promise<void> => {
  //   try {
  //     // Assuming you have a function for making API calls
  //     const response = await fetch(endpoint);
  //     if (!response.ok) {
  //       throw new Error(`API request failed with status ${response.status}`);
  //     }

  //     // Process the API response if needed
  //     const result = await response.json();
  //     console.log("API call successful:", result);
  //   } catch (error) {
  //     console.error("API call failed:", error);
  //   }
  // };

  return { formData, formFunction };
};

export default useFormFunction;
