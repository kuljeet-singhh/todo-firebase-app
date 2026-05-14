"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged, signOut, type User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);
  console.log("authFromHeader", auth);
  // Logout Function
  const handleLogout = async () => {
    await signOut(auth);

    setUser(null);
   
    router.push("/");
  };

  return (
    <header className="w-full bg-white shadow-md border-b">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-blue-600 cursor-pointer hover:text-blue-700 transition"
        >
          Firebase Todo
        </h1>

        {/* Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <button
                onClick={() => router.push("/profile")}
                className="px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
              >
                Profile
              </button>

              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="px-5 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition font-medium"
              >
                Login
              </button>

              <button
                onClick={() => router.push("/signup")}
                className="px-5 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition font-medium"
              >
                Signup
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
