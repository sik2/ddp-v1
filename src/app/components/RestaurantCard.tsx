interface RestaurantCardProps {
  name: string;
  category: string;
  rating: number;
  views: number;
  date: string;
  emoji: string;
  mapUrl?: string; // 네이버 지도 URL (선택적)
}

export default function RestaurantCard({
  name,
  category,
  rating,
  views,
  date,
  emoji,
  mapUrl,
}: RestaurantCardProps) {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-slate-200/80 hover:border-yellow-400 transition-colors duration-300">
      <div className="relative h-64 bg-slate-50/80 flex items-center justify-center">
        <span className="text-8xl">{emoji}</span>
      </div>
      <div className="p-6">
        <div className="flex items-center mb-2">
          <span className="text-sm text-slate-500">{category}</span>
          <div className="ml-auto flex items-center">
            <svg
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
            </svg>
            <span className="ml-1 text-sm font-medium text-slate-600">
              {rating}
            </span>
          </div>
        </div>
        <h3 className="text-xl font-bold mb-3 text-slate-700">{name}</h3>
        {mapUrl ? (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 mb-4 hover:text-yellow-500 transition-colors duration-300 flex items-center text-base font-medium"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              ></path>
            </svg>
            네이버 지도에서 보기
          </a>
        ) : null}
        <div className="flex items-center justify-between text-sm text-slate-500 mt-3">
          <span>조회수 {views.toLocaleString()}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
