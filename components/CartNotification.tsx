"use client";

import { useCart } from "@/lib/cart-context";
import Image from "next/image";

export default function CartNotification() {
  const { notification, hideNotification } = useCart();

  if (!notification?.show) return null;

  return (
    <div className="fixed top-4 right-4 bg-white border border-gray-200 rounded-lg shadow-lg p-4 z-50 max-w-sm">
      <div className="flex items-start space-x-3">
        <Image
          src={notification.imageUrl}
          alt="Product"
          width={48}
          height={48}
          className="w-12 h-12 object-cover rounded-md"
        />
        <div className="flex-1">
          <p className="text-sm text-gray-800">{notification.message}</p>
        </div>
        <button
          onClick={hideNotification}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>
    </div>
  );
}