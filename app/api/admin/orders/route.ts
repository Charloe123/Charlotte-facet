import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import { getUserFromToken } from "@/lib/auth";
import OrderModel from "@/models/Order";

export async function GET(req: NextRequest) {
  try {
    // Check admin authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = await getUserFromToken(token);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    await connect();

    // Fetch all orders with user information
    const orders = await OrderModel.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: orders.map(order => ({
        _id: order._id.toString(),
        userId: order.userId,
        items: order.items,
        total: order.total,
        status: order.status,
        shippingAddress: order.shippingAddress,
        paymentIntentId: order.paymentIntentId,
        createdAt: order.createdAt,
        updatedAt: order.updatedAt,
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Check admin authentication
    const authHeader = req.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const token = authHeader.substring(7);
    const user = await getUserFromToken(token);

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    await connect();

    const { orderId, status } = await req.json();

    if (!orderId || !status) {
      return NextResponse.json(
        { success: false, error: "Order ID and status are required" },
        { status: 400 }
      );
    }

    const validStatuses = ["pending", "processing", "shipped", "delivered", "cancelled"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate('userId', 'name email');

    if (!updatedOrder) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        _id: updatedOrder._id.toString(),
        userId: updatedOrder.userId,
        items: updatedOrder.items,
        total: updatedOrder.total,
        status: updatedOrder.status,
        shippingAddress: updatedOrder.shippingAddress,
        paymentIntentId: updatedOrder.paymentIntentId,
        createdAt: updatedOrder.createdAt,
        updatedAt: updatedOrder.updatedAt,
      }
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}