// 기본 모델 타입 정의
export interface BaseModel {
  id: number;
  created_at: string;
  updated_at: string;
}

// 카테고리 타입 정의
export interface Category extends Partial<BaseModel> {
  id: number;
  name: string;
}

// 색상 타입 정의
export interface Color extends Partial<BaseModel> {
  id: number;
  name: string;
}

// 맛집 및 카페 정보 타입 정의 (spots 테이블)
export interface Spot extends BaseModel {
  category_id: number;
  color_id: number;
  name: string;
  url: string;
  description: string | null;
  emoji: string;

  // 관계형 데이터
  category?: Category;
  color?: Color;
}

// 공지사항 타입 정의
export interface Notice extends BaseModel {
  title: string;
  content: string;
  allow_comments: boolean;
}

// 공지사항 댓글 타입 정의
export interface NoticeComment extends BaseModel {
  notice_id: number;
  content: string;
}

// 댓글 관련 컴포넌트 Props 타입 정의
export interface NoticeCommentsProps {
  noticeId: number;
  initialComments: NoticeComment[];
}

export interface NoticeCommentFormProps {
  noticeId: number;
  onCommentAdded: (comment: NoticeComment) => void;
}

export interface NoticeCommentListProps {
  comments: NoticeComment[];
}
