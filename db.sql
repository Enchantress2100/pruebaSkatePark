--CREATE DATABASE skatepark;

CREATE TABLE skaters(
    id SERIAL,
    email VARCHAR(50) NOT NULL,
    nombre VARCHAR(25) NOT NULL,
    password VARCHAR(25) NOT NULL,
    anos_experiencia INT NOT NULL,
    especialidad VARCHAR(50) NOT NULL,
    foto VARCHAR(255) NOT NULL,
    estado BOOLEAN NOT NULL);

INSERT INTO skaters (email,nombre, password, anos_experiencia,especialidad,foto,estado) 
VALUES('tonyhawk@skate.com','Tony Hawk','12345678', '12', 'Kickflip', 'tony.jpg', TRUE);
INSERT INTO skaters (email,nombre, password, anos_experiencia,especialidad,foto,estado) 
VALUES('evelienbouilliart@skate.com','Evelien Bouilliart','12345678', '10', 'Heelflip','Evelien.jpg', TRUE);
INSERT INTO skaters (email,nombre, password, anos_experiencia,especialidad,foto,estado) 
VALUES('dannyway@skate.com','Danny Way','12345678', '8', 'Ollie', 'Danny.jpg' , FALSE);



SELECT * from skaters
--DELETE FROM skaters;
--DROP TABLE skaters;