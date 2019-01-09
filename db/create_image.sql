INSERT INTO images (image_url, adventure_id, user_id)
VALUES ($1, $2, $3)
RETURNING *;