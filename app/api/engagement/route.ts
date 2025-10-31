import { NextResponse } from "next/server";
import EngagementModel from "@/models/engagement";
import connect from "@/db";

// GET all engagements
export async function GET() {
  try {
    await connect();
    const engagements = await EngagementModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: engagements }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new engagement
export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const newEngagement = new EngagementModel(body);
    await newEngagement.save();
    return NextResponse.json({ success: true, data: newEngagement }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}