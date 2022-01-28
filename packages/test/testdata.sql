
DROP TABLE IF EXISTS animals;
CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name text,
    is_dog boolean NOT NULL DEFAULT true
);