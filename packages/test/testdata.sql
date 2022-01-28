
DROP TABLe IF EXISTS animals;
CREATE TABLE animals (
    id SERIAL PRIMARY KEY,
    name text,
    is_dog boolean NOT NULL DEFAULT true
);
-- CREATE UNIQUE INDEX animals_pkey ON animals(id int4_ops);