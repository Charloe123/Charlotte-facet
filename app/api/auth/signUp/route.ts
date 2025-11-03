import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import User from "@/models/User";
import { hashPassword, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connect();
    const { name, email, password, role } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: "Name, email, and password are required" },
        { status: 400 }
      );
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "User already exists" },
        { status: 400 }
      );
    }


    const validRoles = ["customer", "admin"];
    const adminEmail = process.env.ADMIN_EMAIL;
    const userRole = email === adminEmail ? "admin" : (role && validRoles.includes(role) ? role : "customer");


    const hashedPassword = await hashPassword(password);


    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: userRole,
    });

    await user.save();


    const token = generateToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        token,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}