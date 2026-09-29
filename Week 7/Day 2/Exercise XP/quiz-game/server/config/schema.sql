CREATE TABLE IF NOT EXISTS options (
  id SERIAL PRIMARY KEY,
  option TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  correct_answer_id INTEGER NOT NULL REFERENCES options(id),
  explanation TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS questions_options (
  question_id INTEGER NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_id INTEGER NOT NULL REFERENCES options(id) ON DELETE CASCADE,
  PRIMARY KEY (question_id, option_id)
);

INSERT INTO options (id, option) VALUES
  (1, 'Node.js'), (2, 'Express'), (3, 'PostgreSQL'), (4, 'npm'),
  (5, 'app.fetch()'), (6, 'app.get()'), (7, 'app.path()'), (8, 'app.routeGet()'),
  (9, 'Use parameterized queries'), (10, 'Join strings directly'), (11, 'Run the value through eval()'), (12, 'Put the value in a comment'),
  (13, '201 Created'), (14, '200 OK'), (15, '301 Moved Permanently'), (16, '404 Not Found'),
  (17, 'express.json()'), (18, 'express.files()'), (19, 'express.decode()'), (20, 'express.body()')
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions (id, category, question, correct_answer_id, explanation) VALUES
  (1, 'NODE.JS', 'Which runtime lets JavaScript run outside the browser?', 1, 'Node.js runs JavaScript outside the browser, including on servers.'),
  (2, 'EXPRESS', 'Which Express method handles an HTTP GET route?', 6, 'app.get() registers a handler for GET requests at a route.'),
  (3, 'DATABASES', 'What is the safest way to include user input in a SQL query?', 9, 'Parameterized queries keep user input separate from SQL syntax.'),
  (4, 'HTTP', 'Which status code indicates a resource was successfully created?', 13, '201 Created is the standard response for a successfully created resource.'),
  (5, 'EXPRESS', 'Which middleware parses incoming JSON request bodies?', 17, 'express.json() parses JSON bodies and exposes the result on req.body.')
ON CONFLICT (id) DO NOTHING;

INSERT INTO questions_options (question_id, option_id) VALUES
  (1, 1), (1, 2), (1, 3), (1, 4),
  (2, 5), (2, 6), (2, 7), (2, 8),
  (3, 9), (3, 10), (3, 11), (3, 12),
  (4, 13), (4, 14), (4, 15), (4, 16),
  (5, 17), (5, 18), (5, 19), (5, 20)
ON CONFLICT DO NOTHING;

SELECT setval(pg_get_serial_sequence('options', 'id'), GREATEST((SELECT COALESCE(MAX(id), 1) FROM options), 1));
SELECT setval(pg_get_serial_sequence('questions', 'id'), GREATEST((SELECT COALESCE(MAX(id), 1) FROM questions), 1));