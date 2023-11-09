-- init.sql

CREATE TABLE IF NOT EXISTS items (
  id serial PRIMARY KEY,
  name VARCHAR (50) NOT NULL,
  description VARCHAR (150) NOT NULL,
  price DECIMAL(18, 2) NOT NULL,
  img_url VARCHAR(150)
);

INSERT INTO items (name, description, price, img_url) VALUES
  ('Laptop', '13-inch laptop with powerful processor', '899.99', 'https://picsum.photos/400?image=100'),
  ('Smartphone', 'Latest flagship smartphone with high-resolution camera', '799.99', 'https://picsum.photos/400?image=200'),
  ('Tablet', '10-inch tablet for work and entertainment', '299.99', 'https://picsum.photos/400?image=300'),
  ('Headphones', 'Over-ear noise-canceling headphones', '149.99', 'https://picsum.photos/400?image=400'),
  ('Wireless Mouse', 'Ergonomic wireless mouse with customizable buttons', '49.99', 'https://picsum.photos/400?image=500'),
  ('Keyboard', 'Mechanical gaming keyboard with RGB backlighting', '129.99', 'https://picsum.photos/400?image=600'),
  ('Monitor', '27-inch 4K monitor for stunning visuals', '399.99', 'https://picsum.photos/400?image=700'),
  ('Printer', 'All-in-one printer for home and office use', '149.99', 'https://picsum.photos/400?image=800'),
  ('External Hard Drive', '2TB external hard drive for backup and storage', '89.99', 'https://picsum.photos/400?image=900'),
  ('Gaming Console', 'Next-gen gaming console with 4K support', '499.99', 'https://picsum.photos/400?image=1000'),
  ('VR Headset', 'Virtual reality headset for immersive gaming', '299.99', 'https://picsum.photos/400?image=1100'),
  ('Smart Watch', 'Fitness tracker and smartwatch in one', '199.99', 'https://picsum.photos/400?image=1200'),
  ('Graphics Card', 'High-end graphics card for gaming and video editing', '599.99', 'https://picsum.photos/400?image=1300'),
  ('Router', 'High-speed Wi-Fi router for a seamless connection', '79.99', 'https://picsum.photos/400?image=1400'),
  ('Camera', 'Mirrorless camera with interchangeable lenses', '999.99', 'https://picsum.photos/400?image=1500'),
  ('External SSD', '500GB external SSD for fast data transfer', '129.99', 'https://picsum.photos/400?image=1600'),
  ('Bluetooth Speaker', 'Portable Bluetooth speaker for outdoor use', '69.99', 'https://picsum.photos/400?image=1700'),
  ('Gaming Chair', 'Ergonomic gaming chair with lumbar support', '249.99', 'https://picsum.photos/400?image=1800'),
  ('Webcam', 'HD webcam for video conferencing and streaming', '59.99', 'https://picsum.photos/400?image=1900'),
  ('Home Assistant', 'Voice-controlled smart home assistant', '119.99', 'https://picsum.photos/400?image=2000'),
  ('Wireless Earbuds', 'True wireless earbuds with noise cancellation', '129.99', 'https://picsum.photos/400?image=2100'),
  ('Smart TV', '65-inch 4K smart TV with streaming apps', '799.99', 'https://picsum.photos/400?image=2200'),
  ('Gaming Mousepad', 'Large gaming mousepad for precise control', '19.99', 'https://picsum.photos/400?image=2300'),
  ('Smart Thermostat', 'Programmable smart thermostat for energy savings', '149.99', 'https://picsum.photos/400?image=2400');


