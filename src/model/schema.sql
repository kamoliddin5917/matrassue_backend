-- Misc
CREATE DATABASE mattress;

-- Tables
CREATE TABLE categories
(
	category_id        uuid                  DEFAULT gen_random_uuid() PRIMARY KEY,
	category_name      varchar(255) NOT NULL,
	category_is_active boolean      NOT NULL DEFAULT true,
	category_date      timestamp             DEFAULT current_timestamp
);

CREATE TABLE products
(
	product_id          uuid                    DEFAULT gen_random_uuid() PRIMARY KEY,
	product_category_id uuid,
	product_name        varchar(255)   NOT NULL,
	product_price       numeric(10, 2) NOT NULL,
	product_description text           NOT NULL,
	product_images      text[4]        NOT NULL,
	product_cargo       smallint       NOT NULL,
	product_dimensions  varchar(255)   NOT NULL,
	product_warranty    smallint,
	product_capacity    smallint       NOT NULL,
	product_sale_price  numeric(10, 2),
	product_added_date  timestamp               DEFAULT current_timestamp,
	product_is_new      boolean        NOT NULL DEFAULT true,
	product_is_active   boolean        NOT NULL DEFAULT true,
	product_is_on_sale  boolean        NOT NULL DEFAULT false,
	FOREIGN KEY (product_category_id)
		REFERENCES categories (category_id)
		ON DELETE SET NULL
);

CREATE TABLE orders
(
	order_id             uuid      DEFAULT gen_random_uuid() PRIMARY KEY,
	order_product_id     uuid,
	order_date           timestamp DEFAULT current_timestamp,
	order_amount         smallint     NOT NULL,
	order_customer_name  varchar(255) NOT NULL,
	order_customer_phone text         NOT NULL,
	order_is_fulfilled   boolean   DEFAULT false,
	FOREIGN KEY (order_product_id)
		REFERENCES products (product_id)
		ON DELETE SET NULL
);

CREATE TABLE quotes
(
	quote_id        uuid             DEFAULT gen_random_uuid() PRIMARY KEY,
	quote_date      timestamp        DEFAULT current_timestamp,
	quote_number    text    NOT NULL,
	quote_contacted boolean NOT NULL DEFAULT false
);

CREATE TABLE technologies
(
	technology_id          uuid      DEFAULT gen_random_uuid() PRIMARY KEY,
	technology_name        varchar(255) NOT NULL,
	technology_description text         NOT NULL,
	technology_thumbnail   text         NOT NULL,
	technology_video       text         NOT NULL,
	technology_added_date  timestamp DEFAULT current_timestamp,
	technology_is_active   boolean   DEFAULT true
);

CREATE TABLE addresses
(
	address_id          uuid                      DEFAULT gen_random_uuid() PRIMARY KEY,
	address_name        text             NOT NULL,
	address_description text             NOT NULL,
	address_image       text             NOT NULL,
	address_lat         double precision NOT NULL,
	address_long        double precision NOT NULL,
	address_added_date  timestamp                 DEFAULT current_timestamp,
	address_is_active   boolean          NOT NULL DEFAULT true
);

CREATE TABLE admins
(
	admin_id       uuid    DEFAULT gen_random_uuid() PRIMARY KEY,
	admin_username varchar(255) NOT NULL UNIQUE,
	admin_password text         NOT NULL,
	admin_is_root  boolean DEFAULT false
);
