drop database if exists projeto1;
create database projeto1 charset=UTF8 collate utf8_general_ci;
USE projeto1;
CREATE TABLE entregadores (
    id_entregador INT NOT NULL primary key AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL,
    senha VARCHAR(30) NOT NULL,
    veiculo VARCHAR(60) NOT NULL
);
CREATE TABLE pedidos(
    id_pedido INT NOT NULL primary key AUTO_INCREMENT,
    cliente VARCHAR(50) NOT NULL,
    endereco VARCHAR(40) NOT NULL,
    produto VARCHAR(200) NOT NULL,
    data VARCHAR(12) NOT NULL,
    hora_pedido VARCHAR(20) NOT NULL,
    hora_entrega VARCHAR(20),
    hora_fim VARCHAR(20),
    id_entregador INT NOT NULL,
    FOREIGN KEY (id_entregador) REFERENCES entregadores(id_entregador)
);

CREATE VIEW vw_pedidos AS
SELECT p.*, e.nome as nome_ent, e.veiculo FROM pedidos p
INNER JOIN entregadores e
ON p.id_entregador = e.id_entregador
ORDER BY p.id_pedido ASC;

CREATE VIEW vw_pedidos_ex AS
SELECT * FROM vw_pedidos
WHERE hora_entrega IS NULL OR hora_entrega = '' OR hora_fim = NULL OR hora_fim = ""
ORDER BY id_pedido ASC;

CREATE VIEW vw_pedidos_ent AS
SELECT * FROM vw_pedidos
WHERE hora_fim IS NULL OR hora_fim = ""
ORDER BY id_pedido ASC;

LOAD DATA INFILE 'C:/Users/des/Documents/3DES/proj/aula01/banco/entregadores.csv'
INTO TABLE entregadores
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;
LOAD DATA INFILE 'C:/Users/des/Documents/3DES/proj/aula01/banco/pedidos.csv'
INTO TABLE pedidos
FIELDS TERMINATED BY ';'
ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 ROWS;