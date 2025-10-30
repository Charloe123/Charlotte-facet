import { NextResponse } from "next/server";
import BraceletModel from "@/models/bracelet";
import connect from "@/db";

// GET all bracelets
export async function GET() {
  try {
    await connect();
    const bracelets = await BraceletModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bracelets }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new bracelet
export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const newBracelet = new BraceletModel(body);
    await newBracelet.save();
    return NextResponse.json({ success: true, data: newBracelet }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}