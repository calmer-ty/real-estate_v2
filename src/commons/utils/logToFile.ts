import { appendFileSync } from "fs";

// 로그 기록 함수
export const logToFile = (text: any, value: any): void => {
  const timestamp = new Date().toISOString();
  // 객체를 JSON 문자열로 변환하여 기록
  const logMessage = `[${timestamp}] ${JSON.stringify({ text, value }, null, 2)}\n`;
  appendFileSync("log.txt", logMessage); // 'log.txt' 파일에 추가
};
