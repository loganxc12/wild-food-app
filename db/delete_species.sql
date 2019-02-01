DELETE FROM line_items WHERE species_id = $1 AND user_id = $2;
DELETE FROM species WHERE id = $1 AND user_id = $2;
SELECT * FROM species ORDER BY id DESC;