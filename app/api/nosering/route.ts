import { NextResponse } from "next/server";
import NoseringModel from "@/models/nosering";
import connect from "@/db";

// GET all noserings
export async function GET() {
  try {
    await connect();
    const noserings = await NoseringModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: noserings }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new nosering
export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const newNosering = new NoseringModel(body);
    await newNosering.save();
    return NextResponse.json({ success: true, data: newNosering }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}