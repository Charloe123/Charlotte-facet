"use client";

import { useState, useEffect } from "react";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Always redirect to application form first
    window.location.href = '/seller/become-seller';
  }, []);

  // Temporarily allow access for testing
  // if (!isApproved) {
  //   return (
  //     <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  //       <div className="max-w-md w-full space-y-8">
  //         <div className="text-center">
  //           <div className="mx-auto h-24 w-24 bg-yellow-100 rounded-full flex items-center justify-center">
  //             <svg className="h-12 w-12 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
  //               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
  //             </svg>
  //           </div>
  //           <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Access Restricted</h2>
  //           <p className="mt-2 text-sm text-gray-600">
  //             Your seller application is still under review. You will be able to access the dashboard once your application is approved by our administrators.
  //           </p>
  //           <div className="mt-6">
  //             <p className="text-sm text-gray-500">
  //               Check back later or contact support if you have questions about your application status.
  //             </p>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, Seller</span>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8">
          {/* Sidebar */}
          <div className="w-64 bg-white rounded-lg shadow p-6">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "overview"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "products"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "orders"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "analytics"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded-md ${
                  activeTab === "profile"
                    ? "bg-blue-100 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 bg-white rounded-lg shadow p-6">
            {activeTab === "overview" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Dashboard Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-blue-900">Total Sales</h3>
                    <p className="text-3xl font-bold text-blue-600">$12,345</p>
                  </div>
                  <div className="bg-green-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-green-900">Orders</h3>
                    <p className="text-3xl font-bold text-green-600">156</p>
                  </div>
                  <div className="bg-yellow-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-yellow-900">Products</h3>
                    <p className="text-3xl font-bold text-yellow-600">42</p>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-lg">
                    <h3 className="text-lg font-semibold text-purple-900">Customers</h3>
                    <p className="text-3xl font-bold text-purple-600">89</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Add New Product
                  </button>
                </div>
                <div className="text-center py-12">
                  <p className="text-gray-500">Product management interface coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === "orders" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Management</h2>
                <div className="text-center py-12">
                  <p className="text-gray-500">Order management interface coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === "analytics" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Reports</h2>
                <div className="text-center py-12">
                  <p className="text-gray-500">Analytics dashboard coming soon...</p>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Seller Profile</h2>
                <div className="text-center py-12">
                  <p className="text-gray-500">Profile management coming soon...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}