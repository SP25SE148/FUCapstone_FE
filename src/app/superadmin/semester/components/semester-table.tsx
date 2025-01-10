'use client'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { semesterData } from '@/app/superadmin/semester/table-data'

export default function SemesterTable() {
  return (
    <div className="bg-white text-black rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4 px-4 py-2">
        {/* <h2 className="text-2xl text-black font-semibold">Semesters</h2> */}
        <div className="flex gap-2 w-full justify-end">
          <Button variant="outline">Filters</Button>
          <Button className="bg-purple-500 hover:bg-purple-600">
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
                    semester.status === 'Processing'
                      ? 'bg-green-100 text-green-600 hover:bg-green-100'
                      : 'bg-red-100 text-red-600 hover:bg-red-100'
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
    </div>
  )
}