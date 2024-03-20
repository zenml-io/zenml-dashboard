export const formatMoney = (money: string | number): string => {
  if (!money) return '0 €';

  const moneyString = Number(money).toFixed(2).replace('.', ',');

  if (moneyString === '0,00') return '0 €';

  return `${moneyString} €`;
};
