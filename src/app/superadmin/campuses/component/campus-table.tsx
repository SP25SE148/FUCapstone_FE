"use client";

<<<<<<< HEAD
import { useCampus } from "@/contexts/superadmin/superadmin-campus-context";
=======
import { useCampus } from "@/contexts/superadmin/superadmin-campus-management";
>>>>>>> 7b63b41533e81202df5ffb7dd3054130119342fd
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
import { SkeletonLoader } from "@/components/layout/skeleton-loader";

export default function CampusTable() {
  const { campuses, loading } = useCampus();

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
        {loading ? (
          <SkeletonLoader />
        ) : (
          <DataTable columns={columns} data={campuses} />
        )}
      </CardContent>
    </Card>
  );
}