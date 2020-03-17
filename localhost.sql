-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2020-03-17 17:58:19
-- 服务器版本： 8.0.12
-- PHP 版本： 7.3.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 数据库： `nodemysql`
--
CREATE DATABASE IF NOT EXISTS `nodemysql` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `nodemysql`;
--
-- 数据库： `root`
--
CREATE DATABASE IF NOT EXISTS `root` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `root`;

-- --------------------------------------------------------

--
-- 表的结构 `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `creator` json NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `creator`) VALUES
(1, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(2, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(3, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(4, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(5, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(6, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(7, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(8, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(9, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(10, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}'),
(11, 'bgtest1的房间', '{\"id\": 1, \"name\": \"bgtest1\"}');

-- --------------------------------------------------------

--
-- 表的结构 `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `score` int(11) DEFAULT '0',
  `img` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `token` varchar(300) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `users`
--

INSERT INTO `users` (`id`, `name`, `password`, `score`, `img`, `token`) VALUES
(1, 'bgtest1', 'a123456&', 0, NULL, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJleHAiOjE1ODQ1OTg5MjMsImlhdCI6MTU4NDMzOTcyM30.kKelbGNPGdcSUlkTpLJzvoloMrmPiRRSb4NwXw5HBqroAyFecHiNx1Eluf8XnXxvd5vi7CcuVLJClxElfzI3x34q5O_bG5u0uxQM4iFqqtqX_jfTfpj2LcTFSt9j9PntotAHMyCdAScxiHInZmBdeNKbc02uEz0xNxf5RMoQce4');

--
-- 转储表的索引
--

--
-- 表的索引 `rooms`
--
ALTER TABLE `rooms`
  ADD PRIMARY KEY (`id`);

--
-- 表的索引 `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
