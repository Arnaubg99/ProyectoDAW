drop database if exists proyectoDAW;
create database proyectoDAW;
use proyectoDAW;

create table usuarios (
id_usuario integer(10) primary key auto_increment unique,
nombre varchar(15) not null,
contrasena varchar(20) not null,
correo varchar(35) not null unique,
puntos integer(10),
administrador boolean not null
);

create table puntuacion (
id_usuario integer(10) primary key,
fecha_ultima_conexion date, 
puntos_diarios integer(10),
puntos_maximos integer(10),
foreign key (id_usuario) references usuarios(id_usuario) on update cascade on delete cascade 
);

create table mercados (
id_mercado integer(2) primary key auto_increment unique,
nombre varchar(15) not null,
url varchar(100) not null
);

create table ofertas (
id_oferta integer(5) primary key auto_increment unique,
tipo_negocio varchar(50) not null,
coste_puntos integer(10) not null,
descripcion varchar(150) not null
);

create table mercados_has_ofertas (
id_mercado integer(2) primary key,
id_oferta integer(5) not null,
foreign key(id_mercado) references mercados(id_mercado) on update no action on delete cascade,
foreign key(id_oferta) references ofertas(id_oferta) on update no action on delete cascade
);

create table usuario_has_mercados (
id_usuario integer(5) primary key,
id_mercado integer(2) not null,
foreign key(id_usuario) references usuarios(id_usuario) on update no action on delete cascade,
foreign key(id_mercado) references mercados(id_mercado) on update no action on delete cascade
);

create table usuario_has_ofertas (
id_usuario integer(5) primary key,
id_oferta integer(5) not null,
foreign key(id_usuario) references usuarios(id_usuario) on update no action on delete cascade,
foreign key(id_oferta) references ofertas(id_oferta) on update no action on delete cascade
);

