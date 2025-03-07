import { supabase } from "./supabase";
import { Establishment, Category, Color } from "../types";

// 카테고리 가져오기
export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("id");

  if (error) {
    console.error("카테고리 가져오기 오류:", error);
    return [];
  }

  return data || [];
}

// 색상 가져오기
export async function getColors(): Promise<Color[]> {
  const { data, error } = await supabase.from("colors").select("*").order("id");

  if (error) {
    console.error("색상 가져오기 오류:", error);
    return [];
  }

  return data || [];
}

// 모든 맛집 및 카페 데이터 가져오기
export async function getAllEstablishments(): Promise<Establishment[]> {
  const { data, error } = await supabase
    .from("establishments")
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
export async function getEstablishmentsByCategory(
  categoryName: string
): Promise<Establishment[]> {
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
    .from("establishments")
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
export async function getEstablishmentsByColor(
  colorName: string,
  categoryName?: string
): Promise<Establishment[]> {
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
    .from("establishments")
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
export async function getRestaurants(): Promise<Establishment[]> {
  return getEstablishmentsByCategory("맛집");
}

// 카페 데이터 가져오기
export async function getCafes(): Promise<Establishment[]> {
  return getEstablishmentsByCategory("카페");
}

// 인기 맛집 가져오기 (Yellow 색상 그룹의 맛집을 인기 맛집으로 설정)
export async function getPopularRestaurants(
  limit: number = 4
): Promise<Establishment[]> {
  const restaurants = await getEstablishmentsByColor("Yellow", "맛집");
  return restaurants.slice(0, limit);
}

// 인기 카페 가져오기 (Yellow 색상 그룹의 카페를 인기 카페로 설정)
export async function getPopularCafes(
  limit: number = 4
): Promise<Establishment[]> {
  const cafes = await getEstablishmentsByColor("Yellow", "카페");
  return cafes.slice(0, limit);
}
