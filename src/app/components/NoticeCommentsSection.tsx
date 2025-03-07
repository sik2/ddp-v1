"use client";

import { useState } from "react";
import { NoticeComment, NoticeCommentsProps } from "@/types";
import NoticeCommentForm from "@/app/components/NoticeCommentForm";
import NoticeCommentList from "@/app/components/NoticeCommentList";

/**
 * 공지사항 댓글 섹션 컴포넌트
 * 댓글 목록과 댓글 작성 폼을 포함
 */
export default function NoticeCommentsSection({
  noticeId,
  initialComments,
}: NoticeCommentsProps) {
  const [comments, setComments] = useState<NoticeComment[]>(initialComments);

  const handleCommentAdded = (newComment: NoticeComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };

  return (
    <div className="mt-8">
      <NoticeCommentForm
        noticeId={noticeId}
        onCommentAdded={handleCommentAdded}
      />
      <NoticeCommentList comments={comments} />
    </div>
  );
}
