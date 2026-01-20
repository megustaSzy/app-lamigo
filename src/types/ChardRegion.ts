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
  };
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
