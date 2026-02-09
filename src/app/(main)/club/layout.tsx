import { ReactNode } from "react";
import { FloatingClubCTA } from "@/components/ui/FloatingClubCTA";

export default function ClubLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main className="flex-1 w-full">
        {children}
      </main>
      <FloatingClubCTA />
    </>
  );
}
