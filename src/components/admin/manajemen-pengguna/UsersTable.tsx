"use client";

import { UserItem } from "@/types/admin/manajemen-pengguna";
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
import { Pencil, Trash2, Loader2, Mail, Phone } from "lucide-react";

type Props = {
  users: UserItem[];
  deletingId: number | null;
  onEdit: (user: UserItem) => void;
  onDelete: (id: number) => void;
};

export default function UsersTable({
  users,
  deletingId,
  onEdit,
  onDelete,
}: Props) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-16 text-center font-semibold">No</TableHead>
            <TableHead className="text-center font-semibold">Nama</TableHead>
            <TableHead className="text-center font-semibold">Email</TableHead>
            <TableHead className="text-center font-semibold">
              No. Telp
            </TableHead>
            <TableHead className="w-40 text-center font-semibold">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((u, i) => (
            <TableRow
              key={u.id}
              className="hover:bg-gray-50/50 transition-colors"
            >
              <TableCell className="text-center">
                <Badge variant="outline" className="font-normal">
                  {i + 1}
                </Badge>
              </TableCell>

              <TableCell className="text-center font-medium text-gray-900">
                {u.name}
              </TableCell>

              <TableCell className="text-center text-gray-600">
                <div className="flex items-center justify-center gap-2 max-w-xs mx-auto">
                  <Mail className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                  <span className="truncate" title={u.email}>
                    {u.email}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-center text-gray-600">
                {u.notelp ? (
                  <div className="flex items-center justify-center gap-2">
                    <Phone className="h-3.5 w-3.5 text-gray-400 flex-shrink-0" />
                    <span className="whitespace-nowrap">{u.notelp}</span>
                  </div>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </TableCell>

              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => onEdit(u)}
                    size="sm"
                    variant="outline"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 hover:border-yellow-600 rounded-full h-8 px-3"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </Button>

                  <Button
                    onClick={() => onDelete(u.id)}
                    disabled={deletingId === u.id}
                    size="sm"
                    variant="outline"
                    className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 rounded-full h-8 px-3 disabled:opacity-70"
                  >
                    {deletingId === u.id ? (
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
