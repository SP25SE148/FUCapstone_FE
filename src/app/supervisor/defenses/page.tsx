"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { columns } from "./components/columns"
import { DataTable } from "@/components/ui/data-table";
import { defenseData } from "@/app/manager/defenses/data";

export default function DefensesPage() {
  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <CardTitle className="font-semibold tracking-tight text-xl text-primary">
          Defenses
        </CardTitle>
        <CardDescription>Defenses schedule and information.</CardDescription>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={defenseData} />
      </CardContent>
    </Card>
  );
}
