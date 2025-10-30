import { NextRequest, NextResponse } from "next/server";
import BestSellersModel from "@/models/BestSellers";
import connect from "@/db";

// GET all best sellers or specific product
export async function GET(request: NextRequest) {
  try {
    await connect();

    // Check if this is a request for a specific product
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop();

    if (id && id !== 'route' && id !== 'bestsellers') {
      // This is a request for a specific product
      const product = await BestSellersModel.findById(id);
      if (!product) {
        return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: product }, { status: 200 });
    }

    // This is a request for all products
    const bestSellers = await BestSellersModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: bestSellers }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new best seller
export async function POST(req: NextRequest) {
  try {
    await connect();
    const body = await req.json();
    const newBestSeller = new BestSellersModel(body);
    await newBestSeller.save();
    return NextResponse.json({ success: true, data: newBestSeller }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}