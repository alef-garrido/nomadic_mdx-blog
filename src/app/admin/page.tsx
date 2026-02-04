"use client";

import { useEffect, useState } from "react";
import { Card, Skeleton } from "@heroui/react";
import { Users, FileText, Activity } from "lucide-react";
import Link from "next/link";
import { toast } from "@/lib/toast";
import { StatsSkeleton } from "@/components/LoadingSkeleton";

interface Stats {
  totalLeads: number;
  newLeads: number;
  contactedLeads: number;
}

export default function AdminPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats");
        if (response.ok) {
          const data = await response.json();
          setStats(data);
          toast.success("Dashboard loaded successfully");
        } else if (response.status === 401) {
          toast.error("Session expired. Please login again.");
        } else {
          toast.error("Failed to load statistics");
        }
      } catch (error) {
        console.error("Failed to fetch stats:", error);
        toast.error("Error loading statistics. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const StatCard = ({
    icon: Icon,
    title,
    value,
    color,
    href,
  }: {
    icon: typeof Users;
    title: string;
    value: number;
    color: string;
    href: string;
  }) => (
    <Link href={href}>
      <Card className="bg-slate-800 border border-slate-700 hover:border-slate-600 transition cursor-pointer h-full">
        <div className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-400 text-sm font-medium">{title}</p>
              {isLoading ? (
                <Skeleton className="w-12 h-8 rounded mt-2" />
              ) : (
                <p className="text-3xl font-bold text-white mt-2">{value}</p>
              )}
            </div>
            <div className={`p-3 rounded-lg ${color}`}>
              <Icon className="w-6 h-6" />
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-slate-400">
          Welcome back! Here's an overview of your leads.
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Users}
            title="Total Leads"
            value={stats?.totalLeads || 0}
            color="bg-blue-500/10"
            href="/admin/leads"
          />
          <StatCard
            icon={FileText}
            title="New Leads"
            value={stats?.newLeads || 0}
            color="bg-green-500/10"
            href="/admin/leads?status=new"
          />
          <StatCard
            icon={Activity}
            title="Contacted"
            value={stats?.contactedLeads || 0}
            color="bg-purple-500/10"
            href="/admin/leads?status=contacted"
          />
        </div>
      )}

      {/* Quick Actions */}
      <Card className="bg-slate-800 border border-slate-700 p-6">
        <h2 className="text-lg font-bold text-white mb-4">Quick Actions</h2>
        <div className="space-y-2 text-slate-300">
          <Link
            href="/admin/leads"
            className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            → View all leads
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition"
          >
            → Back to website
          </Link>
        </div>
      </Card>
    </div>
  );
}
