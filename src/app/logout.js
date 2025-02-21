"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/profile/logout/", {
          method: "POST",
          credentials: "include",
        });

        if (response.ok) {
          router.push("/login");
        } else {
          console.error("Logout failed");
        }
      } catch (error) {
        console.error("Error logging out:", error);
      }
    };

    logout();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <p>Logging out...</p>
    </div>
  );
}
