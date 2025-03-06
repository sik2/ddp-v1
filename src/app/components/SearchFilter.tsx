export default function SearchFilter() {
  return (
    <div className="container mx-auto -mt-8 relative z-20 px-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-sm p-4 border border-slate-200/80 flex items-center space-x-4">
        <div className="flex-1">
          <div className="relative">
            <select className="w-full p-3 border border-slate-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors duration-300 text-slate-600 bg-white">
              <option>지역선택</option>
              <option>서울</option>
              <option>부산</option>
              <option>대구</option>
              <option>인천</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <select className="w-full p-3 border border-slate-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors duration-300 text-slate-600 bg-white">
              <option>음식종류</option>
              <option>한식</option>
              <option>중식</option>
              <option>일식</option>
              <option>양식</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <div className="relative">
            <select className="w-full p-3 border border-slate-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors duration-300 text-slate-600 bg-white">
              <option>가격대</option>
              <option>1만원 이하</option>
              <option>1~2만원</option>
              <option>2~3만원</option>
              <option>3만원 이상</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <button className="bg-yellow-400 text-white px-8 py-3 rounded-md font-medium hover:bg-yellow-500 transition-colors duration-300 border border-yellow-400 hover:border-yellow-500 shadow-sm">
          검색
        </button>
      </div>
    </div>
  );
}
