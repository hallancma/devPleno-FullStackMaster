/*
 Navicat Premium Data Transfer

 Source Server         : LOCALHOST
 Source Server Type    : MySQL
 Source Server Version : 100137
 Source Host           : localhost:3306
 Source Schema         : cadastro

 Target Server Type    : MySQL
 Target Server Version : 100137
 File Encoding         : 65001

 Date: 31/01/2020 21:21:20
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for pessoas
-- ----------------------------
DROP TABLE IF EXISTS `pessoas`;
CREATE TABLE `pessoas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `nascimento` date DEFAULT NULL,
  `cargo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Table structure for projetos
-- ----------------------------
DROP TABLE IF EXISTS `projetos`;
CREATE TABLE `projetos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) DEFAULT NULL,
  `dono_id` int(11) NOT NULL,
  `gerente_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fke_dono_pessoa` (`dono_id`),
  KEY `fke_gerente_pessoa` (`gerente_id`),
  CONSTRAINT `fke_dono_pessoa` FOREIGN KEY (`dono_id`) REFERENCES `pessoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fke_gerente_pessoa` FOREIGN KEY (`gerente_id`) REFERENCES `pessoas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

SET FOREIGN_KEY_CHECKS = 1;
