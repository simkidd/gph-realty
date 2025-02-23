import { prisma } from "./prisma";

export async function getProperties() {
  return await prisma.property.findMany({
    select: {
      id: true,
      name: true,
      slug: true,
    },
  });
}
