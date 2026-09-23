-- Exercise 1: Items and customers

CREATE DATABASE public;

\c public;

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(50) NOT NULL,
    price NUMERIC(10, 2) NOT NULL
);

CREATE TABLE customers (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL
);

INSERT INTO items (id, item_name, price)
VALUES
    (1, 'Small Desk', 100),
    (2, 'Large desk', 300),
    (3, 'Fan', 80);

INSERT INTO customers (id, first_name, last_name)
VALUES
    (1, 'Greg', 'Jones'),
    (2, 'Sandra', 'Jones'),
    (3, 'Scott', 'Scott'),
    (4, 'Trevor', 'Green'),
    (5, 'Melanie', 'Johnson');

-- 1. All the items.
SELECT * FROM items;

-- 2. All the items with a price above 80 (80 not included).
SELECT * FROM items WHERE price > 80;

-- 3. All the items with a price below 300. (300 included)
SELECT * FROM items WHERE price <= 300;

-- 4. All customers whose last name is 'Smith' (What will be your outcome?).
SELECT * FROM customers WHERE last_name = 'Smith';
-- Outcome: no rows returned, because there is no customer with the last name 'Smith'.

-- 5. All customers whose last name is 'Jones'.
SELECT * FROM customers WHERE last_name = 'Jones';

-- 6. All customers whose firstname is not 'Scott'.
SELECT * FROM customers WHERE first_name <> 'Scott';
