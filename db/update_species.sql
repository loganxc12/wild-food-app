UPDATE species
SET name = $3, scientific_name = $4, image_url = $5, description = $6
WHERE id = $1 AND user_id = $2;
SELECT * FROM species WHERE user_id = $2 ORDER BY id DESC;