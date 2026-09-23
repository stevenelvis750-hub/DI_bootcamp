-- Exercise 1: DVD Rental

-- 1. Count the films in each rating category.
SELECT rating, COUNT(*) AS film_count
FROM film
GROUP BY rating
ORDER BY rating;

-- 2. List all films rated G or PG-13.
SELECT title, rating
FROM film
WHERE rating IN ('G', 'PG-13');

-- 3. Keep films under two hours and with a rental rate under 3.00.
SELECT title, rating, length, rental_rate
FROM film
WHERE rating IN ('G', 'PG-13')
	AND length < 120
	AND rental_rate < 3.00
ORDER BY title;

-- 4. Update one customer's details with example personal details.
UPDATE customer
SET first_name = 'Alex',
		last_name = 'Morgan',
		email = 'alex.morgan@example.com'
WHERE customer_id = 1;

-- 5. Update that customer's address with an example address.
UPDATE address
SET address = '42 Example Street',
		address2 = NULL,
		district = 'Central',
		city_id = (
				SELECT city_id
				FROM city
				WHERE city = 'London'
				LIMIT 1
		),
		postal_code = 'SW1A 1AA',
		phone = '555-0100'
WHERE address_id = (
		SELECT address_id
		FROM customer
		WHERE customer_id = 1
);


-- Exercise 2: students table

-- Update
UPDATE students
SET birth_date = '1998-11-02'
WHERE first_name IN ('Lea', 'Marc')
	AND last_name = 'Benichou';

UPDATE students
SET last_name = 'Guez'
WHERE first_name = 'David'
	AND last_name = 'Grez';

-- Delete
DELETE FROM students
WHERE first_name = 'Lea'
	AND last_name = 'Benichou';

-- Count
SELECT COUNT(*) AS student_count
FROM students;

SELECT COUNT(*) AS students_born_after_2000
FROM students
WHERE birth_date > '2000-01-01';

-- Insert / Alter
ALTER TABLE students
ADD COLUMN math_grade INTEGER;

UPDATE students SET math_grade = 80 WHERE id = 1;
UPDATE students SET math_grade = 90 WHERE id IN (2, 4);
UPDATE students SET math_grade = 40 WHERE id = 6;

SELECT COUNT(*) AS students_with_grade_over_83
FROM students
WHERE math_grade > 83;

INSERT INTO students (first_name, last_name, birth_date, math_grade)
SELECT 'Omer', 'Simpson', birth_date, 70
FROM students
WHERE first_name = 'Omer'
	AND last_name = 'Simpson'
LIMIT 1;

SELECT first_name, last_name, COUNT(math_grade) AS total_grade
FROM students
GROUP BY first_name, last_name
ORDER BY last_name, first_name;

-- SUM
SELECT SUM(math_grade) AS grades_sum
FROM students;


-- Exercise 3: Items and customers

-- Part I
CREATE TABLE purchases (
		id SERIAL PRIMARY KEY,
		customer_id INTEGER REFERENCES customers(id),
		item_id INTEGER REFERENCES items(id),
		quantity_purchased INTEGER NOT NULL
);

INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES
		(
				(SELECT id FROM customers WHERE first_name = 'Scott' AND last_name = 'Scott'),
				(SELECT id FROM items WHERE item_name ILIKE 'Fan'),
				1
		),
		(
				(SELECT id FROM customers WHERE first_name = 'Melanie' AND last_name = 'Johnson'),
				(SELECT id FROM items WHERE item_name ILIKE 'Large desk'),
				10
		),
		(
				(SELECT id FROM customers WHERE first_name = 'Greg' AND last_name = 'Jones'),
				(SELECT id FROM items WHERE item_name ILIKE 'Small desk'),
				2
		);

-- Part II
-- 1. All purchases without related names or item details.
SELECT *
FROM purchases;

-- All purchases with customer details.
SELECT p.*, c.first_name, c.last_name
FROM purchases AS p
JOIN customers AS c ON c.id = p.customer_id;

-- Purchases made by customer 5.
SELECT *
FROM purchases
WHERE customer_id = 5;

-- Purchases of large desks or small desks.
SELECT p.*, i.item_name
FROM purchases AS p
JOIN items AS i ON i.id = p.item_id
WHERE i.item_name IN ('Large desk', 'Small Desk');

-- Customers who made a purchase and the item they bought.
SELECT c.first_name, c.last_name, i.item_name
FROM purchases AS p
JOIN customers AS c ON c.id = p.customer_id
JOIN items AS i ON i.id = p.item_id;

-- 3. A purchase may omit the item because item_id allows NULL.
INSERT INTO purchases (customer_id, item_id, quantity_purchased)
VALUES (5, NULL, 1);

-- A NULL item_id is accepted: it means no item is associated with this purchase.
