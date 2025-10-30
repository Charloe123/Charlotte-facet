import { NextRequest, NextResponse } from "next/server";
import ProductModel from "@/models/Product";
import connect from "@/db";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connect();
    const resolvedParams = await params;
    const product = await ProductModel.findById(resolvedParams.id);
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}