# DDP - Dongdaemun Dealicious sPot

동대문 맛집과 카페 정보 서비스

## 프로젝트 설정

1. 의존성 설치:

```bash
npm install
```

2. 개발 서버 실행:

```bash
npm run dev
```

## Supabase 설정

### 1. Supabase 계정 생성 및 프로젝트 생성

1. [Supabase](https://supabase.com/)에 가입합니다.
2. 새 프로젝트를 생성합니다.

### 2. 데이터베이스 스키마 설정

SQL 에디터에서 다음 쿼리를 실행하여 필요한 테이블을 생성합니다:

```sql
-- 기존 테이블 삭제 (테스트 환경인 경우)
DROP TABLE IF EXISTS establishments;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS colors;

-- 1. 카테고리 테이블 생성 (맛집, 카페)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE
);

-- 2. 색상(그룹) 테이블 생성 (Blue, Orange, Pink, Yellow, Green)
CREATE TABLE colors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
);

-- 3. 맛집 및 카페 정보 테이블 생성
CREATE TABLE establishments (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    color_id INTEGER NOT NULL REFERENCES colors(id),
    name VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    description TEXT,
    emoji TEXT  -- 이모지 썸네일 컬럼
);

-- 4. 카테고리 데이터 삽입
INSERT INTO categories (name)
VALUES ('맛집'), ('카페');

-- 5. 색상 데이터 삽입
INSERT INTO colors (name)
VALUES ('Blue'), ('Orange'), ('Pink'), ('Yellow'), ('Green');
```

### 3. 맛집 및 카페 데이터 삽입

SQL 에디터에서 다음 쿼리를 실행하여 샘플 데이터를 삽입합니다:

```sql
-- 6. 맛집 데이터 삽입
INSERT INTO establishments (category_id, color_id, name, url, description, emoji) VALUES
-- Blue 그룹
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Blue'),
 '상구네 식당',
 'https://naver.me/F7ChNJGT',
 '강사 / 매니저들은 한 번도 안 가보았지만, SUS 7~9기 모두가 추천했었던 백반집',
 '🍚'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Blue'),
 '우미회전초밥',
 'https://naver.me/GdJ1D1HC',
 '가성비 좋은 회전 초밥',
 '🍚'),

-- Orange 그룹
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Orange'),
 '코너집',
 'https://naver.me/Gtt9IRQ0',
 '동대문역사문화공원계의 김밥천국',
 '🍙'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Orange'),
 '미국식 신당점',
 'https://naver.me/IDbvEpz0',
 '조금 독특한 햄버거집',
 '🍔'),

-- Pink 그룹
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Pink'),
 '숲마마키친',
 'https://naver.me/FIgwwcSM',
 '정갈한 퓨전 한식',
 '🍚'),

-- Yellow 그룹
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '남소영가마솥',
 'https://naver.me/5zJVytaE',
 '돌솥밥에 다양한 한정식이 땡긴다면?? (개인적으로는 보쌈 정식 추천!)',
 '🍚'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '별내옥 설농탕',
 'https://naver.me/5Ndq4217',
 '깔끔한 설농탕 맛집',
 '🍚'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '평양면옥',
 'https://naver.me/5HSENuiK',
 '근본 있는 평냉을 원하신다면 ㄱ',
 '🍚'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '러플리버거',
 'https://naver.me/5pH2MwUs',
 '치즈버거 맛집',
 '🍔'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '서울 곰탕',
 'https://naver.me/5U1stL62',
 '돼지 곰탕 맛집',
 '🍲'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '우레카츠',
 'https://naver.me/Fk7ckjnw',
 '돈까스 맛집',
 '🍗'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '일미정',
 'https://naver.me/xivqJAsO',
 '숯불 제육 볶음 맛집',
 '🍲'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '장충동진두부집',
 'https://naver.me/5Czpi0eJ',
 '두부 맛집',
 '🍲'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '참맛 고깃집',
 'https://naver.me/xivLqxGq',
 '요일 별 갓차 점심 특선 (with. 솥밥)',
 '🍲'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '황태와 쭈꾸미',
 'https://naver.me/GvkcBnL1',
 '쭈꾸미 맛집!',
 '🍲'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '콩365',
 'https://naver.me/GhPQimaE',
 '현지 느낌의 쌀국수 맛집',
 '🍜'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '한우 차돌집',
 'https://naver.me/FLBKygYu',
 '샤브샤브 & 국수 전골 1만원의 행복',
 '🍲'),

-- Green 그룹
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Green'),
 '골목집황포돛배',
 'https://naver.me/5Rct1fEy',
 '쌈밥',
 '🍚'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Green'),
 '김삼보 을지로점',
 'https://naver.me/5mYBSqJo',
 '깔끔한 김치찌개',
 '🍲'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Green'),
 '마라땡겨 마라탕',
 'https://naver.me/5Dj5ISdr',
 '마라탕 맛집 (But, 비쌈..ㅠ)',
 '🍲'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Green'),
 '메이찬',
 'https://naver.me/5L3HllQk',
 '저렴한 중국집',
 '🍜'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Green'),
 '샤오바오우육면 동대문',
 'https://naver.me/GSgDvA3q',
 '개인적으로 좋아하는 마장면 맛집',
 '🍜'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Green'),
 '우리집칼국수',
 'https://naver.me/GnGXBSjR',
 '9000원의 행복',
 '🍜'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Green'),
 '퍼퓰러',
 'https://naver.me/xrP6NoXL',
 '쌀국수 맛집',
 '🍜'),
((SELECT id FROM categories WHERE name='맛집'),
 (SELECT id FROM colors WHERE name='Green'),
 '황소곱창한판구이',
 'https://naver.me/FqSZyl76',
 '찐한 김치찌개가 땡긴다면 여기로!',
 '🍲'),

-- 7. 카페 데이터 삽입
INSERT INTO establishments (category_id, color_id, name, url, description, emoji) VALUES
-- Green 그룹
((SELECT id FROM categories WHERE name='카페'),
 (SELECT id FROM colors WHERE name='Green'),
 '매머드익스프레스',
 'https://naver.me/GWeJPPU1',
 '가성비 카페',
 '☕'),

-- Orange 그룹
((SELECT id FROM categories WHERE name='카페'),
 (SELECT id FROM colors WHERE name='Orange'),
 '애락',
 'https://naver.me/GpfopGah',
 '핸드드립 커피',
 '☕'),

-- Yellow 그룹
((SELECT id FROM categories WHERE name='카페'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '콘하스',
 'https://naver.me/xt5lfnaZ',
 '날씨가 좋은 날에는 여기! & 근방에서 늦게 까지 여는 카페',
 '☕'),
((SELECT id FROM categories WHERE name='카페'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '버터힐 키친',
 'https://naver.me/5PZluDJz',
 '금요일에 오픈펀하러 가서 앙버터 소금빵을 먹어야하는 카페',
 '🍞'),
((SELECT id FROM categories WHERE name='카페'),
 (SELECT id FROM colors WHERE name='Yellow'),
 '커피빈 동대입구역점',
 'https://naver.me/xcKJDucF',
 '냥이빈',
 '🐱'),

-- Pink 그룹
((SELECT id FROM categories WHERE name='카페'),
 (SELECT id FROM colors WHERE name='Pink'),
 '써미트호텔',
 'https://naver.me/FH7649nJ',
 '생각보다 퀄리티 좋은 커피 맛집',
 '☕'),

-- 8. 환경 변수 설정

`.env.local` 파일을 생성하고 Supabase 프로젝트의 URL과 API 키를 입력합니다:

```

NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

```

프로젝트 설정 > API > URL과 anon key를 복사하세요.

## 기능

- 맛집 목록 조회
- 카페 목록 조회
- 카테고리별 필터링
- 색상(그룹)별 필터링

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- Supabase
```
