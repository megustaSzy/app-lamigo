"use client";

import type { AdminActivityLogItem } from "@/types/activity-log";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CalendarClock } from "lucide-react";

type Props = {
  logs: AdminActivityLogItem[];
};

export default function LogAktivitasTable({ logs }: Props) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="text-sm text-gray-500">Tidak ada aktivitas</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border bg-white">
      <Table>
        {/* ===== Header ===== */}
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-16 text-center font-semibold text-blue-900">
              No
            </TableHead>
            <TableHead className="w-72 text-center font-semibold text-blue-900">
              Tanggal
            </TableHead>
            <TableHead className="w-60 text-center font-semibold text-blue-900">
              Aktivitas
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* ===== Body ===== */}
        <TableBody>
          {logs.map((log, index) => (
            <TableRow
              key={log.id}
              className="hover:bg-gray-50/60 transition-colors"
            >
              {/* No */}
              <TableCell className="w-16 text-center font-medium">
                <Badge variant="outline">{index + 1}</Badge>
              </TableCell>

              {/* Tanggal */}
              <TableCell className="w-72 text-center">
                <div className="flex items-center justify-center gap-2 text-gray-600">
                  <CalendarClock className="h-4 w-4 text-gray-400" />
                  <span className="whitespace-nowrap">
                    {new Date(log.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
              </TableCell>

              {/* Aktivitas */}
              <TableCell className="w-60 text-center text-gray-800">
                <p className="leading-relaxed break-words">{log.description}</p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
