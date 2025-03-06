import Header from "../components/Header";
import CafeSearchFilter from "../components/CafeSearchFilter";
import RestaurantCard from "../components/RestaurantCard";
import Footer from "../components/Footer";
import Image from "next/image";

export default function CafePage() {
  // 카페 데이터
  const cafes = [
    {
      id: 1,
      name: "스타벅스 동대문점",
      category: "카페",
      location: "서울시 동대문구",
      rating: 4.3,
      views: 2345,
      date: "2024.01.18",
      emoji: "☕",
      mapUrl: "https://naver.me/5L3HllQk",
    },
    {
      id: 2,
      name: "투썸플레이스",
      category: "카페",
      location: "서울시 종로구",
      rating: 4.2,
      views: 1987,
      date: "2024.01.17",
      emoji: "🍰",
      mapUrl: "https://naver.me/xGmFwBHl",
    },
    {
      id: 3,
      name: "블루보틀",
      category: "카페",
      location: "서울시 강남구",
      rating: 4.7,
      views: 3210,
      date: "2024.01.16",
      emoji: "☕",
      mapUrl: "https://naver.me/5YxUAQdP",
    },
    {
      id: 4,
      name: "폴바셋",
      category: "카페",
      location: "서울시 서초구",
      rating: 4.4,
      views: 1876,
      date: "2024.01.15",
      emoji: "🍵",
      mapUrl: "https://naver.me/GmLvGIJe",
    },
    {
      id: 5,
      name: "카페베네",
      category: "카페",
      location: "서울시 송파구",
      rating: 4.1,
      views: 1543,
      date: "2024.01.14",
      emoji: "🧇",
      mapUrl: "https://naver.me/5pKzVGa4",
    },
    {
      id: 6,
      name: "탐앤탐스",
      category: "카페",
      location: "서울시 중구",
      rating: 4.0,
      views: 1234,
      date: "2024.01.13",
      emoji: "🍩",
      mapUrl: "https://naver.me/FYxnZRJI",
    },
    {
      id: 7,
      name: "커피빈",
      category: "카페",
      location: "서울시 마포구",
      rating: 4.5,
      views: 2567,
      date: "2024.01.12",
      emoji: "☕",
      mapUrl: "https://naver.me/xqwHVLpI",
    },
    {
      id: 8,
      name: "이디야커피",
      category: "카페",
      location: "서울시 영등포구",
      rating: 4.2,
      views: 1987,
      date: "2024.01.11",
      emoji: "🥤",
      mapUrl: "https://naver.me/5mKzVGa9",
    },
    {
      id: 9,
      name: "빽다방",
      category: "카페",
      location: "서울시 용산구",
      rating: 3.9,
      views: 1678,
      date: "2024.01.10",
      emoji: "☕",
      mapUrl: "https://naver.me/xLvGIJe7",
    },
    {
      id: 10,
      name: "매머드커피",
      category: "카페",
      location: "서울시 동대문구",
      rating: 4.0,
      views: 1456,
      date: "2024.01.09",
      emoji: "🍦",
      mapUrl: "https://naver.me/FmKzVGa2",
    },
    {
      id: 11,
      name: "컴포즈커피",
      category: "카페",
      location: "서울시 서대문구",
      rating: 4.1,
      views: 1234,
      date: "2024.01.08",
      emoji: "☕",
      mapUrl: "https://naver.me/xYxnZRJK",
    },
    {
      id: 12,
      name: "동대문 카페거리",
      category: "카페",
      location: "서울시 동대문구",
      rating: 4.6,
      views: 2987,
      date: "2024.01.07",
      emoji: "🍮",
      mapUrl: "https://naver.me/5L3HllQm",
    },
  ];

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

      {/* 검색 필터 영역 - 별개로 분리 */}
      <div className="container mx-auto mt-8 sm:mt-10 md:mt-12 px-4">
        <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm p-4 sm:p-6">
          <CafeSearchFilter />
        </div>
      </div>

      {/* 카페 섹션 */}
      <div className="container mx-auto mt-8 sm:mt-10 md:mt-12 px-4">
        <div className="p-4 sm:p-6 bg-white rounded-xl border border-slate-200/80 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pb-2 border-b border-blue-400 inline-block text-slate-700">
            카페
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cafes.map((cafe) => (
              <RestaurantCard
                key={cafe.id}
                name={cafe.name}
                category={cafe.category}
                location={cafe.location}
                rating={cafe.rating}
                views={cafe.views}
                date={cafe.date}
                emoji={cafe.emoji}
                mapUrl={cafe.mapUrl}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 하단 공백 */}
      <div className="container mx-auto py-12 sm:py-16 md:py-20"></div>

      {/* 푸터 영역 */}
      <Footer />
    </main>
  );
}
