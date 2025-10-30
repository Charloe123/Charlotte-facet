import { NextRequest, NextResponse } from "next/server";
import ForGiftsModel from "@/models/ForGifts";
import connect from "@/db";

// GET all for gifts or specific product
export async function GET(request: NextRequest) {
  try {
    await connect();

    // Check if this is a request for a specific product
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (id && id !== 'route' && id !== 'forgifts') {
      // This is a request for a specific product
      const product = await ForGiftsModel.findById(id);
      if (!product) {
        return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: product }, { status: 200 });
    }

    // This is a request for all products
    const forGifts = await ForGiftsModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: forGifts }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new for gift
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const newForGift = new ForGiftsModel(body);
    await newForGift.save();
    return NextResponse.json({ success: true, data: newForGift }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}