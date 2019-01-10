INSERT INTO adventures (title, date, location, description, images, user_id)
VALUES ($1, $2, $3, $4, $5, $6)
RETURNING *;