export default function SearchFilter() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200/80 flex items-center space-x-4">
      <div className="flex-1">
        <div className="relative">
          <select className="w-full p-3 border border-slate-200 rounded-md appearance-none focus:outline-none focus:ring-1 focus:ring-yellow-400 focus:border-yellow-400 transition-colors duration-300 text-slate-600 bg-white">
            <option>영역선택</option>
            <option>Blue</option>
            <option>Orange</option>
            <option>Pink</option>
            <option>Yellow</option>
            <option>Green</option>
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
  );
}
