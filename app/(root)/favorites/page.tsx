import { Container } from '@/components/shared/container';
import { FavoritesItems } from '@/components/shared/Favorites/FavoritesItems';
import { Skeleton } from '@/components/ui/skeleton';
import React, { Suspense } from 'react';

export default async function CartPage() {
  return (
    <Container className="mt-10 mb-14">
      <div className="text-center text-4xl font-semibold mb-10">Избранное</div>
      <FavoritesItems />
    </Container>
  );
}
