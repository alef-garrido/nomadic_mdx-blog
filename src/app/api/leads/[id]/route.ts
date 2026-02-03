import { NextRequest, NextResponse } from "next/server";
import { getLead, updateLead, deleteLead } from "@/lib/leads/storage";

interface Params {
  id: string;
}

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const lead = await getLead(id);

    if (!lead) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: lead });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch lead" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const updated = await updateLead(id, body);

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { id } = await params;
    const deleted = await deleteLead(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: "Lead not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
