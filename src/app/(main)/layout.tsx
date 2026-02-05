import { ReactNode } from "react";
import { AppNavbar } from "@/components/ui/Navbar";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <AppNavbar />
      <main className="flex-1 container mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
