// 카테고리 타입 정의
export interface Category {
  id: number;
  name: string;
}

// 색상 타입 정의
export interface Color {
  id: number;
  name: string;
}

// 맛집 및 카페 정보 타입 정의
export interface Establishment {
  id: number;
  category_id: number;
  color_id: number;
  name: string;
  url: string;
  description: string | null;
  emoji: string;

  // Join된 데이터를 위한 필드
  category?: Category;
  color?: Color;
}
