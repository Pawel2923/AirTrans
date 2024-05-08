-- MySQL dump 10.13  Distrib 8.3.0, for Linux (x86_64)
--
-- Host: localhost    Database: AirTrans
-- ------------------------------------------------------
-- Server version	8.3.0

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `AirTrans`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `AirTrans` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `AirTrans`;

--
-- Table structure for table `Airplanes`
--

DROP TABLE IF EXISTS `Airplanes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Airplanes` (
  `serial_no` varchar(25) NOT NULL,
  `model` varchar(25) NOT NULL,
  `type` varchar(25) NOT NULL,
  `production_year` year NOT NULL,
  `num_of_seats` int NOT NULL,
  `fuel_tank` float NOT NULL,
  `fuel_quant` float NOT NULL,
  `crew_size` int NOT NULL,
  `max_cargo` float NOT NULL,
  PRIMARY KEY (`serial_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Airplanes`
--

LOCK TABLES `Airplanes` WRITE;
/*!40000 ALTER TABLE `Airplanes` DISABLE KEYS */;
INSERT INTO `Airplanes` VALUES ('ABC123','787 Dreamliner','Passenger',2018,350,80000,30000,3,150000),('ABC231','787 Dreamliner','Passenger',2005,350,80000,30000,3,150000),('ABC232','A320','Passenger',2010,180,10000,10000,5,20000),('ABC233','B737','Passenger',2012,160,9000,9000,5,18000),('ABC234','A330','Passenger',2018,220,15000,15000,6,25000),('ABC235','B737','Passenger',2013,160,9000,9000,5,18000),('ABC236','B737','Passenger',2011,160,9000,9000,5,18000),('ABC237','A320','Passenger',2019,180,10000,10000,5,20000);
/*!40000 ALTER TABLE `Airplanes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Announcements`
--

DROP TABLE IF EXISTS `Announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Announcements` (
  `id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` text NOT NULL,
  `valid_until` datetime DEFAULT NULL,
  `create_time` timestamp NULL DEFAULT NULL,
  `personnel_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Personnel_id_announcements` (`personnel_id`),
  CONSTRAINT `fk_Personnel_id_announcements` FOREIGN KEY (`personnel_id`) REFERENCES `Employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcements`
--

LOCK TABLES `Announcements` WRITE;
/*!40000 ALTER TABLE `Announcements` DISABLE KEYS */;
INSERT INTO `Announcements` VALUES (1,'Nowe zasady bezpieczeństwa','Informujemy, że wprowadziliśmy nowe zasady bezpieczeństwa na lotnisku. Prosimy o zapoznanie się z nimi.','2024-05-03 23:59:59',NULL,1),(2,'Zmiana w harmonogramie','Z powodu opóźnień zmieniono godziny odlotów i przylotów','2024-04-30 23:59:59',NULL,1),(3,'Znaleziono klucze','Obsługa prosi o odbiór znalezionych kluczy w informacji.','2024-04-20 23:59:59',NULL,1),(4,'Zmiana w harmonogramie','Z powodu opóźnień zmieniono godziny odlotów i przylotów','2024-04-30 23:59:59',NULL,1);
/*!40000 ALTER TABLE `Announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Cars`
--

DROP TABLE IF EXISTS `Cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Cars` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Brand` varchar(25) NOT NULL,
  `Model` varchar(25) NOT NULL,
  `Production_year` year NOT NULL,
  `License_plate` varchar(25) NOT NULL,
  `Price_per_day` float NOT NULL,
  `Path_to_img` varchar(45) DEFAULT NULL,
  `Fuel_type` varchar(45) NOT NULL,
  `Transmission_type` varchar(45) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cars`
--

LOCK TABLES `Cars` WRITE;
/*!40000 ALTER TABLE `Cars` DISABLE KEYS */;
INSERT INTO `Cars` VALUES (1,'Mercedes','AMG',2020,'ABC123',50,'AMGMercedes.jpg','Benzyna','Automatyczna'),(2,'Ford','Fiesta',2019,'XYZ123',40,'FiestaFord.jpg','Benzyna','Manualna'),(3,'Audii','A4',2020,'XYZ124',45,'A4Audii.jpg','Benzyna','Automatyczna'),(4,'BMW','X5',2021,'XYZ125',60,'X5BMW.jpg','Diesel','Automatyczna'),(5,'audi','a3',2019,'KR32456',53,NULL,'Benzyna','Automatyczna'),(11,'audi','a3',2020,'KN123456',234,NULL,'Benzyna','Automatyczna'),(13,'Audi','A4',2004,'KLI 85W2',40,NULL,'Diesel','Manual');
/*!40000 ALTER TABLE `Cars` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Client`
--

DROP TABLE IF EXISTS `Client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES (1,'Jan','Kowalski','1990-05-15','M',123456789,'ul. Kwiatowa 10','12-345','jan.kowalski','haslo123','jan.kowalski@onet.com','j\nan_kowalski.jpg',NULL),(2,'Jan','Kowalski',NULL,NULL,NULL,NULL,NULL,'jakkowalski123','$2a$10$R3QmrnhiqjqZwm.oPViL2eSIQfNQFH6t6.TmYBWDMXBkuiATO3fs.','jan.kowalski@onet.pl',NULL,NULL),(3,'test','test123',NULL,NULL,NULL,NULL,NULL,'test123','$2a$10$yZxnzpjmfRC/q4WOqkLCzuayFtrQ2gm4ZKHNGd0k6aXPFfweSWAz2','test@gmail.com',NULL,NULL),(4,'jan','kowalski',NULL,NULL,NULL,NULL,NULL,'test321','$2a$10$RmnVeRmjP/u3DKcYy8A5ouVVvnVoPswdjHoWhO4HRDMsuvNAaH8qW','test2@gmail.com',NULL,NULL),(5,'jan','kowalski',NULL,NULL,NULL,NULL,NULL,'test456','$2a$10$B9aNfB0S26ICtIlwBycRTOYndGrCfYnQLKva9BA4muLwy3.5Z88Uy','test3@gmail.com',NULL,NULL),(6,'jan','kowalski',NULL,NULL,NULL,NULL,NULL,'sdddd','$2a$10$v6sgpqM5aauH5N9aGGLHVeewlRnf1/pZzpVSo2UAxbFamSx5NVaxO','jan.kowal2@onet.pl',NULL,'$2a$10$v6sgpqM5aauH5N9aGGLHVe'),(7,'jan','kowalski',NULL,NULL,NULL,NULL,NULL,'jankowal123','$2a$10$bNwJ3hT6ZFAL5H5LPEx8I.t24Av76UoU7F9VWVoaJj4uosPjW51FW','jan.kowal@onet.pl',NULL,'$2a$10$bNwJ3hT6ZFAL5H5LPEx8I.');
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Contact_info`
--

DROP TABLE IF EXISTS `Contact_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Contact_info`
--

LOCK TABLES `Contact_info` WRITE;
/*!40000 ALTER TABLE `Contact_info` DISABLE KEYS */;
INSERT INTO `Contact_info` VALUES ('Port lotniczy','ul. Królowej Jadwigi',5,'33-300','Nowy Sącz',733911,123234234,'+48 123 234 234','+48 123 234 234','biuro.lotniska@op.pl','marketing.lotniska@op.pl');
/*!40000 ALTER TABLE `Contact_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `Departures`
--

DROP TABLE IF EXISTS `Departures`;
/*!50001 DROP VIEW IF EXISTS `Departures`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `Departures` AS SELECT 
 1 AS `id`,
 1 AS `status`,
 1 AS `airline_name`,
 1 AS `destination`,
 1 AS `arrival`,
 1 AS `departure`,
 1 AS `airplane_serial_no`,
 1 AS `is_departure`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `Employees`
--

DROP TABLE IF EXISTS `Employees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Employees` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  `Gates_id` int NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  `Users_uid` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Users_uid` (`Users_uid`),
  KEY `fk_gates_id` (`Gates_id`),
  KEY `fk_Flight_id` (`Flight_id`),
  KEY `fk_Employees_Users1_idx` (`Users_uid`),
  CONSTRAINT `fk_Flight_id` FOREIGN KEY (`Flight_id`) REFERENCES `Flights` (`id`),
  CONSTRAINT `fk_gates_id` FOREIGN KEY (`Gates_id`) REFERENCES `Gates` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES (1,'',1,'FL1',6);
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipment`
--

DROP TABLE IF EXISTS `Equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Equipment` (
  `id` int NOT NULL,
  `name` varchar(45) DEFAULT NULL,
  `type` varchar(45) DEFAULT NULL,
  `serial_no` varchar(45) DEFAULT NULL,
  `location` varchar(45) DEFAULT NULL,
  `Personnel_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_Equipment_Personnel1_idx` (`Personnel_id`),
  CONSTRAINT `fk_Equipment_Personnel1` FOREIGN KEY (`Personnel_id`) REFERENCES `Employees` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipment`
--

LOCK TABLES `Equipment` WRITE;
/*!40000 ALTER TABLE `Equipment` DISABLE KEYS */;
/*!40000 ALTER TABLE `Equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flight_data`
--

DROP TABLE IF EXISTS `Flight_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flight_data` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Altitude` float NOT NULL,
  `Track` int NOT NULL,
  `Ground_speed` int NOT NULL,
  `Latitude` float NOT NULL,
  `Longitude` float NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  CONSTRAINT `fk_FlightData_Flight` FOREIGN KEY (`Flight_id`) REFERENCES `Flights` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flight_data`
--

LOCK TABLES `Flight_data` WRITE;
/*!40000 ALTER TABLE `Flight_data` DISABLE KEYS */;
INSERT INTO `Flight_data` VALUES (1,10000.5,135,450,52.2297,21.0122,'FL1'),(2,110000,180,520,52.3534,21.0032,'LH233');
/*!40000 ALTER TABLE `Flight_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flights`
--

DROP TABLE IF EXISTS `Flights`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flights` (
  `id` varchar(10) NOT NULL,
  `status` varchar(25) NOT NULL,
  `airline_name` varchar(25) NOT NULL,
  `destination` varchar(45) NOT NULL,
  `arrival` datetime NOT NULL,
  `departure` datetime NOT NULL,
  `airplane_serial_no` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_airplane_serial_no` (`airplane_serial_no`),
  CONSTRAINT `fk_airplane_serial_no` FOREIGN KEY (`airplane_serial_no`) REFERENCES `Airplanes` (`serial_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flights`
--

LOCK TABLES `Flights` WRITE;
/*!40000 ALTER TABLE `Flights` DISABLE KEYS */;
INSERT INTO `Flights` VALUES ('EJU 4668','AIRBORNE','EasyJet','PARYŻ (CDG)','2024-05-01 12:53:00','2024-05-01 10:51:00','ABC231'),('EJU 4670','SCHEDULED','EasyJet','Port lotniczy','2024-05-02 16:50:00','2024-05-02 15:50:00','ABC231'),('FL1','STARTUJE','LOT','WARSZAWA (WAW)','2024-04-10 12:00:00','2024-04-10 10:00:00','ABC123'),('FL2','SCHEDULED','LOT','Port lotniczy','2024-04-11 12:00:00','2024-04-11 10:00:00','ABC123'),('FR 1902','AIRBORNE','Ryanair','DUBLIN (DUB)','2024-05-01 17:30:00','2024-05-01 17:30:00','ABC236'),('FR 1913','SCHEDULED','Ryanair','Port lotniczy','2024-05-02 17:30:00','2024-05-02 17:30:00','ABC236'),('FR 3036','SCHEDULED','Ryanair','BARCELONA (BCN)','2024-05-02 01:25:00','2024-05-01 23:25:00','ABC235'),('FR 3037','SCHEDULED','Ryanair','Port lotniczy','2024-05-02 17:25:00','2024-05-02 17:25:00','ABC235'),('KL 1996','AIRBORNE','KLM','AMSTERDAM (AMS)','2024-05-01 09:00:00','2024-05-01 11:01:00','ABC233'),('KL 1998','AIRBORNE','KLM','FRANKFURT (FRA)','2024-05-02 13:45:00','2024-05-02 11:40:00','ABC237'),('KL 2001','SCHEDULED','KLM','Port lotniczy','2024-05-02 17:45:00','2024-05-02 17:45:00','ABC237'),('KL 2005','SCHEDULED','KLM','Port lotniczy','2024-05-21 17:00:00','2024-05-02 17:00:00','ABC233'),('LH 1623','AIRBORNE','Lufthansa','MONACHIUM (MUC)','2024-05-01 17:20:00','2024-05-01 17:20:00','ABC234'),('LH 1647','SCHEDULED','Lufthansa','Port lotniczy','2024-05-02 17:20:00','2024-05-02 17:20:00','ABC234'),('LH 239','SCHEDULED','Lufthansa','Port lotniczy','2024-04-12 18:25:00','2024-04-12 16:15:00','ABC231'),('LH233','WAITING','Lufthansa','BUDAPESZT (BUD)','2024-04-11 18:25:00','2024-04-11 16:15:00','ABC231'),('W6 5047','AIRBORNE','WizzAir','BARCELONA (BCN)','2024-05-01 16:40:00','2024-05-01 16:40:00','ABC232'),('W6 6021','SCHEDULED','WizzAir','Port lotniczy','2024-05-02 16:40:00','2024-05-02 16:40:00','ABC232');
/*!40000 ALTER TABLE `Flights` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Gates`
--

DROP TABLE IF EXISTS `Gates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `status` varchar(25) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gates`
--

LOCK TABLES `Gates` WRITE;
/*!40000 ALTER TABLE `Gates` DISABLE KEYS */;
INSERT INTO `Gates` VALUES (1,'Gate 1','Open');
/*!40000 ALTER TABLE `Gates` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Luggage`
--

DROP TABLE IF EXISTS `Luggage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Luggage` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Type` varchar(25) NOT NULL,
  `Size` varchar(25) NOT NULL,
  `Weight` float NOT NULL,
  `Client_id` int NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `uc_Client_id` (`Client_id`),
  CONSTRAINT `fk_Client_id_luggage` FOREIGN KEY (`Client_id`) REFERENCES `Client` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Luggage`
--

LOCK TABLES `Luggage` WRITE;
/*!40000 ALTER TABLE `Luggage` DISABLE KEYS */;
INSERT INTO `Luggage` VALUES (1,'Walizka','Średnia',15.5,1);
/*!40000 ALTER TABLE `Luggage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parking_info`
--

DROP TABLE IF EXISTS `Parking_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parking_info` (
  `Parking_id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) DEFAULT NULL,
  `Capacity` int NOT NULL,
  `Price_per_day` int NOT NULL,
  `Addr_street` varchar(45) DEFAULT NULL,
  `Addr_number` int DEFAULT NULL,
  `City` varchar(45) DEFAULT NULL,
  `Zip_code` varchar(45) DEFAULT NULL,
  `Path_to_img` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`Parking_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parking_info`
--

LOCK TABLES `Parking_info` WRITE;
/*!40000 ALTER TABLE `Parking_info` DISABLE KEYS */;
INSERT INTO `Parking_info` VALUES (1,'Parking 1',100,25,'ul. Królowej Jadwigi',6,'Nowy Sącz','33-300','offerImg.png');
/*!40000 ALTER TABLE `Parking_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parking_reservations`
--

DROP TABLE IF EXISTS `Parking_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parking_reservations` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Parking_level` varchar(5) NOT NULL,
  `Space_id` varchar(5) NOT NULL,
  `Since` datetime NOT NULL,
  `Until` datetime NOT NULL,
  `License_plate` varchar(12) NOT NULL,
  `Price_per_day` float NOT NULL,
  `Client_id` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Client_id_Parking` (`Client_id`),
  CONSTRAINT `fk_Client_id_Parking` FOREIGN KEY (`Client_id`) REFERENCES `Client` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parking_reservations`
--

LOCK TABLES `Parking_reservations` WRITE;
/*!40000 ALTER TABLE `Parking_reservations` DISABLE KEYS */;
INSERT INTO `Parking_reservations` VALUES (1,'A','101','2024-04-10 08:00:00','2024-05-12 08:00:00','ABC123',25,1);
/*!40000 ALTER TABLE `Parking_reservations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rentals`
--

DROP TABLE IF EXISTS `Rentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rentals` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Rental_date` datetime NOT NULL,
  `Return_date` datetime NOT NULL,
  `Status` varchar(15) NOT NULL,
  `Client_id` int NOT NULL,
  `Cars_id` int DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `uc_Client_id` (`Client_id`),
  KEY `fk_Cars_id_Rentals` (`Cars_id`),
  CONSTRAINT `fk_Cars_id_Rentals` FOREIGN KEY (`Cars_id`) REFERENCES `Cars` (`Id`),
  CONSTRAINT `fk_Client_id_Rentals` FOREIGN KEY (`Client_id`) REFERENCES `Client` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rentals`
--

LOCK TABLES `Rentals` WRITE;
/*!40000 ALTER TABLE `Rentals` DISABLE KEYS */;
INSERT INTO `Rentals` VALUES (1,'2024-04-10 09:00:00','2024-08-12 09:00:00','Zarezerwowany',1,1);
/*!40000 ALTER TABLE `Rentals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Runway`
--

DROP TABLE IF EXISTS `Runway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Runway` (
  `id` varchar(8) NOT NULL,
  `length` float NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `flight_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`flight_id`),
  UNIQUE KEY `flight_id` (`flight_id`),
  CONSTRAINT `fk_Flight_id_runway` FOREIGN KEY (`flight_id`) REFERENCES `Flights` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Runway`
--

LOCK TABLES `Runway` WRITE;
/*!40000 ALTER TABLE `Runway` DISABLE KEYS */;
INSERT INTO `Runway` VALUES ('RW1',3000,1,'FL1');
/*!40000 ALTER TABLE `Runway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Taxiway`
--

DROP TABLE IF EXISTS `Taxiway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Taxiway` (
  `id` varchar(8) NOT NULL,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `flight_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`flight_id`),
  UNIQUE KEY `flight_id` (`flight_id`),
  CONSTRAINT `fk_Flight_id_taxiway` FOREIGN KEY (`flight_id`) REFERENCES `Flights` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Taxiway`
--

LOCK TABLES `Taxiway` WRITE;
/*!40000 ALTER TABLE `Taxiway` DISABLE KEYS */;
INSERT INTO `Taxiway` VALUES ('TW1',1,'FL1');
/*!40000 ALTER TABLE `Taxiway` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Terminal`
--

DROP TABLE IF EXISTS `Terminal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Terminal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `is_available` tinyint(1) NOT NULL DEFAULT '1',
  `capacity` int NOT NULL DEFAULT '1',
  `flight_id` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`flight_id`),
  UNIQUE KEY `flight_id` (`flight_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Terminal`
--

LOCK TABLES `Terminal` WRITE;
/*!40000 ALTER TABLE `Terminal` DISABLE KEYS */;
INSERT INTO `Terminal` VALUES (1,1,1,'FL1'),(5,1,1,'FL2');
/*!40000 ALTER TABLE `Terminal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Tickets`
--

DROP TABLE IF EXISTS `Tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `expiry_date` datetime NOT NULL,
  `seat_class` varchar(15) NOT NULL,
  `seat_number` int NOT NULL,
  `status` varchar(15) NOT NULL,
  `Users_uid` int NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  `Gates_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  KEY `fk_Users_uid_users` (`Users_uid`),
  KEY `fk_Gates_id_gates` (`Gates_id`),
  CONSTRAINT `fk_Flight_id_tickets` FOREIGN KEY (`Flight_id`) REFERENCES `Flights` (`id`),
  CONSTRAINT `fk_Gates_id_gates` FOREIGN KEY (`Gates_id`) REFERENCES `Gates` (`id`),
  CONSTRAINT `fk_Users_uid_users` FOREIGN KEY (`Users_uid`) REFERENCES `Users` (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tickets`
--

LOCK TABLES `Tickets` WRITE;
/*!40000 ALTER TABLE `Tickets` DISABLE KEYS */;
INSERT INTO `Tickets` VALUES (1,'2024-04-10 10:00:00','2024-04-10 12:00:00','Ekonomiczna',15,'Potwierdzony',6,'FL1',1);
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `gender` enum('M','F') DEFAULT NULL,
  `birth_date` date DEFAULT NULL,
  `user_img` mediumblob,
  `salt` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (6,'jan.kowal2@onet.pl','$2a$10$v6sgpqM5aauH5N9aGGLHVeewlRnf1/pZzpVSo2UAxbFamSx5NVaxO','2024-05-08 16:52:59','jan','kowalski',NULL,NULL,NULL,NULL,NULL,'$2a$10$v6sgpqM5aauH5N9aGGLHVe'),(7,'jan.kowal@onet.pl','$2a$10$bNwJ3hT6ZFAL5H5LPEx8I.t24Av76UoU7F9VWVoaJj4uosPjW51FW','2024-05-08 16:52:59','jan','kowalski',NULL,NULL,NULL,NULL,NULL,'$2a$10$bNwJ3hT6ZFAL5H5LPEx8I.');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Current Database: `AirTrans`
--

USE `AirTrans`;

--
-- Final view structure for view `Departures`
--

/*!50001 DROP VIEW IF EXISTS `Departures`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = cp852 */;
/*!50001 SET character_set_results     = cp852 */;
/*!50001 SET collation_connection      = cp852_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `Departures` AS select `Flights`.`id` AS `id`,`Flights`.`status` AS `status`,`Flights`.`airline_name` AS `airline_name`,`Flights`.`destination` AS `destination`,`Flights`.`arrival` AS `arrival`,`Flights`.`departure` AS `departure`,`Flights`.`airplane_serial_no` AS `airplane_serial_no`,if((`Flights`.`destination` = (select `Contact_info`.`name` from `Contact_info`)),0,1) AS `is_departure` from `Flights` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-08 17:21:10
