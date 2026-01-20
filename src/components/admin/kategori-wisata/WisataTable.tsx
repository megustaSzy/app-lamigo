"use client";

import { WisataTableProps } from "@/types/admin/kategori-wisata";
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
import { Pencil, Trash2, Loader2, MapPin } from "lucide-react";

export default function WisataTable({
  cats,
  deletingId,
  onEdit,
  onDelete,
}: WisataTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-16 text-center font-semibold">No</TableHead>
            <TableHead className="text-center font-semibold">
              Nama Kategori
            </TableHead>
            <TableHead className="w-40 text-center font-semibold">
              Jumlah
            </TableHead>
            <TableHead className="w-40 text-center font-semibold">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {cats.map((c, i) => (
            <TableRow
              key={c.id}
              className="hover:bg-gray-50/50 transition-colors"
            >
              <TableCell className="text-center">
                <Badge variant="outline" className="font-normal">
                  {i + 1}
                </Badge>
              </TableCell>

              <TableCell className="text-center font-medium text-gray-900">
                {c.name}
              </TableCell>

              <TableCell className="text-center">
                <Badge variant="secondary" className="gap-1">
                  <MapPin className="h-3 w-3" />
                  {c.destinations?.length ?? 0} destinasi
                </Badge>
              </TableCell>

              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => onEdit(c)}
                    size="sm"
                    variant="outline"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 hover:border-yellow-600 rounded-full h-8 px-3"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </Button>

                  <Button
                    onClick={() => onDelete(c.id)}
                    disabled={deletingId === c.id}
                    size="sm"
                    variant="outline"
                    className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 rounded-full h-8 px-3 disabled:opacity-70"
                  >
                    {deletingId === c.id ? (
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
