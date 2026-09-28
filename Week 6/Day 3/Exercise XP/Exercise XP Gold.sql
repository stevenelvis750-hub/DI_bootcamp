-- Exercise 1: DVD Rentals

-- An active rental is identified by a NULL return_date.
CREATE OR REPLACE VIEW current_rentals AS
SELECT r.rental_id,
			 r.rental_date,
			 i.inventory_id,
			 f.film_id,
			 f.title,
			 c.customer_id,
			 c.first_name,
			 c.last_name
FROM rental AS r
JOIN inventory AS i ON i.inventory_id = r.inventory_id
JOIN film AS f ON f.film_id = i.film_id
JOIN customer AS c ON c.customer_id = r.customer_id
WHERE r.return_date IS NULL;

-- 1. All films which are currently out.
SELECT *
FROM current_rentals
ORDER BY title, rental_id;

-- 2. Customers who have not returned rentals, grouped by customer.
SELECT customer_id,
			 first_name,
			 last_name,
			 COUNT(*) AS rentals_not_returned
FROM current_rentals
GROUP BY customer_id, first_name, last_name
ORDER BY last_name, first_name;

-- 3. Action films featuring Joe Swank.
SELECT f.film_id, f.title
FROM film AS f
JOIN film_actor AS fa ON fa.film_id = f.film_id
JOIN actor AS a ON a.actor_id = fa.actor_id
JOIN film_category AS fc ON fc.film_id = f.film_id
JOIN category AS cat ON cat.category_id = fc.category_id
WHERE cat.name = 'Action'
	AND a.first_name = 'Joe'
	AND a.last_name = 'Swank'
ORDER BY f.title;

-- Exercise 2: Happy Halloween

-- 1. Store locations.
CREATE TABLE store_locations AS
SELECT s.store_id,
			 ci.city,
			 co.country
FROM store AS s
JOIN address AS a ON a.address_id = s.address_id
JOIN city AS ci ON ci.city_id = a.city_id
JOIN country AS co ON co.country_id = ci.country_id;

SELECT *
FROM store_locations
ORDER BY store_id;

-- 2-3. Viewing time by store, excluding inventory that is currently rented.
CREATE TABLE store_viewing_summary AS
SELECT s.store_id,
			 COUNT(i.inventory_id)::INTEGER AS available_inventory_items,
			 COALESCE(SUM(f.length), 0)::INTEGER AS total_minutes,
			 (COALESCE(SUM(f.length), 0) / 60.0)::NUMERIC(10, 2) AS total_hours,
			 (COALESCE(SUM(f.length), 0) / 1440.0)::NUMERIC(10, 2) AS total_days
FROM store AS s
LEFT JOIN inventory AS i ON i.store_id = s.store_id
LEFT JOIN film AS f ON f.film_id = i.film_id
LEFT JOIN rental AS active_rental
		ON active_rental.inventory_id = i.inventory_id
	 AND active_rental.return_date IS NULL
WHERE active_rental.rental_id IS NULL
GROUP BY s.store_id;

SELECT *
FROM store_viewing_summary
ORDER BY store_id;

-- 4. Customers who live in a city where a store is located.
CREATE TABLE customers_in_store_cities AS
SELECT DISTINCT c.customer_id,
			 c.first_name,
			 c.last_name,
			 ci.city
FROM customer AS c
JOIN address AS ca ON ca.address_id = c.address_id
JOIN city AS ci ON ci.city_id = ca.city_id
JOIN store_locations AS sl ON sl.city = ci.city;

SELECT *
FROM customers_in_store_cities
ORDER BY city, last_name, first_name;

-- 5. Customers who live in a country where a store is located.
CREATE TABLE customers_in_store_countries AS
SELECT DISTINCT c.customer_id,
			 c.first_name,
			 c.last_name,
			 co.country
FROM customer AS c
JOIN address AS ca ON ca.address_id = c.address_id
JOIN city AS ci ON ci.city_id = ca.city_id
JOIN country AS co ON co.country_id = ci.country_id
JOIN store_locations AS sl ON sl.country = co.country;

SELECT *
FROM customers_in_store_countries
ORDER BY country, last_name, first_name;

-- 6. Safe films exclude Horror and frightening title/description keywords.
CREATE TABLE safe_movie_list (
		film_id INTEGER PRIMARY KEY,
		title VARCHAR(255) NOT NULL,
		description TEXT,
		length INTEGER NOT NULL CHECK (length >= 0),
		has_horror_category BOOLEAN NOT NULL DEFAULT FALSE
				CHECK (has_horror_category = FALSE),
		CHECK (
				title !~* '(beast|monster|ghost|dead|zombie|undead)'
				AND COALESCE(description, '') !~* '(beast|monster|ghost|dead|zombie|undead)'
		)
);

INSERT INTO safe_movie_list (film_id, title, description, length)
SELECT f.film_id,
			 f.title,
			 f.description,
			 f.length
FROM film AS f
WHERE f.title !~* '(beast|monster|ghost|dead|zombie|undead)'
	AND COALESCE(f.description, '') !~* '(beast|monster|ghost|dead|zombie|undead)'
	AND NOT EXISTS (
			SELECT 1
			FROM film_category AS fc
			JOIN category AS cat ON cat.category_id = fc.category_id
			WHERE fc.film_id = f.film_id
				AND cat.name = 'Horror'
	);

CREATE TABLE safe_viewing_summary AS
SELECT COUNT(*)::INTEGER AS safe_movie_count,
			 COALESCE(SUM(length), 0)::INTEGER AS total_minutes,
			 (COALESCE(SUM(length), 0) / 60.0)::NUMERIC(10, 2) AS total_hours,
			 (COALESCE(SUM(length), 0) / 1440.0)::NUMERIC(10, 2) AS total_days
FROM safe_movie_list;

SELECT *
FROM safe_viewing_summary;
