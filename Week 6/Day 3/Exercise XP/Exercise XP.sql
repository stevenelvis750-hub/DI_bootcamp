-- Exercise 1: DVD Rental

-- 1. All available languages.
SELECT language_id, name
FROM language
ORDER BY language_id;

-- 2. Films with their language.
SELECT f.title,
	   f.description,
	   l.name AS language_name
FROM film AS f
JOIN language AS l ON l.language_id = f.language_id
ORDER BY f.title;

-- 3. All languages, including languages with no films.
SELECT f.title,
	   f.description,
	   l.name AS language_name
FROM language AS l
LEFT JOIN film AS f ON f.language_id = l.language_id
ORDER BY l.name, f.title;

-- 4. A separate film table for customer reviews.
CREATE TABLE new_film (
	id SERIAL PRIMARY KEY,
	name VARCHAR(255) NOT NULL
);

INSERT INTO new_film (name)
VALUES
	('The Last Adventure'),
	('A Day in Paris'),
	('Under the Stars');

-- 5. Reviews reference both the film and the review language.
CREATE TABLE customer_review (
	review_id SERIAL PRIMARY KEY,
	film_id INTEGER NOT NULL REFERENCES new_film(id) ON DELETE CASCADE,
	language_id INTEGER NOT NULL REFERENCES language(language_id),
	title VARCHAR(255) NOT NULL,
	score INTEGER NOT NULL CHECK (score BETWEEN 1 AND 10),
	review_text TEXT NOT NULL,
	last_update TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 6. Reviews linked to valid films and languages with subqueries.
INSERT INTO customer_review (
	film_id, language_id, title, score, review_text
)
VALUES
	(
		(SELECT id FROM new_film WHERE name = 'The Last Adventure'),
		(SELECT language_id FROM language WHERE name = 'English'),
		'Great adventure',
		9,
		'An entertaining film from beginning to end.'
	),
	(
		(SELECT id FROM new_film WHERE name = 'A Day in Paris'),
		(SELECT language_id FROM language WHERE name = 'French'),
		'Beautiful setting',
		8,
		'The story and scenery work very well together.'
	);

SELECT *
FROM customer_review
ORDER BY review_id;

-- 7. Deleting a reviewed film also deletes its reviews through CASCADE.
DELETE FROM new_film
WHERE name = 'The Last Adventure';

SELECT *
FROM customer_review
ORDER BY review_id;

-- Exercise 2: DVD Rental

-- 1. Change films to languages that exist in the language table.
UPDATE film
SET language_id = (
	SELECT language_id
	FROM language
	WHERE name = 'Italian'
)
WHERE film_id IN (1, 2);

-- 2. Foreign keys defined for customer and their referenced tables.
SELECT
	tc.constraint_name,
	kcu.column_name,
	ccu.table_name AS referenced_table,
	ccu.column_name AS referenced_column
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
	ON kcu.constraint_name = tc.constraint_name
   AND kcu.table_schema = tc.table_schema
JOIN information_schema.constraint_column_usage AS ccu
	ON ccu.constraint_name = tc.constraint_name
   AND ccu.table_schema = tc.table_schema
WHERE tc.table_name = 'customer'
  AND tc.constraint_type = 'FOREIGN KEY'
ORDER BY kcu.column_name;

-- customer inserts must use existing address_id and store_id values.
-- Example:
-- INSERT INTO customer (store_id, first_name, last_name, email, address_id, active)
-- VALUES (1, 'Jamie', 'Example', 'jamie@example.com', 1, TRUE);

-- 3. Drop the review table after checking dependent objects.
DROP TABLE customer_review;

-- 4. Rentals that are still outstanding.
SELECT COUNT(*) AS outstanding_rentals
FROM rental
WHERE return_date IS NULL;

-- 5. The 30 most expensive outstanding movies.
SELECT DISTINCT f.film_id,
	   f.title,
	   f.replacement_cost
FROM rental AS r
JOIN inventory AS i ON i.inventory_id = r.inventory_id
JOIN film AS f ON f.film_id = i.film_id
WHERE r.return_date IS NULL
ORDER BY f.replacement_cost DESC, f.title
LIMIT 30;

-- 6.1 A sumo-wrestling film featuring Penelope Monroe.
SELECT DISTINCT f.film_id, f.title, f.description
FROM film AS f
JOIN film_actor AS fa ON fa.film_id = f.film_id
JOIN actor AS a ON a.actor_id = fa.actor_id
WHERE a.first_name = 'Penelope'
  AND a.last_name = 'Monroe'
  AND (
	  f.title ILIKE '%sumo%'
	  OR f.description ILIKE '%sumo%'
  );

-- 6.2 A short R-rated documentary.
SELECT film_id, title, length, rating
FROM film
WHERE length < 60
  AND rating = 'R'
  AND description ILIKE '%documentary%'
ORDER BY title;

-- 6.3 A film Matthew Mahan rented, paid over $4 for, and returned
-- between July 28 and August 1, 2005.
SELECT DISTINCT f.film_id, f.title, p.amount, r.return_date
FROM customer AS c
JOIN rental AS r ON r.customer_id = c.customer_id
JOIN payment AS p ON p.rental_id = r.rental_id
JOIN inventory AS i ON i.inventory_id = r.inventory_id
JOIN film AS f ON f.film_id = i.film_id
WHERE c.first_name = 'Matthew'
  AND c.last_name = 'Mahan'
  AND p.amount > 4.00
  AND r.return_date::DATE BETWEEN DATE '2005-07-28' AND DATE '2005-08-01'
ORDER BY f.title;

-- 6.4 A movie Matthew Mahan watched whose title/description contains
-- "boat", ordered by replacement cost.
SELECT DISTINCT f.film_id, f.title, f.replacement_cost
FROM customer AS c
JOIN rental AS r ON r.customer_id = c.customer_id
JOIN inventory AS i ON i.inventory_id = r.inventory_id
JOIN film AS f ON f.film_id = i.film_id
WHERE c.first_name = 'Matthew'
  AND c.last_name = 'Mahan'
  AND (
	  f.title ILIKE '%boat%'
	  OR f.description ILIKE '%boat%'
  )
ORDER BY f.replacement_cost DESC, f.title;
