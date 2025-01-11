"use client";

import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { majorData } from "@/app/superadmin/majorgroup/table-data";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MajorPage() {
  //   const router = useRouter();
  const params = useParams();
  const groupId = params.id;
  const group = majorData.find((g) => g.id === groupId);

  if (!group) {
    return <p className="text-center mt-8">Major Group not found</p>;
  }

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <Link
          href="/superadmin/majorgroup"
          className="inline-flex items-center text-purple-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
        <h2 className="text-2xl font-semibold mb-4">
          {group.name} - {group.code}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed max-w-full">
          {group.description}
        </p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Majors</h2>
          <Button className="bg-purple-500 hover:bg-purple-600">
            Add Major
          </Button>
        </div>

        <div className="rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {group.majors.map((major) => (
                <TableRow key={major.id}>
                  <TableCell>{major.name}</TableCell>
                  <TableCell>{major.code}</TableCell>
                  <TableCell>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[500px] overflow-hidden text-ellipsis whitespace-nowrap">
                      {major.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        major.status === "Active"
                          ? "bg-green-100 text-green-600 hover:bg-green-100"
                          : "bg-red-100 text-red-600 hover:bg-red-100"
                      }`}
                    >
                      {major.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
