-- Daily Challenge: Actors
-- Using the actors table from class.

-- 1. Count how many actors are in the table.
SELECT COUNT(*) AS total_actors
FROM actors;

-- 2. Try to add a new actor with some blank fields.
-- Example: inserting a row where the first_name or last_name is blank.
INSERT INTO actors (first_name, last_name, birth_date)
VALUES ('', 'Smith', '1990-01-01');

-- Outcome:
-- If the table has NOT NULL constraints on first_name and/or last_name,
-- the insert will fail with an error because blank values are not allowed.
-- If the columns allow empty strings, the row may be inserted, but this is usually
-- avoided because blank values are not meaningful data.
