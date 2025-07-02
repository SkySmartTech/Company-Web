-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 01, 2025 at 07:09 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartskycareersdb`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin_users`
--

CREATE TABLE `admin_users` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admin_users`
--

INSERT INTO `admin_users` (`id`, `email`, `password`) VALUES
(1, 'sewminihewage1999@gmail.com', 'ef797c8118f02dfb649607dd5d3f8c7623048c9c063d532cc95c5ed7a898a64f');

-- --------------------------------------------------------

--
-- Table structure for table `job_applications`
--

CREATE TABLE `job_applications` (
  `id` int(11) NOT NULL,
  `job_title` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `resume_path` varchar(500) NOT NULL,
  `submitted_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job_applications`
--

INSERT INTO `job_applications` (`id`, `job_title`, `full_name`, `phone`, `email`, `resume_path`, `submitted_at`) VALUES
(1, 'Python Intern', 'SEWMINI HEWAGE', '0713559194', 'tsewmini.hewage@gmail.com', 'Homepage/uploads/resumes/1750954352_685d71701cf0e.pdf', '2025-06-26 21:42:32'),
(2, 'Python Intern', 'SEWMINI HEWAGE', '0713559194', 'tsewmini.hewage@gmail.com', 'Homepage/uploads/resumes/1750954558_685d723e6bc14.pdf', '2025-06-26 21:45:58'),
(3, 'Python Intern', 'SEWMINI HEWAGE', '0713559194', 'tsewmini.hewage@gmail.com', 'uploads/resumes/1750957362_685d7d3289003.pdf', '2025-06-26 22:32:42'),
(4, 'QA Intern', 'SEWMINI HEWAGE', '0713559194', 'tsewmini.hewage@gmail.com', 'uploads/resumes/1751004906_685e36eac3a91.pdf', '2025-06-27 11:45:06'),
(5, 'Project Manager Intern', 'SEWMINI HEWAGE', '0713559194', 'tsewmini.hewage@gmail.com', 'uploads/resumes/1751253020_6862001ce2e3c.pdf', '2025-06-30 08:40:20'),
(9, 'Sales Executive', 'SEWMINI HEWAGE', '0713559194', 'tsewmini.hewage@gmail.com', '/Homepage/Careerspage/uploads/resumes/1751258802_686216b2b14bd.pdf', '2025-06-30 10:16:42'),
(10, 'Accountant Intern', 'SEWMINI HEWAGE', '0777152388', 'tsewmini.hewage@gmail.com', 'C:\\xampp\\htdocs\\Company-Web\\Homepage\\Careerspage/uploads/resumes/1751259688_68621a28d959d.pdf', '2025-06-30 10:31:28'),
(11, 'Technician Intern/Trainee', 'SEWMINI HEWAGE', '0713559194', 'tsewmini.hewage@gmail.com', 'C:\\xampp\\htdocs\\Company-Web\\Homepage\\Careerspage/uploads/resumes/1751260542_68621d7ec815d.pdf', '2025-06-30 10:45:42');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin_users`
--
ALTER TABLE `admin_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `job_applications`
--
ALTER TABLE `job_applications`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin_users`
--
ALTER TABLE `admin_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job_applications`
--
ALTER TABLE `job_applications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
