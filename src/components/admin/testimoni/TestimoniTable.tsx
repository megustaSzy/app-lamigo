"use client";

import { TestimoniItem } from "@/types/admin/testimoni";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Pencil,
  CheckCircle,
  XCircle,
  Mail,
  Briefcase,
  MessageSquare,
  Star,
  Trash2,
  Loader2,
} from "lucide-react";

type Props = {
  items: TestimoniItem[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
  onEdit: (t: TestimoniItem) => void;
  onDelete: (id: number) => void;
};

export default function TestimoniTable({
  items,
  onApprove,
  onReject,
  onEdit,
  onDelete,
}: Props) {
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const getStatusBadge = (status: string) => {
    const statusMap = {
      PENDING: {
        variant: "secondary" as const,
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800",
      },
      APPROVED: {
        variant: "secondary" as const,
        label: "Disetujui",
        className: "bg-green-100 text-green-800",
      },
      REJECTED: {
        variant: "secondary" as const,
        label: "Ditolak",
        className: "bg-red-100 text-red-800",
      },
    };

    const config =
      statusMap[status as keyof typeof statusMap] || statusMap.PENDING;

    return (
      <Badge variant={config.variant} className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="rounded-lg border border-gray-200 overflow-hidden bg-white shadow-sm">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50 border-b border-gray-200">
              <TableHead className="w-[60px] text-center font-semibold text-gray-700">
                No
              </TableHead>
              <TableHead className="min-w-[150px] text-left font-semibold text-gray-700">
                Nama
              </TableHead>
              <TableHead className="min-w-[200px] text-left font-semibold text-gray-700">
                Email
              </TableHead>
              <TableHead className="min-w-[150px] text-left font-semibold text-gray-700">
                Profesi
              </TableHead>
              <TableHead className="min-w-[250px] text-left font-semibold text-gray-700">
                Komentar
              </TableHead>
              <TableHead className="w-[100px] text-center font-semibold text-gray-700">
                Rating
              </TableHead>
              <TableHead className="w-[120px] text-center font-semibold text-gray-700">
                Status
              </TableHead>
              <TableHead className="w-[140px] text-center font-semibold text-gray-700">
                Approve/Reject
              </TableHead>
              <TableHead className="w-[180px] text-center font-semibold text-gray-700">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="h-32 text-center text-gray-500"
                >
                  Tidak ada data testimoni
                </TableCell>
              </TableRow>
            ) : (
              items.map((t, i) => (
                <TableRow
                  key={t.id}
                  className="hover:bg-gray-50/50 transition-colors border-b border-gray-100"
                >
                  <TableCell className="text-center align-top py-4">
                    <Badge
                      variant="outline"
                      className="font-normal text-gray-700"
                    >
                      {i + 1}
                    </Badge>
                  </TableCell>

                  <TableCell className="font-medium text-gray-900 align-top py-4">
                    <div className="min-w-max">
                      {t.name || <span className="text-gray-400">-</span>}
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-600 align-top py-4">
                    {t.email ? (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span
                          className="truncate max-w-[180px]"
                          title={t.email}
                        >
                          {t.email}
                        </span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>

                  <TableCell className="text-gray-600 align-top py-4">
                    {t.profession ? (
                      <div className="flex items-center gap-2">
                        <Briefcase className="h-4 w-4 text-gray-400 flex-shrink-0" />
                        <span className="line-clamp-2">{t.profession}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>

                  <TableCell className="text-gray-700 align-top py-4">
                    <div className="flex items-start gap-2 max-w-[250px]">
                      <MessageSquare className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <p className="whitespace-pre-wrap break-all leading-relaxed text-sm">
                        {t.comment}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="text-center align-top py-4">
                    {t.rating ? (
                      <Badge
                        variant="secondary"
                        className="gap-1 bg-amber-50 text-amber-700 font-medium"
                      >
                        <Star className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
                        {t.rating}
                      </Badge>
                    ) : (
                      <span className="text-gray-400">-</span>
                    )}
                  </TableCell>

                  <TableCell className="text-center align-top py-4">
                    {getStatusBadge(t.approvalStatus)}
                  </TableCell>

                  <TableCell className="text-center align-top py-4">
                    <div className="flex justify-center gap-2">
                      {t.approvalStatus === "PENDING" ? (
                        <>
                          <Button
                            onClick={() => onApprove(t.id)}
                            size="sm"
                            variant="outline"
                            className="bg-green-600 hover:bg-green-700 text-white border-green-600 hover:border-green-700 rounded-full h-8 px-3 shadow-sm"
                          >
                            <CheckCircle className="h-3.5 w-3.5 mr-1.5" />
                            Approve
                          </Button>

                          <Button
                            onClick={() => onReject(t.id)}
                            size="sm"
                            variant="outline"
                            className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 rounded-full h-8 px-3 shadow-sm"
                          >
                            <XCircle className="h-3.5 w-3.5 mr-1.5" />
                            Reject
                          </Button>
                        </>
                      ) : (
                        <span className="text-gray-400 text-sm">-</span>
                      )}
                    </div>
                  </TableCell>

                  <TableCell className="align-top py-4">
                    <div className="flex justify-center gap-2">
                      <Button
                        onClick={() => onEdit(t)}
                        size="sm"
                        variant="outline"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 hover:border-yellow-600 rounded-full h-8 px-3 shadow-sm"
                      >
                        <Pencil className="h-3.5 w-3.5 mr-1.5" />
                        Edit
                      </Button>

                      <Button
                        onClick={() => onDelete(t.id)}
                        disabled={deletingId === t.id}
                        size="sm"
                        variant="outline"
                        className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 rounded-full h-8 px-3 shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {deletingId === t.id ? (
                          <>
                            <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />
                            Menghapus...
                          </>
                        ) : (
                          <>
                            <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                            Hapus
                          </>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
