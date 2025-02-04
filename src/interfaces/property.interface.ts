export interface IProperty {
  id: string;
  name: string;
  description: string;
  images: string[];
  status: "In Development" | "In Construction" | "Completed";
  location: string;
  slug: string;
  rooms: IRoom[];
}

export interface IRoom {
  name: string;
  url: string;
}
