import { Suspense } from "react";
import PesanComponent from "@/components/pesan/PesanComponent";

export const dynamic = "force-dynamic";

export default function PesanPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <PesanComponent />
    </Suspense>
  );
}
