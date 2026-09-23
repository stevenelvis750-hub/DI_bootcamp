-- SQL Puzzle: NOT IN and NULL values

DROP TABLE IF EXISTS FirstTab;
DROP TABLE IF EXISTS SecondTab;

CREATE TABLE FirstTab (
	id INTEGER,
	name VARCHAR(10)
);

INSERT INTO FirstTab (id, name)
VALUES
	(5, 'Pawan'),
	(6, 'Sharlee'),
	(7, 'Krish'),
	(NULL, 'Avtaar');

CREATE TABLE SecondTab (
	id INTEGER
);

INSERT INTO SecondTab (id)
VALUES
	(5),
	(NULL);

SELECT * FROM FirstTab;
SELECT * FROM SecondTab;

-- Assumptions before execution:
-- Q1 expected output: 0. The subquery returns only NULL, so every NOT IN
-- comparison is UNKNOWN.
-- Q2 expected output: 2. The subquery returns 5, leaving FirstTab ids 6 and 7.
-- Q3 expected output: 0. The NOT IN list contains both 5 and NULL.
-- Q4 expected output: 2. The subquery excludes NULL and returns only 5.

-- Q1
SELECT COUNT(*) AS q1_count
FROM FirstTab AS ft
WHERE ft.id NOT IN (
	SELECT id
	FROM SecondTab
	WHERE id IS NULL
);

-- Q2
SELECT COUNT(*) AS q2_count
FROM FirstTab AS ft
WHERE ft.id NOT IN (
	SELECT id
	FROM SecondTab
	WHERE id = 5
);

-- Q3
SELECT COUNT(*) AS q3_count
FROM FirstTab AS ft
WHERE ft.id NOT IN (
	SELECT id
	FROM SecondTab
);

-- Q4
SELECT COUNT(*) AS q4_count
FROM FirstTab AS ft
WHERE ft.id NOT IN (
	SELECT id
	FROM SecondTab
	WHERE id IS NOT NULL
);
