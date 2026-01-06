export const getCurrentDate = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // 현재 월 (0부터 시작)

  return `${year}${month}`;
};
export const getCurrentDealYmd = (months: number) => {
  const result = [];
  const date = new Date();

  date.setDate(1);
  // JS Date는 월을 변경할 때 '일(day)'을 그대로 유지하려고 함
  // 만약 오늘이 31일 상태에서 12월 → 11월로 이동하면 11월 31일은 존재하지 않기 때문에
  // JS가 날짜를 보정하여 12월 1일로 되돌려 버리는 문제가 발생함
  // 이를 방지하기 위해 항상 date를 1일로 고정함

  for (let i = 0; i < months; i++) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 현재 월 (0부터 시작)
    result.push(`${year}${month}`);
    date.setMonth(date.getMonth() - 1);
  }
  return result;
};
