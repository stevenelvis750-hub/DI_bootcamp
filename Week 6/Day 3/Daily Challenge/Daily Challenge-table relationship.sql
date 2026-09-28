CREATE TABLE customer (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50) NOT NULL
);

CREATE TABLE customer_profile (
	id SERIAL PRIMARY KEY,
	isLoggedIn BOOLEAN DEFAULT FALSE,
	customer_id INTEGER NOT NULL UNIQUE REFERENCES customer(id)
);

INSERT INTO customer (first_name, last_name)
VALUES
	('John', 'Doe'),
	('Jerome', 'Lalu'),
	('Lea', 'Rive');

INSERT INTO customer_profile (isLoggedIn, customer_id)
VALUES
	(TRUE, (SELECT id FROM customer WHERE first_name = 'John' AND last_name = 'Doe')),
	(FALSE, (SELECT id FROM customer WHERE first_name = 'Jerome' AND last_name = 'Lalu'));

SELECT c.first_name
FROM customer AS c
JOIN customer_profile AS cp ON cp.customer_id = c.id
WHERE cp.isLoggedIn = TRUE;

SELECT c.first_name, cp.isLoggedIn
FROM customer AS c
LEFT JOIN customer_profile AS cp ON cp.customer_id = c.id;

SELECT COUNT(*) AS customers_not_logged_in
FROM customer AS c
LEFT JOIN customer_profile AS cp ON cp.customer_id = c.id
WHERE cp.isLoggedIn IS DISTINCT FROM TRUE;

CREATE TABLE book (
	book_id SERIAL PRIMARY KEY,
	title VARCHAR(150) NOT NULL,
	author VARCHAR(100) NOT NULL
);

INSERT INTO book (title, author)
VALUES
	('Alice In Wonderland', 'Lewis Carroll'),
	('Harry Potter', 'J.K Rowling'),
	('To kill a mockingbird', 'Harper Lee');

CREATE TABLE student (
	student_id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL UNIQUE,
	age INTEGER CHECK (age <= 15)
);

INSERT INTO student (name, age)
VALUES
	('John', 12),
	('Lera', 11),
	('Patrick', 10),
	('Bob', 14);

CREATE TABLE library (
	book_fk_id INTEGER NOT NULL,
	student_fk_id INTEGER NOT NULL,
	borrowed_date DATE NOT NULL,
	PRIMARY KEY (book_fk_id, student_fk_id),
	FOREIGN KEY (book_fk_id) REFERENCES book(book_id)
		ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (student_fk_id) REFERENCES student(student_id)
		ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO library (book_fk_id, student_fk_id, borrowed_date)
VALUES
	(
		(SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
		(SELECT student_id FROM student WHERE name = 'John'),
		'2022-02-15'
	),
	(
		(SELECT book_id FROM book WHERE title = 'To kill a mockingbird'),
		(SELECT student_id FROM student WHERE name = 'Bob'),
		'2021-03-03'
	),
	(
		(SELECT book_id FROM book WHERE title = 'Alice In Wonderland'),
		(SELECT student_id FROM student WHERE name = 'Lera'),
		'2021-05-23'
	),
	(
		(SELECT book_id FROM book WHERE title = 'Harry Potter'),
		(SELECT student_id FROM student WHERE name = 'Bob'),
		'2021-08-12'
	);

SELECT * FROM library;

SELECT s.name, b.title
FROM library AS l
JOIN student AS s ON s.student_id = l.student_fk_id
JOIN book AS b ON b.book_id = l.book_fk_id;

SELECT AVG(s.age) AS average_age
FROM library AS l
JOIN student AS s ON s.student_id = l.student_fk_id
JOIN book AS b ON b.book_id = l.book_fk_id
WHERE b.title = 'Alice In Wonderland';

DELETE FROM student
WHERE name = 'Patrick';

SELECT * FROM library;
