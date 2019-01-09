INSERT INTO line_items (species_id, adventure_id)
VALUES ($1, $2)
RETURNING *;