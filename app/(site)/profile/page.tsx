"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signIn");
      return;
    }

    // Decode token to get user info
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      setUser({
        id: payload.id,
        name: payload.name,
        email: payload.email,
        role: payload.role,
      });
    } catch (error) {
      console.error("Error decoding token:", error);
      localStorage.removeItem("token");
      router.push("/signIn");
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <Navbar isLoggedIn={true} role={user.role} onLogout={handleLogout} />

      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">My Profile</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <p className="mt-1 text-lg text-gray-900">{user.name}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-lg text-gray-900">{user.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Role</label>
                    <p className="mt-1 text-lg text-gray-900 capitalize">{user.role}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Actions</h2>
                <div className="space-y-4">
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                  >
                    Logout
                  </button>

                  {user.role === "admin" && (
                    <button
                      onClick={() => router.push("/admin/dashboard")}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
                    >
                      Admin Dashboard
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}