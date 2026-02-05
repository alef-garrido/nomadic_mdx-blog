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
import { Trash2, Eye, Search } from "lucide-react";
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
        toast.success("Leads loaded successfully");
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

  return (
    <div className="space-y-6">
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

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Leads Management</h1>
        <p className="text-slate-400">
          Total leads: {leads.length} | Displaying: {filteredLeads.length}
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-slate-800 border border-slate-700 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="Search by email or name..."
            startContent={<Search className="w-4 h-4" />}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-slate-700"
          />
          <Select
            label="Filter by status"
            selectedKeys={[filterStatus]}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-slate-700"
          >
            <SelectItem key="all">
              All Statuses
            </SelectItem>
            <SelectItem key="new">
              New
            </SelectItem>
            <SelectItem key="contacted">
              Contacted
            </SelectItem>
            <SelectItem key="converted">
              Converted
            </SelectItem>
          </Select>
        </div>
      </Card>

      {/* Table */}
      {isLoading ? (
        <TableSkeleton rows={5} columns={6} />
      ) : (
        <Card className="bg-slate-800 border border-slate-700">
          <Table
            aria-label="Leads table"
            classNames={{
              base: "bg-slate-800",
              table: "bg-slate-800",
              th: "bg-slate-700/50 text-slate-200",
              tr: "hover:bg-slate-700/50 transition",
              td: "text-slate-300",
            }}
          >
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Email</TableColumn>
              <TableColumn>Company</TableColumn>
              <TableColumn>Status</TableColumn>
              <TableColumn>Date</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody
              items={filteredLeads}
              emptyContent={
                <div className="p-4 text-center text-slate-400">
                  No leads found
                </div>
              }
            >
              {(lead) => (
                <TableRow key={lead.id}>
                  <TableCell className="font-medium">{lead.name}</TableCell>
                  <TableCell>{lead.email}</TableCell>
                  <TableCell>{lead.company || "-"}</TableCell>
                  <TableCell>
                    <Chip
                      color={getStatusColor(lead.status)}
                      size="sm"
                      variant="flat"
                    >
                      {lead.status}
                    </Chip>
                  </TableCell>
                  <TableCell>{formatDate(lead.createdAt)}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Link href={`/admin/leads/${lead.id}`}>
                        <Button
                          isIconOnly
                          size="sm"
                          variant="light"
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        isIconOnly
                        size="sm"
                        variant="light"
                        className="text-red-400 hover:text-red-300"
                        onClick={() => handleDeleteClick(lead.id)}
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
