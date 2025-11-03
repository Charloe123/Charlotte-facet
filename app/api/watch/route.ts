import { NextResponse } from "next/server";
import WatchModel from "@/models/watch";
import connect from "@/db";


export async function GET() {
  try {
    await connect();
    const watches = await WatchModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: watches }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const newWatch = new WatchModel(body);
    await newWatch.save();
    return NextResponse.json({ success: true, data: newWatch }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}