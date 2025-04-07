"use client"

import { PopoverContent } from "@/components/ui/popover"

import { PopoverTrigger } from "@/components/ui/popover"

import { Popover } from "@/components/ui/popover"

import * as React from "react"
import { X, Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  type ColumnDef,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { DataTableFilter } from "./data-table-filter"
import { Badge } from "@/components/ui/badge"
import type { PassedTopicProp } from "@/contexts/student/student-topic-context"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  totalItems?: number
  currentPage?: number
  totalPages?: number
  onFilterChange?: (filters: Partial<PassedTopicProp>) => void
  filters?: Partial<PassedTopicProp>
  businessAreas?: { label: string; value: string }[]
  difficultyLevels?: { label: string; value: string }[]
  supervisors?: { label: string; value: string }[]
  isLoading?: boolean
}

export function DataTable<TData, TValue>({
  columns,
  data,
  totalItems = 0,
  currentPage = 1,
  totalPages = 1,
  onFilterChange,
  filters = {},
  businessAreas = [],
  difficultyLevels = [],
  supervisors = [],
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [sorting, setSorting] = React.useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    onRowSelectionChange: setRowSelection,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount: totalPages,
    state: {
      sorting,
      rowSelection,
      columnVisibility,
      pagination: {
        pageIndex: currentPage - 1,
        pageSize: 10,
      },
    },
  })

  const handleSearchChange = React.useCallback(
    (value: string) => {
      if (onFilterChange) {
        onFilterChange({ ...filters, searchTerm: value })
      }
    },
    [filters, onFilterChange],
  )

  const handlePageChange = React.useCallback(
    (page: number) => {
      if (onFilterChange) {
        onFilterChange({ ...filters, pageNumber: page.toString() })
      }
    },
    [filters, onFilterChange],
  )

  const handleFilterChange = React.useCallback(
    (key: keyof PassedTopicProp, value: string) => {
      if (onFilterChange) {
        onFilterChange({ ...filters, [key]: value })
      }
    },
    [filters, onFilterChange],
  )

  const activeFiltersCount = React.useMemo(() => {
    let count = 0
    if (filters.difficultyLevel) count++
    if (filters.businessAreaId) count++
    if (filters.mainSupervisorEmail) count++
    return count
  }, [filters])

  const clearFilters = React.useCallback(() => {
    if (onFilterChange) {
      const { searchTerm, pageNumber } = filters
      onFilterChange({
        searchTerm,
        pageNumber,
        difficultyLevel: "",
        businessAreaId: "",
        mainSupervisorEmail: "",
      })
    }
  }, [filters, onFilterChange])

  return (
    <div>
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-auto sm:flex-1">
            <Input
              placeholder="Search topics..."
              value={filters.searchTerm || ""}
              onChange={(event) => handleSearchChange(event.target.value)}
              className="w-full"
            />
            {filters.searchTerm && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0"
                onClick={() => handleSearchChange("")}
              >
                <X className="w-5 h-5" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DataTableViewOptions table={table} />
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 gap-1">
                  <Filter className="h-4 w-4" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-1 rounded-full px-1">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[220px] p-4">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Topics</h4>
                  <div className="space-y-2">
                    <DataTableFilter
                      title="Difficulty"
                      options={difficultyLevels}
                      value={filters.difficultyLevel || ""}
                      onChange={(value) => handleFilterChange("difficultyLevel", value)}
                    />
                    <DataTableFilter
                      title="Business Area"
                      options={businessAreas}
                      value={filters.businessAreaId || ""}
                      onChange={(value) => handleFilterChange("businessAreaId", value)}
                    />
                    <DataTableFilter
                      title="Supervisor"
                      options={supervisors}
                      value={filters.mainSupervisorEmail || ""}
                      onChange={(value) => handleFilterChange("mainSupervisorEmail", value)}
                    />
                  </div>
                  {activeFiltersCount > 0 && (
                    <Button variant="outline" className="w-full" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: columns.length }).map((_, cellIndex) => (
                    <TableCell key={cellIndex} className="h-16">
                      <div className="h-4 bg-muted animate-pulse rounded"></div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination
        table={table}
        totalItems={totalItems}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  )
}

