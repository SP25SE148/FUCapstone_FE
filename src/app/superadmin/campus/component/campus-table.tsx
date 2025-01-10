"use client";

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
import { Button } from "@/components/ui/button";
import { data } from "@/app/superadmin/campus/table-data";

export default function CampusTable() {
  return (
    <div className="bg-white text-black rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4 px-4 py-2">
        <div className="w-full flex gap-2 justify-end">
          <Button variant="outline">Filters</Button>
          <Button className="bg-primary hover:bg-purple-700">Add Campus</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((campus, index) => (
            <TableRow key={index}>
              <TableCell>{campus.name}</TableCell>
              <TableCell>{campus.code}</TableCell>
              <TableCell>{campus.address}</TableCell>
              <TableCell>{campus.phone}</TableCell>
              <TableCell>{campus.email}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    campus.status === "Active"
                      ? "bg-green-100 text-green-600 hover:bg-green-100"
                      : "bg-red-100 text-red-600 hover:bg-red-100"
                  }`}
                >
                  {campus.status}
                </Badge>
              </TableCell>
              <TableCell>
                <button className="p-2 bg-transparent border-none outline-none cursor-pointer">
                  <Pencil className="h-4 w-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
