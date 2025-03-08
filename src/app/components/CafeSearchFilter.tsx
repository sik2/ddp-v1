"use client";

import { useState, useEffect, useRef } from "react";
import { Spot } from "@/types";
import SpotCard from "./SpotCard";
import { getCafes } from "@/lib/api";

interface CafeSearchFilterProps {
  initialCafes: Spot[];
}

export default function CafeSearchFilter({
  initialCafes,
}: CafeSearchFilterProps) {
  const [selectedArea, setSelectedArea] = useState("영역선택");
  const [isOpen, setIsOpen] = useState(false);
  const [allCafes, setAllCafes] = useState<Spot[]>(initialCafes);
  const [filteredCafes, setFilteredCafes] = useState<Spot[]>(initialCafes);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const areas = [
    { name: "Blue", color: "bg-blue-500" },
    { name: "Orange", color: "bg-orange-500" },
    { name: "Pink", color: "bg-pink-500" },
    { name: "Yellow", color: "bg-yellow-500" },
    { name: "Green", color: "bg-green-500" },
  ];

  // 페이지 로드 시 데이터 새로 가져오기
  useEffect(() => {
    // 서버에서 받은 데이터가 있으면 추가 요청 없이 사용
    if (initialCafes && initialCafes.length > 0) {
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const cafes = await getCafes();
        setAllCafes(cafes);
        setFilteredCafes(cafes);
      } catch (error) {
        console.error("카페 데이터 가져오기 오류:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [initialCafes]);

  const getSelectedColor = () => {
    const selected = areas.find((area) => area.name === selectedArea);
    return selected ? selected.color : "";
  };

  const handleAreaSelect = (area: string) => {
    setSelectedArea(area);
    setIsOpen(false);

    // 영역 선택에 따라 필터링
    if (area === "영역선택") {
      setFilteredCafes(allCafes); // 모든 카페 표시
    } else {
      // 선택된 색상에 해당하는 카페만 필터링
      const filtered = allCafes.filter((cafe) => cafe.color?.name === area);
      setFilteredCafes(filtered);
    }
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
    <div>
      <div className="bg-white rounded-lg shadow-sm p-4 border border-slate-200/80 flex flex-col sm:flex-row items-stretch gap-4 mb-6">
        <div className="w-full sm:flex-1 relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full h-full p-3 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all duration-300 text-slate-600 bg-white flex justify-between items-center hover:border-blue-300 shadow-sm"
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
      </div>

      {/* 필터링된 카페 목록 */}
      <div className="mt-4">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 pb-2 border-b border-blue-400 inline-block text-slate-700">
          {selectedArea === "영역선택" ? "모든 카페" : `${selectedArea} 카페`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {isLoading ? (
            <div className="col-span-full text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
              <p className="text-slate-600">데이터를 불러오는 중입니다...</p>
            </div>
          ) : filteredCafes.length > 0 ? (
            filteredCafes.map((cafe) => <SpotCard key={cafe.id} spot={cafe} />)
          ) : (
            <p className="col-span-full text-center py-8 text-slate-500">
              해당 영역에 카페가 없습니다.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
