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
import { semesterData } from "@/app/superadmin/semesters/table-data";
import { Input } from "@/components/ui/input";

export default function SemesterTable() {
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
          <Button className="bg-primary hover:bg-primary/90">
            Add Semester
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Start Date</TableHead>
            <TableHead>End Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {semesterData.map((semester, index) => (
            <TableRow key={index}>
              <TableCell>{semester.name}</TableCell>
              <TableCell>{semester.code}</TableCell>
              <TableCell>{semester.startDate}</TableCell>
              <TableCell>{semester.endDate}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    semester.status === "Processing"
                      ? "bg-green-100 text-green-600 hover:bg-green-100"
                      : "bg-red-100 text-red-600 hover:bg-red-100"
                  }`}
                >
                  {semester.status}
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
