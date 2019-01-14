INSERT INTO species (name, scientific_name, image_url, description, user_id)
VALUES ($1, $2, $3, $4, $5)
RETURNING *;