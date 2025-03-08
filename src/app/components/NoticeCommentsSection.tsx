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

  // 페이지 로드 시 새로 데이터 가져오기
  useEffect(() => {
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

    fetchComments();
  }, [noticeId]);

  const handleCommentAdded = (newComment: NoticeComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  // 댓글 새로고침 함수
  const handleRefreshComments = async () => {
    setIsLoading(true);
    try {
      const freshComments = await getNoticeComments(noticeId);
      setComments(freshComments);
    } catch (error) {
      console.error("댓글 새로고침 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-8">
      <NoticeCommentForm
        noticeId={noticeId}
        onCommentAdded={handleCommentAdded}
      />

      <div className="flex justify-between items-center mt-6 mb-4">
        <h3 className="text-lg font-bold text-slate-700">
          댓글 ({comments.length})
        </h3>
        <button
          onClick={handleRefreshComments}
          className="px-3 py-1 text-sm border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 transition-colors duration-300 text-purple-600 bg-white hover:bg-purple-50 flex items-center"
          disabled={isLoading}
        >
          <svg
            className={`w-4 h-4 mr-1 ${isLoading ? "animate-spin" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            ></path>
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
