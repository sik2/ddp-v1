import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Link from "next/link";
import { getNoticeById, getNoticeComments } from "@/lib/api";
import { formatDate, nl2br } from "@/lib/utils";
import { notFound } from "next/navigation";
import NoticeCommentsSection from "@/app/components/NoticeCommentsSection";
import { Notice } from "@/types";

// Next.js 15.2.1에 맞는 타입 정의
type PageProps = {
  params: { id: string };
  searchParams: Record<string, string | string[] | undefined>;
};

/**
 * 공지사항 상세 페이지
 */
export default async function NoticeDetailPage({ params }: PageProps) {
  const noticeId = parseInt(params.id);

  // 공지사항 상세 정보 가져오기
  const notice = await getNoticeById(noticeId);

  // 공지사항이 없는 경우 404 페이지로 이동
  if (!notice) {
    notFound();
  }

  // 공지사항 댓글 목록 가져오기
  const comments = await getNoticeComments(noticeId);

  return (
    <main className="min-h-screen">
      <Header />

      <div className="container mx-auto mt-8 sm:mt-10 md:mt-12 px-4 mb-16">
        {/* 공지사항 상세 내용 */}
        <NoticeDetailContent notice={notice} />

        {/* 댓글 영역 */}
        {notice.allow_comments && (
          <NoticeCommentsSection
            noticeId={noticeId}
            initialComments={comments}
          />
        )}
      </div>

      <Footer />
    </main>
  );
}

/**
 * 공지사항 상세 내용 컴포넌트
 */
function NoticeDetailContent({ notice }: { notice: Notice }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-6">
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
