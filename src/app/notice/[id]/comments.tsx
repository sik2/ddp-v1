"use client";

import { useState } from "react";
import { NoticeComment } from "@/types";
import NoticeCommentForm from "@/app/components/NoticeCommentForm";
import NoticeCommentList from "@/app/components/NoticeCommentList";

interface NoticeCommentsProps {
  noticeId: number;
  initialComments: NoticeComment[];
}

export default function NoticeComments({
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
