"use client";
import { useRouter } from "next/navigation";
import { Pencil, Search } from "lucide-react";

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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CapstoneData } from "@/app/superadmin/capstones/table-data";

export default function CapstoneTable() {
  const router = useRouter();

  return (
    <div className="rounded-lg border shadow-sm w-full">
      <div className="flex justify-between items-center mb-6 px-3 py-4 ">
        <div className="relative w-4/5">
          <Input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 w-full"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 " />
        </div>
        <div className="flex gap-3">
          <Button variant="outline">Filters</Button>
          <Button className="bg-primary hover:bg-primary/90">
            Add Capstone
          </Button>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Code</TableHead>
            <TableHead>Min Member</TableHead>
            <TableHead>Max Member</TableHead>
            <TableHead>Review Count</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="cursor-pointer">
          {CapstoneData.map((capstone) => (
            <TableRow
              key={capstone.id}
              onClick={() =>
                router.push(`/superadmin/capstones/${capstone.id}`)
              }
            >
              <TableCell>{capstone.capstoneName}</TableCell>
              <TableCell>{capstone.capstoneCode}</TableCell>
              <TableCell>{capstone.minMember}</TableCell>
              <TableCell>{capstone.maxMember}</TableCell>
              <TableCell>{capstone.reviewsCount}</TableCell>
              <TableCell>
                <Badge
                  className={`${
                    capstone.status === "Active"
                      ? "bg-green-100 text-green-600 hover:bg-green-100"
                      : "bg-red-100 text-red-600 hover:bg-red-100"
                  }`}
                >
                  {capstone.status}
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
      <div className="flex items-center justify-between px-6 py-4 border-t">
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
