import Image from "next/image";
import { ApiDestinationItem } from "@/types/destination";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
} from "@/components/ui/pagination";
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
import {
  Pencil,
  Trash2,
  Loader2,
  ImageIcon,
  Tag,
  Banknote,
  MapPin,
} from "lucide-react";

type Props = {
  items: ApiDestinationItem[];
  loading: boolean;
  page: number;
  limit: number;
  totalPages: number;
  onPageChange: (p: number) => void;
  onEdit: (item: ApiDestinationItem) => void;
  onDelete: (id: number) => void;
};

export default function DestinasiTable(props: Props) {
  const {
    items,
    loading,
    page,
    limit,
    totalPages,
    onPageChange,
    onEdit,
    onDelete,
  } = props;

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
        <p className="text-gray-500 text-sm">Belum ada destinasi.</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50 hover:bg-gray-50">
              <TableHead className="w-16 text-center font-semibold">
                No
              </TableHead>
              <TableHead className="w-24 text-center font-semibold">
                Foto
              </TableHead>
              <TableHead className="text-left font-semibold">Nama</TableHead>
              <TableHead className="text-left font-semibold">
                Kategori
              </TableHead>
              <TableHead className="text-left font-semibold">
                Kabupaten
              </TableHead>

              <TableHead className="text-left font-semibold">Harga</TableHead>
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
                  <Badge variant="outline" className="font-normal">
                    {(page - 1) * limit + i + 1}
                  </Badge>
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

                <TableCell className="font-medium text-gray-900">
                  {it.name}
                </TableCell>

                <TableCell className="text-gray-600">
                  <Badge variant="secondary" className="gap-1">
                    <Tag className="h-3 w-3" />
                    {it.category.name}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-600">
                  <Badge variant="outline" className="gap-1">
                    <MapPin className="h-3 w-3" />
                    {it.region.name}
                  </Badge>
                </TableCell>

                <TableCell className="text-gray-900">
                  <div className="flex items-center gap-1.5">
                    <Banknote className="h-3.5 w-3.5 text-green-600" />
                    <span className="font-medium">
                      Rp {it.price.toLocaleString("id-ID")}
                    </span>
                  </div>
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

      {totalPages > 1 && (
        <div className="border-t py-4">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => page > 1 && onPageChange(page - 1)}
                  className={
                    page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from({ length: totalPages }).map((_, i) => (
                <PaginationItem key={i}>
                  <PaginationLink
                    isActive={page === i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className="cursor-pointer"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => page < totalPages && onPageChange(page + 1)}
                  className={
                    page === totalPages
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </>
  );
}
