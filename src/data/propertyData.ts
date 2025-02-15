import { IProperty } from "@/interfaces/property.interface";

export const propertyData: IProperty[] = [
  {
    id: "1",
    name: "Magnificent luxury 5-Bedroom Duplex  with breathtaking views, swimming pool and parking space.",
    description:
      "A luxurious 5-bedroom duplex with modern amenities and spacious living areas.",
    images: [
      "/images/projects/5-duplex/DP_1 - Photo.jpg",
      "/images/projects/5-duplex/DP_2 - Photo.jpg",
      "/images/projects/5-duplex/DP_3 - Photo.jpg",
      "/images/projects/5-duplex/DP_4 - Photo.jpg",
      "/images/projects/5-duplex/DP_5 - Photo.jpg",
      "/images/projects/5-duplex/DP_6 - Photo.jpg",
      "/images/projects/5-duplex/DP_7 - Photo.jpg",
    ],
    status: "sale",
    location: "Port Harcourt",
    slug: "",
    rooms: [
      {
        name: "Test landscape",
        url: "/images/projects/5-duplex/tomas-cocacola-4AxeQEi0gQc-unsplash.jpg",
      },
    ],
    type: "Apartments",
    beds: 5,
    baths: 3,
    squareFeet: 1200,
    price: 39500000,
    virtualTour: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "5-Bedroom Duplex",
    description:
      "A luxurious 5-bedroom duplex with modern amenities and spacious living areas",
    images: [
      "/images/projects/5-duplex/A_2 - Photo.jpg",
      "/images/projects/5-duplex/A_1 - Photo.jpg",
      "/images/projects/5-duplex/A_3 - Photo.jpg",
      "/images/projects/5-duplex/wood_4 - Photo.jpg",
    ],
    status: "sold",
    location: "Port Harcourt",
    slug: "",
    rooms: [
      {
        name: "Test landscape",
        url: "/images/projects/5-duplex/tomas-cocacola-4AxeQEi0gQc-unsplash.jpg",
      },
    ],
    type: "Apartments",
    beds: 5,
    baths: 4,
    squareFeet: 2200,
    price: 25000000,
    virtualTour: false,
    createdAt: new Date().toISOString(),
  },
];
