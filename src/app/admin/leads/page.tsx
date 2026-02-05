"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Card,
  Chip,
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { Trash2, Eye, Search, Filter } from "lucide-react";
import Link from "next/link";
import { toast } from "@/lib/toast";
import ConfirmationDialog from "@/components/ui/ConfirmationDialog";
import { TableSkeleton } from "@/components/ui/LoadingSkeleton";

interface Lead {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;
  status: "new" | "contacted" | "converted";
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/leads");
      if (response.ok) {
        const data = await response.json();
        setLeads(data.data || []);
      } else if (response.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to load leads");
      }
    } catch (error) {
      console.error("Failed to fetch leads:", error);
      toast.error("Error loading leads. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setDeletingId(id);
    onOpen();
  };

  const deleteLead = async () => {
    if (!deletingId) return;

    try {
      setDeleteLoading(true);
      const response = await fetch(`/api/admin/leads/${deletingId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLeads(leads.filter((lead) => lead.id !== deletingId));
        toast.success("Lead deleted successfully");
      } else if (response.status === 401) {
        toast.error("Session expired. Please login again.");
      } else {
        toast.error("Failed to delete lead");
      }
    } catch (error) {
      console.error("Failed to delete lead:", error);
      toast.error("Error deleting lead. Please try again.");
    } finally {
      setDeleteLoading(false);
      setDeletingId(null);
    }
  };

  const filteredLeads = leads
    .filter((lead) => {
      const matchesSearch =
        lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lead.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        filterStatus === "all" || lead.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new":
        return "primary";
      case "contacted":
        return "warning";
      case "converted":
        return "success";
      default:
        return "default";
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const stats = {
    total: leads.length,
    new: leads.filter((l) => l.status === "new").length,
    contacted: leads.filter((l) => l.status === "contacted").length,
    converted: leads.filter((l) => l.status === "converted").length,
  };

  return (
    <div className="space-y-8">
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        title="Delete Lead"
        message="Are you sure you want to delete this lead? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        isDestructive={true}
        onConfirm={deleteLead}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isLoading={deleteLoading}
      />

      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-3">Leads Management</h1>
        <p className="text-slate-400 text-lg">
          Track and manage all your leads
        </p>
      </div>

      {/* Stats Overview */}
      {!isLoading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total", count: stats.total, color: "bg-blue-500/10 text-blue-400" },
            { label: "New", count: stats.new, color: "bg-cyan-500/10 text-cyan-400" },
            { label: "Contacted", count: stats.contacted, color: "bg-amber-500/10 text-amber-400" },
            { label: "Converted", count: stats.converted, color: "bg-green-500/10 text-green-400" },
          ].map((stat) => (
            <div key={stat.label} className={`p-4 rounded-lg ${stat.color} border border-slate-700/50`}>
              <p className="text-sm font-medium text-slate-300 mb-1">{stat.label}</p>
              <p className="text-2xl font-bold">{stat.count}</p>
            </div>
          ))}
        </div>
      )}

      {/* Filters */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-slate-400" />
            <h3 className="text-sm font-semibold text-slate-200">Filters</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search by email or name..."
              startContent={<Search className="w-4 h-4 text-slate-500" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-700/50"
              classNames={{
                input: "text-slate-200 placeholder-slate-500",
                inputWrapper: "bg-slate-800/50 border-slate-700/50"
              }}
            />
            <Select
              label="Filter by status"
              selectedKeys={[filterStatus]}
              onChange={(e) => setFilterStatus(e.target.value)}
              classNames={{
                trigger: "bg-slate-800/50 border-slate-700/50",
                label: "text-slate-400"
              }}
            >
              <SelectItem key="all">All Statuses</SelectItem>
              <SelectItem key="new">New</SelectItem>
              <SelectItem key="contacted">Contacted</SelectItem>
              <SelectItem key="converted">Converted</SelectItem>
            </Select>
          </div>
        </div>
      </Card>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : (
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 overflow-hidden">
          <Table
            aria-label="Leads table"
            classNames={{
              base: "bg-transparent",
              table: "bg-transparent",
              th: "bg-slate-800/50 text-slate-200 font-semibold border-b border-slate-700/50",
              tr: "hover:bg-slate-700/30 border-b border-slate-700/50 transition-colors",
              td: "text-slate-300 py-4",
            }}
          >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Company</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn align="center">Actions</TableColumn>
            </TableHeader>
            <TableBody
              items={filteredLeads}
              emptyContent={
                <div className="py-12 text-center text-slate-400">
                  <p className="font-medium">No leads found</p>
                  <p className="text-sm">Try adjusting your filters</p>
                </div>
              }
            >
              {(lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium text-white">{lead.name}</TableCell>
                  <TableCell className="text-slate-300">{lead.email}</TableCell>
                  <TableCell className="text-slate-400">{lead.company || "—"}</TableCell>
                  <TableCell>
                    <Chip
                      color={getStatusColor(lead.status)}
                      size="sm"
                      variant="flat"
                      className="capitalize"
                    >
                      {lead.status}
                    </Chip>
                  </TableCell>
                  <TableCell className="text-slate-400 text-sm">
                    {formatDate(lead.createdAt)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2 justify-center">
                      <Link href={`/admin/leads/${lead.id}`}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                        onClick={() => handleDeleteClick(lead.id)}
                        title="Delete lead"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
