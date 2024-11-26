export const toStringPrice = (price: number) => {
  return price.toString().replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');
};
