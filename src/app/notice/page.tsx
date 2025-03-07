import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { getNotices } from "@/lib/api";
import { Notice } from "@/types";
import { formatDate } from "@/lib/utils";

export default async function NoticePage() {
  // 공지사항 목록 가져오기
  const notices: Notice[] = await getNotices();

  return (
    <main className="min-h-screen">
      {/* 헤더 영역 */}
      <Header />

      {/* 메인 배너 이미지 */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 z-10"></div>
        <div className="absolute -right-12 sm:-right-24 -bottom-12 sm:-bottom-24 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-12 sm:-left-24 -top-12 sm:-top-24 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-purple-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-20 text-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm p-3 sm:p-4 md:p-6 rounded-xl shadow-sm border border-slate-200/50">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-1 sm:mb-2 text-center">
              공지사항
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-slate-600 text-center">
              DDP의 중요 소식을 확인하세요
            </p>
          </div>
        </div>
      </div>

      {/* 공지사항 목록 영역 */}
      <div className="container mx-auto mt-8 sm:mt-10 md:mt-12 px-4 mb-16">
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-6">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pb-2 border-b border-purple-400 inline-block text-slate-700">
            공지사항 목록
          </h2>

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
                  {notices.map((notice) => (
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
      </div>

      {/* 푸터 영역 */}
      <Footer />
    </main>
  );
}
