import { NextResponse } from "next/server";
import connect from "@/db";

import OrderModel from "@/models/Order";

export async function GET() {
  try {
    
    const user = { role: "admin" }; 

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    await connect();

   
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

export async function PUT() {
  try {
 
    const user = { role: "admin" }; 

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    await connect();

  
    return NextResponse.json({
      success: true,
      message: "Order status update bypassed for now"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}