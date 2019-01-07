INSERT INTO adventures (title, location, description, user_id)
VALUES ($1, $2, $3, $4)
RETURNING *;