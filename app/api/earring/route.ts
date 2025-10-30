import { NextResponse } from "next/server";
import EarringModel from "@/models/earring";
import connect from "@/db";

// GET all earrings
export async function GET() {
  try {
    await connect();
    const earrings = await EarringModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: earrings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new earring
export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const newEarring = new EarringModel(body);
    await newEarring.save();
    return NextResponse.json({ success: true, data: newEarring }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
