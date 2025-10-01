-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 02, 2024 at 02:16 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` bigint(150) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `active_project` varchar(255) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `whatsapp` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `pp` varchar(255) NOT NULL DEFAULT 'default-pp.png',
  `account_type` varchar(200) DEFAULT 'user',
  `dob` varchar(40) DEFAULT NULL,
  `gender` varchar(20) DEFAULT NULL,
  `paid` varchar(10) DEFAULT NULL,
  `subscription_type` varchar(200) DEFAULT NULL,
  `subscriprion_end_date` varchar(200) DEFAULT NULL,
  `country` varchar(30) DEFAULT NULL,
  `city` varchar(30) DEFAULT NULL,
  `long` varchar(100) DEFAULT NULL,
  `lat` varchar(100) DEFAULT NULL,
  `ipaddress` varchar(100) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `user_id` varchar (50) NOT NULL,
  `project_name` varchar(150) NOT NULL,
  `project_des` varchar(255) NOT NULL,
  `model_name` varchar(45) DEFAULT NULL,
  `model_id` varchar(45) NOT NULL,
  `forecasting_model` varchar(255) DEFAULT "precision_ai",
  `datacleaning_algorithm` varchar(255) DEFAULT "auto_cleaning",
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;



CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `user_id` varchar (50) NOT NULL,
  `model_id` varchar (50) NOT NULL,
  `model_name` varchar(150) NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `predictions` (
  `id` int(11) NOT NULL,
  `user_id` varchar (50) NOT NULL,
  `model_id` varchar (50) NOT NULL,
  `predictions` longtext NOT NULL,
  `forecast_interval` varchar(255) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE `model_metrics` (
  `id` int(11) NOT NULL,
  `user_id` varchar (50) NOT NULL,
  `model_id` varchar (50) NOT NULL,
  `algorithm_name`  varchar (80) NOT NULL,
  `auto` varchar(25) NOT NULL,
  `accuracy` varchar(25) NOT NULL,
  `metric` varchar(25) NOT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;




































CREATE TABLE `chats` (
  `id` int(11) NOT NULL,
  `sender` varchar (150) NOT NULL,
  `reciever` varchar(150) NOT NULL,
  `message` varchar(255) NOT NULL,
  `message_type` varchar(45) NOT NULL DEFAULT 'text',
  `status` varchar(45) NOT NULL DEFAULT 'sent',
  `attachment_name` varchar(255) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `sender` varchar (150) NOT NULL,
  `reciever` varchar(150) NOT NULL,
  `message` varchar(255) NOT NULL,
  `message_type` varchar(45) NOT NULL DEFAULT 'text',
  `status` varchar(45) NOT NULL DEFAULT 'sent',
  `attachment_name` varchar(255) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` varchar (150) NOT NULL,
  `post_text` varchar(200) NOT NULL,
  `location` varchar(45) NOT NULL DEFAULT 'text',
  `images` varchar(45) NOT NULL DEFAULT 'none',
  `attachment_name` varchar(255) DEFAULT NULL,
  `views` varchar(255) DEFAULT NULL,
  `comments` varchar(255) DEFAULT NULL,
  `shares` varchar(255) DEFAULT NULL,
  `date_created` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;








ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;


















