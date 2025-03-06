import Header from "./components/Header";
import SearchFilter from "./components/SearchFilter";
import RestaurantCard from "./components/RestaurantCard";
import PopularRestaurant from "./components/PopularRestaurant";
import CategoryItem from "./components/CategoryItem";
import Footer from "./components/Footer";

export default function Home() {
  // 맛집 데이터
  const restaurants = [
    {
      id: 1,
      name: "서울식당",
      category: "한식",
      location: "서울시 강남구",
      rating: 4.5,
      views: 1234,
      date: "2024.01.20",
      emoji: "🍲",
    },
    {
      id: 2,
      name: "스시야",
      category: "일식",
      location: "서울시 마포구",
      rating: 4.8,
      views: 2567,
      date: "2024.01.19",
      emoji: "🍣",
    },
  ];

  // 인기 맛집 데이터
  const popularRestaurants = [
    {
      id: 1,
      name: "치킨마을",
      views: 5678,
      emoji: "🍗",
    },
    {
      id: 2,
      name: "라멘하우스",
      views: 4321,
      emoji: "🍜",
    },
  ];

  // 카테고리 데이터
  const categories = [
    { id: 1, name: "한식", count: 45, emoji: "🍚" },
    { id: 2, name: "중식", count: 32, emoji: "🥢" },
    { id: 3, name: "일식", count: 28, emoji: "🍱" },
    { id: 4, name: "양식", count: 23, emoji: "🍕" },
  ];

  return (
    <main className="min-h-screen">
      {/* 헤더 영역 */}
      <Header />

      {/* 메인 배너 이미지 */}
      <div className="relative w-full h-96 bg-gradient-to-br from-yellow-100 via-yellow-200 to-yellow-300 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black/5 z-10"></div>
        <div className="absolute -right-24 -bottom-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -left-24 -top-24 w-96 h-96 bg-yellow-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-20 text-center w-full max-w-md mx-auto">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-sm border border-slate-200/50">
            <h1 className="text-5xl font-bold text-slate-800 mb-4 text-center">
              DDP
            </h1>
            <p className="text-xl text-slate-700 mb-1 text-center">
              Dongdaemun Dealicious sPot
            </p>
            <p className="text-lg text-slate-600 text-center">
              동대문 맛집을 한눈에
            </p>
          </div>
        </div>
      </div>

      {/* 검색 필터 영역 */}
      <SearchFilter />

      {/* 맛집 리스트 영역 */}
      <div className="container mx-auto py-12 px-4">
        <div className="p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-yellow-400 inline-block text-slate-700">
            추천 맛집
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                name={restaurant.name}
                category={restaurant.category}
                location={restaurant.location}
                rating={restaurant.rating}
                views={restaurant.views}
                date={restaurant.date}
                emoji={restaurant.emoji}
              />
            ))}
          </div>
        </div>

        {/* 인기 맛집 섹션 */}
        <div className="mt-16 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-yellow-400 inline-block text-slate-700">
            인기 맛집
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {popularRestaurants.map((restaurant) => (
              <PopularRestaurant
                key={restaurant.id}
                name={restaurant.name}
                views={restaurant.views}
                emoji={restaurant.emoji}
              />
            ))}
          </div>
        </div>

        {/* 카테고리 섹션 */}
        <div className="mt-16 p-6 bg-white/90 backdrop-blur-sm rounded-xl border border-slate-200/80 shadow-sm">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-yellow-400 inline-block text-slate-700">
            카테고리
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryItem
                key={category.id}
                name={category.name}
                count={category.count}
                emoji={category.emoji}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 푸터 영역 */}
      <Footer />
    </main>
  );
}
