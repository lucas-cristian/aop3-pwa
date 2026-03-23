-- =============================================================
-- AOP2 - Projeto Logico e Fisico
-- Banco de Dados: Preco de Combustiveis
-- Aluno: Lucas Cristian Silva Braz
-- SGBD: MySQL 8.0+
-- =============================================================

DROP DATABASE IF EXISTS preco_combustiveis;
CREATE DATABASE preco_combustiveis CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE preco_combustiveis;

CREATE TABLE cidade (
  id_cidade   INT           AUTO_INCREMENT,
  nome        VARCHAR(100)  NOT NULL,
  estado      CHAR(2)       NOT NULL,
  CONSTRAINT pk_cidade PRIMARY KEY (id_cidade),
  CONSTRAINT ck_cidade_estado CHECK (CHAR_LENGTH(estado) = 2)
) ENGINE=InnoDB;

CREATE TABLE bairro (
  id_bairro   INT           AUTO_INCREMENT,
  nome        VARCHAR(100)  NOT NULL,
  id_cidade   INT           NOT NULL,
  CONSTRAINT pk_bairro PRIMARY KEY (id_bairro),
  CONSTRAINT fk_bairro_cidade FOREIGN KEY (id_cidade)
    REFERENCES cidade(id_cidade) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE posto (
  id_posto    INT           AUTO_INCREMENT,
  nome        VARCHAR(150)  NOT NULL,
  logradouro  VARCHAR(200)  NOT NULL,
  numero      VARCHAR(50)   DEFAULT NULL,
  cep         CHAR(9)       NOT NULL,
  id_bairro   INT           NOT NULL,
  CONSTRAINT pk_posto PRIMARY KEY (id_posto),
  CONSTRAINT fk_posto_bairro FOREIGN KEY (id_bairro)
    REFERENCES bairro(id_bairro) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE telefone_posto (
  id_telefone INT           AUTO_INCREMENT,
  id_posto    INT           NOT NULL,
  numero      VARCHAR(20)   NOT NULL,
  CONSTRAINT pk_telefone PRIMARY KEY (id_telefone),
  CONSTRAINT fk_telefone_posto FOREIGN KEY (id_posto)
    REFERENCES posto(id_posto) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB;

CREATE TABLE combustivel (
  id_combustivel INT         AUTO_INCREMENT,
  descricao      VARCHAR(50) NOT NULL,
  CONSTRAINT pk_combustivel PRIMARY KEY (id_combustivel),
  CONSTRAINT uq_combustivel_descricao UNIQUE (descricao)
) ENGINE=InnoDB;

CREATE TABLE coleta (
  id_coleta      INT           AUTO_INCREMENT,
  id_posto       INT           NOT NULL,
  id_combustivel INT           NOT NULL,
  data_coleta    DATE          NOT NULL,
  valor          DECIMAL(6,3)  NOT NULL,
  CONSTRAINT pk_coleta PRIMARY KEY (id_coleta),
  CONSTRAINT fk_coleta_posto FOREIGN KEY (id_posto)
    REFERENCES posto(id_posto) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_coleta_combustivel FOREIGN KEY (id_combustivel)
    REFERENCES combustivel(id_combustivel) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT uq_coleta_unica UNIQUE (id_posto, id_combustivel, data_coleta),
  CONSTRAINT ck_coleta_valor CHECK (valor > 0)
) ENGINE=InnoDB;

INSERT INTO cidade (id_cidade, nome, estado) VALUES
  (1, 'VILA VELHA', 'ES'),
  (2, 'CARIACICA', 'ES');

INSERT INTO bairro (id_bairro, nome, id_cidade) VALUES
  (1, 'SAO TORQUATO', 1),
  (2, 'ITAPOAN', 1),
  (3, 'PRAIA DA COSTA', 1),
  (4, 'RIO MARINHO', 1),
  (5, 'COBILANDIA', 1),
  (6, 'ITAPARICA', 1),
  (7, 'SANTA INEZ', 1),
  (8, 'SANTA INES', 1),
  (9, 'NOSSA SENHORA DA PENHA', 1),
  (10, 'PRAIA DAS GAIVOTAS', 1),
  (11, 'CAMPO GRANDE', 2),
  (12, 'MARACANA', 2),
  (13, 'DOM BOSCO', 2),
  (14, 'JARDIM AMERICA', 2),
  (15, 'NOVA VALVERDE - CONTORNO DE VITORIA', 2),
  (16, 'ITAQUARI', 2),
  (17, 'CRISTOVAO COLOMBO', 1),
  (18, 'ALTO LAJE', 2),
  (19, 'VILA PALESTINA', 2),
  (20, 'PRAIA DE ITAPARICA', 1),
  (21, 'SAO FRANCISCO', 2),
  (22, 'ALTO LAGE', 2),
  (23, 'ITACIBA', 2),
  (24, 'DIVINO ESPÍRITO SANTO', 1),
  (25, 'POLO EMPRESARIAL NOVO MEXICO', 1),
  (26, 'ALVORADA', 1),
  (27, 'JABURUNA', 1),
  (28, 'DIVINO ESPIRITO SANTO', 1),
  (29, 'IBES', 1),
  (30, 'ATAIDE', 1);

INSERT INTO posto (id_posto, nome, logradouro, numero, cep, id_bairro) VALUES
  (1, 'A.B.C. AUTO SERVICOS LTDA', 'AVENIDA ROBERT KENNEDY', '21', '29114-000', 1),
  (2, 'POSTO ITAPOA LTDA', 'AVENIDA FRANCELINA SETUBAL', '333', '29100-000', 2),
  (3, 'POSTO CHAMPAGNAT LTDA', 'RUA HUGO MUSSO', '550', '29101-280', 3),
  (4, 'AUTO POSTO VALE ENCANTADO LTDA.', 'RUA SOBREIRO', '395', '29112-112', 4),
  (5, 'AUTO POSTO SUCESSO LTDA', 'AVENIDA JOAO FRANCISCO GONCALVES', '746', '29111-300', 5),
  (6, 'ARARA AZUL REDE DE POSTOS LTDA', 'AVENIDA FRANCISCO  LACERDA  DE  AGUIAR', '530', '29102-020', 6),
  (7, 'POSTO ARIBIRI DO GAS LTDA', 'AVENIDA CARLOS LINDEMBERG', '1944', '29108-075', 7),
  (8, 'DERIVADOS PETROLEO SANTA INES LTDA', 'RODOVIA CARLOS LINDEMBERG', '1801', '29100-000', 8),
  (9, 'POSTO PERIM LTDA', 'RUA SANTA LEOPOLDINA', '1650', '29102-040', 6),
  (10, 'CARREFOUR COMERCIO E INDUSTRIA LTDA', 'AVENIDA DARLY SANTOS', '4393', '29123-600', 9),
  (11, 'AUTO POSTO ILHA DAS GARCAS LTDA', 'RUA MARIA DE OLIVEIRA MARES GUIA', '40', '29102-567', 10),
  (12, 'AUTO POSTO ZAMBON LTDA', 'AVENIDA MARIO GURGEL', '3127', '29146-012', 11),
  (13, 'POSTO DE GASOLINA MARACANA LTDA', 'AVENIDA ALICE COUTINHO SANTOS', '2101', '29142-887', 12),
  (14, 'AUTO SERVICO SAO CRISTOVAO LTDA', 'AVENIDA MARIO GURGEL', '4', '29147-345', 13),
  (15, 'POSTO DE PRODUTOS DE PETROLEO OASIS LTDA', 'AVENIDA MARIO GURGEL', '297', '29140-261', 14),
  (16, 'AUTO POSTO CONTORNO LTDA', 'RODOVIA BR 101', 'S/N', '29140-970', 15),
  (17, 'POSTO KADILLAC LTDA', 'AVENIDA MARIO GURGEL', '1092', '29151-570', 16),
  (18, 'POSTO CAMPO GRANDE LTDA', 'AVENIDA EXPEDITO GARCIA', '222', '29157-405', 11),
  (19, 'POSTO CRISTOVAO COLOMBO LTDA', 'RUA CRISTOVAO COLOMBO', '582', '29106-595', 17),
  (20, 'POSTO BR 31 AUTO SERVICOS LTDA', 'AVENIDA MARIO GURGEL', '2844', '29151-026', 18),
  (21, 'MAIS COMERCIO DE COMBUSTIVEL CARIACICA LTDA', 'AVENIDA MARIO GURGEL', '4935', '29145-711', 19),
  (22, 'AUTO POSTO R M LTDA', 'RODOVIA DO SOL', '3701', '29102-023', 20),
  (23, 'C.R.B. DEZAN E CIA LTDA', 'AVENIDA MARIO GURGEL', '5913', '29145-409', 21),
  (24, 'PETROVERA - POSTO DE PRODUTOS DE PETROLEO E TRANSPORTES LTDA - ME', 'RODOVIA GOVERNADOR JOSE HENRIQUE SETTE', '906', '29151-055', 22),
  (25, 'COMERCIO DE COMBUSTIVEIS LINDENBERG LTDA', 'AVENIDA CARLOS LINDENBERG', '5718', '29108-075', 8),
  (26, 'POSTO DE COMBUSTIVEIS ITACIBA LTDA', 'RUA MANOEL JOAQUIM DOS SANTOS', '317', '29150-270', 23),
  (27, 'AUTOPOSTO DE COMBUSTIVEIS MASP SANTA INES LTDA', 'AVENIDA CARLOS LINDENBERG', '3241', '29108-075', 8),
  (28, 'POSTO MARCELA LTDA', 'RUA DO PESSEGUEIRO', 'S/N', '29107-230', 24),
  (29, 'AUTO POSTO ARACAS LTDA', 'RODOVIA DARLY SANTOS', 'S/N', '29104-360', 25),
  (30, 'POSTO TRES COQUEIROS LTDA', 'RODOVIA CARLOS LINDEMBERG', 'SN', '29123-600', 26),
  (31, 'J C RODRIGUES NETO E FILHOS LTDA', 'RUA CEARA', 'S/N', '29101-290', 3),
  (32, 'AUTO POSTO GASCROMA COMERCIO DE COMBUSTIVEIS, LUBRIFICANTES E SERVICOS LTDA', 'AVENIDA JERONIMO MONTEIRO', '840', '29100-600', 27),
  (33, 'AUTO POSTO BOULEVARD LTDA', 'RODOVIA DO SOL', 'S/N', '29102-020', 20),
  (34, 'AUTO POSTO DE COMBUSTIVEL RTT LTDA', 'RUA MOEMA', '38', '29107-250', 28),
  (35, 'POSTO SATURNINO RANGEL MAURO LTDA', 'RUA PROFESSOR AUGUSTO RUSCH', '121', '29102-080', 20),
  (36, 'POSTO RIO MARINHO COMERCIO DE DERIVADOS DE PETROLEO EIRELI - EPP', 'AVENIDA RIO MARINHO', 'S/N', '29112-690', 4),
  (37, 'RGM 2 COMERCIO DE PETROLEO LTDA', 'AVENIDA CARLOS LINDENBERG', '2423', '29108-335', 29),
  (38, 'POSTO CAPUABA LTDA', 'ESTRADA CAPUABA', '21', '29119-060', 30);

INSERT INTO combustivel (id_combustivel, descricao) VALUES
  (1, 'GASOLINA'),
  (2, 'GASOLINA ADITIVADA'),
  (3, 'ETANOL'),
  (4, 'DIESEL'),
  (5, 'DIESEL S10');

INSERT INTO coleta (id_posto, id_combustivel, data_coleta, valor) VALUES
  (1, 1, '2026-01-06', 6.29), (1, 2, '2026-01-06', 6.69), (2, 1, '2026-01-06', 6.29), (2, 2, '2026-01-06', 6.59), (2, 3, '2026-01-06', 4.68),
  (3, 1, '2026-01-07', 6.39), (3, 2, '2026-01-07', 6.69), (3, 3, '2026-01-07', 4.59), (4, 1, '2026-01-07', 6.19), (4, 2, '2026-01-07', 6.29),
  (5, 1, '2026-01-07', 6.15), (5, 3, '2026-01-07', 4.43), (6, 1, '2026-01-07', 6.29), (6, 2, '2026-01-07', 6.49), (6, 3, '2026-01-07', 4.59),
  (7, 1, '2026-01-07', 6.29), (7, 2, '2026-01-07', 6.49), (8, 1, '2026-01-07', 6.29), (8, 2, '2026-01-07', 6.49), (8, 3, '2026-01-07', 4.69),
  (9, 1, '2026-01-07', 6.29), (9, 2, '2026-01-07', 6.49), (9, 3, '2026-01-07', 4.89), (10, 1, '2026-01-07', 6.29), (10, 2, '2026-01-07', 6.39),
  (10, 3, '2026-01-07', 4.39), (11, 1, '2026-01-07', 6.39), (11, 2, '2026-01-07', 6.69), (12, 1, '2026-01-07', 6.19), (12, 2, '2026-01-07', 6.19),
  (12, 3, '2026-01-07', 4.59), (13, 1, '2026-01-07', 6.25), (13, 2, '2026-01-07', 6.39), (13, 3, '2026-01-07', 4.65), (14, 3, '2026-01-07', 4.48),
  (14, 1, '2026-01-07', 6.16), (14, 2, '2026-01-07', 6.24), (15, 1, '2026-01-07', 6.29), (15, 2, '2026-01-07', 6.49), (15, 3, '2026-01-07', 4.49),
  (16, 1, '2026-01-07', 6.29), (16, 2, '2026-01-07', 6.49), (16, 3, '2026-01-07', 4.79), (17, 1, '2026-01-07', 6.19), (17, 2, '2026-01-07', 6.19),
  (17, 3, '2026-01-07', 4.65), (18, 1, '2026-01-07', 6.19), (18, 2, '2026-01-07', 6.19), (18, 3, '2026-01-07', 4.59), (19, 1, '2026-01-07', 6.19),
  (19, 2, '2026-01-07', 6.49), (20, 1, '2026-01-07', 6.15), (20, 2, '2026-01-07', 6.55), (20, 3, '2026-01-07', 4.69), (21, 1, '2026-01-07', 6.19),
  (21, 3, '2026-01-07', 4.49), (22, 1, '2026-01-07', 6.29), (22, 2, '2026-01-07', 6.69), (22, 3, '2026-01-07', 4.72), (23, 1, '2026-01-07', 6.19),
  (23, 3, '2026-01-07', 4.59), (24, 1, '2026-01-07', 6.15), (24, 2, '2026-01-07', 6.15), (24, 3, '2026-01-07', 4.69), (25, 3, '2026-01-07', 4.43),
  (25, 1, '2026-01-07', 6.25), (26, 1, '2026-01-07', 6.15), (26, 2, '2026-01-07', 6.15), (26, 3, '2026-01-07', 4.59), (27, 1, '2026-01-07', 6.29),
  (27, 2, '2026-01-07', 6.49), (27, 3, '2026-01-07', 4.69), (28, 1, '2026-01-08', 6.29), (28, 2, '2026-01-08', 6.49), (3, 1, '2026-01-12', 6.39),
  (3, 2, '2026-01-12', 6.69), (3, 3, '2026-01-12', 4.59), (1, 1, '2026-01-12', 6.29), (1, 2, '2026-01-12', 6.69), (29, 1, '2026-01-12', 6.29),
  (29, 2, '2026-01-12', 6.49), (29, 3, '2026-01-12', 4.49), (30, 1, '2026-01-12', 6.29), (30, 2, '2026-01-12', 6.49), (30, 3, '2026-01-12', 4.69),
  (31, 1, '2026-01-12', 6.19), (31, 2, '2026-01-12', 6.19), (11, 1, '2026-01-12', 6.39), (11, 2, '2026-01-12', 6.69), (32, 1, '2026-01-12', 6.29),
  (32, 2, '2026-01-12', 6.99), (22, 1, '2026-01-12', 6.29), (22, 2, '2026-01-12', 6.69), (22, 3, '2026-01-12', 4.72), (33, 1, '2026-01-12', 6.29),
  (33, 2, '2026-01-12', 6.69), (33, 3, '2026-01-12', 4.69), (34, 1, '2026-01-14', 6.29), (34, 2, '2026-01-14', 6.39), (34, 3, '2026-01-14', 4.69),
  (6, 1, '2026-01-14', 6.29), (6, 2, '2026-01-14', 6.49), (6, 3, '2026-01-14', 4.59), (2, 1, '2026-01-14', 6.29), (2, 2, '2026-01-14', 6.59),
  (2, 3, '2026-01-14', 4.68), (9, 1, '2026-01-14', 6.29), (9, 2, '2026-01-14', 6.49), (9, 3, '2026-01-14', 4.89), (28, 2, '2026-01-14', 6.49),
  (28, 1, '2026-01-14', 6.29), (19, 1, '2026-01-14', 6.19), (19, 2, '2026-01-14', 6.49), (35, 1, '2026-01-14', 6.29), (35, 2, '2026-01-14', 6.59),
  (35, 3, '2026-01-14', 4.67), (12, 1, '2026-01-15', 6.19), (12, 2, '2026-01-15', 6.19), (12, 3, '2026-01-15', 4.69), (13, 1, '2026-01-15', 6.25),
  (13, 2, '2026-01-15', 6.39), (13, 3, '2026-01-15', 4.65), (14, 1, '2026-01-15', 6.24), (15, 1, '2026-01-15', 6.29), (15, 2, '2026-01-15', 6.49),
  (16, 1, '2026-01-15', 6.19), (16, 2, '2026-01-15', 6.39), (16, 3, '2026-01-15', 4.79), (17, 1, '2026-01-15', 6.19), (17, 2, '2026-01-15', 6.19),
  (17, 3, '2026-01-15', 4.65), (18, 1, '2026-01-15', 6.19), (18, 2, '2026-01-15', 6.19), (18, 3, '2026-01-15', 4.59), (20, 1, '2026-01-15', 6.15),
  (20, 2, '2026-01-15', 6.55), (20, 3, '2026-01-15', 4.76), (21, 1, '2026-01-15', 6.19), (21, 3, '2026-01-15', 4.69), (23, 1, '2026-01-15', 6.19),
  (23, 3, '2026-01-15', 4.69), (24, 1, '2026-01-15', 6.15), (24, 2, '2026-01-15', 6.15), (24, 3, '2026-01-15', 4.69), (26, 1, '2026-01-15', 6.15),
  (26, 2, '2026-01-15', 6.15), (26, 3, '2026-01-15', 4.49), (4, 1, '2026-01-19', 6.19), (4, 2, '2026-01-19', 6.29), (5, 1, '2026-01-19', 6.15),
  (5, 3, '2026-01-19', 4.59), (7, 1, '2026-01-19', 6.29), (7, 2, '2026-01-19', 6.49), (8, 1, '2026-01-19', 6.29), (8, 2, '2026-01-19', 6.49),
  (8, 3, '2026-01-19', 4.69), (10, 1, '2026-01-19', 6.29), (10, 2, '2026-01-19', 6.39), (10, 3, '2026-01-19', 4.39), (30, 1, '2026-01-19', 6.29),
  (30, 2, '2026-01-19', 6.49), (30, 3, '2026-01-19', 4.69), (12, 1, '2026-01-19', 6.19), (12, 2, '2026-01-19', 6.19), (12, 3, '2026-01-19', 4.69),
  (13, 1, '2026-01-19', 6.25), (13, 2, '2026-01-19', 6.39), (13, 3, '2026-01-19', 4.65), (14, 1, '2026-01-19', 6.24), (14, 2, '2026-01-19', 6.35),
  (14, 3, '2026-01-19', 4.68), (15, 1, '2026-01-19', 5.97), (15, 2, '2026-01-19', 6.49), (16, 1, '2026-01-19', 6.19), (16, 2, '2026-01-19', 6.39),
  (16, 3, '2026-01-19', 4.79), (17, 1, '2026-01-19', 6.19), (17, 2, '2026-01-19', 6.19), (17, 3, '2026-01-19', 4.65), (18, 1, '2026-01-19', 6.19),
  (18, 2, '2026-01-19', 6.19), (18, 3, '2026-01-19', 4.59), (20, 1, '2026-01-19', 6.15), (20, 2, '2026-01-19', 6.55), (20, 3, '2026-01-19', 4.76),
  (21, 1, '2026-01-19', 6.19), (21, 3, '2026-01-19', 4.69), (22, 1, '2026-01-19', 6.29), (22, 2, '2026-01-19', 6.69), (22, 3, '2026-01-19', 4.76),
  (23, 1, '2026-01-19', 6.19), (23, 3, '2026-01-19', 4.69), (36, 1, '2026-01-19', 6.17), (36, 2, '2026-01-19', 6.49), (36, 3, '2026-01-19', 4.67),
  (33, 1, '2026-01-19', 6.29), (33, 2, '2026-01-19', 6.69), (33, 3, '2026-01-19', 4.72), (24, 1, '2026-01-19', 6.15), (24, 2, '2026-01-19', 6.15),
  (24, 3, '2026-01-19', 4.69), (25, 1, '2026-01-19', 6.25), (25, 3, '2026-01-19', 4.59), (26, 1, '2026-01-19', 6.15), (26, 2, '2026-01-19', 6.15),
  (26, 3, '2026-01-19', 4.65), (37, 1, '2026-01-19', 6.29), (37, 2, '2026-01-19', 6.49), (37, 3, '2026-01-19', 4.79), (38, 1, '2026-01-19', 6.29),
  (38, 2, '2026-01-19', 6.59), (38, 3, '2026-01-19', 4.49), (27, 1, '2026-01-19', 6.29), (27, 2, '2026-01-19', 6.49), (27, 3, '2026-01-19', 4.69),
  (1, 1, '2026-01-20', 5.99), (1, 2, '2026-01-20', 6.39), (9, 1, '2026-01-22', 6.29), (9, 2, '2026-01-22', 6.49), (9, 3, '2026-01-22', 4.89),
  (28, 1, '2026-01-23', 6.29), (28, 2, '2026-01-23', 6.49), (29, 1, '2026-01-26', 6.29), (29, 2, '2026-01-26', 6.49), (29, 3, '2026-01-26', 4.65),
  (9, 1, '2026-01-26', 6.29), (9, 2, '2026-01-26', 6.49), (9, 3, '2026-01-26', 4.89), (11, 1, '2026-01-26', 6.39), (11, 2, '2026-01-26', 6.69),
  (22, 1, '2026-01-26', 6.29), (22, 2, '2026-01-26', 6.69), (22, 3, '2026-01-26', 4.76), (33, 1, '2026-01-26', 6.29), (33, 2, '2026-01-26', 6.69),
  (33, 3, '2026-01-26', 4.72), (3, 1, '2026-01-27', 6.29), (3, 2, '2026-01-27', 6.69), (3, 3, '2026-01-27', 4.79), (34, 1, '2026-01-27', 6.29),
  (34, 2, '2026-01-27', 6.39), (34, 3, '2026-01-27', 4.99), (4, 1, '2026-01-27', 6.19), (4, 2, '2026-01-27', 6.29), (5, 1, '2026-01-27', 6.15),
  (5, 3, '2026-01-27', 4.59), (12, 1, '2026-01-27', 6.19), (12, 2, '2026-01-27', 6.19), (12, 3, '2026-01-27', 4.79), (13, 1, '2026-01-27', 6.17),
  (13, 2, '2026-01-27', 6.29), (13, 3, '2026-01-27', 4.79), (14, 1, '2026-01-27', 6.24), (14, 2, '2026-01-27', 6.35), (14, 3, '2026-01-27', 4.68),
  (15, 1, '2026-01-27', 6.05), (15, 2, '2026-01-27', 6.39), (16, 1, '2026-01-27', 6.29), (16, 2, '2026-01-27', 6.49), (16, 3, '2026-01-27', 4.79),
  (17, 1, '2026-01-27', 6.19), (17, 2, '2026-01-27', 6.19), (17, 3, '2026-01-27', 4.65), (18, 1, '2026-01-27', 6.19), (18, 2, '2026-01-27', 6.19),
  (18, 3, '2026-01-27', 4.69), (19, 1, '2026-01-27', 6.19), (19, 2, '2026-01-27', 6.49), (20, 1, '2026-01-27', 6.09), (20, 2, '2026-01-27', 6.49),
  (20, 3, '2026-01-27', 4.46), (21, 1, '2026-01-27', 6.19), (21, 3, '2026-01-27', 4.69), (32, 1, '2026-01-27', 6.29), (32, 2, '2026-01-27', 6.99),
  (23, 1, '2026-01-27', 6.19), (23, 3, '2026-01-27', 4.69), (36, 1, '2026-01-27', 6.15), (36, 2, '2026-01-27', 6.45), (36, 3, '2026-01-27', 4.89),
  (24, 1, '2026-01-27', 6.15), (24, 2, '2026-01-27', 6.15), (24, 3, '2026-01-27', 4.69), (26, 1, '2026-01-27', 6.15), (26, 2, '2026-01-27', 6.15),
  (26, 3, '2026-01-27', 4.65), (6, 1, '2026-01-28', 6.29), (6, 2, '2026-01-28', 6.49), (6, 3, '2026-01-28', 4.59), (1, 1, '2026-01-28', 5.99),
  (1, 2, '2026-01-28', 6.39), (2, 1, '2026-01-28', 6.29), (2, 2, '2026-01-28', 6.59), (2, 3, '2026-01-28', 4.78), (28, 1, '2026-01-28', 6.29),
  (28, 2, '2026-01-28', 6.49), (1, 4, '2026-01-06', 6.09), (1, 5, '2026-01-06', 6.09), (2, 5, '2026-01-06', 5.99), (3, 5, '2026-01-07', 6.09),
  (4, 4, '2026-01-07', 6.19), (4, 5, '2026-01-07', 6.29), (5, 5, '2026-01-07', 5.89), (6, 5, '2026-01-07', 5.95), (9, 5, '2026-01-07', 6.19),
  (12, 5, '2026-01-07', 5.99), (13, 4, '2026-01-07', 5.99), (13, 5, '2026-01-07', 5.99), (14, 4, '2026-01-07', 6.03), (15, 5, '2026-01-07', 6.09),
  (16, 4, '2026-01-07', 5.99), (16, 5, '2026-01-07', 6.09), (17, 4, '2026-01-07', 5.90), (17, 5, '2026-01-07', 5.97), (19, 5, '2026-01-07', 5.99),
  (20, 5, '2026-01-07', 6.09), (22, 5, '2026-01-07', 6.09), (23, 5, '2026-01-07', 5.99), (24, 4, '2026-01-07', 5.89), (24, 5, '2026-01-07', 5.99),
  (25, 5, '2026-01-07', 5.85), (28, 5, '2026-01-08', 5.99), (3, 5, '2026-01-12', 6.09), (1, 4, '2026-01-12', 6.09), (1, 5, '2026-01-12', 6.09),
  (29, 4, '2026-01-12', 5.89), (29, 5, '2026-01-12', 5.99), (30, 4, '2026-01-12', 5.79), (30, 5, '2026-01-12', 5.89), (32, 4, '2026-01-12', 6.29),
  (22, 5, '2026-01-12', 6.09), (33, 5, '2026-01-12', 6.09), (34, 5, '2026-01-14', 5.99), (6, 5, '2026-01-14', 5.95), (2, 5, '2026-01-14', 5.99),
  (9, 5, '2026-01-14', 6.19), (28, 5, '2026-01-14', 5.99), (35, 5, '2026-01-14', 6.09), (12, 5, '2026-01-15', 5.99), (13, 4, '2026-01-15', 5.99),
  (13, 5, '2026-01-15', 6.09), (15, 5, '2026-01-15', 6.09), (16, 4, '2026-01-15', 5.89), (16, 5, '2026-01-15', 5.99), (17, 4, '2026-01-15', 5.90),
  (17, 5, '2026-01-15', 5.97), (20, 5, '2026-01-15', 6.09), (23, 5, '2026-01-15', 5.99), (24, 4, '2026-01-15', 5.89), (24, 5, '2026-01-15', 5.99),
  (4, 4, '2026-01-19', 6.19), (4, 5, '2026-01-19', 6.29), (5, 5, '2026-01-19', 5.89), (30, 4, '2026-01-19', 5.79), (30, 5, '2026-01-19', 5.89),
  (12, 5, '2026-01-19', 5.99), (13, 4, '2026-01-19', 5.99), (13, 5, '2026-01-19', 6.09), (15, 5, '2026-01-19', 6.09), (16, 4, '2026-01-19', 5.89),
  (16, 5, '2026-01-19', 5.99), (17, 4, '2026-01-19', 5.90), (17, 5, '2026-01-19', 5.97), (20, 5, '2026-01-19', 6.09), (22, 5, '2026-01-19', 6.09),
  (23, 5, '2026-01-19', 6.09), (36, 4, '2026-01-19', 6.05), (36, 5, '2026-01-19', 6.09), (33, 5, '2026-01-19', 6.09), (24, 4, '2026-01-19', 5.89),
  (24, 5, '2026-01-19', 5.99), (25, 5, '2026-01-19', 5.85), (37, 5, '2026-01-19', 5.99), (38, 4, '2026-01-19', 5.99), (38, 5, '2026-01-19', 6.09),
  (1, 4, '2026-01-20', 6.09), (1, 5, '2026-01-20', 6.09), (9, 5, '2026-01-22', 6.19), (28, 5, '2026-01-23', 5.99), (29, 4, '2026-01-26', 5.89),
  (29, 5, '2026-01-26', 5.99), (9, 5, '2026-01-26', 6.19), (22, 5, '2026-01-26', 6.09), (33, 5, '2026-01-26', 6.09), (3, 5, '2026-01-27', 6.29),
  (34, 5, '2026-01-27', 5.99), (4, 4, '2026-01-27', 6.19), (4, 5, '2026-01-27', 6.29), (5, 5, '2026-01-27', 5.89), (12, 5, '2026-01-27', 5.99),
  (13, 4, '2026-01-27', 5.99), (13, 5, '2026-01-27', 6.09), (15, 5, '2026-01-27', 6.09), (16, 4, '2026-01-27', 5.89), (16, 5, '2026-01-27', 5.99),
  (17, 4, '2026-01-27', 5.90), (17, 5, '2026-01-27', 5.97), (20, 5, '2026-01-27', 5.99), (32, 4, '2026-01-27', 6.19), (23, 5, '2026-01-27', 6.09),
  (36, 4, '2026-01-27', 6.05), (36, 5, '2026-01-27', 6.09), (24, 4, '2026-01-27', 5.89), (24, 5, '2026-01-27', 5.99), (6, 5, '2026-01-28', 5.95),
  (1, 4, '2026-01-28', 6.09), (1, 5, '2026-01-28', 6.09), (2, 5, '2026-01-28', 5.99), (28, 5, '2026-01-28', 5.99);

SELECT
  p.nome       AS nome_posto,
  CONCAT(p.logradouro, ', ', COALESCE(p.numero, 'S/N'), ' - CEP: ', p.cep) AS endereco,
  b.nome       AS bairro,
  c.descricao  AS tipo_combustivel,
  co.valor     AS valor_combustivel,
  co.data_coleta
FROM coleta co
JOIN posto p        ON co.id_posto = p.id_posto
JOIN bairro b       ON p.id_bairro = b.id_bairro
JOIN combustivel c  ON co.id_combustivel = c.id_combustivel
WHERE co.valor = (
    SELECT MIN(co2.valor)
    FROM coleta co2
    WHERE co2.id_combustivel = co.id_combustivel
)
   OR co.valor = (
    SELECT MAX(co2.valor)
    FROM coleta co2
    WHERE co2.id_combustivel = co.id_combustivel
)
ORDER BY c.descricao, co.valor;

SELECT
  p.nome                      AS nome_posto,
  b.nome                      AS bairro,
  c.descricao                 AS tipo_combustivel,
  ROUND(AVG(co.valor), 3)     AS preco_medio,
  COUNT(co.id_coleta)         AS quantidade_amostras
FROM coleta co
JOIN posto p        ON co.id_posto = p.id_posto
JOIN bairro b       ON p.id_bairro = b.id_bairro
JOIN combustivel c  ON co.id_combustivel = c.id_combustivel
GROUP BY p.id_posto, p.nome, b.nome, c.id_combustivel, c.descricao
ORDER BY p.nome, c.descricao;

SELECT 
    p.nome AS nome_posto,
    b.nome AS bairro,
    c.descricao AS tipo_combustivel,
    co.valor AS valor_combustivel,
    co.data_coleta
FROM coleta co
JOIN posto p ON co.id_posto = p.id_posto
JOIN bairro b ON p.id_bairro = b.id_bairro
JOIN combustivel c ON co.id_combustivel = c.id_combustivel
WHERE co.data_coleta = (
    SELECT MAX(co2.data_coleta)
    FROM coleta co2
    WHERE co2.id_posto = co.id_posto 
      AND co2.id_combustivel = co.id_combustivel
);

SELECT
  p.nome       AS nome_posto,
  b.nome       AS bairro,
  c.descricao  AS tipo_combustivel,
  co.valor     AS valor_combustivel,
  co.data_coleta
FROM coleta co
JOIN posto p        ON co.id_posto = p.id_posto
JOIN bairro b       ON p.id_bairro = b.id_bairro
JOIN combustivel c  ON co.id_combustivel = c.id_combustivel
WHERE p.nome LIKE '%ZAMBON%'
  AND c.descricao = 'GASOLINA'
ORDER BY co.data_coleta ASC;

-- =============================================================
-- VALIDACAO: 3 Forma Normal (3FN)
-- =============================================================
--
--  1FN (Primeira Forma Normal)                                
--   Todos os atributos sao atomicos (indivisiveis)          
--     - Endereco decomposto em logradouro, numero e cep       
--     - Telefones separados em tabela propria (TELEFONE_POSTO)
--     - Eliminacao de grupos repetitivos                      
--
--  2FN (Segunda Forma Normal)                                 
--   Todas as tabelas utilizam chaves primarias simples       
--     (AUTO_INCREMENT), nao havendo dependencias parciais    
--   Todos os atributos nao-chave dependem integralmente da PK
--
--  3FN (Terceira Forma Normal)                                
--   Eliminacao de dependencias transitivas:                  
--     - cidade e bairro separados                            
--     - posto referencia apenas bairro                       
--   Atributos derivados NAO sao armazenados:                 
--     - preco_medio e quantidade_amostras                    
--     - calculados dinamicamente via queries (II.d)          
--
-- =============================================================
-- TIPOS DE RESTRICOES UTILIZADAS
-- =============================================================
--
-- PRIMARY KEY  - em todas as tabelas                         
-- FOREIGN KEY  - bairro -> cidade                            
--                posto -> bairro                            
--                telefone_posto -> posto                    
--                coleta -> posto                            
--                coleta -> combustivel                      
-- NOT NULL     - atributos obrigatorios                      
-- UNIQUE       - combustivel.descricao                       
--                coleta (id_posto, id_combustivel, data_coleta)
-- CHECK        - cidade.estado (2 caracteres)               
--                coleta.valor > 0                            
-- DEFAULT NULL - posto.numero (atributo opcional)            
-- ON DELETE    - RESTRICT (garante integridade referencial)  
-- ON UPDATE    - CASCADE (propaga atualizacoes)              
--
-- =============================================================
-- VALIDACAO FINAL DO PROJETO
-- =============================================================
--
-- SGBD: MySQL 8.0
--
-- Fonte dos dados:
-- Agencia Nacional do Petroleo, Gas Natural e Biocombustiveis (ANP)
-- Serie Historica de Precos de Combustiveis
-- https://www.gov.br/anp/pt-br/centrais-de-conteudo/dados-abertos/serie-historica-de-precos-de-combustiveis
--
-- Os dados utilizados neste projeto sao 100% reais, sem qualquer
-- tipo de simulacao, preenchimento artificial ou interpolacao.
--
-- Observacoes sobre os dados reais:
-- - As coletas nao ocorrem diariamente para todos os postos
-- - Alguns postos nao possuem todos os tipos de combustivel
-- - As datas variam conforme a operacao real da ANP
--
-- Sobre os combustiveis:
-- - Foram considerados os combustiveis exigidos no enunciado:
--   GASOLINA, GASOLINA ADITIVADA, ETANOL e DIESEL
-- - O combustivel DIESEL S10 foi mantido por fazer parte da base
--   oficial da ANP, sendo tratado como extensao real dos dados.
