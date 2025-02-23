import { IProperty } from "@/interfaces/property.interface";
import { getPropertyBySlug } from "@/lib/api/properties";
import { config } from "@/utils/config";

export async function getPropertyMetadata(slug: string) {
  try {
    const property: IProperty = await getPropertyBySlug(slug);

    return {
      title: property.name,
      description: property.description,
      canonical: `${config.SITE_URL}/listing/property/${property.slug}`,
      openGraph: {
        type: "website",
        url: `${config.SITE_URL}/listing/property/${property.slug}`,
        title: property.name,
        description: property.description,
        images: [
          {
            url: property.images[0].imageUrl,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        cardType: "summary_large_image",
        title: property.name,
        description: property.description,
        image: property.images[0].imageUrl,
      },
    };
  } catch (error) {
    console.error("Metadata fetch error:", error);
    return {
      title: "Property Not Found",
      description: "This property does not exist or is unavailable.",
    };
  }
}
