UPDATE adventures 
SET title = $3, date = $4, location = $5, description = $6, images = $7
WHERE id = $1 AND user_id = $2
RETURNING *;
