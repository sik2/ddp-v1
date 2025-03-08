"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Notice } from "@/types";
import { formatDate } from "@/lib/utils";
import { getNotices } from "@/lib/api";

interface NoticeListProps {
  initialNotices: Notice[];
}

export default function NoticeList({ initialNotices }: NoticeListProps) {
  const [notices, setNotices] = useState<Notice[]>(initialNotices);
  const [isLoading, setIsLoading] = useState(false);

  // 페이지 로드 시 새로 데이터 가져오기
  useEffect(() => {
    const fetchNotices = async () => {
      setIsLoading(true);
      try {
        const freshNotices = await getNotices();
        setNotices(freshNotices);
      } catch (error) {
        console.error("공지사항 목록 가져오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotices();
  }, []);

  // 공지사항 목록 새로고침 함수
  const handleRefreshNotices = async () => {
    setIsLoading(true);
    try {
      const freshNotices = await getNotices();
      setNotices(freshNotices);
    } catch (error) {
      console.error("공지사항 목록 새로고침 오류:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-6 relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 flex items-center justify-center z-10">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-xl sm:text-2xl font-bold pb-2 border-b border-purple-400 inline-block text-slate-700">
          공지사항 목록
        </h2>

        <button
          onClick={handleRefreshNotices}
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

      {notices.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-slate-500">등록된 공지사항이 없습니다.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-50">
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700 border-b border-slate-200">
                  번호
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700 border-b border-slate-200">
                  제목
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-slate-700 border-b border-slate-200">
                  등록일
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && notices.length === 0
                ? // 로딩 중이고 데이터가 없을 때 스켈레톤 UI 표시
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr key={`skeleton-${index}`}>
                      <td className="py-3 px-4 border-b border-slate-200">
                        <div className="w-8 h-4 bg-slate-200 rounded animate-pulse"></div>
                      </td>
                      <td className="py-3 px-4 border-b border-slate-200">
                        <div className="w-full h-4 bg-slate-200 rounded animate-pulse"></div>
                      </td>
                      <td className="py-3 px-4 border-b border-slate-200">
                        <div className="w-24 h-4 bg-slate-200 rounded animate-pulse"></div>
                      </td>
                    </tr>
                  ))
                : notices.map((notice) => (
                    <tr
                      key={notice.id}
                      className="hover:bg-slate-50 transition-colors duration-150"
                    >
                      <td className="py-3 px-4 text-sm text-slate-600 border-b border-slate-200">
                        {notice.id}
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 border-b border-slate-200">
                        <Link
                          href={`/notice/${notice.id}`}
                          className="hover:text-purple-500 transition-colors duration-150"
                        >
                          {notice.title}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-sm text-slate-600 border-b border-slate-200">
                        {formatDate(notice.created_at)}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
