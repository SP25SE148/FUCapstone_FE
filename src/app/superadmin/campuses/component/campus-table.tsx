"use client";

import { useState, useEffect } from 'react';
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
import { useCampusApi } from '@/hooks/use-campus-api';

interface Campus {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  isDeleted: boolean;
  createdDate: string;
  updatedDate: string | null;
  createdBy: string;
  updatedBy: string | null;
  deletedAt: string | null;
}

export default function CampusTable() {
  const { fetchCampusList } = useCampusApi();
  const [campusData, setCampusData] = useState<Campus[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchCampusList();
        setCampusData(data);
      } catch (err) {
        console.error('Error fetching campus data:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading campus data...</div>;
  }

  if (error) {
    return (
      <strong>
        Error loading campus data: {error.message}
      </strong>
    );
  }

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
        <DataTable columns={columns} data={campusData} />
      </CardContent>
    </Card>
  );
}