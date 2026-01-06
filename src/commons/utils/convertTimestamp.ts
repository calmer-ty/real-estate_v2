interface ITimestamp {
  year: number;
  month: string;
  day: string;
  hours: string;
  minutes: string;
  seconds: string;
}

export function convertTimestamp(seconds: number): ITimestamp {
  const date = new Date(seconds * 1000);
  const padZero = (num: number): string => num.toString().padStart(2, "0");

  return {
    year: date.getFullYear(),
    month: padZero(date.getMonth() + 1), // 월은 0부터 시작하므로 +1
    day: padZero(date.getDate()),
    hours: padZero(date.getHours()),
    minutes: padZero(date.getMinutes()),
    seconds: padZero(date.getSeconds()),
  };
}
