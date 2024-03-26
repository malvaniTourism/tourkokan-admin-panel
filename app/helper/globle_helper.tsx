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
  method?: string;
  payload?: any;
}

const useFormFunction = () => {
  const [formData, setFormData] = useState<FormData>({});
  const router = useRouter();

  const formFunction = async ({ type1, type2, name, value, endpoint, token, method, payload }: FormFunctionProps): Promise<any> => {
    if (type1 === "input") {
      if (type2 === "string" || type2 === "number") {
        setFormData((prevFormData: FormData) => ({
          ...prevFormData,
          [name as string]: type2 === "number" ? parseInt(value as string, 10) : (value as string),
        }));
      }
    }

    if (type1 === "apiCall" && endpoint && method) {
      try {
        const result = await makeApiCall(endpoint, method, endpoint == '/api/admin/v2/sites' ? payload : formData, token);
        return result;
      } catch (error) {
        throw error;
      }
    }
  };

  const makeApiCall = async (endpoint: string, method: string, payload?: any, token?: string): Promise<any> => {
    try {
      const validMethods = ['GET', 'POST', 'PUT', 'DELETE'];

      if (!validMethods.includes(method)) {
        console.error(`Invalid HTTP method: ${method}`);
        return;
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const options: RequestInit = {
        method: method,
        headers: headers,
      };

      if (payload && method !== 'GET') {
        options.body = JSON.stringify(payload);
      }

      const response = await fetch(endpoint, options);
      const result = await response.json();

      if (!response.ok || !result.success) {
        window.alert(`API request failed ${result.message}`);
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      if (result.success && result?.data?.access_token) {
        localStorage.setItem('token', result?.data?.access_token);
        location.reload();
      }

      return result;
    } catch (error) {
      throw error;
    }
  };
  

  return { formData, formFunction };
};

export default useFormFunction;
