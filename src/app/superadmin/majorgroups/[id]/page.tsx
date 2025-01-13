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
import { majorData } from "@/app/superadmin/majorgroups/table-data";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function MajorPage() {
  const params = useParams();
  const groupId = params.id;
  const group = majorData.find((g) => g.id === groupId);

  if (!group) {
    return <p className="text-center mt-8">Major Group not found</p>;
  }

  return (
    <div>
      <div className="mb-8">
        <Link
          href="/superadmin/majorgroups"
          className="inline-flex items-center text-purple-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
        <div className="p-4 rounded-lg bg-background">
          <h2 className="text-2xl font-semibold mb-4">
            {group.name} - {group.code}
          </h2>
          <p className="text-gray-500 text-sm leading-relaxed max-w-full">
            {group.description}
          </p>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4 mt-2">
          <h2 className="text-2xl font-semibold">Majors</h2>
        </div>

        <div className="rounded-lg border shadow-sm w-full bg-background">
          <div className="flex justify-between items-center px-3 py-4 ">
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
                Add Major Group
              </Button>
            </div>
          </div>
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
      </div>
    </div>
  );
}
