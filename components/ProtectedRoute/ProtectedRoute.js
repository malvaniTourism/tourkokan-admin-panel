"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  // Check authentication status
  useEffect(() => {

    const isAuthenticated = localStorage.getItem('token'); // Implement your authentication logic here
    if (!isAuthenticated) {
      router.push('/auth/signin'); // Redirect to login page if not authenticated
    }
  }, []);

  return children;
};

export default ProtectedRoute;
