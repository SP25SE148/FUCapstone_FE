"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/capstones/component/capstone-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCapstoneApi } from "@/hooks/use-capstone-api";

interface Capstone {
  id: string;
  majorId: string;
  name: string;
  minMember: number;
  maxMember: number;
  reviewCount: number;
  isDeleted: boolean;
  deletedAt: string | null;
}

export default function CapstoneTable() {
  const [data, setData] = useState<Capstone[]>([]);
  const { fetchCapstoneList } = useCapstoneApi();

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await fetchCapstoneList();
        setData(fetchedData);
      } catch (error) {
        console.error("Error fetching capstone data:", error);
      }
    }

    fetchData();
  }, [fetchCapstoneList]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Capstones
            </CardTitle>
            <CardDescription>List of FPT University Capstones</CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            Add Capstones
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
}
