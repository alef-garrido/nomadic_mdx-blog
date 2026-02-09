import { NextRequest, NextResponse } from "next/server";
import { createLead, getAllLeads } from "@/lib/leads/storage";
import { leadSchema } from "@/lib/leads/validation";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = leadSchema.parse(body);

    // Create lead
    const lead = await createLead(validatedData);

    return NextResponse.json(
      { success: true, id: lead.id },
      { status: 201 }
    );
  } catch (error: unknown) {
    // Handle validation errors
    if (error instanceof Error) {
      if (error.message.includes("already exists")) {
        return NextResponse.json(
          { success: false, error: error.message },
          { status: 400 }
        );
      }

      // Zod validation errors
      if ("issues" in error) {
        return NextResponse.json(
          {
            success: false,
            error: "Validation failed",
            issues: (error as { issues: unknown[] }).issues,
          },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: false, error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const leads = await getAllLeads();
    return NextResponse.json({ success: true, data: leads });
  } catch {
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
