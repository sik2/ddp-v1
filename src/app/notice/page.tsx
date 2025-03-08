import { Metadata } from "next";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import NoticeList from "@/app/components/NoticeList";
import { getNotices } from "@/lib/api";

export const metadata: Metadata = {
  title: "공지사항 - DDP",
  description: "DDP의 중요 소식을 확인하세요",
};

export default async function NoticePage() {
  // 공지사항 목록 가져오기 (초기 데이터)
  const notices = await getNotices();

  return (
    <div className="flex flex-col min-h-screen">
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
      <main className="flex-grow container mx-auto mt-8 sm:mt-10 md:mt-12 px-4 mb-16">
        <NoticeList initialNotices={notices} />
      </main>

      <Footer />
    </div>
  );
}
