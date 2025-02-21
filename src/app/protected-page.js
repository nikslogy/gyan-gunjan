// src/app/protected-page.js

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { checkAuth } from "../utils/auth";

export default function ProtectedPage() {
  const [authenticated, setAuthenticated] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function verifyAuth() {
      const response = await checkAuth(); // Fetch authentication status
      if (!response.authenticated) {
        window.location.href = `http://localhost:8000/profile/login/?next=http://localhost:3000/protected-page`;
      } else {
        setAuthenticated(true);
      }
    }
    verifyAuth();
  }, []);
  

  if (authenticated === null) {
    // Still checking auth...
    return <p>Checking authentication...</p>;
  }

  return <h1>Welcome to the protected page!</h1>;
}
