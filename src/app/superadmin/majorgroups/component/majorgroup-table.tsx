"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "@/app/superadmin/majorgroups/component/majorgroup-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useApi } from "@/hooks/use-api";
import { useAuth } from '@/contexts/auth-context';

export default function MajorGroupTable() {
  const { callApi } = useApi();
  const [majorGroupData, setMajorGroupData] = useState([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);
  const {token} = useAuth();

  useEffect(() => {
    const fetchMajorGroupList = async () => {
      setLoading(true);
      try {
        const data = await callApi('fuc/AcademicManagement/majorgroup', { method: 'GET' });
        setMajorGroupData(data);
      } catch (err) {
        console.error('Error fetching major group data:', err);
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };
    console.log(token);

    fetchMajorGroupList();
  }, []);

  if (loading) {
    return <div>Loading major group data...</div>;
  }

  if (error) {
    return (
      <strong>
        Error loading major group data: {error.message}
      </strong>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Major Groups
            </CardTitle>
            <CardDescription>List of FPT University Major Groups</CardDescription>
          </div>
          <Button className="bg-primary hover:bg-primary/90">Add Major Groups</Button>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={majorGroupData} />
      </CardContent>
    </Card>
  );
}