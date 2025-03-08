import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NoticeCommentsSection from "@/app/components/NoticeCommentsSection";
import NoticeDetailContent from "@/app/components/NoticeDetailContent";
import { getNoticeById, getNoticeComments } from "@/lib/api";

interface NoticeDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: NoticeDetailPageProps): Promise<Metadata> {
  const notice = await getNoticeById(parseInt(params.id));
  if (!notice) {
    return {
      title: "공지사항을 찾을 수 없습니다",
    };
  }
  return {
    title: `${notice.title} - 공지사항`,
    description: notice.content.substring(0, 160),
  };
}

export default async function NoticeDetailPage({
  params,
}: NoticeDetailPageProps) {
  const noticeId = parseInt(params.id);

  // 병렬로 데이터 가져오기
  const [notice, comments] = await Promise.all([
    getNoticeById(noticeId),
    getNoticeComments(noticeId),
  ]);

  if (!notice) {
    notFound();
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <NoticeDetailContent notice={notice} noticeId={noticeId} />

          {notice.allow_comments && (
            <div className="mt-8">
              <NoticeCommentsSection
                noticeId={noticeId}
                initialComments={comments || []}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
