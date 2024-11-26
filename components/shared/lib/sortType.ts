export interface sort {
  id: number;
  name: string;
  type: string;
  acc: string;
}

export const sortType: sort[] = [
  { id: 0, name: 'Популярные', type: 'rating', acc: 'desc' },
  { id: 1, name: 'По возрастанию цены', type: 'price', acc: 'asc' },
  { id: 2, name: 'По убыванию цены', type: 'price', acc: 'desc' },
];

export const hab = [
  { name: 'Профиль', url: '/profile' },
  { name: 'Избранные', url: '/favorites' },
  { name: 'Мои заказы', url: '/profile/order' },
];
