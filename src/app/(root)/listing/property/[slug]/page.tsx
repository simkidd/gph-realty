import ClientPropertyDetails from "@/components/property/ClientPropertyDetails";
import { getPropertyMetadata } from "./metadata";

export const generateMetadata = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return await getPropertyMetadata(slug);
};


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
