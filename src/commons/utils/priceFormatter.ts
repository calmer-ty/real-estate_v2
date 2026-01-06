const isBillion = (price: number): string => {
  const eok = Math.floor(price / 10000);

  if (eok === 0) {
    return "";
  }
  return `${eok}억`;
};
const isMillion = (price: number): string => {
  const man = price % 10000;
  if (man === 0) {
    return "";
  }
  return `${man}만`;
};

export const formatPrice = (price: string): string => {
  const num = Number(price.replace(/,/g, ""));

  return `${isBillion(num)} ${isMillion(num)}`;
};
export const formatRent = (price: number): string => {
  return `${isBillion(price)} ${price % 10000 === 0 ? "" : price % 10000}`;
};
export const cleanCurrency = (value: string): string => {
  return value.replace(/[^\d]/g, ""); // 숫자 외의 문자를 제거
};
