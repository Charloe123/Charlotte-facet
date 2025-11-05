import { NextResponse } from "next/server";
import connect from "@/db";
import User from "@/models/User";


export async function DELETE() {
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
      message: "User deletion bypassed for now"
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

    
    return NextResponse.json({
      success: true,
      message: "User update bypassed for now"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

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
    const users = await User.find().select("-password").sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: users.map(user => ({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role,
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}