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
import { CalendarClock, Activity } from "lucide-react";

type Props = {
  logs: AdminActivityLogItem[];
};

export default function LogAktivitasTable({ logs }: Props) {
  if (logs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <Activity className="h-7 w-7 text-blue-300 mb-2" />
        <p className="text-sm font-medium text-gray-900">Tidak ada aktivitas</p>
        <p className="text-xs text-gray-500">
          Belum ada log aktivitas yang tercatat
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <Table className="text-sm">
        {/* Header */}
        <TableHeader>
          <TableRow className="bg-blue-50 border-b border-blue-100">
            <TableHead className="w-12 text-center text-sm font-semibold text-blue-900">
              No
            </TableHead>
            <TableHead className="w-120 text-center text-sm font-semibold text-blue-900">
              Waktu
            </TableHead>
            <TableHead className="text-sm font-semibold text-blue-900">
              Deskripsi Aktivitas
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {logs.map((log, index) => (
            <TableRow
              key={log.id}
              className="hover:bg-blue-50/40 border-b last:border-0"
            >
              {/* No */}
              <TableCell className="py-2 text-center">
                <Badge variant="outline" className="px-2 py-0.5 text-sm">
                  {index + 1}
                </Badge>
              </TableCell>

              {/* Waktu */}
              <TableCell className="py-2">
                <div className="flex items-center justify-center gap-2">
                  <CalendarClock className="h-4 w-4 text-blue-600" />
                  <div className="text-left leading-tight">
                    <p className="text-sm font-medium text-gray-900">
                      {new Date(log.createdAt).toLocaleDateString("id-ID", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(log.createdAt).toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </TableCell>

              {/* Deskripsi */}
              <TableCell className="py-2">
                <p className="text-sm text-gray-800 max-w-lg break-words leading-relaxed">
                  {log.description}
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
