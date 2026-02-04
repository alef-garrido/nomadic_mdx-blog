"use client";

import { Card, Skeleton } from "@heroui/react";

interface LoadingSkeletonProps {
  rows?: number;
  columns?: number;
}

export function TableSkeleton({ rows = 5, columns = 5 }: LoadingSkeletonProps) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700">
              {Array.from({ length: columns }).map((_, i) => (
                <th key={i} className="px-6 py-4 text-left">
                  <Skeleton className="h-4 w-20 rounded" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }).map((_, rowIdx) => (
              <tr key={rowIdx} className="border-b border-slate-700 hover:bg-slate-700/30">
                {Array.from({ length: columns }).map((_, colIdx) => (
                  <td key={colIdx} className="px-6 py-4">
                    <Skeleton className="h-4 w-full rounded" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}

export function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="bg-slate-800 border-slate-700 p-6">
          <div className="space-y-4">
            <Skeleton className="h-8 w-32 rounded" />
            <Skeleton className="h-10 w-16 rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <Card className="bg-slate-800 border-slate-700 p-6 space-y-4">
      <Skeleton className="h-10 w-48 rounded" />
      <Skeleton className="h-40 w-full rounded" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full rounded" />
        <Skeleton className="h-4 w-5/6 rounded" />
      </div>
    </Card>
  );
}
