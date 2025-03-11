"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Notice } from "@/types";
import { formatDate, nl2br } from "@/lib/utils";
import { getNoticeById } from "@/lib/api";

interface NoticeDetailContentProps {
  notice: Notice;
  noticeId: number;
}

export default function NoticeDetailContent({
  notice: initialNotice,
  noticeId,
}: NoticeDetailContentProps) {
  const [notice, setNotice] = useState<Notice>(initialNotice);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지 로드 시 새로 데이터 가져오기
  useEffect(() => {
    const fetchNotice = async () => {
      setIsLoading(true);
      try {
        const freshNotice = await getNoticeById(noticeId);
        if (freshNotice) {
          setNotice(freshNotice);
        }
      } catch (error) {
        console.error("공지사항 데이터 가져오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotice();
  }, []);

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-6 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}

      <div className="mb-4">
        <Link
          href="/notice"
          className="text-sm text-purple-500 hover:text-purple-700 transition-colors duration-150 flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          목록으로
        </Link>
      </div>

      <div className="border-b border-slate-200 pb-4 mb-6">
        <div className="flex items-center mb-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">
            {notice.title}
          </h1>
        </div>
        <div className="text-sm text-slate-500">
          <span>등록일: {formatDate(notice.created_at)}</span>
          {notice.updated_at !== notice.created_at && (
            <span className="ml-4">
              수정일: {formatDate(notice.updated_at)}
            </span>
          )}
        </div>
      </div>

      <div className="prose max-w-none">
        <div
          dangerouslySetInnerHTML={{ __html: nl2br(notice.content) }}
          className="text-slate-700 leading-relaxed whitespace-pre-line"
        />
      </div>
    </div>
  );
}
