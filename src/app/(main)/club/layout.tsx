import { ReactNode } from "react";

export default function ClubLayout({ children }: { children: ReactNode }) {
  return (
    <main className="flex-1 w-full">
      {children}
    </main>
  );
}
