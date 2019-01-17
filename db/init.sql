CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    picture TEXT,
    auth0id TEXT
);

CREATE TABLE IF NOT EXISTS adventures (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    date DATE,
    location TEXT,
    description TEXT,
    images TEXT [],
    user_id INTEGER REFERENCES users(id)
); 

CREATE TABLE IF NOT EXISTS species (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    scientific_name VARCHAR(100), 
    image_url TEXT,
    description TEXT,
    user_id INTEGER REFERENCES users(id)
); 

CREATE TABLE IF NOT EXISTS line_items (
    id SERIAL PRIMARY KEY, 
    species_id INTEGER REFERENCES species(id),
    adventure_id INTEGER REFERENCES adventures(id),
    user_id INTEGER REFERENCES users(id)
);
