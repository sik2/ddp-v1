"use client";

import { useState, useEffect, useRef } from "react";

export default function CafeSearchFilter() {
  const [selectedArea, setSelectedArea] = useState("영역선택");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const areas = [
    { name: "Blue", color: "bg-blue-500" },
    { name: "Orange", color: "bg-orange-500" },
    { name: "Pink", color: "bg-pink-500" },
    { name: "Yellow", color: "bg-yellow-500" },
    { name: "Green", color: "bg-green-500" },
  ];

  const getSelectedColor = () => {
    const selected = areas.find((area) => area.name === selectedArea);
    return selected ? selected.color : "";
  };

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    setIsOpen(false);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-4">
      <div className="w-full relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full p-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-slate-600 bg-white flex justify-between items-center hover:border-blue-300 shadow-sm"
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOpen}
        >
          <div className="flex items-center">
            {selectedArea !== "영역선택" && (
              <span
                className={`w-4 h-4 rounded-full mr-2 ${getSelectedColor()}`}
              ></span>
            )}
            <span>{selectedArea}</span>
          </div>
          <svg
            className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${
              isOpen ? "transform rotate-180" : ""
            }`}
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
        </button>

        {isOpen && (
          <div
            className="absolute top-full left-0 w-full mt-1 bg-white border border-slate-200 rounded-md shadow-lg py-1 max-h-60 overflow-auto z-50"
            role="listbox"
          >
            <div
              className="p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center"
              onClick={() => handleAreaSelect("영역선택")}
              role="option"
              aria-selected={selectedArea === "영역선택"}
            >
              <span>영역선택</span>
            </div>
            {areas.map((area) => (
              <div
                key={area.name}
                className="p-3 hover:bg-blue-50 cursor-pointer transition-colors duration-150 flex items-center"
                onClick={() => handleAreaSelect(area.name)}
                role="option"
                aria-selected={selectedArea === area.name}
              >
                <span
                  className={`w-4 h-4 rounded-full mr-2 ${area.color}`}
                ></span>
                <span>{area.name}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        className="w-full sm:w-auto bg-blue-400 text-white px-8 py-3 rounded-md font-medium hover:bg-blue-500 active:bg-blue-600 transform hover:scale-105 active:scale-95 transition-all duration-200 border border-blue-400 hover:border-blue-500 shadow-sm"
        type="button"
      >
        검색
      </button>
    </div>
  );
}
