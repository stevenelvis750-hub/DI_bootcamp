-- Exercise 1: Items and customers

-- 1. All items, ordered from the lowest price to the highest price.
SELECT *
FROM items
ORDER BY price ASC;

-- 2. Items priced at 80 or more, ordered from highest to lowest price.
SELECT *
FROM items
WHERE price >= 80
ORDER BY price DESC;

-- 3. The first three customers alphabetically by first name, without id.
SELECT first_name, last_name
FROM customers
ORDER BY first_name ASC
LIMIT 3;

-- 4. All last names in reverse alphabetical order.
SELECT last_name
FROM customers
ORDER BY last_name DESC;


-- Exercise 2: dvdrental database
-- Run these queries while connected to the dvdrental database.

-- 1. All columns from customer.
SELECT *
FROM customer;

-- 2. Customer names combined into a full_name alias.
SELECT first_name || ' ' || last_name AS full_name
FROM customer;

-- 3. Distinct account creation dates.
SELECT DISTINCT create_date
FROM customer
ORDER BY create_date;

-- 4. All customers ordered by first name descending.
SELECT *
FROM customer
ORDER BY first_name DESC;

-- 5. Films ordered by rental rate from lowest to highest.
SELECT film_id, title, description, release_year, rental_rate
FROM film
ORDER BY rental_rate ASC;

-- 6. Addresses and phone numbers in the Texas district.
SELECT address, phone
FROM address
WHERE district = 'Texas';

-- 7. Details for films 15 and 150.
SELECT *
FROM film
WHERE film_id IN (15, 150);

-- 8. Check whether the favorite movie exists.
-- Favorite movie used here: Academy Dinosaur.
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title = 'Academy Dinosaur';

-- 9. Films starting with the first two letters of the favorite movie.
SELECT film_id, title, description, length, rental_rate
FROM film
WHERE title ILIKE 'Ac%';

-- 10. The 10 cheapest movies.
SELECT film_id, title, rental_rate
FROM film
ORDER BY rental_rate ASC, film_id ASC
LIMIT 10;

-- 11. The next 10 cheapest movies.
SELECT film_id, title, rental_rate
FROM film
ORDER BY rental_rate ASC, film_id ASC
LIMIT 10 OFFSET 10;

-- Bonus: the same result without LIMIT.
SELECT film_id, title, rental_rate
FROM (
	SELECT film_id,
		   title,
		   rental_rate,
		   ROW_NUMBER() OVER (ORDER BY rental_rate ASC, film_id ASC) AS movie_number
	FROM film
) AS ranked_films
WHERE movie_number BETWEEN 11 AND 20
ORDER BY movie_number;

-- 12. Payments with the related customer's name, ordered by customer id.
SELECT c.first_name,
	   c.last_name,
	   p.amount,
	   p.payment_date
FROM customer AS c
JOIN payment AS p ON p.customer_id = c.customer_id
ORDER BY c.customer_id ASC, p.payment_date ASC;

-- 13. Films that do not appear in inventory.
SELECT f.*
FROM film AS f
LEFT JOIN inventory AS i ON i.film_id = f.film_id
WHERE i.inventory_id IS NULL;

-- 14. The city and its country.
SELECT city.city, country.country
FROM city
JOIN country ON country.country_id = city.country_id
ORDER BY country.country, city.city;

-- 15. Payments grouped by the staff member who sold the DVD.
SELECT c.customer_id,
	   c.first_name,
	   c.last_name,
	   p.amount,
	   p.payment_date
FROM payment AS p
JOIN customer AS c ON c.customer_id = p.customer_id
ORDER BY p.staff_id ASC, c.customer_id ASC, p.payment_date ASC;
