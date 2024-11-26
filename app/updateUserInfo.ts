'use server';

import { getUserSession } from '@/components/shared/lib/get-user-session';
import { prisma } from '@/prisma/prisma-client';
import { Prisma } from '@prisma/client';
import { hashSync } from 'bcrypt';
import { cookies } from 'next/headers';

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error('Пользователь не найден');
    }

    const user = await prisma.user.findFirst({
      where: {
        email: currentUser.email || '',
      },
    });

    await prisma.user.update({
      where: {
        email: currentUser.email || '',
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password ? hashSync(body.password as string, 10) : user?.password,
      },
    });
  } catch (error) {
    console.log('Error [UPDATE_USER', error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email || '',
      },
    });

    if (user) {
      throw new Error('Пользователь уже существует');
    }

    await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password as string, 10),
      },
    });

    const findUser = await prisma.user.findFirst({
      where: {
        email: body.email || '',
      },
    });

    const cookie = await cookies();
    const token = cookie.get('cartToken')?.value;
    const tokenFavorites = crypto.randomUUID();

    await prisma.favorites.create({
      data: {
        token: tokenFavorites,
        userId: findUser!.id,
      },
    });

    if (token) {
      const cart = await prisma.cart.findFirst({
        where: {
          token,
        },
      });

      await prisma.cart.update({
        where: {
          id: cart!.id,
        },
        data: {
          userId: findUser!.id,
        },
      });
    } else {
      const tokenNew = crypto.randomUUID();

      await prisma.cart.create({
        data: {
          token: tokenNew,
          userId: findUser!.id,
        },
      });
    }
  } catch (error) {
    console.log('Error [UPDATE_USER', error);
    throw error;
  }
}
