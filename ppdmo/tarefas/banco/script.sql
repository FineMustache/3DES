DROP DATABASE IF EXISTS tarefas;
CREATE DATABASE tarefas charset=UTF8 collate utf8_general_ci;

USE tarefas;

CREATE TABLE tarefas (
    id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(300) NOT NULL,
    hora_tarefa VARCHAR(8) NOT NULL,
    hora_enc VARCHAR(8),
    status int NOT NULL
);