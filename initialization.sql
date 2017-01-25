CREATE DATABASE `nkou`;

USE `nkou`;

CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `mail` varchar(320) NOT NULL,
  `salt` varchar(20) NOT NULL,
  `hash` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `mail` (`mail`),
  UNIQUE KEY `salt` (`salt`)
);

CREATE TABLE `sessionUsers` (
  `userId` int(11) NOT NULL,
  `sessionId` varchar(32) NOT NULL,
  PRIMARY KEY (`userId`)
);

CREATE TABLE `gameList` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(32) NOT NULL,
  `data` text NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
);

INSERT INTO gameList(name, data) VALUES("アイドルマスター シンデレラガールズ スターライトステージ", "{}");
INSERT INTO gameList(name, data) VALUES("グランブルーファンタジー", "{}");
INSERT INTO gameList(name, data) VALUES("Fate/Grand Order", "{}");
