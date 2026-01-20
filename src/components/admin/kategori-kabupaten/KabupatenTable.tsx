/* eslint-disable @next/next/no-img-element */
"use client";

import { KabupatenTableProps } from "@/types/admin/kategori-kabupaten";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil, Trash2, Loader2, ImageIcon } from "lucide-react";

export default function KabupatenTable({
  regions,
  page,
  perPage,
  deletingId,
  onEdit,
  onDelete,
}: KabupatenTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-16 text-center font-semibold">No</TableHead>
            <TableHead className="w-24 text-center font-semibold">
              Foto
            </TableHead>
            <TableHead className="text-center font-semibold">
              Nama Kabupaten
            </TableHead>
            <TableHead className="w-40 text-center font-semibold">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {regions.map((r, i) => (
            <TableRow
              key={r.id}
              className="hover:bg-gray-50/50 transition-colors"
            >
              <TableCell className="text-center">
                <Badge variant="outline" className="font-normal">
                  {(page - 1) * perPage + i + 1}
                </Badge>
              </TableCell>

              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Avatar className="h-12 w-12 rounded-lg">
                    <AvatarImage
                      src={r.imageUrl}
                      alt={r.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg bg-gray-100">
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TableCell>

              <TableCell className="text-center font-medium text-gray-900">
                {r.name}
              </TableCell>

              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => onEdit(r)}
                    size="sm"
                    variant="outline"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 hover:border-yellow-600 rounded-full h-8 px-3"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </Button>

                  <Button
                    onClick={() => onDelete(r.id)}
                    disabled={deletingId === r.id}
                    size="sm"
                    variant="outline"
                    className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 rounded-full h-8 px-3 disabled:opacity-70"
                  >
                    {deletingId === r.id ? (
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
