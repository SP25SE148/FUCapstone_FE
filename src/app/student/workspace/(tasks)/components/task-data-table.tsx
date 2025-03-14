"use client"

import * as React from "react"
import { X } from "lucide-react"

import { Input } from "@/components/ui/input"
import { DataTablePagination } from "@/components/ui/data-table-pagination"
import { DataTableViewOptions } from "@/components/ui/data-table-view-options"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, } from "@/components/ui/table"
import { ColumnDef, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[],
}

export function TaskDataTable<TData, TValue>({
    columns,
    data
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = React.useState({})
    const [globalFilter, setGlobalFilter] = React.useState("")
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        globalFilterFn: "includesString",
        getCoreRowModel: getCoreRowModel(),
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        getPaginationRowModel: getPaginationRowModel(),
        state: {
            sorting,
            globalFilter,
            rowSelection,
            columnVisibility,
        },
    })

    return (
        <div>
            <div className="flex items-center py-4">
                <div className="relative basis-1/3">
                    <Input
                        placeholder="Search ..."
                        value={globalFilter ?? ""}
                        onChange={(event) => table.setGlobalFilter(event.target.value)}
                        className="w-full"
                    />
                    {globalFilter !== "" && <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0"
                        onClick={() => setGlobalFilter("")}
                    >
                        <X className="w-5 h-5" />
                    </Button>}
                </div>
                <DataTableViewOptions table={table} />
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            {/* <DataTablePagination table={table} /> */}
        </div >
    )
}
