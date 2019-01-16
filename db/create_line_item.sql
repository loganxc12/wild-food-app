INSERT INTO line_items (species_id, adventure_id, user_id)
VALUES ($1, $2, $3)
RETURNING *;