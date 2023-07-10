import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET
export async function GET(
  req: Request,
  { params }: { params: { colorId: string } }
) {
  try {
    //
    if (!params.colorId) {
      return new NextResponse("color-id is required", { status: 400 });
    }

    const color = await prismadb.color.findUnique({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);

    //
  } catch (error) {
    console.log("[Color_GET] api-storeid-colors-id-route-get", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PATCH
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; colorId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, value } = body;

    //
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    //
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required to create a store", {
        status: 400,
      });
    }
    //
    if (!params.colorId) {
      return new NextResponse("color-id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const color = await prismadb.color.update({
      where: {
        id: params.colorId,
      },
      data: {
        name,
        value,
      },
    });

    return NextResponse.json(color);

    //
  } catch (error) {
    console.log("[color-PATCH] api-storeid-colors-id-route-patch", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { colorId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    //
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    //
    if (!params.colorId) {
      return new NextResponse("color-id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 405 });
    }

    const color = await prismadb.color.delete({
      where: {
        id: params.colorId,
      },
    });

    return NextResponse.json(color);

    //
  } catch (error) {
    console.log("[color_DELETE] api-storeid-colors-id-route-delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
