"use client";

import { useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2, FileSpreadsheet, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

export function ReportFilter({
  start,
  end,
  loading,
  setStart,
  setEnd,
  onFetch,
  onDownload,
}: {
  start: string;
  end: string;
  loading: boolean;
  setStart: (v: string) => void;
  setEnd: (v: string) => void;
  onFetch: () => void;
  onDownload: (type: "excel" | "pdf") => void;
}) {
  // Convert string dates to Date objects
  const startDate = start ? new Date(start) : undefined;
  const endDate = end ? new Date(end) : undefined;

  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const handleStartSelect = (date: Date | undefined) => {
    if (date) {
      setStart(format(date, "yyyy-MM-dd"));
      setStartOpen(false);
    }
  };

  const handleEndSelect = (date: Date | undefined) => {
    if (date) {
      setEnd(format(date, "yyyy-MM-dd"));
      setEndOpen(false);
    }
  };

  return (
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b">
        <CardTitle className="text-gray-800">Filter Laporan</CardTitle>
        <CardDescription>Pilih periode untuk melihat laporan</CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="flex flex-wrap gap-4 items-end">
          {/* START DATE */}
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              Tanggal Mulai
            </Label>
            <Popover open={startOpen} onOpenChange={setStartOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal rounded-lg h-10",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? (
                    format(startDate, "dd MMMM yyyy", { locale: id })
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={handleStartSelect}
                  initialFocus
                  locale={id}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* END DATE */}
          <div className="space-y-2 flex-1 min-w-[200px]">
            <Label className="flex items-center gap-2 text-sm font-medium">
              <CalendarIcon className="h-4 w-4 text-gray-400" />
              Tanggal Akhir
            </Label>
            <Popover open={endOpen} onOpenChange={setEndOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal rounded-lg h-10",
                    !endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {endDate ? (
                    format(endDate, "dd MMMM yyyy", { locale: id })
                  ) : (
                    <span>Pilih tanggal</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={endDate}
                  onSelect={handleEndSelect}
                  initialFocus
                  locale={id}
                  disabled={(date) => (startDate ? date < startDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* BUTTONS */}
          <Button
            onClick={onFetch}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Loading...
              </>
            ) : (
              "Tampilkan"
            )}
          </Button>

          <Button
            onClick={() => onDownload("excel")}
            variant="outline"
            className="bg-green-600 hover:bg-green-700 text-white border-green-600 rounded-lg"
          >
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Excel
          </Button>

          <Button
            onClick={() => onDownload("pdf")}
            variant="outline"
            className="bg-red-600 hover:bg-red-700 text-white border-red-600 rounded-lg"
          >
            <FileText className="mr-2 h-4 w-4" />
            PDF
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
