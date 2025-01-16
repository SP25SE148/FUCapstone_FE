"use client";

import { Button } from "@/components/ui/button";
import { data } from "@/app/superadmin/campuses/table-data";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/campuses/component/campus-table-columns";

export default function CampusTable() {
  return (
    <div className="rounded-lg border shadow-sm w-full bg-background">
      <div className="justify-between items-center px-3 py-4 ">
        <div className="flex w-full justify-between">
          <Button className="bg-primary hover:bg-primary/90">Add Campus</Button>
        </div>
        <DataTable columns={columns} data={data} filter="email" />
      </div>
    </div>
  );
}
