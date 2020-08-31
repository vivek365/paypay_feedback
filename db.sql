create database paypay;
use paypay;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(80) DEFAULT NULL,
  `emp_id` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `gender` varchar(10) DEFAULT NULL,
  `mobile` varchar(20) DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `address` varchar(500) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT 1,
  `is_admin` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`)
);

INSERT INTO `users` (`name`, `password`, `emp_id`, `email`, `gender`, `mobile`, `birth_date`, `joining_date`, `address`, `type`, `active_status`, `is_admin`) VALUES ('Admin', 'YWRtaW4=', '1', 'admin@paypay.com', 'Male', '+91 9033022481', '1992-07-25', '2019-05-01', 'E 504 Suryam Elegance, Nr. odhav, Ahmedabad-382418 Gujarat India', 'Fullstack Developer', '1', '1');

INSERT INTO `users` (`name`, `password`, `emp_id`, `email`, `gender`, `mobile`, `birth_date`, `joining_date`, `address`, `type`, `active_status`, `is_admin`) VALUES ('Vivek Jain', 'MTIzNDU2', 'EMP0001', 'vivek@paypay.com', 'Male', '+91 9033022481', '1992-07-25', '2019-05-01', 'E 504 Suryam Elegance, Nr. odhav, Ahmedabad-382418 Gujarat India', 'Fullstack Developer', '1', '0');



CREATE TABLE `review` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `emp_id` bigint(20) NOT NULL,
  `reviewer_id` bigint(20) NOT NULL,
  `review_date` date DEFAULT NULL,
  `reviewer_rating` TINYINT(1) DEFAULT NULL,
  `comment` TEXT DEFAULT NULL,
  `active_status` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`)
);


