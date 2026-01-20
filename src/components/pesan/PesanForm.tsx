"use client";

import { useState } from "react";
import { MapPin, Calendar, Clock, User, ChevronDown } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarShadcn } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";

type PickupType = {
  id: number;
  name: string;
};

type FormValue = {
  pickupLocationId: number;
  date: string;
  departTime: string;
  returnTime: string;
  people: number;
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
  const [people, setPeople] = useState(1);

  const [openCalendar, setOpenCalendar] = useState(false);
  const [openDepart, setOpenDepart] = useState(false);
  const [openReturn, setOpenReturn] = useState(false);

  const [errors, setErrors] = useState<Errors>({});

  const estimasiTotal = price * people;

  /* ===============================
      HELPER JAM
  =============================== */
  const departTimes = Array.from({ length: 8 }, (_, i) => {
    const hour = 7 + i;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  const returnTimes = Array.from({ length: 6 }, (_, i) => {
    const hour = 14 + i;
    return `${hour.toString().padStart(2, "0")}:00`;
  });

  /* ===============================
      SUBMIT
  =============================== */
  const handleSubmit = () => {
    const newErrors: Errors = {};

    if (!pickupLocationId)
      newErrors.pickupLocationId = "Lokasi penjemputan wajib dipilih";

    if (!date) newErrors.date = "Tanggal keberangkatan wajib dipilih";

    if (!departTime) newErrors.departTime = "Waktu berangkat wajib dipilih";

    if (!returnTime) newErrors.returnTime = "Waktu pulang wajib dipilih";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      pickupLocationId: pickupLocationId as number,
      date,
      departTime,
      returnTime,
      people,
    });
  };

  return (
    <div className="px-5 pb-5 space-y-5 bg-white rounded-2xl shadow-sm border">
      {/* FORM */}
      <div className="space-y-3 text-sm">
        {/* LOKASI */}
        <Label>Lokasi Penjemputan</Label>
        <Field error={!!errors.pickupLocationId} icon={<MapPin size={14} />}>
          <div className="relative">
            <select
              value={pickupLocationId ?? ""}
              onChange={(e) => {
                setPickupLocationId(
                  e.target.value ? Number(e.target.value) : null
                );
                setErrors((prev) => ({ ...prev, pickupLocationId: undefined }));
              }}
              className="w-full h-7 pr-6 bg-transparent outline-none
                text-xs text-neutral-700 appearance-none"
            >
              <option value="">Pilih Lokasi</option>
              {pickupLocations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>

            <ChevronDown
              size={14}
              className="absolute right-1 top-1/2 -translate-y-1/2
                text-neutral-400 pointer-events-none"
            />
          </div>
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
                className="h-7 w-full justify-start px-0 py-0
                  font-normal text-xs text-neutral-700
                  hover:bg-transparent hover:text-blue-600"
              >
                {date
                  ? format(new Date(date), "dd MMMM yyyy", { locale: id })
                  : "Pilih tanggal"}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-3 rounded-2xl shadow-lg border"
              align="start"
            >
              <CalendarShadcn
                mode="single"
                selected={date ? new Date(date) : undefined}
                onSelect={(d) => {
                  if (d) {
                    setDate(format(d, "yyyy-MM-dd"));
                    setOpenCalendar(false);
                    setErrors((prev) => ({ ...prev, date: undefined }));
                  }
                }}
                initialFocus
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
                className="h-7 w-full justify-start px-0 py-0
                  font-normal text-xs text-neutral-700
                  hover:bg-transparent hover:text-blue-600"
              >
                {departTime || "Pilih jam"}
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
                      setErrors((prev) => ({
                        ...prev,
                        departTime: undefined,
                      }));
                    }}
                    className={`rounded-lg py-2 text-xs font-semibold transition-all
                      ${
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
                className="h-7 w-full justify-start px-0 py-0
                  font-normal text-xs text-neutral-700
                  hover:bg-transparent hover:text-blue-600"
              >
                {returnTime || "Pilih jam"}
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
                      setErrors((prev) => ({
                        ...prev,
                        returnTime: undefined,
                      }));
                    }}
                    className={`rounded-xl py-2 text-sm font-medium transition-all
                      ${
                        returnTime === time
                          ? "bg-blue-600 text-white shadow"
                          : "border hover:bg-neutral-100"
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
              onClick={() => setPeople((p) => Math.max(1, p - 1))}
              className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-blue-100
                text-sm font-bold transition"
            >
              −
            </button>
            <span className="min-w-5 text-center font-semibold">{people}</span>
            <button
              onClick={() => setPeople((p) => Math.min(16, p + 1))}
              className="w-7 h-7 rounded-full bg-neutral-100 hover:bg-blue-100
                text-sm font-bold transition"
            >
              +
            </button>
          </div>
        </Field>
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full flex justify-between items-center
          bg-linear-to-r from-blue-600 to-blue-500
          hover:from-blue-700 hover:to-blue-600
          text-white py-3 px-5 rounded-2xl text-sm font-semibold
          shadow-md hover:shadow-lg transition-all"
      >
        <span>Pesan</span>
        <span>IDR {estimasiTotal.toLocaleString("id-ID")}</span>
      </button>
    </div>
  );
}

/* ===============================
    HELPERS
=============================== */

function Label({ children }: { children: string }) {
  return (
    <p className="text-xs font-medium text-neutral-600 tracking-wide">
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
