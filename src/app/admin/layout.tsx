"use client";

import { ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import { LogOut, Settings, LayoutDashboard, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ToastContainer from "@/components/ui/ToastContainer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Leads", href: "/admin/leads", icon: Users },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex flex-col">
        <ToastContainer />

        {/* Header */}
        <header className="sticky top-0 z-40 backdrop-blur-xl bg-slate-900/50 border-b border-slate-700/50">
          <div className="flex items-center justify-between px-6 lg:px-8 py-4">
            {/* Logo */}
            <Link href="/admin" className="flex items-center gap-3 group">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Admin
                </h1>
                <p className="text-xs text-slate-400">Dashboard</p>
              </div>
            </Link>

            {/* User Info & Logout */}
            <div className="flex items-center gap-6">
              {session?.user?.email && (
                <div className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm text-slate-300 font-medium">
                    {session.user.email}
                  </span>
                </div>
              )}
              <Button
                isIconOnly
                variant="flat"
                onClick={handleLogout}
                className="bg-red-500/10 text-red-500 hover:bg-red-500/20"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <aside className="hidden md:flex w-64 flex-col border-r border-slate-700/50 bg-slate-900/30 backdrop-blur-sm overflow-y-auto">
            <nav className="flex-1 space-y-2 p-6">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                        active
                          ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border border-blue-500/30"
                          : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-slate-700/50">
              <Link href="/">
                <p className="text-xs text-slate-400 hover:text-slate-300 transition">
                  ← Back to Website
                </p>
              </Link>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 overflow-y-auto">
            <div className="p-6 lg:p-8 max-w-7xl">{children}</div>
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}
