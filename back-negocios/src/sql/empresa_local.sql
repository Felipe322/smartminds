DROP USER IF EXISTS 'Admin'@'localhost';

CREATE USER 'Admin'@'localhost' IDENTIFIED BY 'pitufito_L34';


GRANT ALL PRIVILEGES ON *.* TO 'Admin'@'localhost' WITH GRANT OPTION;


CREATE DATABASE empresas_locales;


use empresas_locales;

CREATE TABLE CATEGORIA(
	id_categoria int auto_increment,
	nombre_categoria varchar(40),
	PRIMARY KEY(id_categoria)
);

CREATE TABLE USUARIO(
	usuario varchar(30),
	email varchar(40),
	apellidos varchar(50),
	contrasena varchar(40),
	nombre varchar(30),
	imagen blob,
	PRIMARY KEY(usuario, email)
);


CREATE TABLE EMPRESA(
	id_empresa int auto_increment,
	nombre varchar(40),
	direccion varchar(170),
	email varchar(40),
	telefono char(10),
	descripcion varchar(255),
	horario varchar(255),
	id_categoria int,
	imagen blob,
	CONSTRAINT chk_telefono CHECK (length(telefono)=10),
	PRIMARY KEY(id_empresa),
	FOREIGN KEY(id_categoria) REFERENCES CATEGORIA(id_categoria)
);

INSERT INTO EMPRESA VALUES (NULL,'MI EMPRESA1','5 de Febrero #70','a_drian1@hotmail.es','4671054495',NULL,NULL,NULL,NULL);


CREATE TABLE REGISTRO_EMPRESA(
	usuario varchar(30),
	email varchar(40),
	id_empresa int,
	PRIMARY KEY(usuario, email, id_empresa),
	FOREIGN KEY(usuario,email) REFERENCES USUARIO(usuario,email),
	FOREIGN KEY(id_empresa) REFERENCES EMPRESA(id_empresa)
);

CREATE TABLE FAVORITO_EMPRESA(
	usuario varchar(30),
	email varchar(40),
	id_empresa int,
	PRIMARY KEY(usuario, email, id_empresa),
	FOREIGN KEY(usuario, email) REFERENCES USUARIO(usuario,email),
	FOREIGN KEY(id_empresa) REFERENCES EMPRESA(id_empresa)
);

CREATE TABLE COMENTARIO_EMPRESA(
	usuario varchar(30),
	email varchar(40),
	id_empresa int,
	contenido varchar(255),
	PRIMARY KEY(usuario, email, id_empresa),
	FOREIGN KEY(usuario, email) REFERENCES USUARIO(usuario,email),
	FOREIGN KEY(id_empresa) REFERENCES EMPRESA(id_empresa)
);

CREATE TABLE CALIFICACION_EMPRESA(
	usuario varchar(30),
	email varchar(40),
	id_empresa int,
	puntuacion int(1),
	PRIMARY KEY(usuario, email, id_empresa),
	CONSTRAINT chk_puntuacion CHECK (puntuacion < 5),
	FOREIGN KEY(usuario, email) REFERENCES USUARIO(usuario,email),
	FOREIGN KEY(id_empresa) REFERENCES EMPRESA(id_empresa)
);

CREATE TABLE IMAGEN(
	id_imagen int auto_increment,
	nombre varchar(30),
	id_empresa int,
	PRIMARY KEY(id_imagen,id_empresa),
	FOREIGN KEY(id_empresa) REFERENCES EMPRESA(id_empresa)
);

ALTER TABLE EMPRESA MODIFY imagen VARCHAR(255);