import { TitleItem } from "@/types/admin/admin-about";
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
import { Pencil, Trash2, Loader2 } from "lucide-react";

type Props = {
  items: TitleItem[];
  loading: boolean;
  onEdit: (item: TitleItem) => void;
  onDelete: (id: number) => void;
};

export default function AboutTable(props: Props) {
  const { items, loading, onEdit, onDelete } = props;

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
    <>
      <div className="overflow-x-auto">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="w-12 text-center font-semibold">
                  No
                </TableHead>
                <TableHead className="font-semibold min-w-[180px] text-center">
                  Title
                </TableHead>
                <TableHead className="font-semibold min-w-[250px] text-center">
                  History
                </TableHead>
                <TableHead className="font-semibold min-w-[250px] text-center">
                  Vision
                </TableHead>
                <TableHead className="font-semibold min-w-[250px] text-center">
                  Mission
                </TableHead>
                <TableHead className="w-44 text-center font-semibold sticky right-0 bg-gray-50">
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
                  <TableCell className="text-center align-top">
                    <Badge variant="outline">{i + 1}</Badge>
                  </TableCell>

                  <TableCell className="font-medium text-gray-900 align-top">
                    <div className="max-w-[180px] break-words whitespace-pre-wrap leading-relaxed">
                      {it.title}
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-600 align-top">
                    <div className="max-w-[300px] break-words whitespace-pre-wrap leading-relaxed">
                      {it.history}
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-900 font-medium align-top">
                    <div className="max-w-[300px] break-words whitespace-pre-wrap leading-relaxed">
                      {it.vision}
                    </div>
                  </TableCell>

                  <TableCell className="text-gray-600 align-top">
                    <div className="max-w-[300px] break-words whitespace-pre-wrap leading-relaxed">
                      {it.mission}
                    </div>
                  </TableCell>

                  <TableCell className="align-top sticky right-0 bg-white">
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
      </div>
    </>
  );
}
