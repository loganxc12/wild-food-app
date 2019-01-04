INSERT INTO users (name, email, picture, auth0id)
VALUES ($1, $2, $3, $4)
RETURNING *;