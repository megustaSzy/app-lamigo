import Image from "next/image";
import { MapPin } from "lucide-react";
import { DestinationsType } from "@/types/destination";

export default function DestinationCard({
  destination,
}: {
  destination: DestinationsType;
}) {
  const imageUrl = destination.imageUrl || "/images/default.jpg";

  return (
    <>
      <div className="relative h-36">
        <Image
          src={imageUrl}
          alt={destination.name}
          fill
          unoptimized
          className="object-cover"
        />
      </div>

      <div className="p-5 space-y-4">
        <div>
          <h1 className="text-base font-semibold">{destination.name}</h1>
          <p className="flex items-center gap-1 text-xs text-neutral-500">
            <MapPin size={12} />
            {destination.category.name}
          </p>
        </div>

        <div className="flex justify-between bg-blue-600 text-white text-xs rounded-full px-4 py-2">
          <span>Max 16 Orang</span>
          <span>12 Jam</span>
        </div>
      </div>
    </>
  );
}
