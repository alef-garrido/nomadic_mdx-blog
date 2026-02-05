"use client";

import { ReactNode } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button, Navbar, NavbarBrand, NavbarContent } from "@heroui/react";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import ToastContainer from "@/components/ui/ToastContainer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function AdminLayout({ children }: { children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
        <ToastContainer />
      {/* Navigation Bar */}
      <Navbar className="bg-slate-800/50 border-b border-slate-700">
        <NavbarBrand>
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Settings className="w-5 h-5 text-blue-500" />
            </div>
            <Link href="/admin" className="font-bold text-lg">
              Admin Dashboard
            </Link>
          </div>
        </NavbarBrand>

        <NavbarContent justify="end">
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              {session?.user?.email}
            </span>
            <Button
              isIconOnly
              variant="light"
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-500"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </NavbarContent>
      </Navbar>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-700 min-h-screen bg-slate-800/30">
          <nav className="p-6 space-y-3">
            <Link href="/admin">
              <div className="px-4 py-3 rounded-lg bg-blue-500/10 border border-blue-500/30 text-blue-400 font-medium">
                Dashboard
              </div>
            </Link>
            <Link href="/admin/leads">
              <div className="px-4 py-3 rounded-lg hover:bg-slate-700/50 text-slate-300 font-medium transition">
                Leads Management
              </div>
            </Link>
            <Link href="/admin/posts">
              <div className="px-4 py-3 rounded-lg hover:bg-slate-700/50 text-slate-300 font-medium transition">
                Posts (Coming Soon)
              </div>
            </Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">{children}</main>
      </div>
      </div>
    </ErrorBoundary>
  );
}
