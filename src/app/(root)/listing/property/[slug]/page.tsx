import PropertyDetails from "@/components/property/PropertyDetails";
import PropertyHeader from "@/components/property/PropertyHeader";
import { IProperty } from "@/interfaces/property.interface";
import { getPropertyBySlug } from "@/lib/api/properties";
import { config } from "@/utils/config";

export const dynamic = 'force-static'

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
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
};

// export const generateStaticParams = async () => {
//   try {
//     const res = await getPropertiesForParams({ limit: 1000});
//     const properties: IProperty[] = res.data;

//     console.log("static properties>>>", properties);
//     return properties.map((property) => ({
//       slug: property.slug,
//     }));
//   } catch (error) {
//     console.log(error);
//     return [];
//   }
// };

export async function generateStaticParams() {
  return []
}

const SinglePropertyPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const property = await getPropertyBySlug(slug);

  return (
    <>
      <PropertyHeader property={property} />
      <PropertyDetails property={property} />
    </>
  );
};

export default SinglePropertyPage;
