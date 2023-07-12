import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// GET
export async function GET(
  req: Request,
  { params }: { params: { categoryId: string } }
) {
  try {
    //
    if (!params.categoryId) {
      return new NextResponse("category-id is required", { status: 400 });
    }

    const category = await prismadb.category.findUnique({
      where: {
        id: params.categoryId,
      },
      include: {
        billboard: true,
      },
    });

    return NextResponse.json(category);

    //
  } catch (error) {
    console.log("[CATEGORY-GET] api-storeid-categories-id-route-get", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// PATCH
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name, billboardId } = body;

    //
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    //
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("Billboard-id is required to create a store", {
        status: 400,
      });
    }
    //
    if (!params.categoryId) {
      return new NextResponse("category-id is required", { status: 400 });
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

    const category = await prismadb.category.update({
      where: {
        id: params.categoryId,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(category);

    //
  } catch (error) {
    console.log("[CATEGORY-PATCH] api-storeid-category-id-route-patch", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

// DELETE
export async function DELETE(
  req: Request,
  { params }: { params: { categoryId: string; storeId: string } }
) {
  try {
    const { userId } = auth();

    //
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    //
    if (!params.categoryId) {
      return new NextResponse("category-id is required", { status: 400 });
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

    const category = await prismadb.category.delete({
      where: {
        id: params.categoryId,
      },
    });

    return NextResponse.json(category);

    //
  } catch (error) {
    console.log(
      "[CATEGORY_DELETE] api-storeid-categories-id-route-delete",
      error
    );
    return new NextResponse("Internal error", { status: 500 });
  }
}
