import ClientPropertyDetails from "@/components/property/ClientPropertyDetails";

// export const generateMetadata = async ({
//   params,
// }: {
//   params: Promise<{ slug: string }>;
// }) => {
//   const { slug } = await params;
//   const property: IProperty = await getPropertyBySlug(slug);

//   return {
//     title: property.name,
//     description: property.description,
//     canonical: `${config.SITE_URL}/listing/property/${property.slug}`,
//     openGraph: {
//       type: "website",
//       url: `${config.SITE_URL}/listing/property/${property.slug}`,
//       title: property.name,
//       description: property.description,
//       images: [
//         {
//           url: property.images[0].imageUrl,
//           width: 1200,
//           height: 630,
//         },
//       ],
//     },
//     twitter: {
//       cardType: "summary_large_image",
//       title: property.name,
//       description: property.description,
//       image: property.images[0].imageUrl,
//     },
//   };
// };


const SinglePropertyPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <>
      <ClientPropertyDetails slug={slug} />
    </>
  );
};

export default SinglePropertyPage;
