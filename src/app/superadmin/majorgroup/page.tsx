"use client";

import { useRouter } from "next/navigation";
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
import { Pencil } from "lucide-react";
import { majorData } from "@/app/superadmin/majorgroup/table-data";

export default function MajorGroupPage() {
  const router = useRouter();

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h2 className="text-2xl text-black font-semibold mb-4">Overall</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h3 className="text-purple-500 mb-2">Total Major Groups</h3>
            <p className="text-2xl text-black font-semibold">
              {majorData.length}
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl text-black font-semibold">Major Group</h2>
          <div className="flex gap-2">
            <Button variant="outline">Filters</Button>
            <Button className="bg-purple-500 hover:bg-purple-600">
              Add Major Group
            </Button>
          </div>
        </div>

        <div className="bg-white text-black rounded-lg shadow-sm">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="cursor-pointer">
              {majorData.map((major) => (
                <TableRow
                  key={major.id}
                  onClick={() =>
                    router.push(`/superadmin/majorgroup/${major.id}`)
                  }
                >
                  <TableCell>{major.name}</TableCell>
                  <TableCell>{major.code}</TableCell>
                  <TableCell>
                    <p className="text-gray-500 text-sm leading-relaxed max-w-[600px] overflow-hidden text-ellipsis whitespace-nowrap">
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
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Pencil className="h-4 w-4" />
                    </Button>
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
