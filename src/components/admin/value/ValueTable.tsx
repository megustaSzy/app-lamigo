import Image from "next/image";
import { ValueItem } from "@/types/value";
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

type Props = {
  items: ValueItem[];
  loading: boolean;
  onEdit: (item: ValueItem) => void;
  onDelete: (id: number) => void;
};

export default function ValueTable({
  items,
  loading,
  onEdit,
  onDelete,
}: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-blue-600 mr-2" />
        <p className="text-gray-500">Memuat data...</p>
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-gray-500 text-sm">Belum ada konten.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableHead className="w-16 text-center font-semibold">No</TableHead>
            <TableHead className="w-24 text-center font-semibold">
              Foto
            </TableHead>
            <TableHead className="text-center font-semibold">Header</TableHead>
            <TableHead className="text-center font-semibold">Name</TableHead>
            <TableHead className="w-40 text-center font-semibold">
              Aksi
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {items.map((it, i) => (
            <TableRow
              key={it.id}
              className="hover:bg-gray-50/50 transition-colors"
            >
              <TableCell className="text-center">
                <Badge variant="outline">{i + 1}</Badge>
              </TableCell>

              <TableCell className="text-center">
                <div className="flex justify-center">
                  <Avatar className="h-12 w-12 rounded-lg">
                    <AvatarImage
                      src={it.imageUrl ?? undefined}
                      alt={it.name}
                      className="object-cover"
                    />
                    <AvatarFallback className="rounded-lg bg-gray-100">
                      <ImageIcon className="h-5 w-5 text-gray-400" />
                    </AvatarFallback>
                  </Avatar>
                </div>
              </TableCell>

              <TableCell className="text-center font-medium text-gray-900">
                {it.header}
              </TableCell>

              <TableCell className="text-center text-gray-600 max-w-xs whitespace-normal break-words">
                {it.name}
              </TableCell>

              <TableCell>
                <div className="flex justify-center gap-2">
                  <Button
                    onClick={() => onEdit(it)}
                    size="sm"
                    variant="outline"
                    className="bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-500 hover:border-yellow-600 rounded-full h-8 px-3"
                  >
                    <Pencil className="h-3.5 w-3.5 mr-1.5" />
                    Edit
                  </Button>

                  <Button
                    onClick={() => onDelete(it.id)}
                    size="sm"
                    variant="outline"
                    className="bg-red-600 hover:bg-red-700 text-white border-red-600 hover:border-red-700 rounded-full h-8 px-3"
                  >
                    <Trash2 className="h-3.5 w-3.5 mr-1.5" />
                    Hapus
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
