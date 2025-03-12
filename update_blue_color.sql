-- Blue 색상의 RGB 값을 #80DFEA로 업데이트하는 SQL 스크립트
-- 참고: 실제 데이터베이스 스키마에 따라 테이블명과 컬럼명을 조정해야 할 수 있습니다.

-- 색상 테이블에서 Blue 색상의 RGB 값 업데이트
UPDATE colors
SET rgb_value = '#80DFEA'
WHERE name = 'Blue';

-- 변경 확인
SELECT id, name, rgb_value
FROM colors
WHERE name = 'Blue'; 