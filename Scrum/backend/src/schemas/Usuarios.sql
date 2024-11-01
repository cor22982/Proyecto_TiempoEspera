ALTER TABLE users
ADD COLUMN perfi_image BYTEA;
CREATE TABLE relaciones (
    id SERIAL PRIMARY KEY,
    empleador VARCHAR(50) NOT NULL,
    usuario VARCHAR(50) NOT NULL,
    FOREIGN KEY (empleador) REFERENCES users(pi),
    FOREIGN KEY (usuario) REFERENCES users(pi)
);
