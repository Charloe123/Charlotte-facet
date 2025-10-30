import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { amount, productId } = await req.json();

    if (!amount || !productId) {
      return NextResponse.json(
        { success: false, error: "Amount and productId are required" },
        { status: 400 }
      );
    }

    // Mock payment intent creation for build
    const mockPaymentIntent = {
      client_secret: "mock_client_secret_" + Date.now(),
      id: "mock_pi_" + Date.now(),
    };

    return NextResponse.json({
      success: true,
      clientSecret: mockPaymentIntent.client_secret,
      paymentIntentId: mockPaymentIntent.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create payment intent" },
      { status: 500 }
    );
  }
}