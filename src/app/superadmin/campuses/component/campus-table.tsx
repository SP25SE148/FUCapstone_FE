"use client";

import { useCampus } from "@/contexts/campus-context";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/campuses/component/campus-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import AddCampus from "./add-campus";

export default function CampusTable() {
  const { campuses } = useCampus();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Campuses
            </CardTitle>
            <CardDescription>List of FPT University campuses</CardDescription>
          </div>
          <AddCampus />
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={campuses} />
      </CardContent>
    </Card>
  );
}