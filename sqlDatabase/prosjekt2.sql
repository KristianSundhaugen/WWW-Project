-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 05. Mai, 2017 14:08 p.m.
-- Server-versjon: 10.1.19-MariaDB
-- PHP Version: 5.6.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `prosjekt2`
--

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `playlist`
--

CREATE TABLE `playlist` (
  `pId` int(11) NOT NULL,
  `pName` varchar(255) DEFAULT NULL,
  `bid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `subtitles`
--

CREATE TABLE `subtitles` (
  `sid` int(11) NOT NULL,
  `subName` varchar(255) DEFAULT NULL,
  `subType` varchar(255) DEFAULT NULL,
  `subSize` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `data` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `users`
--

CREATE TABLE `users` (
  `bid` int(11) NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `pwd` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `joining_date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `users`
--

INSERT INTO `users` (`bid`, `firstname`, `lastname`, `pwd`, `admin`, `email`, `joining_date`) VALUES
(117, 'admin', 'admin', '$2y$11$zCed6.e6TkAUryLGLMVmi.5eTeBWfV20kui3C/eVXYt/vCVYzlM9u', 1, 'admin@admin.no', '2017-05-05 11:41:08');

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `video`
--

CREATE TABLE `video` (
  `vid` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `bid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dataark for tabell `video`
--

INSERT INTO `video` (`vid`, `name`, `type`, `size`, `bid`) VALUES
(8, 'SampleVideo_1280x720_1mb.mp4', 'video/mp4', 1055736, 117);

-- --------------------------------------------------------

--
-- Tabellstruktur for tabell `videosinplaylist`
--

CREATE TABLE `videosinplaylist` (
  `pId` int(11) DEFAULT NULL,
  `vid` int(11) DEFAULT NULL,
  `bid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`pId`),
  ADD KEY `bid` (`bid`);

--
-- Indexes for table `subtitles`
--
ALTER TABLE `subtitles`
  ADD PRIMARY KEY (`sid`),
  ADD KEY `vid` (`vid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`bid`);

--
-- Indexes for table `video`
--
ALTER TABLE `video`
  ADD PRIMARY KEY (`vid`),
  ADD KEY `bid` (`bid`);

--
-- Indexes for table `videosinplaylist`
--
ALTER TABLE `videosinplaylist`
  ADD KEY `pId` (`pId`),
  ADD KEY `vid` (`vid`),
  ADD KEY `bid` (`bid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `pId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;
--
-- AUTO_INCREMENT for table `subtitles`
--
ALTER TABLE `subtitles`
  MODIFY `sid` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `bid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT for table `video`
--
ALTER TABLE `video`
  MODIFY `vid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
--
-- Begrensninger for dumpede tabeller
--

--
-- Begrensninger for tabell `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `playlist_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `users` (`bid`);

--
-- Begrensninger for tabell `subtitles`
--
ALTER TABLE `subtitles`
  ADD CONSTRAINT `subtitles_ibfk_1` FOREIGN KEY (`vid`) REFERENCES `video` (`vid`);

--
-- Begrensninger for tabell `video`
--
ALTER TABLE `video`
  ADD CONSTRAINT `video_ibfk_1` FOREIGN KEY (`bid`) REFERENCES `users` (`bid`);

--
-- Begrensninger for tabell `videosinplaylist`
--
ALTER TABLE `videosinplaylist`
  ADD CONSTRAINT `videosinplaylist_ibfk_1` FOREIGN KEY (`pId`) REFERENCES `playlist` (`pId`),
  ADD CONSTRAINT `videosinplaylist_ibfk_2` FOREIGN KEY (`vid`) REFERENCES `video` (`vid`),
  ADD CONSTRAINT `videosinplaylist_ibfk_3` FOREIGN KEY (`bid`) REFERENCES `users` (`bid`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
