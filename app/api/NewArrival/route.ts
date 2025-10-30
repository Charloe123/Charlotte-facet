import { NextRequest, NextResponse } from "next/server";
import NewArrivalModel from "@/models/NewArrival";
import connect from "@/db";

// GET all new arrivals
export async function GET(request: NextRequest) {
  try {
    await connect();

    // Check if this is a request for a specific product
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (id && id !== 'route' && id !== 'NewArrival') {
      // This is a request for a specific product
      const product = await NewArrivalModel.findById(id);
      if (!product) {
        return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: product }, { status: 200 });
    }

    // This is a request for all products
    const newArrivals = await NewArrivalModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: newArrivals }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new new arrival
export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const newNewArrival = new NewArrivalModel(body);
    await newNewArrival.save();
    return NextResponse.json({ success: true, data: newNewArrival }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}