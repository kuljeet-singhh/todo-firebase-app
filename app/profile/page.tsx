"use client";

import { auth } from "@/firebase/config";
import { onAuthStateChanged, type User } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Profile() {

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      console.log("User from header:", currentUser);
      setUser(currentUser);
    });

    return () => unsubscribe();

  }, []);
console.log("auth from profile",auth)
  if (!user) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-4">Profile</h1>

      <div className="space-y-2">
            <p><b>Name:</b> {user.displayName}</p>
        <p><b>Email:</b> {user.email}</p>

        <p><b>User ID:</b> {user.uid}</p>

        <p><b>Email Verified:</b> {user.emailVerified ? "Yes" : "No"}</p>

      </div>

    </div>
  );
}