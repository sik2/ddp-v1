import { supabase } from "./supabase";
import { Spot, Category, Color, Notice, NoticeComment } from "../types";

/**
 * 새로운 맛집/카페 등록을 위한 타입
 */
type SpotInput = Omit<
  Spot,
  "id" | "created_at" | "updated_at" | "category" | "color"
>;

/**
 * 새로운 공지사항 댓글 등록을 위한 타입
 */
type NoticeCommentInput = Pick<NoticeComment, "notice_id" | "content">;

// 간단한 메모리 캐시 구현
interface CacheItem<T> {
  data: T;
  timestamp: number;
}

const cache: Record<string, CacheItem<any>> = {};

// 캐시 유효 시간 (밀리초)
const CACHE_TTL = 60000; // 60초

// 캐시에서 데이터 가져오기
function getFromCache<T>(key: string): T | null {
  const item = cache[key];
  if (!item) return null;

  const now = Date.now();
  if (now - item.timestamp > CACHE_TTL) {
    // 캐시 만료
    delete cache[key];
    return null;
  }

  return item.data;
}

// 캐시에 데이터 저장
function setToCache<T>(key: string, data: T): void {
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
}

// 카테고리 가져오기
export async function getCategories(): Promise<Category[]> {
  const cacheKey = "categories";
  const cachedData = getFromCache<Category[]>(cacheKey);
  if (cachedData) return cachedData;

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");

  if (error) {
    console.error("카테고리 가져오기 오류:", error);
    return [];
  }

  const result = data || [];
  setToCache(cacheKey, result);
  return result;
}

// 색상 가져오기
export async function getColors(): Promise<Color[]> {
  const cacheKey = "colors";
  const cachedData = getFromCache<Color[]>(cacheKey);
  if (cachedData) return cachedData;

  const { data, error } = await supabase.from("colors").select("*").order("id");

  if (error) {
    console.error("색상 가져오기 오류:", error);
    return [];
  }

  const result = data || [];
  setToCache(cacheKey, result);
  return result;
}

// 모든 맛집 및 카페 데이터 가져오기
export async function getAllSpots(): Promise<Spot[]> {
  const { data, error } = await supabase
    .from("spots")
    .select(
      `
      *,
      category:categories(*),
      color:colors(*)
    `
    )
    .order("name");

  if (error) {
    console.error("맛집 및 카페 데이터 가져오기 오류:", error);
    return [];
  }

  return data || [];
}

// 카테고리별 맛집 및 카페 데이터 가져오기
export async function getSpotsByCategory(
  categoryName: string
): Promise<Spot[]> {
  const { data: categoryData, error: categoryError } = await supabase
    .from("categories")
    .select("id")
    .eq("name", categoryName)
    .single();

  if (categoryError) {
    console.error(`카테고리 ID 가져오기 오류: ${categoryName}`, categoryError);
    return [];
  }

  const categoryId = categoryData.id;

  const { data, error } = await supabase
    .from("spots")
    .select(
      `
      *,
      category:categories(*),
      color:colors(*)
    `
    )
    .eq("category_id", categoryId)
    .order("name");

  if (error) {
    console.error(`카테고리별 데이터 가져오기 오류: ${categoryName}`, error);
    return [];
  }

  return data || [];
}

// 색상별 맛집 및 카페 데이터 가져오기
export async function getSpotsByColor(
  colorName: string,
  categoryName?: string
): Promise<Spot[]> {
  // 색상 ID 가져오기
  const { data: colorData, error: colorError } = await supabase
    .from("colors")
    .select("id")
    .eq("name", colorName)
    .single();

  if (colorError) {
    console.error(`색상 ID 가져오기 오류: ${colorName}`, colorError);
    return [];
  }

  const colorId = colorData.id;

  // 기본 쿼리 설정
  let query = supabase
    .from("spots")
    .select(
      `
      *,
      category:categories(*),
      color:colors(*)
    `
    )
    .eq("color_id", colorId);

  // 카테고리명이 제공된 경우 추가 필터링
  if (categoryName) {
    const { data: categoryData, error: categoryError } = await supabase
      .from("categories")
      .select("id")
      .eq("name", categoryName)
      .single();

    if (categoryError) {
      console.error(
        `카테고리 ID 가져오기 오류: ${categoryName}`,
        categoryError
      );
    } else {
      query = query.eq("category_id", categoryData.id);
    }
  }

  const { data, error } = await query.order("name");

  if (error) {
    console.error(`색상별 데이터 가져오기 오류: ${colorName}`, error);
    return [];
  }

  return data || [];
}

// 맛집 데이터 가져오기
export async function getSpots(): Promise<Spot[]> {
  return getSpotsByCategory("맛집");
}

// 카페 데이터 가져오기
export async function getCafes(): Promise<Spot[]> {
  return getSpotsByCategory("카페");
}

// 인기 맛집 가져오기 (Yellow 색상 그룹의 맛집을 인기 맛집으로 설정)
export async function getPopularSpots(limit: number = 4): Promise<Spot[]> {
  const spots = await getSpotsByColor("Yellow", "맛집");
  return spots.slice(0, limit);
}

// 인기 카페 가져오기 (Yellow 색상 그룹의 카페를 인기 카페로 설정)
export async function getPopularCafes(limit: number = 4): Promise<Spot[]> {
  const cafes = await getSpotsByColor("Yellow", "카페");
  return cafes.slice(0, limit);
}

// 맛집/카페 등록 함수 추가
export async function addSpot(data: SpotInput) {
  console.log("등록 데이터:", data);

  try {
    const { data: insertedData, error } = await supabase
      .from("spots")
      .insert([data])
      .select();

    if (error) {
      console.error("맛집/카페 등록 오류:", error);
      throw new Error(
        `맛집/카페 등록 중 오류가 발생했습니다: ${error.message}`
      );
    }

    console.log("등록 성공:", insertedData);
    return insertedData;
  } catch (err) {
    console.error("Supabase 오류:", err);
    throw err;
  }
}

// 공지사항 목록 가져오기
export async function getNotices(): Promise<Notice[]> {
  const cacheKey = "notices";
  const cachedData = getFromCache<Notice[]>(cacheKey);
  if (cachedData) return cachedData;

  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("공지사항 목록 가져오기 오류:", error);
    return [];
  }

  const result = data || [];
  setToCache(cacheKey, result);
  return result;
}

// 공지사항 상세 정보 가져오기
export async function getNoticeById(id: number): Promise<Notice | null> {
  const cacheKey = `notice_${id}`;
  const cachedData = getFromCache<Notice | null>(cacheKey);
  if (cachedData) return cachedData;

  const { data, error } = await supabase
    .from("notices")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(`공지사항 상세 정보 가져오기 오류: ${id}`, error);
    return null;
  }

  setToCache(cacheKey, data);
  return data;
}

// 공지사항 댓글 목록 가져오기
export async function getNoticeComments(
  noticeId: number
): Promise<NoticeComment[]> {
  const cacheKey = `notice_comments_${noticeId}`;
  const cachedData = getFromCache<NoticeComment[]>(cacheKey);
  if (cachedData) return cachedData;

  const { data, error } = await supabase
    .from("notice_comments")
    .select("*")
    .eq("notice_id", noticeId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(`공지사항 댓글 목록 가져오기 오류: ${noticeId}`, error);
    return [];
  }

  const result = data || [];
  setToCache(cacheKey, result);
  return result;
}

// 공지사항 댓글 추가
export async function addNoticeComment(
  data: NoticeCommentInput
): Promise<NoticeComment | null> {
  try {
    const { data: insertedData, error } = await supabase
      .from("notice_comments")
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error("댓글 등록 오류:", error);
      return null;
    }

    // 댓글이 추가되면 해당 공지사항의 댓글 캐시 무효화
    const cacheKey = `notice_comments_${data.notice_id}`;
    delete cache[cacheKey];

    return insertedData;
  } catch (err) {
    console.error("Supabase 댓글 등록 오류:", err);
    return null;
  }
}
