-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Tempo de geração: 27-Mar-2024 às 15:38
-- Versão do servidor: 8.0.31
-- versão do PHP: 7.4.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `stand`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `cars`
--

DROP TABLE IF EXISTS `cars`;
CREATE TABLE IF NOT EXISTS `cars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `modelo` varchar(100) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `ano` int NOT NULL,
  `kms` int NOT NULL,
  `motor` varchar(50) NOT NULL,
  `co2` varchar(50) NOT NULL,
  `caixa` varchar(50) NOT NULL,
  `combustivel` varchar(50) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `lugares` int NOT NULL,
  `portas` int NOT NULL,
  `cor` varchar(50) NOT NULL,
  `estado` varchar(50) NOT NULL,
  `origem` varchar(50) NOT NULL,
  `garantia` varchar(50) NOT NULL,
  `preco` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Estrutura da tabela `fotos`
--

DROP TABLE IF EXISTS `fotos`;
CREATE TABLE IF NOT EXISTS `fotos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `fileName` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `carId` int NOT NULL,
  `banner` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `fotos`
--

INSERT INTO `fotos` (`id`, `fileName`, `carId`, `banner`) VALUES
(45, '2024.03.22-10.59.482.jpg', 41, 1),
(44, '2024.03.22-10.59.481.jpg', 41, 0),
(43, '2024.03.22-10.59.480.jpg', 41, 0),
(41, '2024.03.20-19.45.221.jpg', 41, 0),
(42, '2024.03.22-10.58.340.jpg', 41, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `settings`
--

DROP TABLE IF EXISTS `settings`;
CREATE TABLE IF NOT EXISTS `settings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `about` longtext NOT NULL,
  `horario1` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `horario2` longtext NOT NULL,
  `horario3` longtext NOT NULL,
  `facebook` varchar(255) NOT NULL,
  `instagram` varchar(255) NOT NULL,
  `youtube` varchar(255) NOT NULL,
  `morada1` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `morada2` longtext NOT NULL,
  `morada3` longtext NOT NULL,
  `contacto1` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `contacto2` varchar(255) NOT NULL,
  `contacto3` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `settings`
--

INSERT INTO `settings` (`id`, `about`, `horario1`, `horario2`, `horario3`, `facebook`, `instagram`, `youtube`, `morada1`, `morada2`, `morada3`, `contacto1`, `contacto2`, `contacto3`, `email`) VALUES
(1, 'teste1', 'ssss', 'dddd', 'eee', 'ffff', 'aaaaa', 'xxx', 'teste de morada', '', 'hghghghghghg', 'teste contacto 1', 'teste contacto 2', '', 'eee');

-- --------------------------------------------------------

--
-- Estrutura da tabela `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3;

--
-- Extraindo dados da tabela `users`
--

INSERT INTO `users` (`id`, `name`, `login`, `password`) VALUES
(1, 'Mário', 'warlockzeo', 'smtqsgjh'),
(2, 'teste nome', 'teste login', 'teste'),
(7, '', '', '');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
