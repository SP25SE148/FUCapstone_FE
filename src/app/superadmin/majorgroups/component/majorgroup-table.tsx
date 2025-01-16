"use client";

import { Button } from "@/components/ui/button";
import { majorData } from "@/app/superadmin/majorgroups/table-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";

export default function MajorGroupTable() {
  const data = majorData;

  return (
    <div className="rounded-lg border shadow-sm w-full bg-background">
      <div className="justify-between items-center px-3 py-4 ">
        <div className="flex w-full justify-between">
          <Button className="bg-primary hover:bg-primary/90">
            Add Major Group
          </Button>
        </div>
        <DataTable columns={columns} data={data} filter="name"/>
      </div>
    </div>
  );
}
