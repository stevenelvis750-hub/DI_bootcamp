-- Exercise 1 : Bonus Public Database (Continuation of XP)

-- 1. Fetch the last 2 customers in alphabetical order (A-Z) and exclude id from the results.
SELECT first_name, last_name
FROM customers
ORDER BY last_name ASC, first_name ASC
LIMIT 2 OFFSET (SELECT COUNT(*) - 2 FROM customers);

-- 2. Delete all purchases made by Scott.
DELETE FROM purchases
WHERE customer_id = (
    SELECT id
    FROM customers
    WHERE first_name = 'Scott'
);

-- 3. Does Scott still exist in the customers table, even though his purchases were deleted?
SELECT *
FROM customers
WHERE first_name = 'Scott';

-- Scott still exists in the customers table, because only the purchases were deleted,
-- not the customer record itself.

-- 4. Find all purchases and join purchases with customers so Scott's order appears,
-- even though the customer's first and last name should be blank/null.
-- Use LEFT JOIN to keep purchases even when there is no matching customer.
SELECT p.*,
       c.first_name,
       c.last_name
FROM purchases p
LEFT JOIN customers c ON p.customer_id = c.id;

-- 5. Find all purchases and join purchases with customers so Scott's order will NOT appear.
-- Use INNER JOIN to keep only purchases that have a matching customer.
SELECT p.*,
       c.first_name,
       c.last_name
FROM purchases p
INNER JOIN customers c ON p.customer_id = c.id;
