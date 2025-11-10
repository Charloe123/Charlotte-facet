import { NextRequest, NextResponse } from "next/server";
import connect from "@/db";
import SellerApplication from "@/models/SellerApplication";

export async function POST(request: NextRequest) {
  try {
    await connect();

    const body = await request.json();
    const {
      firstName,
      lastName,
      email,
      phone,
      businessName,
      businessDescription,
      website,
      address,
      city,
      country,
      experience,
      productCategories,
      termsAccepted,
    } = body;

    // Check if application already exists for this email
    const existingApplication = await SellerApplication.findOne({ email });
    if (existingApplication) {
      return NextResponse.json(
        { error: "An application already exists for this email address" },
        { status: 400 }
      );
    }

    const newApplication = new SellerApplication({
      firstName,
      lastName,
      email,
      phone,
      businessName,
      businessDescription,
      website,
      address,
      city,
      country,
      experience,
      productCategories,
      termsAccepted,
    });

    await newApplication.save();

    return NextResponse.json(
      {
        message: "Seller application submitted successfully",
        applicationId: newApplication._id
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating seller application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const email = searchParams.get("email");

    const query: Record<string, string> = {};

    if (status) {
      query.status = status;
    }

    if (email) {
      query.email = email;
    }

    const applications = await SellerApplication.find(query).sort({ submittedAt: -1 });

    return NextResponse.json({
      data: applications,
      count: applications.length
    });
  } catch (error) {
    console.error("Error fetching seller applications:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    await connect();

    const { searchParams } = new URL(request.url);
    const applicationId = searchParams.get("id");

    if (!applicationId) {
      return NextResponse.json(
        { error: "Application ID is required" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { status, approvedBy, rejectionReason } = body;

    const updateData: {
      status: string;
      updatedAt: Date;
      approvedAt?: Date;
      approvedBy?: string;
      rejectionReason?: string;
    } = {
      status,
      updatedAt: new Date(),
    };

    if (status === "approved") {
      updateData.approvedAt = new Date();
      updateData.approvedBy = approvedBy;
    } else if (status === "rejected") {
      updateData.rejectionReason = rejectionReason;
    }

    const updatedApplication = await SellerApplication.findByIdAndUpdate(
      applicationId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedApplication) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Application ${status} successfully`,
      data: updatedApplication
    });
  } catch (error) {
    console.error("Error updating seller application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}