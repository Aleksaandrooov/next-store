import { prisma } from '@/prisma/prisma-client';
import { UserRole } from '@prisma/client';
import { compare, hashSync } from 'bcrypt';
import { AuthOptions } from 'next-auth';
import yandex from 'next-auth/providers/yandex';
import { cookies } from 'next/headers';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: AuthOptions = {
  providers: [
    yandex({
      clientId: process.env.YANDEX_CLIENT_ID || '',
      clientSecret: process.env.YANDEX_CLIENT_SECRET || '',
      profile(profile) {
        return {
          id: profile.id,
          name: profile.login,
          email: profile.emails?.[0],
          role: 'USER' as UserRole,
        };
      },
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const cookie = await cookies();

        if (!credentials) {
          return null;
        }

        const values = {
          email: credentials.email,
        };

        const findUser = await prisma.user.findFirst({
          where: values,
        });

        if (!findUser) {
          return null;
        }

        const isPasswordValid = await compare(credentials.password, findUser.password);

        if (!isPasswordValid) {
          return null;
        }

        await prisma.favorites
          .findFirst({
            where: {
              userId: findUser.id,
            },
          })
          .then((items) =>
            cookie.set('favoritesToken', String(items!.token), {
              maxAge: 2147483647,
            }),
          );

        await prisma.cart
          .findFirst({
            where: {
              userId: findUser.id,
            },
          })
          .then((items) =>
            cookie.set('cartToken', String(items!.token), {
              maxAge: 2147483647,
            }),
          );

        return {
          id: String(findUser.id),
          email: findUser.email,
          name: findUser.fullName,
          role: findUser.role,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async signIn({ user, account }) {
      try {
        const cookie = await cookies();
        if (account?.provider == 'credentails') {
          return true;
        }

        if (!user.email) {
          return false;
        }

        const findUser = await prisma.user.findFirst({
          where: {
            OR: [
              { provider: account?.provider, providerId: account?.providerAccountId },
              { email: user.email },
            ],
          },
        });

        if (findUser) {
          await prisma.cart
            .findFirst({
              where: {
                userId: findUser.id,
              },
            })
            .then((items) =>
              cookie.set('cartToken', String(items?.token), {
                maxAge: 2147483647,
              }),
            );

          await prisma.favorites
            .findFirst({
              where: {
                userId: findUser.id,
              },
            })
            .then((items) =>
              cookie.set('favoritesToken', String(items?.token), {
                maxAge: 2147483647,
              }),
            );

          await prisma.user.update({
            where: {
              id: findUser.id,
            },
            data: {
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          return true;
        } else {
          const tokenNew = crypto.randomUUID();
          const tokenFavorites = crypto.randomUUID();
          const token = cookie.get('cartToken')?.value;

          await prisma.user.create({
            data: {
              email: user.email,
              fullName: user.name || '',
              password: hashSync(user.id.toString(), 10),
              verified: new Date(),
              provider: account?.provider,
              providerId: account?.providerAccountId,
            },
          });

          const findNewUser = await prisma.user.findFirst({
            where: {
              email: user.email,
            },
          });

          await prisma.favorites
            .create({
              data: {
                token: tokenFavorites,
                userId: findNewUser!.id,
              },
            })
            .then((items) =>
              cookie.set('favoritesToken', String(items.token), {
                maxAge: 2147483647,
              }),
            );

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
                userId: findNewUser!.id,
              },
            });
          } else {
            await prisma.cart
              .create({
                data: {
                  token: tokenNew,
                  userId: findNewUser!.id,
                },
              })
              .then((items) =>
                cookie.set('cartToken', String(items.token), {
                  maxAge: 2147483647,
                }),
              );
          }
          return true;
        }
      } catch (error) {
        console.error('error [SIGNIN]', error);
        return false;
      }
    },

    async jwt({ token }) {
      if (!token.email) {
        return token;
      }

      const findUser = await prisma.user.findUnique({
        where: {
          email: token.email,
        },
      });

      if (findUser) {
        token.id = findUser.id;
        token.email = findUser.email;
        token.fullName = findUser.fullName;
        token.role = findUser.role;
      }

      return token;
    },
    session({ session, token }) {
      if (session?.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }
      return session;
    },
  },
};
