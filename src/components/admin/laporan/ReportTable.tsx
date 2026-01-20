"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ReportTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: any[][];
}) {
  return (
    <div className="overflow-x-auto border rounded-xl">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            {headers.map((h) => (
              <TableHead
                key={h}
                className="text-center align-middle font-semibold text-gray-700"
              >
                {h}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={headers.length}
                className="text-center py-8 text-gray-500"
              >
                Tidak ada data
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row, i) => (
              <TableRow key={i} className="hover:bg-gray-50">
                {row.map((cell, j) => (
                  <TableCell key={j} className="text-center align-middle">
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
