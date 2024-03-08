import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { type productTypeRequest } from "@/interfaces/product.type";

export async function POST(request: Request) {
  try {
    const dataRequest: productTypeRequest = await request.json();

    const dataProductCreated = await prisma.product.create({
      data: {
        name: dataRequest.name,
        description: dataRequest.description,
        //price: dataRequest.price,
        price: parseFloat(dataRequest.price.toString()),
      },
    });

    return NextResponse.json(dataProductCreated);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function GET() {
  try {
    const res = await prisma.product.findMany();
    return NextResponse.json(res);
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      {
        status: 500,
      }
    );
  }
}
