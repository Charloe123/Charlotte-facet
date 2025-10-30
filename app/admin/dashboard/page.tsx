"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import Image from "next/image";

interface User {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
}

interface Product {
  _id: string;
  title: string;
  price: number;
  imageUrl: string;
  description: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "products">("users");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/signIn");
      return;
    }

    try {
      // Decode token
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== "admin") {
        router.push("/"); // Non-admins go to homepage
        return;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      localStorage.removeItem("token");
      router.push("/signIn");
      return;
    }

    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      };

      const [usersRes, productsRes] = await Promise.all([
        fetch("/api/admin/users", { headers }),
        fetch("/api/admin/products", { headers })
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.data || []);
      }

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.data || []);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <>
      <Navbar isLoggedIn={true} role="admin" onLogout={handleLogout} />

      <div className="min-h-screen bg-gray-50 pt-24">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            {/* Tabs */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={() => setActiveTab("users")}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === "users"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`px-4 py-2 rounded-md font-medium ${
                  activeTab === "products"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Products ({products.length})
              </button>
            </div>

            {/* Users Tab */}
            {activeTab === "users" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                            {user.role}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-4">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Products Tab */}
            {activeTab === "products" && (
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-6">Product Management</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <div key={product._id} className="bg-gray-50 rounded-lg p-4 border">
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        className="w-full h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">${product.price}</p>
                      <p className="text-gray-500 text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex space-x-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">Edit</button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
