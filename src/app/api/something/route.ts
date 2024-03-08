import prisma from "@/libs/db";

export async function GET() {
  const products = await prisma.product.findMany();
  return new Response("data " + JSON.stringify(products), { status: 200 });
}
