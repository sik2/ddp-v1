import Header from "../components/Header";
import CafeSearchFilter from "../components/CafeSearchFilter";
import Footer from "../components/Footer";
import Image from "next/image";
import { getCafes } from "@/lib/api";
import { Spot } from "@/types";

export default async function CafePage() {
  // Supabase에서 카페 데이터 가져오기
  const cafes: Spot[] = await getCafes();

  return (
    <main className="min-h-screen">
      {/* 헤더 영역 */}
      <Header />

      {/* 메인 배너 이미지 */}
      <div className="relative w-full h-64 sm:h-80 md:h-96 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 z-10"></div>
        <div className="absolute -right-24 -bottom-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-24 -top-24 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-blue-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-20 text-center w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4">
          <div className="bg-white/80 backdrop-blur-sm p-4 sm:p-6 md:p-8 rounded-xl shadow-sm border border-slate-200/50">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 mb-2 sm:mb-3 md:mb-4 text-center">
              DDP
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 mb-1 text-center">
              Dongdaemun Dealicious sPot
            </p>
            <p className="text-base sm:text-lg text-slate-600 text-center">
              동대문 카페를 한눈에
            </p>
          </div>
        </div>
      </div>

      {/* 카페 지도 영역 - 배너에 살짝만 걸치는 느낌으로 */}
      <div className="container mx-auto -mt-8 sm:-mt-10 md:-mt-12 relative z-20 px-4">
        <div className="p-4 sm:p-6 bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pb-2 border-b border-blue-400 inline-block text-slate-700">
            카페 지도
          </h2>
          <div className="relative w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-[800px]">
            <Image
              src="/section.png"
              alt="카페 지도"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>
      </div>

      {/* 검색 필터 및 카페 목록 영역 */}
      <div className="container mx-auto mt-8 sm:mt-10 md:mt-12 px-4">
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-6">
          <CafeSearchFilter allCafes={cafes} />
        </div>
      </div>

      {/* 하단 공백 */}
      <div className="container mx-auto py-12 sm:py-16 md:py-20"></div>

      {/* 푸터 영역 */}
      <Footer />
    </main>
  );
}
