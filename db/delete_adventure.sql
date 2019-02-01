DELETE FROM line_items WHERE adventure_id = $1 AND user_id = $2;
DELETE FROM adventures WHERE id = $1 AND user_id = $2;
SELECT * FROM adventures ORDER BY date DESC;