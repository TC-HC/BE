-- 각 카테고리 별로 몇 개의 게시물이 있는지 집계 & 몇 명의 구독자가 있는지 집계
SELECT 
    c.id,
    c.name,
    COUNT(DISTINCT cp."B") AS postCount,
    COUNT(DISTINCT cu."B") AS subscriberCount
FROM "Category" c
LEFT JOIN "_CategoryToPost" cp ON c.id = cp."A"
LEFT JOIN "_CategoryToUser" cu ON c.id = cu."A"
GROUP BY c.id, c.name
ORDER BY c.id ASC;


-- 사용자(본인)의 카테고리 구독 현황 및 작성한 글의 수 반환 및 목록을 반환
SELECT
    c.id,
    c.name,
    (cu."B" IS NOT NULL) AS "isSubscribed",
    COUNT(p.id) AS "myPostCount"
FROM "Category" c
LEFT JOIN "_CategoryToUser" cu ON c.id = cu."A" AND cu."B" = 'bfa786e8-97af-4f3c-8106-ae023690f4bb'
LEFT JOIN "_CategoryToPost" cp ON c.id = cp."A"
LEFT JOIN "Post" p ON cp."B" = p.id AND p."authorId" = 'bfa786e8-97af-4f3c-8106-ae023690f4bb'
GROUP BY c.id, c.name, cu."B"
ORDER BY c.id;

-- 사용자(본인)이 작성한 글의 목록을 페이지네이션하여 반환
SELECT
    id,
    title,
    content,
    "createdAt",
    "published"
FROM "Post"
WHERE "authorId" = 'bfa786e8-97af-4f3c-8106-ae023690f4bb'
ORDER BY "createdAt" DESC
LIMIT 2 OFFSET 0;

--