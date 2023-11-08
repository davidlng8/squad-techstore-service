-- init.sql

CREATE TABLE IF NOT EXISTS items (
  id serial PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  description VARCHAR (150) NOT NULL,
  price MONEY NOT NULL
);

INSERT INTO items (name, description, price) VALUES
  ('Laptop', '13-inch laptop with powerful processor', '899.99'),
  ('Smartphone', 'Latest flagship smartphone with high-resolution camera', '799.99'),
  ('Tablet', '10-inch tablet for work and entertainment', '299.99'),
  ('Headphones', 'Over-ear noise-canceling headphones', '149.99'),
  ('Wireless Mouse', 'Ergonomic wireless mouse with customizable buttons', '49.99'),
  ('Keyboard', 'Mechanical gaming keyboard with RGB backlighting', '129.99'),
  ('Monitor', '27-inch 4K monitor for stunning visuals', '399.99'),
  ('Printer', 'All-in-one printer for home and office use', '149.99'),
  ('External Hard Drive', '2TB external hard drive for backup and storage', '89.99'),
  ('Gaming Console', 'Next-gen gaming console with 4K support', '499.99'),
  ('VR Headset', 'Virtual reality headset for immersive gaming', '299.99'),
  ('Smart Watch', 'Fitness tracker and smartwatch in one', '199.99'),
  ('Graphics Card', 'High-end graphics card for gaming and video editing', '599.99'),
  ('Router', 'High-speed Wi-Fi router for a seamless connection', '79.99'),
  ('Camera', 'Mirrorless camera with interchangeable lenses', '999.99'),
  ('External SSD', '500GB external SSD for fast data transfer', '129.99'),
  ('Bluetooth Speaker', 'Portable Bluetooth speaker for outdoor use', '69.99'),
  ('Gaming Chair', 'Ergonomic gaming chair with lumbar support', '249.99'),
  ('Webcam', 'HD webcam for video conferencing and streaming', '59.99'),
  ('Home Assistant', 'Voice-controlled smart home assistant', '119.99'),
  ('Wireless Earbuds', 'True wireless earbuds with noise cancellation', '129.99'),
  ('Smart TV', '65-inch 4K smart TV with streaming apps', '799.99'),
  ('Gaming Mousepad', 'Large gaming mousepad for precise control', '19.99'),
  ('Smart Thermostat', 'Programmable smart thermostat for energy savings', '149.99');

