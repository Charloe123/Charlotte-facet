import { NextResponse } from "next/server";
import connect from "@/db";
import RingModel from "@/models/ring";
import NecklaceModel from "@/models/necklace";
import BraceletModel from "@/models/bracelet";
import EarringModel from "@/models/earring";
import NoseringModel from "@/models/nosering";
import WatchModel from "@/models/watch";
import NewArrivalModel from "@/models/NewArrival";
import ForGiftsModel from "@/models/ForGifts";
import EngagementModel from "@/models/engagement";

const productModels = [
  RingModel,
  NecklaceModel,
  BraceletModel,
  EarringModel,
  NoseringModel,
  WatchModel,
  NewArrivalModel,
  ForGiftsModel,
  EngagementModel,
];

export async function GET() {
  try {
    const user = { role: "admin" };

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    await connect();

    const allProducts = [];

    for (const Model of productModels) {
      try {
        const products = await Model.find().sort({ createdAt: -1 });
        allProducts.push(...products);
      } catch (error) {
        console.error(`Error fetching from ${Model.modelName}:`, error);
      }
    }

    return NextResponse.json({
      success: true,
      data: allProducts.map(product => ({
        _id: product._id.toString(),
        title: product.title,
        price: product.price,
        imageUrl: product.imageUrl,
        description: product.description,
      }))
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    
    const user = { role: "admin" }; 

    if (!user || user.role !== "admin") {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      );
    }

    await connect();

  
    return NextResponse.json({
      success: true,
      message: "Product deletion bypassed for now"
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}