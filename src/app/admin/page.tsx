"use client";

import { useEffect, useState } from "react";
import { Card } from "@heroui/react";
import { Users, TrendingUp, UserCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "@/lib/toast";
import { StatsSkeleton } from "@/components/ui/LoadingSkeleton";

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
    label,
    value,
    trend,
    href,
  }: {
    icon: typeof Users;
    label: string;
    value: number;
    trend?: string;
    href: string;
  }) => (
    <Link href={href}>
      <Card className="group relative overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50 hover:border-slate-600/50 transition-all hover:shadow-lg hover:shadow-blue-500/10 cursor-pointer h-full">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/5 group-hover:to-purple-500/5 transition-all" />

        <div className="relative p-6 flex flex-col h-full">
          {/* Header with icon */}
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-1">
              <p className="text-slate-400 text-sm font-medium">{label}</p>
              {!isLoading && (
                <p className="text-4xl font-bold text-white">{value}</p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-all">
              <Icon className="w-6 h-6 text-blue-400" />
            </div>
          </div>

          {/* Loading state */}
          {isLoading && <div className="h-10 bg-slate-700/50 rounded-lg animate-pulse" />}

          {/* Trend indicator */}
          {!isLoading && trend && (
            <div className="mt-auto pt-4 border-t border-slate-700/50">
              <p className="text-xs text-slate-400">{trend}</p>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-4xl font-bold text-white mb-3">Dashboard</h1>
        <p className="text-slate-400 text-lg">
          Overview of your leads and key metrics
        </p>
      </div>

      {/* Stats Grid */}
      {isLoading ? (
        <StatsSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            icon={Users}
            label="Total Leads"
            value={stats?.totalLeads || 0}
            trend="All leads in your system"
            href="/admin/leads"
          />
          <StatCard
            icon={TrendingUp}
            label="New Leads"
            value={stats?.newLeads || 0}
            trend="Awaiting contact"
            href="/admin/leads?status=new"
          />
          <StatCard
            icon={UserCheck}
            label="Contacted"
            value={stats?.contactedLeads || 0}
            trend="In progress or converted"
            href="/admin/leads?status=contacted"
          />
        </div>
      )}

      {/* Quick Links */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/50">
        <div className="p-8">
          <h2 className="text-xl font-bold text-white mb-6">Quick Navigation</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/admin/leads">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all group">
                <Users className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
                <div>
                  <p className="font-medium text-white group-hover:text-blue-300 transition">
                    View All Leads
                  </p>
                  <p className="text-xs text-slate-400">Manage and track your leads</p>
                </div>
              </div>
            </Link>
            <Link href="/">
              <div className="flex items-center gap-3 p-4 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-slate-600/50 transition-all group">
                <TrendingUp className="w-5 h-5 text-purple-400 group-hover:text-purple-300" />
                <div>
                  <p className="font-medium text-white group-hover:text-purple-300 transition">
                    Back to Website
                  </p>
                  <p className="text-xs text-slate-400">Return to main site</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
