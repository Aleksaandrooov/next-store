import { prisma } from '@/prisma/prisma-client';
import { NextRequest, NextResponse } from 'next/server';
import ctypto from 'crypto';
import { findCreateCart } from '@/components/shared/lib/find-cart-create';
import { CreateCartItemValues } from '@/app/services/dto/CartGet';
import { UpdateCartItem } from '@/components/shared/lib/update-cart-item';

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
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

    return NextResponse.json(userCart);
  } catch {}
}

export async function POST(req: NextRequest) {
  try {
    let token = req.cookies.get('cartToken')?.value;

    if (!token) {
      token = ctypto.randomUUID();
    }

    const createCart = await findCreateCart(token);

    const data = (await req.json()) as CreateCartItemValues;

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: createCart.id,
        productItemId: data.productId,
      },
    });

    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id,
        },
        data: {
          countItem: findCartItem.countItem + 1,
        },
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: createCart.id,
          productItemId: data.productId,
          countItem: 1,
        },
      });
    }

    const updateUserCart = await UpdateCartItem(token);
    const resp = NextResponse.json(updateUserCart);
    resp.cookies.set('cartToken', token, {
      maxAge: 2147483647,
    });
    return resp;
  } catch (error) {
    console.log('[CART_POST] Server error', error);
    return NextResponse.json({ message: 'Не удалось получить корзину' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const token = req.cookies.get('cartToken')?.value;
    const data = (await req.json()) as { id: number[] };

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' });
    }

    const cartItem = await prisma.cart.findFirst({
      where: {
        token,
      },
    });

    if (!cartItem) {
      return NextResponse.json({ error: 'Cart item not found' });
    }

    await prisma.cartItem.deleteMany({
      where: {
        cartId: cartItem.id,
        id: {
          in: data.id,
        },
      },
    });

    const updatedUserCart = await UpdateCartItem(token);

    return NextResponse.json(updatedUserCart);
  } catch (error) {
    console.log('[CART_DELETEALL] Server error', error);
    return NextResponse.json({ message: 'Не удалось удалить товары из корзины' }, { status: 500 });
  }
}
