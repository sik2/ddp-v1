"use client";

import { useState, useEffect } from "react";
import { addSpot, getCategories, getColors } from "@/lib/api";
import { Category, Color } from "@/types";
import Toast from "./Toast";
import Image from "next/image";

// 이모지 목록
const emojiOptions = [
  {
    category: "음식",
    emojis: [
      "🍚",
      "🍜",
      "🍲",
      "🍱",
      "🍛",
      "🍝",
      "🍕",
      "🍔",
      "🌮",
      "🥘",
      "🍖",
      "🍗",
      "🥩",
      "🍤",
      "🍣",
      "🍙",
      "🍘",
      "🥟",
      "🥡",
      "🥢",
      "🌯",
      "🥙",
      "🥪",
      "🌭",
      "🍟",
      "🍳",
      "🥓",
      "🥚",
      "🧆",
      "🥗",
      "🥨",
      "🧀",
      "🥖",
      "🫔",
      "🌽",
      "🍠",
      "🥮",
    ],
  },
  {
    category: "음료",
    emojis: [
      "☕",
      "🍵",
      "🧃",
      "🥤",
      "🧋",
      "🍹",
      "🍸",
      "🍷",
      "🍺",
      "🍻",
      "🧉",
      "🍶",
      "🥛",
      "🍼",
      "🫖",
      "🧊",
      "🍾",
      "🥂",
      "🍽️",
    ],
  },
  {
    category: "디저트",
    emojis: [
      "🍰",
      "🎂",
      "🧁",
      "🍮",
      "🍦",
      "🍨",
      "🍧",
      "🍩",
      "🍪",
      "🥐",
      "🥯",
      "🥞",
      "🧇",
      "🍞",
      "🍫",
      "🍬",
      "🍭",
      "🍯",
      "🍡",
      "🍥",
      "🥠",
      "🥧",
      "🍓",
      "🍇",
      "🍈",
      "🍉",
      "🍊",
      "🍋",
      "🍌",
      "🍍",
      "🥭",
      "🍎",
      "🍏",
      "🍐",
      "🍑",
      "🍒",
      "🍅",
      "🫐",
      "🥝",
    ],
  },
];

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    category_id: 1, // 기본값: 맛집
    color_id: 1, // 기본값: Blue
    url: "",
    description: "",
    emoji: "🍚", // 기본 이모지
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error",
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [colors, setColors] = useState<Color[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // 카테고리와 색상 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, colorsData] = await Promise.all([
          getCategories(),
          getColors(),
        ]);

        setCategories(categoriesData);
        setColors(colorsData);

        // 기본값 설정
        if (categoriesData.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category_id: categoriesData[0].id,
          }));
        }
        if (colorsData.length > 0) {
          setFormData((prev) => ({ ...prev, color_id: colorsData[0].id }));
        }
      } catch (err) {
        console.error("데이터 가져오기 오류:", err);
        setError("카테고리와 색상 데이터를 가져오는 중 오류가 발생했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name.includes("_id") ? parseInt(value) : value,
    }));
  };

  const handleEmojiSelect = (emoji: string) => {
    setFormData((prev) => ({ ...prev, emoji }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setToast({ isVisible: false, message: "", type: "success" });

    try {
      // 필수 필드 검증
      if (!formData.name || !formData.url) {
        throw new Error("이름과 URL은 필수 입력 항목입니다.");
      }

      // URL 형식 검증 (네이버 지도 URL인지)
      if (
        !formData.url.includes("naver.me") &&
        !formData.url.includes("map.naver.com")
      ) {
        throw new Error("네이버 지도 URL을 입력해주세요.");
      }

      // 콘솔에 등록 시도 로그
      console.log("등록 시도:", formData);

      // Supabase에 데이터 추가
      const result = await addSpot(formData);

      // 토스트 메시지 표시
      setToast({
        isVisible: true,
        message: `'${formData.name}'이(가) 성공적으로 등록되었습니다!`,
        type: "success",
      });

      console.log("등록 완료:", result);

      // 폼 초기화
      setFormData({
        name: "",
        category_id: categories.length > 0 ? categories[0].id : 1,
        color_id: colors.length > 0 ? colors[0].id : 1,
        url: "",
        description: "",
        emoji: "🍚",
      });
    } catch (err) {
      console.error("등록 오류:", err);
      setError(
        err instanceof Error ? err.message : "등록 중 오류가 발생했습니다."
      );
      setToast({
        isVisible: true,
        message:
          err instanceof Error ? err.message : "등록 중 오류가 발생했습니다.",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200/80 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400 mx-auto mb-4"></div>
          <p className="text-slate-600">데이터를 불러오는 중입니다...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200/80">
      <h2 className="text-2xl font-bold mb-6 pb-2 border-b border-yellow-400 inline-block text-slate-700">
        맛집/카페 신규 등록
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 이름 */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            이름 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="맛집/카페 이름"
            required
          />
        </div>

        {/* 카테고리 */}
        <div>
          <label
            htmlFor="category_id"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            카테고리 <span className="text-red-500">*</span>
          </label>
          <select
            id="category_id"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 bg-white"
            required
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* 맛집 지도 이미지 */}
        <div className="p-4 bg-white rounded-lg border border-slate-200/80 overflow-hidden">
          <h3 className="text-lg font-bold mb-3 pb-1 border-b border-yellow-400 inline-block text-slate-700">
            맛집 지도
          </h3>
          <div className="relative w-full h-[300px] sm:h-[500px] md:h-[600px] lg:h-[800px]">
            <Image
              src="/section.png"
              alt="맛집 지도"
              fill
              className="object-contain rounded-lg"
              priority
            />
          </div>
        </div>

        {/* 색상 그룹 */}
        <div>
          <label
            htmlFor="color_id"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            색상 그룹 <span className="text-red-500">*</span>
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 mb-2">
            {colors.map((color) => (
              <div
                key={color.id}
                onClick={() =>
                  setFormData((prev) => ({ ...prev, color_id: color.id }))
                }
                className={`p-2 sm:p-3 rounded-md cursor-pointer flex items-center justify-center border ${
                  formData.color_id === color.id
                    ? "border-slate-700 ring-2 ring-slate-400"
                    : "border-slate-200"
                }`}
              >
                <div
                  className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full ${
                    color.name === "Blue"
                      ? "bg-blue-500"
                      : color.name === "Orange"
                      ? "bg-orange-500"
                      : color.name === "Pink"
                      ? "bg-pink-500"
                      : color.name === "Yellow"
                      ? "bg-yellow-500"
                      : "bg-green-500"
                  }`}
                ></div>
                <span className="ml-1 sm:ml-2 text-xs sm:text-sm">
                  {color.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* URL */}
        <div>
          <label
            htmlFor="url"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            네이버 지도 URL <span className="text-red-500">*</span>
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleChange}
            className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="https://naver.me/xxxxx"
            required
          />
          <p className="mt-1 text-xs text-slate-500">
            네이버 지도에서 공유 버튼을 눌러 URL을 복사해주세요.
          </p>
        </div>

        {/* 설명 */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-slate-700 mb-1"
          >
            설명
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full p-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
            placeholder="맛집/카페에 대한 간단한 설명을 입력해주세요."
          ></textarea>
        </div>

        {/* 이모지 선택 */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            이모지 선택 <span className="text-red-500">*</span>
          </label>
          <div className="p-2 sm:p-3 border border-slate-300 rounded-md">
            <div className="mb-2 text-base sm:text-lg">
              선택된 이모지:{" "}
              <span className="text-xl sm:text-2xl">{formData.emoji}</span>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {emojiOptions.map((category) => (
                <div key={category.category}>
                  <h4 className="text-xs sm:text-sm font-medium text-slate-600 mb-1 sm:mb-2">
                    {category.category}
                  </h4>
                  <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-1 sm:gap-2">
                    {category.emojis.map((emoji) => (
                      <button
                        key={emoji}
                        type="button"
                        onClick={() => handleEmojiSelect(emoji)}
                        className={`text-xl sm:text-2xl p-1 sm:p-2 rounded-md hover:bg-slate-100 ${
                          formData.emoji === emoji
                            ? "bg-yellow-100 border border-yellow-300"
                            : ""
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-yellow-400 hover:bg-yellow-500 text-white font-medium rounded-md shadow-sm transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </form>

      {/* 토스트 알림 */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}
