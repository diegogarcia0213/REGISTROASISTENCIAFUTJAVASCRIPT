CREATE DATABASE diego_futbol;

USE DATABASE diego_futbol;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  lastname VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

CREATE TABLE attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  date DATE NOT NULL,
  location VARCHAR(100) NOT NULL,
  player_count INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DROP USER homestead@'%';

CREATE USER homestead@'%' IDENTIFIED BY 'secret';
GRANT ALL PRIVILEGES ON * . * TO homestead@'%';
FLUSH PRIVILEGES;

ALTER USER 'homestead'@'%' IDENTIFIED WITH mysql_native_password BY 'secret';
FLUSH PRIVILEGES;