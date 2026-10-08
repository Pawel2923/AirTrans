SET FOREIGN_KEY_CHECKS = 0;

CREATE TABLE `Airplanes` (
  `serial_no` varchar(25) NOT NULL,
  `model` varchar(25) NOT NULL,
  `type` varchar(25) NOT NULL,
  `production_year` year NOT NULL,
  `num_of_seats` int NOT NULL,
  `fuel_tank` decimal(9,2) DEFAULT NULL,
  `fuel_quant` decimal(9,2) DEFAULT NULL,
  `num_of_crew` int NOT NULL,
  `max_cargo` decimal(9,2) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`serial_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content` text NOT NULL,
  `valid_until` datetime NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Employee_id` int NOT NULL,
  `type` enum('wazne','zmiana','informacja') NOT NULL DEFAULT 'informacja',
  PRIMARY KEY (`id`),
  KEY `Employee_id` (`Employee_id`),
  CONSTRAINT `Announcements_ibfk_1` FOREIGN KEY (`Employee_id`) REFERENCES `Employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Cars` (
  `id` int NOT NULL AUTO_INCREMENT,
  `brand` varchar(25) NOT NULL,
  `model` varchar(25) NOT NULL,
  `production_year` year NOT NULL,
  `license_plate` varchar(25) NOT NULL,
  `price_per_day` decimal(8,2) NOT NULL,
  `img` varchar(255) DEFAULT NULL,
  `fuel_type` varchar(45) NOT NULL,
  `transmission_type` enum('MANUAL','AUTOMATIC') NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `Client` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `First_name` varchar(45) NOT NULL,
  `Last_name` varchar(45) NOT NULL,
  `Date_of_birth` date DEFAULT NULL,
  `Gender` enum('M','F') DEFAULT NULL,
  `Phone_no` int DEFAULT NULL,
  `Address` varchar(45) DEFAULT NULL,
  `Zip_code` varchar(12) DEFAULT NULL,
  `Login` varchar(50) NOT NULL,
  `Password` longtext NOT NULL,
  `Email` varchar(45) NOT NULL,
  `Path_to_avatar` varchar(45) DEFAULT NULL,
  `Salt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Contact_info` (
  `name` varchar(45) NOT NULL,
  `addr_street` varchar(45) NOT NULL,
  `addr_number` int NOT NULL,
  `zip_code` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `nip` int NOT NULL,
  `krs` int NOT NULL,
  `phone_inf` varchar(45) NOT NULL,
  `phone_central` varchar(45) NOT NULL,
  `email_pr` varchar(45) NOT NULL,
  `email_marketing` varchar(45) NOT NULL,
  PRIMARY KEY (`name`),
  UNIQUE KEY `name_UNIQUE` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  `Gates_id` int DEFAULT NULL,
  `Flight_id` varchar(10) DEFAULT NULL,
  `Users_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_id` (`Users_id`),
  KEY `fk_gates_id` (`Gates_id`),
  KEY `fk_Flight_id` (`Flight_id`),
  CONSTRAINT `Employees_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_Flight_id` FOREIGN KEY (`Flight_id`) REFERENCES `Flights` (`id`),
  CONSTRAINT `fk_gates_id` FOREIGN KEY (`Gates_id`) REFERENCES `Gates` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Equipment` (
  `serial_no` varchar(10) NOT NULL,
  `name` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `location` varchar(45) DEFAULT NULL,
  `Employee_id` int DEFAULT NULL,
  PRIMARY KEY (`serial_no`),
  KEY `fk_Equipment_Personnel1_idx` (`Employee_id`),
  CONSTRAINT `fk_Equipment_Personnel1` FOREIGN KEY (`Employee_id`) REFERENCES `Employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Event_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_name` varchar(255) NOT NULL,
  `by_user` varchar(255) NOT NULL,
  `timestamp_log` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(255) NOT NULL,
  `log_details` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=397 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Flight_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `altitude` int NOT NULL,
  `track` int NOT NULL,
  `ground_speed` int NOT NULL,
  `vertical_speed` int NOT NULL,
  `latitude` decimal(8,5) DEFAULT NULL,
  `longitude` decimal(8,5) DEFAULT NULL,
  `Flight_id` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Flight_id` (`Flight_id`),
  CONSTRAINT `Flight_data_ibfk_1` FOREIGN KEY (`Flight_id`) REFERENCES `Flights` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Flights` (
  `id` varchar(10) NOT NULL,
  `status` enum('SCHEDULED','WAITING','AIRBORNE','TAKE OFF','LANDING','FINISHED','CANCELED','DELAYED') NOT NULL DEFAULT 'SCHEDULED',
  `airline_name` varchar(25) NOT NULL,
  `destination` varchar(45) NOT NULL,
  `origin` varchar(45) NOT NULL,
  `arrival` datetime NOT NULL,
  `departure` datetime NOT NULL,
  `airplane_serial_no` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_airplane_serial_no` (`airplane_serial_no`),
  CONSTRAINT `fk_airplane_serial_no` FOREIGN KEY (`airplane_serial_no`) REFERENCES `Airplanes` (`serial_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Gates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `status` enum('CLOSED','BUSY','ON STAND','READY') NOT NULL DEFAULT 'READY',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Logowanie_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `login_date` timestamp NOT NULL,
  `login_details` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=162 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Luggage` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(25) NOT NULL,
  `size` varchar(25) NOT NULL,
  `weight` decimal(6,2) NOT NULL,
  `Users_id` int NOT NULL,
  `Flights_id` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Users_uid_luggage` (`Users_id`),
  KEY `Flights_id` (`Flights_id`),
  CONSTRAINT `Luggage_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Luggage_ibfk_2` FOREIGN KEY (`Flights_id`) REFERENCES `Flights` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Parking_info` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `capacity` int NOT NULL,
  `price_per_day` decimal(8,2) NOT NULL,
  `addr_street` varchar(45) NOT NULL,
  `addr_number` int NOT NULL,
  `city` varchar(45) NOT NULL,
  `zip_code` varchar(45) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Parking_reservations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `parking_level` varchar(5) NOT NULL,
  `space_id` varchar(5) NOT NULL,
  `since` date NOT NULL,
  `until` date NOT NULL,
  `license_plate` varchar(12) NOT NULL,
  `reservation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDING','RESERVED','CANCELLED') DEFAULT 'PENDING',
  `Users_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Users_id` (`Users_id`),
  CONSTRAINT `Parking_reservations_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Rentals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `since` date NOT NULL,
  `until` date NOT NULL,
  `status` enum('PENDING','RENTED','RETURNED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `reservation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `return_time` timestamp NULL DEFAULT NULL,
  `Cars_id` int NOT NULL,
  `Users_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Cars_id` (`Cars_id`),
  KEY `Users_id` (`Users_id`),
  CONSTRAINT `Rentals_ibfk_2` FOREIGN KEY (`Cars_id`) REFERENCES `Cars` (`id`),
  CONSTRAINT `Rentals_ibfk_3` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Reset_password` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `Users_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `used_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Users_id` (`Users_id`),
  CONSTRAINT `Reset_password_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Runways` (
  `id` varchar(8) NOT NULL,
  `length` int NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `status` enum('READY','CLOSED','OCCUPIED') NOT NULL DEFAULT 'READY',
  `Flight_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  UNIQUE KEY `flight_id` (`Flight_id`),
  CONSTRAINT `fk_Flight_id_runway` FOREIGN KEY (`Flight_id`) REFERENCES `Flights` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Taxiways` (
  `id` varchar(8) NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `status` enum('CLOSED','OCCUPIED','READY') NOT NULL DEFAULT 'READY',
  `Flight_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  UNIQUE KEY `flight_id` (`Flight_id`),
  CONSTRAINT `fk_Flight_id_taxiway` FOREIGN KEY (`Flight_id`) REFERENCES `Flights` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Terminals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `num_of_stations` int NOT NULL DEFAULT '1',
  `status` enum('CLOSED','OCCUPIED','EMPTY','FULL') NOT NULL DEFAULT 'EMPTY',
  `Flight_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  UNIQUE KEY `flight_id` (`Flight_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `class` varchar(15) NOT NULL,
  `seat_number` varchar(8) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('PURCHASED','EXPIRED','USED','REFUNDED','CANCELLED') NOT NULL DEFAULT 'PURCHASED',
  `Users_id` int NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  `Gates_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Users_uid_users` (`Users_id`),
  KEY `fk_Gates_id_gates` (`Gates_id`),
  KEY `Flight_id` (`Flight_id`),
  CONSTRAINT `fk_Gates_id_gates` FOREIGN KEY (`Gates_id`) REFERENCES `Gates` (`id`),
  CONSTRAINT `fk_Users_uid_users` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`),
  CONSTRAINT `Tickets_ibfk_1` FOREIGN KEY (`Flight_id`) REFERENCES `Flights` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
CREATE TABLE `Users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `img` text,
  `salt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

SET FOREIGN_KEY_CHECKS = 1;
