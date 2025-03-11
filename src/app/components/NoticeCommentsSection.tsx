"use client";

import { useState, useEffect } from "react";
import { NoticeComment, NoticeCommentsProps } from "@/types";
import NoticeCommentForm from "@/app/components/NoticeCommentForm";
import NoticeCommentList from "@/app/components/NoticeCommentList";
import { getNoticeComments } from "@/lib/api";

/**
 * 공지사항 댓글 섹션 컴포넌트
 * 댓글 목록과 댓글 작성 폼을 포함
 */
export default function NoticeCommentsSection({
  noticeId,
  initialComments,
}: NoticeCommentsProps) {
  const [comments, setComments] = useState<NoticeComment[]>(initialComments);
  const [isLoading, setIsLoading] = useState(false);

  // 댓글 데이터 가져오기 함수
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const freshComments = await getNoticeComments(noticeId);
      setComments(freshComments);
    } catch (error) {
      console.error("댓글 데이터 가져오기 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 로드 시 새로 데이터 가져오기
  useEffect(() => {
    fetchComments();
  }, [noticeId]);

  const handleCommentAdded = (newComment: NoticeComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
    // 댓글 추가 후 최신 데이터 다시 가져오기
    fetchComments();
  };

  // 댓글 새로고침 핸들러
  const handleRefreshComments = () => {
    fetchComments();
  };

  return (
    <div className="mt-8">
      <NoticeCommentForm
        noticeId={noticeId}
        onCommentAdded={handleCommentAdded}
      />

      <div className="mt-6 mb-4 flex justify-between items-center">
        <h3 className="text-lg font-bold text-slate-700">
          댓글 ({comments.length})
        </h3>
        <button
          onClick={handleRefreshComments}
          disabled={isLoading}
          className="text-sm text-purple-500 hover:text-purple-700 transition-colors duration-150 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-4 w-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          {isLoading ? "로딩 중..." : "새로고침"}
        </button>
      </div>

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 animate-pulse"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="w-32 h-4 bg-slate-200 rounded"></div>
              </div>
              <div className="w-full h-16 bg-slate-200 rounded"></div>
            </div>
          ))}
        </div>
      ) : (
        <NoticeCommentList comments={comments} />
      )}
    </div>
  );
}
