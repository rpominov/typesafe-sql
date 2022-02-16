-- @allAnimals
SELECT * FROM animals WHERE name = $name;

-- @syntaxError
SELECT * FROM animals LEFT JOIN toys ON toys.belongs_to = animals.id;