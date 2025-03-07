"use client";

import { useState } from "react";
import { addNoticeComment } from "@/lib/api";
import { NoticeCommentFormProps } from "@/types";

export default function NoticeCommentForm({
  noticeId,
  onCommentAdded,
}: NoticeCommentFormProps) {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("댓글 내용을 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const comment = await addNoticeComment({
        notice_id: noticeId,
        content: content.trim(),
      });

      if (comment) {
        setContent("");
        onCommentAdded(comment);
      } else {
        setError("댓글 등록에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err) {
      console.error("댓글 등록 오류:", err);
      setError("댓글 등록 중 오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 bg-white rounded-lg border border-slate-200/80 p-4">
      <h3 className="text-lg font-bold mb-4 text-slate-700">댓글 작성</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 min-h-[100px]"
            placeholder="댓글을 입력해주세요."
            disabled={isSubmitting}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "등록 중..." : "댓글 등록"}
          </button>
        </div>
      </form>
    </div>
  );
}
