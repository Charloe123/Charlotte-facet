import { NextResponse } from "next/server";
import ProductModel from "@/models/Product";
import connect from "@/db";

// GET all products
export async function GET() {
  try {
    await connect();
    const products = await ProductModel.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

// POST a new product
export async function POST(req: Request) {
  try {
    await connect();
    const body = await req.json();
    const newProduct = new ProductModel(body);
    await newProduct.save();
    return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}