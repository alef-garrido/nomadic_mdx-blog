import { NextRequest, NextResponse } from "next/server";
import { getAllLeads } from "@/lib/leads/storage";
import { auth } from "@/lib/auth";

async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    return null;
  }
  return session;
}

export async function GET(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _request: NextRequest
) {
  const session = await requireAuth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const leads = await getAllLeads();

    const stats = {
      totalLeads: leads.length,
      newLeads: leads.filter((l) => l.status === "new").length,
      contactedLeads: leads.filter((l) => l.status === "contacted").length,
      convertedLeads: leads.filter((l) => l.status === "converted").length,
    };

    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
