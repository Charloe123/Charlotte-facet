"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
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

interface Order {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  items: Array<{
    productId: string;
    quantity: number;
    price: number;
    title: string;
    imageUrl: string;
  }>;
  total: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentIntentId?: string;
  createdAt: string;
  updatedAt: string;
}

interface SellerApplication {
  _id?: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  businessName: string;
  businessDescription: string;
  website: string;
  address: string;
  city: string;
  country: string;
  experience: string;
  productCategories: string[];
  termsAccepted: boolean;
  status: "pending" | "approved" | "rejected";
  submittedAt: string;
}

export default function AdminDashboard() {
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellerApplications, setSellerApplications] = useState<SellerApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"users" | "products" | "orders" | "seller-applications">("users");
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated" || (session?.user as { role: string })?.role !== "admin") {
      router.push("/");
      return;
    }

    fetchData();
  }, [session, status, router]);

  const fetchData = async () => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Fetch seller applications from API
      const applicationsRes = await fetch("/api/seller-applications", { headers });
      if (applicationsRes.ok) {
        const applicationsData = await applicationsRes.json();
        setSellerApplications(applicationsData.data || []);
      }

      const [usersRes, productsRes, ordersRes] = await Promise.all([
        fetch("/api/admin/users", { headers }),
        fetch("/api/admin/products", { headers }),
        fetch("/api/admin/orders", { headers })
      ]);

      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData.data || []);
      }

      if (productsRes.ok) {
        const productsData = await productsRes.json();
        setProducts(productsData.data || []);
      }

      if (ordersRes.ok) {
        const ordersData = await ordersRes.json();
        setOrders(ordersData.data || []);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  // const handleLogout = () => {
  //   router.push("/");
  // };

  const handleEditUser = (user: User) => {
   
    alert(`Edit user: ${user.name}`);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      const response = await fetch(`/api/admin/users?userId=${userId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
        alert("User deleted successfully");
      } else {
        const errorData = await response.json();
        alert(`Failed to delete user: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      alert("Error deleting user");
    }
  };

  const handleEditProduct = (product: Product) => {
 
    alert(`Edit product: ${product.title}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/admin/products?productId=${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts(products.filter(product => product._id !== productId));
        alert("Product deleted successfully");
      } else {
        const errorData = await response.json();
        alert(`Failed to delete product: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Error deleting product");
    }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: Order['status']) => {
    try {
      const response = await fetch("/api/admin/orders", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderId, status }),
      });

      if (response.ok) {
        const updatedOrder = await response.json();
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: updatedOrder.data.status } : order
        ));
        alert("Order status updated successfully");
      } else {
        const errorData = await response.json();
        alert(`Failed to update order status: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status");
    }
  };

  const handleViewOrderDetails = (order: Order) => {

    alert(`Order Details:\nCustomer: ${order.userId.name}\nItems: ${order.items.length}\nTotal: $${order.total}\nStatus: ${order.status}`);
  };

  const handleApproveSeller = async (applicationId: string) => {
    try {
      const response = await fetch(`/api/seller-applications?id=${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'approved',
          approvedBy: 'admin', // In real app, this would be the current admin user ID
        }),
      });

      if (response.ok) {
        // Update local state
        setSellerApplications(applications =>
          applications.map(app =>
            app.id === applicationId ? { ...app, status: "approved" as const } : app
          )
        );
        alert("Seller application approved successfully! The seller can now access their dashboard.");
      } else {
        const errorData = await response.json();
        alert(`Failed to approve application: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error approving seller:', error);
      alert('Error approving seller application');
    }
  };

  const handleRejectSeller = async (applicationId: string, reason?: string) => {
    try {
      const response = await fetch(`/api/seller-applications?id=${applicationId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: 'rejected',
          rejectionReason: reason || 'Application does not meet our requirements',
        }),
      });

      if (response.ok) {
        // Update local state
        setSellerApplications(applications =>
          applications.map(app =>
            app.id === applicationId ? { ...app, status: "rejected" as const } : app
          )
        );
        alert("Seller application rejected.");
      } else {
        const errorData = await response.json();
        alert(`Failed to reject application: ${errorData.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error rejecting seller:', error);
      alert('Error rejecting seller application');
    }
  };

  const handleViewSellerApplication = (application: SellerApplication) => {
    alert(`Application Details:\nName: ${application.firstName} ${application.lastName}\nBusiness: ${application.businessName}\nEmail: ${application.email}\nCategories: ${application.productCategories.join(", ")}\nExperience: ${application.experience} years`);
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

      <div className="min-h-screen bg-gray-50 pt-20 md:pt-24">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="bg-white rounded-lg shadow-lg p-4 md:p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => setActiveTab("users")}
                className={`px-3 py-2 rounded-md font-medium text-sm ${
                  activeTab === "users"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Users ({users.length})
              </button>
              <button
                onClick={() => setActiveTab("products")}
                className={`px-3 py-2 rounded-md font-medium text-sm ${
                  activeTab === "products"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Products ({products.length})
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`px-3 py-2 rounded-md font-medium text-sm ${
                  activeTab === "orders"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Orders ({orders.length})
              </button>
              <button
                onClick={() => setActiveTab("seller-applications")}
                className={`px-3 py-2 rounded-md font-medium text-sm ${
                  activeTab === "seller-applications"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Seller Applications ({sellerApplications.filter(app => app.status === "pending").length})
              </button>
            </div>

           
            {activeTab === "users" && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">User Management</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id}>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 capitalize">
                            {user.role}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-2 md:mr-4"
                              onClick={() => handleEditUser(user)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900"
                              onClick={() => handleDeleteUser(user.id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "products" && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Product Management</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                  {products.map((product) => (
                    <div key={product._id} className="bg-gray-50 rounded-lg p-3 md:p-4 border">
                      <Image
                        src={product.imageUrl}
                        alt={`Image of ${product.title}`}
                        width={400}
                        height={200}
                        className="w-full h-32 md:h-48 object-cover rounded-md mb-4"
                      />
                      <h3 className="text-sm md:text-lg font-semibold text-gray-900 mb-2">{product.title}</h3>
                      <p className="text-gray-600 text-xs md:text-sm mb-2">${product.price}</p>
                      <p className="text-gray-500 text-xs md:text-sm mb-4 line-clamp-2">{product.description}</p>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          className="bg-blue-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm hover:bg-blue-700"
                          onClick={() => handleEditProduct(product)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 text-white px-2 md:px-3 py-1 rounded text-xs md:text-sm hover:bg-red-700"
                          onClick={() => handleDeleteProduct(product._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

         
            {activeTab === "orders" && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Order Management</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Items
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                          Date
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {orders.map((order) => (
                        <tr key={order._id}>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                            {order._id.slice(-8)}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                            <div>
                              <div className="font-medium">{order.userId.name}</div>
                              <div className="text-xs hidden sm:block">{order.userId.email}</div>
                            </div>
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden md:table-cell">
                            {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                            ${order.total}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value as Order['status'])}
                              className={`px-1 md:px-2 py-1 text-xs font-medium rounded-full ${
                                order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                                order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                                order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden lg:table-cell">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-2 md:mr-4"
                              onClick={() => handleViewOrderDetails(order)}
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "seller-applications" && (
              <div>
                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">Seller Applications</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Applicant
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Business
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                          Categories
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                          Submitted
                        </th>
                        <th className="px-2 md:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {sellerApplications.map((application) => (
                        <tr key={application._id?.toString() || application.id}>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium text-gray-900">
                            <div>
                              <div className="font-medium">{application.firstName} {application.lastName}</div>
                              <div className="text-xs text-gray-500">{application.email}</div>
                            </div>
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500">
                            {application.businessName}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden md:table-cell">
                            {application.productCategories.join(", ")}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              application.status === 'approved' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {application.status}
                            </span>
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm text-gray-500 hidden lg:table-cell">
                            {new Date(application.submittedAt).toLocaleDateString()}
                          </td>
                          <td className="px-2 md:px-6 py-4 whitespace-nowrap text-xs md:text-sm font-medium">
                            <button
                              className="text-blue-600 hover:text-blue-900 mr-2 md:mr-4"
                              onClick={() => handleViewSellerApplication(application)}
                            >
                              View
                            </button>
                            {application.status === 'pending' && (
                              <>
                                <button
                                  className="text-green-600 hover:text-green-900 mr-2 md:mr-4"
                                  onClick={() => handleApproveSeller(application._id?.toString() || application.id)}
                                >
                                  Approve
                                </button>
                                <button
                                  className="text-red-600 hover:text-red-900"
                                  onClick={() => handleRejectSeller(application._id?.toString() || application.id)}
                                >
                                  Reject
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
