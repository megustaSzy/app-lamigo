import { Suspense } from "react";
import PesanComponent from "@/components/pesan/PesanComponent";

export const dynamic = "force-dynamic";

export default function PesanPage() {
  return <PesanComponent />;
}
