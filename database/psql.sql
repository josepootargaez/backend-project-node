CREATE DATABASE list;

CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    name VARCHAR(60),
    email TEXT
);

INSERT INTO users(name,email) values('rafael dominguez','rafael@hotmail.com');