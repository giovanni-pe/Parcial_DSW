create database youtube;

use youtube;

DROP TABLE IF EXISTS  Videos;

CREATE TABLE videos (
    id INT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    duracion varchar(20),
    autor varchar(50),
    url varchar(250)
);
