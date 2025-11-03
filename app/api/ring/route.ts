import { NextResponse } from "next/server";
import RingModel from "@/models/ring";
import connect from "@/db";

// GET all rings
export async function GET() {
  try {
    await connect();
    const rings = await RingModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: rings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new ring
export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const newRing = new RingModel(body);
    await newRing.save();
    return NextResponse.json({ success: true, data: newRing }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}