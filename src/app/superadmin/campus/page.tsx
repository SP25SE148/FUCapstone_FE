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
import { data } from "@/app/superadmin/campus/table-data";

export default function CampusPage() {
  return (
    <div className="p-8 w-full">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Overall</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div>
            <h3 className="text-purple-500 mb-2">Total Campuses</h3>
            <p className="text-2xl font-semibold">{data.length}</p>
          </div>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Campuses</h2>
          <div className="flex gap-2">
            <Button variant="outline">Filters</Button>
            <Button className="bg-purple-500 hover:bg-purple-600">
              Add Campus
            </Button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm">
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
