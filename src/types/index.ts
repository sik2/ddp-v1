// 카테고리 타입 정의
export interface Category {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

// 색상 타입 정의
export interface Color {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
}

// 맛집 및 카페 정보 타입 정의 (spots 테이블)
export interface Spot {
  id: number;
  category_id: number;
  color_id: number;
  name: string;
  url: string;
  description: string | null;
  emoji: string;
  created_at: string;
  updated_at: string;

  // Join된 데이터를 위한 필드
  category?: Category;
  color?: Color;
}

// 공지사항 타입 정의
export interface Notice {
  id: number;
  title: string;
  content: string;
  allow_comments: boolean;
  created_at: string;
  updated_at: string;
}

// 공지사항 댓글 타입 정의
export interface NoticeComment {
  id: number;
  notice_id: number;
  content: string;
  created_at: string;
  updated_at: string;
}
