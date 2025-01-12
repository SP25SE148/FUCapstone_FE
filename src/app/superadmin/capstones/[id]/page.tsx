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
import { CapstoneData } from "@/app/superadmin/capstones/table-data";
import Link from "next/link";
import { ArrowLeft, Download, Pencil, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function CapstoneDetailPage() {
  const params = useParams();
  const capstoneId = params.id;
  const capstone = CapstoneData.find((g) => g.id === capstoneId);

  if (!capstone) {
    return <p className="text-center mt-8">Capstone not found</p>;
  }

  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <Link
          href="/superadmin/capstones"
          className="inline-flex items-center text-purple-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Link>
        <div className="p-4 bg-accent rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
            {capstone.capstoneName} - {capstone.capstoneCode}
          </h2>
          <div className="flex text-gray-500 text-l leading-relaxed max-w-full">
            <p className="mr-2">Member(Min/Max): </p><p>{capstone.minMember}/{capstone.maxMember}</p>
          </div>
          <div className="flex text-gray-500 text-l leading-relaxed max-w-full">
            <p className="mr-2">Review Count: </p><p>{capstone.reviewsCount}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4 mt-2">
          <h2 className="text-2xl font-semibold">Templates</h2>
        </div>

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
                Add Template
              </Button>
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>Date Modified </TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {capstone.templateDocument.map((template) => (
                <TableRow key={template.id}>
                  <TableCell>{template.name}</TableCell>
                  <TableCell>{template.createDate}</TableCell>
                  <TableCell>{template.updatedDate}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <Link href={template.url}>
                        <Download className="h-4 w-4" />
                      </Link>
                    </Button>
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
      </div>
    </div>
  );
}
