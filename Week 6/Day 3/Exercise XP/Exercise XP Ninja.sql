-- Exercise 1: DVD Rentals

-- 1. Children's films with at least one available inventory copy.
SELECT f.film_id, f.title, f.rating
FROM film AS f
WHERE f.rating IN ('G', 'PG')
  AND EXISTS (
	  SELECT 1
	  FROM inventory AS i
	  WHERE i.film_id = f.film_id
		AND NOT EXISTS (
			SELECT 1
			FROM rental AS r
			WHERE r.inventory_id = i.inventory_id
			  AND r.return_date IS NULL
		)
  )
ORDER BY f.title;

-- 2. A queue is linked to the film being requested and the child/customer
-- waiting for it. The Python program can delete a row when the DVD is taken.
CREATE TABLE dvd_waiting_list (
	waiting_list_id SERIAL PRIMARY KEY,
	film_id INTEGER NOT NULL REFERENCES film(film_id) ON DELETE CASCADE,
	customer_id INTEGER NOT NULL REFERENCES customer(customer_id) ON DELETE CASCADE,
	requested_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	UNIQUE (film_id, customer_id)
);

-- 3. Test data for the waiting list.
INSERT INTO dvd_waiting_list (film_id, customer_id)
VALUES
	(
		(SELECT film_id FROM film WHERE rating = 'G' ORDER BY film_id LIMIT 1),
		(SELECT customer_id FROM customer ORDER BY customer_id LIMIT 1)
	),
	(
		(SELECT film_id FROM film WHERE rating = 'G' ORDER BY film_id LIMIT 1),
		(SELECT customer_id FROM customer ORDER BY customer_id OFFSET 1 LIMIT 1)
	),
	(
		(SELECT film_id FROM film WHERE rating = 'PG' ORDER BY film_id LIMIT 1),
		(SELECT customer_id FROM customer ORDER BY customer_id OFFSET 2 LIMIT 1)
	);

SELECT f.film_id,
	   f.title,
	   COUNT(w.waiting_list_id) AS people_waiting
FROM film AS f
LEFT JOIN dvd_waiting_list AS w ON w.film_id = f.film_id
WHERE f.rating IN ('G', 'PG')
GROUP BY f.film_id, f.title
ORDER BY f.title;
