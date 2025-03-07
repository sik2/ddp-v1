// 날짜 포맷 함수
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// 텍스트에서 줄바꿈을 HTML <br> 태그로 변환
export function nl2br(text: string): string {
  return text.replace(/\n/g, "<br />");
}
