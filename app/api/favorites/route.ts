import { FavoritesItem } from '@/app/services/dto/FavoritesGet';
import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('favoritesToken')?.value;

    if (!token) {
      return NextResponse.json({ items: [] });
    }

    const userFavorites = await prisma.favorites.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                Memory: true,
                Color: true,
                Size: true,
                MemoryOp: true,
                Diagonal: true,
                Model: true,
                Img: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(userFavorites);
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('favoritesToken')?.value;

    if (!token) {
      return NextResponse.error();
    }
    const data = (await req.json()) as FavoritesItem;

    const favorites = await prisma.favorites.findFirst({
      where: {
        token,
      },
    });

    if (!favorites) {
      return NextResponse.error();
    }

    const findCartItem = await prisma.favoritesItem.findFirst({
      where: {
        favoritesId: favorites.id,
        productItemIt: data.productId,
      },
    });

    if (findCartItem) {
      await prisma.favoritesItem.delete({
        where: {
          id: findCartItem.id,
        },
      });
    } else {
      await prisma.favoritesItem.create({
        data: {
          favoritesId: favorites.id,
          productItemIt: data.productId,
        },
      });
    }

    const updateFavorites = await prisma.favorites.findFirst({
      where: {
        token,
      },
      include: {
        items: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            productItem: {
              include: {
                Memory: true,
                Color: true,
                Size: true,
                MemoryOp: true,
                Diagonal: true,
                Model: true,
                Img: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(updateFavorites);
  } catch {}
}
