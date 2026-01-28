"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, User } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar as CalendarShadcn } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

type PickupType = {
  id: number;
  name: string;
};

type FormValue = {
  pickupLocationId: number;
  date: string;
  departTime: string;
  returnTime: string;
  quantity: number;
};

type Errors = {
  pickupLocationId?: string;
  date?: string;
  departTime?: string;
  returnTime?: string;
};

export default function PesanForm({
  pickupLocations,
  price,
  onSubmit,
}: {
  pickupLocations: PickupType[];
  price: number;
  onSubmit: (value: FormValue) => void;
}) {
  const [pickupLocationId, setPickupLocationId] = useState<number | null>(null);
  const [date, setDate] = useState("");
  const [departTime, setDepartTime] = useState("");
  const [returnTime, setReturnTime] = useState("");
  const [quantity, setQuantity] = useState(1);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDepart, setOpenDepart] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);

  const [errors, setErrors] = useState<Errors>({});

  const estimasiTotal = price * quantity;

  const departTimes = ["07:00", "08:00", "09:00", "10:00", "11:00", "12:00"];
  const returnTimes = ["15:00", "16:00", "17:00", "18:00"];

  const formatDate = (dateStr: string) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  };

  const handleSubmit = () => {
    const newErrors: Errors = {};

    if (!pickupLocationId)
      newErrors.pickupLocationId = "Lokasi penjemputan wajib dipilih";
    if (!date) newErrors.date = "Tanggal keberangkatan wajib dipilih";
    if (!departTime) newErrors.departTime = "Waktu berangkat wajib dipilih";
    if (!returnTime) newErrors.returnTime = "Waktu pulang wajib dipilih";

    // Validasi tambahan: jam depart & return sesuai daftar
    if (departTime && !departTimes.includes(departTime)) {
      newErrors.departTime = `Waktu berangkat harus salah satu dari: ${departTimes.join(", ")}`;
    }
    if (returnTime && !returnTimes.includes(returnTime)) {
      newErrors.returnTime = `Waktu pulang harus salah satu dari: ${returnTimes.join(", ")}`;
    }

    // Validasi returnTime > departTime
    if (departTime && returnTime && returnTime <= departTime) {
      newErrors.returnTime =
        "Waktu pulang harus lebih besar dari waktu berangkat";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      pickupLocationId: pickupLocationId as number,
      date,
      departTime,
      returnTime,
      quantity,
    });
  };

  return (
    <div className="px-5 pb-5 space-y-5 bg-white rounded-2xl shadow-sm border">
      <div className="space-y-3 text-sm">
        {/* LOKASI */}
        <Label>Lokasi Penjemputan</Label>
        <Field error={!!errors.pickupLocationId} icon={<MapPin size={14} />}>
          <Select
            value={pickupLocationId?.toString() ?? ""}
            onValueChange={(val) => {
              setPickupLocationId(val ? Number(val) : null);
              setErrors((prev) => ({ ...prev, pickupLocationId: undefined }));
            }}
          >
            <SelectTrigger className="h-7 border-0 p-0 text-xs font-medium text-neutral-500 focus:ring-0 focus:ring-offset-0 cursor-pointer">
              <SelectValue placeholder="Pilih Lokasi" />
            </SelectTrigger>
            <SelectContent>
              {pickupLocations.map((loc) => (
                <SelectItem
                  key={loc.id}
                  value={loc.id.toString()}
                  className="text-sm cursor-pointer"
                >
                  {loc.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </Field>
        {errors.pickupLocationId && (
          <ErrorText>{errors.pickupLocationId}</ErrorText>
        )}

        {/* TANGGAL */}
        <Label>Tanggal</Label>
        <Field error={!!errors.date} icon={<Calendar size={16} />}>
          <Popover open={openCalendar} onOpenChange={setOpenCalendar}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-7 w-full justify-start px-0 py-0 font-medium text-xs text-neutral-700 hover:bg-transparent hover:text-blue-600 cursor-pointer"
              >
                {date ? (
                  formatDate(date)
                ) : (
                  <span className="text-neutral-500 ">Pilih tanggal</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-3 rounded-2xl shadow-lg border "
              align="start"
            >
              <CalendarShadcn
                mode="single"
                selected={date ? new Date(date) : undefined}
                onSelect={(d) => {
                  if (d) {
                    const y = d.getFullYear();
                    const m = String(d.getMonth() + 1).padStart(2, "0");
                    const day = String(d.getDate()).padStart(2, "0");
                    setDate(`${y}-${m}-${day}`);
                    setOpenCalendar(false);
                    setErrors((prev) => ({ ...prev, date: undefined }));
                  }
                }}
                initialFocus
                disabled={(d) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  d.setHours(0, 0, 0, 0);
                  return d < today; // tanggal sebelum hari ini tidak bisa dipilih
                }}
              />
            </PopoverContent>
          </Popover>
        </Field>
        {errors.date && <ErrorText>{errors.date}</ErrorText>}

        {/* BERANGKAT */}
        <Label>Waktu Berangkat</Label>
        <Field error={!!errors.departTime} icon={<Clock size={16} />}>
          <Popover open={openDepart} onOpenChange={setOpenDepart}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-7 w-full justify-start px-0 py-0 font-medium text-xs text-neutral-700 hover:bg-transparent hover:text-blue-600"
              >
                {departTime || (
                  <span className="text-neutral-500 cursor-pointer">Pilih jam</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid grid-cols-4 gap-2">
                {departTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setDepartTime(time);
                      setOpenDepart(false);
                      setErrors((prev) => ({ ...prev, departTime: undefined }));
                    }}
                    className={`rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                      departTime === time
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "border border-neutral-200 text-neutral-600 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </Field>
        {errors.departTime && <ErrorText>{errors.departTime}</ErrorText>}

        {/* PULANG */}
        <Label>Waktu Pulang</Label>
        <Field error={!!errors.returnTime} icon={<Clock size={16} />}>
          <Popover open={openReturn} onOpenChange={setOpenReturn}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className="h-7 w-full justify-start px-0 py-0 font-medium text-xs text-neutral-700 hover:bg-transparent hover:text-blue-600"
              >
                {returnTime || (
                  <span className="text-neutral-500 cursor-pointer">Pilih jam</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-56">
              <div className="grid grid-cols-4 gap-2">
                {returnTimes.map((time) => (
                  <button
                    key={time}
                    onClick={() => {
                      setReturnTime(time);
                      setOpenReturn(false);
                      setErrors((prev) => ({ ...prev, returnTime: undefined }));
                    }}
                    className={`rounded-lg py-2 text-xs font-semibold transition-all cursor-pointer ${
                      returnTime === time
                        ? "bg-blue-600 text-white shadow-md scale-105"
                        : "border border-neutral-200 text-neutral-600 hover:bg-blue-50 hover:border-blue-400"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </Field>
        {errors.returnTime && <ErrorText>{errors.returnTime}</ErrorText>}

        {/* JUMLAH */}
        <Label>Jumlah Tiket</Label>
        <Field icon={<User size={16} />}>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-blue-100 text-sm font-bold transition cursor-pointer"
            >
              −
            </button>
            <span className="min-w-5 text-center font-semibold">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((p) => Math.min(16, p + 1))}
              className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-blue-100 text-sm font-bold transition cursor-pointer"
            >
              +
            </button>
          </div>
        </Field>
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white py-3 px-5 rounded-2xl text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer"
      >
        <span>Pesan</span>
        <span>IDR {estimasiTotal.toLocaleString("id-ID")}</span>
      </button>
    </div>
  );
}

// ... Label, ErrorText, Field sama seperti sebelumnya

function Label({ children }: { children: string }) {
  return (
    <p className="text-xs font-semibold text-neutral-700 tracking-wide uppercase">
      {children}
    </p>
  );
}

function ErrorText({ children }: { children: string }) {
  return <p className="text-xs text-red-500 mt-1">{children}</p>;
}

function Field({
  icon,
  children,
  error,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  error?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-lg px-3 py-1.5
        border transition-all
        ${
          error
            ? "border-red-500 ring-2 ring-red-100"
            : "border-neutral-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100"
        }`}
    >
      <span className={error ? "text-red-500" : "text-neutral-400"}>
        {icon}
      </span>
      <div className="flex-1">{children}</div>
    </div>
  );
}
