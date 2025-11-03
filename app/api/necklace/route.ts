import { NextResponse } from "next/server";
import NecklaceModel from "@/models/necklace";
import connect from "@/db";

// GET all necklaces
export async function GET() {
  try {
    await connect();
    const necklaces = await NecklaceModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: necklaces }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new necklace
export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const newNecklace = new NecklaceModel(body);
    await newNecklace.save();
    return NextResponse.json({ success: true, data: newNecklace }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}