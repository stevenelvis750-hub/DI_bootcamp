CREATE TABLE users (
	id SERIAL PRIMARY KEY,
	username VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE product_orders (
	id SERIAL PRIMARY KEY,
	user_id INTEGER NOT NULL REFERENCES users(id),
	order_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE items (
	id SERIAL PRIMARY KEY,
	order_id INTEGER NOT NULL REFERENCES product_orders(id) ON DELETE CASCADE,
	item_name VARCHAR(100) NOT NULL,
	price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
	quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0)
);

CREATE OR REPLACE FUNCTION order_total(order_id_input INTEGER)
RETURNS NUMERIC(12, 2)
LANGUAGE SQL
AS $$
	SELECT COALESCE(SUM(price * quantity), 0)::NUMERIC(12, 2)
	FROM items
	WHERE order_id = order_id_input;
$$;

CREATE OR REPLACE FUNCTION user_order_total(
	user_id_input INTEGER,
	order_id_input INTEGER
)
RETURNS NUMERIC(12, 2)
LANGUAGE SQL
AS $$
	SELECT order_total(order_id_input)
	FROM product_orders
	WHERE id = order_id_input
	  AND user_id = user_id_input;
$$;
