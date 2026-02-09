import { NextRequest, NextResponse } from "next/server";
import { getAllLeads } from "@/lib/leads/storage";
import { auth } from "@/lib/auth";

// Middleware to check authentication
async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session;
}

export async function GET(request: NextRequest) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getAllLeads();
    return NextResponse.json({ success: true, data: leads });
  } catch (_error) {
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
