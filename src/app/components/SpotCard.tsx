import { Spot } from "@/types";

interface SpotCardProps {
  spot: Spot;
}

export default function SpotCard({ spot }: SpotCardProps) {
  // 색상에 따른 배경색 설정
  const getBgColor = (colorName?: string) => {
    switch (colorName?.toLowerCase()) {
      case "blue":
        return "bg-cyan-50 hover:border-cyan-400";
      case "orange":
        return "bg-orange-50 hover:border-orange-400";
      case "pink":
        return "bg-pink-50 hover:border-pink-400";
      case "yellow":
        return "bg-yellow-50 hover:border-yellow-400";
      case "green":
        return "bg-green-50 hover:border-green-400";
      default:
        return "bg-slate-50 hover:border-slate-400";
    }
  };

  // 색상에 따른 뱃지 배경색 설정
  const getBadgeBgColor = (colorName?: string) => {
    switch (colorName?.toLowerCase()) {
      case "blue":
        return "bg-cyan-200 text-cyan-800";
      case "orange":
        return "bg-orange-200 text-orange-800";
      case "pink":
        return "bg-pink-200 text-pink-800";
      case "yellow":
        return "bg-yellow-200 text-yellow-800";
      case "green":
        return "bg-green-200 text-green-800";
      default:
        return "bg-slate-200 text-slate-700";
    }
  };

  return (
    <div
      className={`rounded-lg overflow-hidden shadow-md border border-slate-200/80 ${getBgColor(
        spot.color?.name
      )} transition-colors duration-300 flex flex-col h-[320px]`}
    >
      <div className="flex items-center p-4 border-b border-slate-200/60">
        <span className="text-5xl mr-3">{spot.emoji}</span>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-700 mb-1 line-clamp-1">
            {spot.name}
          </h3>
          <div className="flex items-center">
            <span className="text-xs text-slate-500">
              {spot.category?.name}
            </span>
            <span
              className={`ml-2 inline-block px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeBgColor(
                spot.color?.name
              )}`}
            >
              {spot.color?.name}
            </span>
          </div>
        </div>
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-sm text-slate-600 mb-5 flex-1 line-clamp-8">
          {spot.description || "설명 없음"}
        </p>
        <a
          href={spot.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-yellow-500 transition-colors duration-300 flex items-center text-sm font-medium mt-auto"
        >
          <svg
            className="w-4 h-4 mr-1"
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
      </div>
    </div>
  );
}
