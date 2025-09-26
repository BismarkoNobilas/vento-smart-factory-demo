"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function DashboardCard({
  title,
  value,
  subtitle,
  chart,
  status,
}) {
  return (
    <Card className="p-4">
      <CardContent>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold">{title}</h2>
          {status && <span className="text-sm">{status}</span>}
        </div>
        <p className="text-2xl font-bold mt-2">{value}</p>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
        {chart && <div className="h-24 mt-2">{chart}</div>}
      </CardContent>
    </Card>
  );
}
