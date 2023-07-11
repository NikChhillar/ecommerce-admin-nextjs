import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    //
    if (!params.productId) {
      return new NextResponse("product-id is required", { status: 400 });
    }

    const product = await prismadb.product.findUnique({
      where: {
        id: params.productId,
      },
      include: {
        Image: true,
        category: true,
        size: true,
        color: true,
      },
    });

    return NextResponse.json(product);

    //
  } catch (error) {
    console.log("[product_GET] api-storeid-products-id-route-get", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PATCH
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      name,
      price,
      categoryId,
      colorId,
      sizeId,
      Image,
      isFeatured,
      isArchived,
    } = body;

    //
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    //

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!Image || !Image.length) {
      return new NextResponse("Images are required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }

    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!colorId) {
      return new NextResponse("Color id is required", { status: 400 });
    }

    if (!sizeId) {
      return new NextResponse("Size id is required", { status: 400 });
    }

    //
    if (!params.productId) {
      return new NextResponse("product-id is required", { status: 400 });
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

    await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        name,
        price,
        categoryId,
        colorId,
        sizeId,
        Image: {
          deleteMany: {},
        },
        isFeatured,
        isArchived,
      },
    });

    const product = await prismadb.product.update({
      where: {
        id: params.productId,
      },
      data: {
        Image: {
          createMany: {
            data: [...Image.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(product);

    //
  } catch (error) {
    console.log("[product-PATCH] api-storeid-product-id-route-patch", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    //
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    //
    if (!params.productId) {
      return new NextResponse("product-id is required", { status: 400 });
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

    const product = await prismadb.product.delete({
      where: {
        id: params.productId,
      },
    });

    return NextResponse.json(product);

    //
  } catch (error) {
    console.log("[product_DELETE] api-storeid-products-id-route-delete", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
