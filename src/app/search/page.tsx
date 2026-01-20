import { Suspense } from "react";
import SearchComponent from "../../components/SearchComponent";

export const dynamic = "force-dynamic";

export default function SearchPage() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <SearchComponent />
    </Suspense>
  );
}
