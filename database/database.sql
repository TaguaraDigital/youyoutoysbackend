  DROP DATABASE IF EXISTS toys;
  CREATE DATABASE toys;
  USE toys;

  DROP TABLE IF EXISTS orders_details;
  DROP TABLE IF EXISTS orders;
  DROP TABLE IF EXISTS customers;
  DROP TABLE IF EXISTS users;
  DROP TABLE IF EXISTS products_images;
  DROP TABLE IF EXISTS products;

  CREATE TABLE IF NOT EXISTS users(
    user_id INT(7) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(150) NOT NULL,
    role VARCHAR(2) DEFAULT 'VI'
  );

  INSERT INTO users (name, email, password, role) VALUES ("admin", "admin@correo.com","$2b$10$L7DbgfYqnLDdRm2qdHqRd.vqBzCQyOVWQq6vzuZnIxYjcMVkYY33W", "AD");
  INSERT INTO users (name, email, password) VALUES
              ("Pedro Perez", "pedro@correo.com","$2b$10$L7DbgfYqnLDdRm2qdHqRd.vqBzCQyOVWQq6vzuZnIxYjcMVkYY33W"),
              ("Juan Rodriguez", "juan@correo.com","$2b$10$L7DbgfYqnLDdRm2qdHqRd.vqBzCQyOVWQq6vzuZnIxYjcMVkYY33W"),
              ("Luis Contrera", "luis@correo.com","$2b$10$L7DbgfYqnLDdRm2qdHqRd.vqBzCQyOVWQq6vzuZnIxYjcMVkYY33W");

  CREATE TABLE IF NOT EXISTS products(
    product_id INT(7) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    product_code VARCHAR(10) DEFAULT NULL,
    brand VARCHAR(25) DEFAULT NULL,
    category VARCHAR(25) DEFAULT NULL,
    description VARCHAR(50) DEFAULT NULL,
    inventory INT(5) DEFAULT 0,
    price DECIMAL(11,2) NOT NULL,
    pack INT(5) DEFAULT 0
  );

  INSERT INTO products( product_code, brand, category, description, inventory, price, pack) VALUES
        ('15165','Hasbro','I&P','Peluche Doki 12"',1500,19.99,6),
        ('15214','Hasbro','I&P','Elefante Divertido Lanzabolas Playskool',500,34.00,2),
        ('15320','Hasbro','GAMES','Monopoly',2000,12.99,12),
        ('15168','Mattel','Boys','Pista',500,24.99,12),
        ('15239','Hasbro','GIRLS','Peluche My Little Pony',1500,14.99,3),
        ('15241','Mattel','I&P','Andadera con sonidos',300,29.99,2),
        ('15242','GIGO','GIRLS','14" Baby Layette Set',600,24.99,2),
        ('15243','Toy State','BOYS','Auto con sonido 12"',1800,19.99,12),
        ('14441','GIGO','GIRLS','8" Baby Care Centre',300,19.99,2),
        ('15214','GIGO','GIRLS','12" Baby Doll with Stroller Set',600,29.99,3), 
        ('15236','GIGO','GIRLS','13" Baby Carry Cot Set ',300,19.99,4),
        ('C8091','Hasbro','Boys','MOVIE FIGURES (VOYAGER)',1200,14.99,6),
        ('C0886','Hasbro','Boys','MOVIE QUICK STEP',1200,9.99,12),
        ('C0885','Hasbro','Boys','MOVIE TITAN CHANGERS',1200,7.99,12),
        ('C1807','Hasbro','GIRLS','DPR ELENA CLASSIC FASHION DOLL',1200,14.99,6);

  CREATE TABLE IF NOT EXISTS products_images (
        image_id VARCHAR(255) NOT NULL PRIMARY KEY,
        product_id INT(7) NOT NULL,
        main VARCHAR(2) DEFAULT 'NO'
  );

  INSERT INTO products_images( product_id, image_id, main) VALUES
        (1,'hjymsk7zlvjnysn8zjup','SI'),
        (2,'w1j7hvgddm4nzqerinvf','SI'),
        (3,'q74wzi5evrn1ex6benz1','SI'),
        (4,'fip9zrvzv1kichttzj9a','SI'),
        (5,'bcysu2uana7iyv31t55d','SI'),
        (6,'ifxdor6fuohoee1i6h4j','SI'),
        (7,'ghykqtaxae21nmxbvu7k','SI'),
        (8,'yh8ixifdpgrbwu7omzz9','SI'),
        (9, 'u1znyjc962soeiykmyvo','SI'),
        (10, 'd8drwq7lxbq4ldaj2dzg','SI'),
        (11, 'yuihufbue8dsc6zgjvcl','SI'),
        (12, 'ygbnxfxck318udigbdoy','SI'),
        (13, 'xcmebarxibnpkl1vvrhi','SI'),
        (14, 'bucvsjwhfwt65c7dg8cs','SI'),
        (15, 'pyl5ykwhayd1tbk0du3u','SI');

  CREATE TABLE IF NOT EXISTS customers (
    user_id  INT(7) NOT NULL PRIMARY KEY,
    customer_name VARCHAR(255) NOT NULL,
    customer_rif VARCHAR(15) NOT NULL,
    address VARCHAR(255) NULL,
    city VARCHAR(50) NULL,
    state VARCHAR(20) NULL,
    phone VARCHAR(50) NULL
  ) ;

  INSERT INTO customers(user_id, customer_name, customer_rif, address, city, state, phone)
        VALUES (2, 'Pedro Perez', 'V-1233456-2','Calle 2','Caracas-2','Miranda','0212-123.2222'), 
              (3, 'Juan Rdriguez', 'V-1233456-3','Calle 3','Caracas-3','Miranda','0212-123.3333'),
              (4, 'Luis Contreras', 'V-1233456-4','Calle 4','Caracas-4','Miranda','0212-123.4444');

  CREATE TABLE IF NOT EXISTS orders (
    order_id INT(7) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT(7) NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT current_timestamp(),
    order_status VARCHAR(12) NOT NULL DEFAULT 'PROCESO'
  );


  CREATE TABLE IF NOT EXISTS orders_details (
    order_id INT(7) NOT NULL,
    product_id INT(7) NOT NULL,
    product_price DECIMAL(11,2) NOT NULL,
    amount INT(7) NOT NULL,
    PRIMARY KEY (order_id,product_id)
  );