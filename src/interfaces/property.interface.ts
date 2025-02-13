export interface IProperty {
  id: string;
  name: string;
  description: string;
  images: string[];
  status:
    | "In Development"
    | "In Construction"
    | "Completed"
    | "For Sale"
    | "For Rent"
    | "Sold";
  location: string;
  price: number;
  slug: string;
  rooms: IRoom[];
  type?: string;
  beds?: number;
  baths?: number;
  squareFeet?: number;
  amenities?: string[];
  address?: string;
  features?: string[];
  virtualTour?: boolean;
  createdAt: string;
}

export interface IRoom {
  name: string;
  url: string;
}
