"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";
import { Pencil, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { data } from "@/app/superadmin/campuses/table-data";

export default function CampusTable() {
  return (
    <div className="rounded-lg border shadow-sm w-full bg-background">
      <div className="flex justify-between items-center px-3 py-4 ">
        <div className="relative w-4/5">
          <Input
            type="text"
            placeholder="Search campuses..."
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Filters</Button>
          <Button className="bg-primary hover:bg-primary/90">Add Campus</Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="font-semibold ">Name</TableHead>
            <TableHead className="font-semibold ">Code</TableHead>
            <TableHead className="font-semibold ">Address</TableHead>
            <TableHead className="font-semibold ">Phone</TableHead>
            <TableHead className="font-semibold ">Email</TableHead>
            <TableHead className="font-semibold ">Status</TableHead>
            <TableHead className="font-semibold">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((campus, index) => (
            <TableRow key={index} className=" transition-colors">
              <TableCell className="font-medium">{campus.name}</TableCell>
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
                <Button variant="ghost" size="sm" className="p-2">
                  <Pencil className="h-4 w-4" />
                  <span className="sr-only">Edit</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-6 py-4 border-t">
        {/* <p className="text-sm text-gray-700">
          Showing page <span className="font-medium">1</span> of{" "}
          <span className="font-medium">10</span>
        </p> */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
