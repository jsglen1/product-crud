import { NextResponse } from "next/server";
import prisma from "@/libs/db";
import { productTypeRequest } from "@/interfaces/product.type";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const product = await prisma.product.findUnique({ where: { id } });
    return NextResponse.json(product);
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

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const productDeleted = await prisma.product.delete({ where: { id } });
    return NextResponse.json(productDeleted);
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

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id);
    const dataRequest: productTypeRequest = await request.json();

    const product = await prisma.product.update({
      where: { id },
      data: {
        name: dataRequest.name,
        description: dataRequest.description,
        price: parseFloat(dataRequest.price.toString()),
      },
    });

    return NextResponse.json(product);
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
