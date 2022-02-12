
DROP TABLE IF EXISTS animals;
CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name text,
    is_dog boolean NOT NULL DEFAULT true
);

DROP TABLE IF EXISTS toys;
CREATE TABLE toys (
    id SERIAL PRIMARY KEY,
    belongs_to integer REFERENCES animals(id) ON DELETE SET NULL,
    properties text[]
);