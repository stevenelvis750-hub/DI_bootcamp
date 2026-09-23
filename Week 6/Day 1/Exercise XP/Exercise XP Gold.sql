-- Exercise 1: Students table #2
-- Fetch the first_name, last_name and birth_date of the students.

-- 1. Fetch the first four students ordered alphabetically by last_name.
SELECT first_name, last_name, birth_date
FROM students
ORDER BY last_name ASC
LIMIT 4;

-- 2. Fetch the details of the youngest student.
SELECT first_name, last_name, birth_date
FROM students
ORDER BY birth_date DESC
LIMIT 1;

-- 3. Fetch three students skipping the first two students.
SELECT first_name, last_name, birth_date
FROM students
ORDER BY last_name ASC
LIMIT 3 OFFSET 2;
