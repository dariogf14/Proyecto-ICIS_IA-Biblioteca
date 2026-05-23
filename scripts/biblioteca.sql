CREATE DATABASE IF NOT EXISTS biblioteca_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE biblioteca_db;

DROP TABLE IF EXISTS loans;
DROP TABLE IF EXISTS books;
DROP TABLE IF EXISTS members;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS authors;

CREATE TABLE authors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  country VARCHAR(80) NOT NULL
);

CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  description VARCHAR(200) NOT NULL
);

CREATE TABLE members (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  phone VARCHAR(30) NOT NULL
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  isbn VARCHAR(30) NOT NULL UNIQUE,
  year INT NOT NULL,
  available BOOLEAN DEFAULT TRUE,
  authorId INT NOT NULL,
  categoryId INT NOT NULL,
  CONSTRAINT fk_books_author FOREIGN KEY (authorId) REFERENCES authors(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_books_category FOREIGN KEY (categoryId) REFERENCES categories(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

CREATE TABLE loans (
  id INT AUTO_INCREMENT PRIMARY KEY,
  loanDate DATE NOT NULL,
  returnDate DATE NULL,
  status ENUM('activo','devuelto') DEFAULT 'activo',
  memberId INT NOT NULL,
  bookId INT NOT NULL,
  CONSTRAINT fk_loans_member FOREIGN KEY (memberId) REFERENCES members(id) ON UPDATE CASCADE ON DELETE RESTRICT,
  CONSTRAINT fk_loans_book FOREIGN KEY (bookId) REFERENCES books(id) ON UPDATE CASCADE ON DELETE RESTRICT
);

INSERT INTO authors (name, country) VALUES
('Miguel de Cervantes', 'Espana'),
('Laura Gallego', 'Espana'),
('Gabriel Garcia Marquez', 'Colombia'),
('Jane Austen', 'Reino Unido');

INSERT INTO categories (name, description) VALUES
('Novela', 'Obras narrativas de ficcion'),
('Juvenil', 'Lecturas para publico joven'),
('Clasicos', 'Libros destacados de la literatura'),
('Historia', 'Libros de historia y cultura');

INSERT INTO members (name, email, phone) VALUES
('Ana Lopez', 'ana@correo.com', '600111222'),
('Carlos Ruiz', 'carlos@correo.com', '600333444'),
('Marta Perez', 'marta@correo.com', '600555666');

INSERT INTO books (title, isbn, year, available, authorId, categoryId) VALUES
('Don Quijote de la Mancha', '9788491050297', 1605, true, 1, 3),
('Memorias de Idhun', '9788467532695', 2004, true, 2, 2),
('Cien anos de soledad', '9780307474728', 1967, true, 3, 1),
('Orgullo y prejuicio', '9780141439518', 1813, true, 4, 3);
