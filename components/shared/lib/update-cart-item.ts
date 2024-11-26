import { prisma } from '@/prisma/prisma-client';

export const UpdateCartItem = async (token: string) => {
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
          productItem: true,
        },
      },
    },
  });

  if (!userCart) {
    return;
  }

  const totalAmount = userCart?.items.reduce((acc, item) => {
    return acc + item.productItem.price * item.countItem;
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id,
    },
    data: {
      totalAmount,
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
              Model: true,
              Diagonal: true,
              Img: true,
            },
          },
        },
      },
    },
  });
};
