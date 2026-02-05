"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card, Button, Select, SelectItem, Spinner } from "@heroui/react";
import { ArrowLeft, Save } from "lucide-react";
import Link from "next/link";
import { toast } from "@/lib/toast";
import { CardSkeleton } from "@/components/ui/LoadingSkeleton";

interface Lead {
  id: string;
  email: string;
  name: string;
  phone?: string;
  company?: string;
  message?: string;
  status: "new" | "contacted" | "converted";
  createdAt: string;
  updatedAt: string;
}

export default function LeadDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [status, setStatus] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [leadId, setLeadId] = useState<string>("");

  useEffect(() => {
    params.then(({ id }) => {
      setLeadId(id);
      fetchLead(id);
    });
  }, [params]);

  const fetchLead = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/leads/${id}`, {
        headers: { 'Cache-Control': 'no-cache' }
      });
      if (response.ok) {
        const data = await response.json();
        setLead(data.data);
        setStatus(data.data.status);
        toast.success("Lead loaded successfully");
      } else if (response.status === 404) {
        toast.error("Lead not found");
      } else if (response.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to load lead");
      }
    } catch (error) {
      console.error("Failed to fetch lead:", error);
      toast.error("Error loading lead. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async () => {
    if (!lead || status === lead.status) return;

    try {
      setIsSaving(true);
      const response = await fetch(`/api/admin/leads/${lead.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        setLead({ ...lead, status: status as any });
        toast.success("Lead status updated successfully");
      } else if (response.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to update lead status");
      }
    } catch (error) {
      console.error("Failed to update lead:", error);
      toast.error("Error updating lead. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (!lead) {
    return (
      <div className="space-y-4">
        <Link href="/admin/leads">
          <Button startContent={<ArrowLeft className="w-4 h-4" />}>
            Back to Leads
          </Button>
        </Link>
        <Card className="bg-slate-800 border border-slate-700 p-6">
          <p className="text-slate-400">Lead not found</p>
        </Card>
      </div>
    );
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link href="/admin/leads">
        <Button
          startContent={<ArrowLeft className="w-4 h-4" />}
          variant="light"
          className="text-blue-400"
        >
          Back to Leads
        </Button>
      </Link>

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{lead.name}</h1>
        <p className="text-slate-400 mt-1">Lead ID: {lead.id}</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Information */}
        <div className="lg:col-span-2 space-y-4">
          <Card className="bg-slate-800 border border-slate-700 p-6">
            <h2 className="text-lg font-bold text-white mb-4">Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-slate-400 text-sm">Email</p>
                <p className="text-white font-medium">{lead.email}</p>
              </div>
              {lead.phone && (
                <div>
                  <p className="text-slate-400 text-sm">Phone</p>
                  <p className="text-white font-medium">{lead.phone}</p>
                </div>
              )}
              {lead.company && (
                <div>
                  <p className="text-slate-400 text-sm">Company</p>
                  <p className="text-white font-medium">{lead.company}</p>
                </div>
              )}
            </div>
          </Card>

          {lead.message && (
            <Card className="bg-slate-800 border border-slate-700 p-6">
              <h2 className="text-lg font-bold text-white mb-4">Message</h2>
              <p className="text-slate-300 whitespace-pre-wrap">
                {lead.message}
              </p>
            </Card>
          )}
        </div>

        {/* Sidebar - Status & Dates */}
        <div className="space-y-4">
          <Card className="bg-slate-800 border border-slate-700 p-6">
            <h2 className="text-lg font-bold text-white mb-4">Status</h2>
            <div className="space-y-3">
              <Select
                label="Lead Status"
                selectedKeys={[status]}
                onChange={(e) => setStatus(e.target.value)}
                className="bg-slate-700"
              >
                <SelectItem key="new">New</SelectItem>
                <SelectItem key="contacted">Contacted</SelectItem>
                <SelectItem key="converted">Converted</SelectItem>
              </Select>

              {status !== lead.status && (
                <Button
                  color="primary"
                  startContent={<Save className="w-4 h-4" />}
                  onClick={handleStatusChange}
                  isLoading={isSaving}
                  fullWidth
                >
                  Save Status
                </Button>
              )}
            </div>
          </Card>

          <Card className="bg-slate-800 border border-slate-700 p-6">
            <h2 className="text-lg font-bold text-white mb-4">Timeline</h2>
            <div className="space-y-3 text-sm">
              <div>
                <p className="text-slate-400">Created</p>
                <p className="text-slate-200">{formatDate(lead.createdAt)}</p>
              </div>
              <div>
                <p className="text-slate-400">Updated</p>
                <p className="text-slate-200">{formatDate(lead.updatedAt)}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
