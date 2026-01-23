// @/types/region.ts

export interface ReverseGeocodeResponse {
  address?: {
    city?: string;
    town?: string;
    village?: string;
    county?: string;
    state?: string;

    //  KECAMATAN & KELURAHAN
    city_district?: string;
    suburb?: string;

    // DETAIL TAMBAHAN (Enhanced OSM)
    road?: string;
    house_number?: string;
    amenity?: string;
    postcode?: string;
    building?: string;
    pedestrian?: string;
    neighbourhood?: string;
    country?: string;
  };
  display_name?: string;
}

export interface Area {
  id: number;
  nama: string;
}

export interface RegionApiResponse {
  status: number;
  data?: {
    items?: {
      id: number;
      name: string;
    }[];
  };
}
