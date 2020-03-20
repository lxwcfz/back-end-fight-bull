-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- 主机： localhost
-- 生成日期： 2020-03-20 18:56:54
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
-- 数据库： `root`
--

-- --------------------------------------------------------

--
-- 表的结构 `rooms`
--

CREATE TABLE `rooms` (
  `id` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `creator` json DEFAULT NULL,
  `member` json DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- 转存表中的数据 `rooms`
--

INSERT INTO `rooms` (`id`, `name`, `creator`, `member`) VALUES
(51, '123', '{\"id\": 2, \"name\": \"keie-student\"}', '[]');

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
(1, 'bgtest1', 'a123456&', 0, NULL, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoxLCJleHAiOjE1ODQ3ODA2MDksImlhdCI6MTU4NDY5NDIwOX0.kRQxw6EjHKlkhkUNRw_R73nhYekgJjpFBPvizLl3UsTgRvWdNK_fvQkFZyFQwA59knWGdHSYLv-kHHRC4tnD2WHNHsRHWsgR8J7KlOxFz1POWBN4MfP4zQLeXGmnAFoEv2ugARQRQwSFZqsbCyU0kQ_b6b5KgQYxntGKsIVmp-E'),
(2, 'keie-student', '123456', 0, NULL, 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoyLCJleHAiOjE1ODQ3ODI3NjgsImlhdCI6MTU4NDY5NjM2OH0.KAqZgzHREhiIzhnevfapQSZE-_EoOSiobfhlKXwY4G2jqL9qB4s5sXAbFkMMFYl7JjkMFy32n3s33kTm3qoPhxlVbdkTCKsnwiGngTtp5LHlNi4StTRjGmKuheTGMYX2WEEwO24SOYJzu7RiTmzgRHdPYrqwDo-uu3ZYpMjuiaI');

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

--
-- 在导出的表使用AUTO_INCREMENT
--

--
-- 使用表AUTO_INCREMENT `rooms`
--
ALTER TABLE `rooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- 使用表AUTO_INCREMENT `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
