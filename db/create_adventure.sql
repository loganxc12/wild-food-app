INSERT INTO adventures (title, date, location, description, user_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;