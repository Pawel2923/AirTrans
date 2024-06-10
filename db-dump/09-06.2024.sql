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
  `fuel_tank` decimal(9,2) DEFAULT NULL,
  `fuel_quant` decimal(9,2) DEFAULT NULL,
  `num_of_crew` int NOT NULL,
  `max_cargo` decimal(9,2) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`serial_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Airplanes`
--

LOCK TABLES `Airplanes` WRITE;
/*!40000 ALTER TABLE `Airplanes` DISABLE KEYS */;
INSERT INTO `Airplanes` VALUES ('ABC123','787 Dreamliner','Passenger',2018,351,80000.00,30000.00,3,150000.00,NULL),('ABC231','787 Dreamliner','Passenger',2005,350,80000.00,30000.00,3,150000.00,NULL),('ABC232','A320','Passenger',2010,180,10000.00,10000.00,5,20000.00,NULL),('ABC233','B737','Passenger',2012,160,9000.00,9000.00,5,18000.00,NULL),('ABC234','A330','Passenger',2018,220,15000.00,15000.00,6,25000.00,NULL),('ABC235','B737','Passenger',2013,160,9000.00,9000.00,5,18000.00,NULL),('ABC236','B737','Passenger',2011,160,9000.00,9000.00,5,18000.00,NULL),('ABC237','A320','Passenger',2019,180,10000.00,10000.00,5,20000.00,NULL),('BCA203','Boeing 757-300','passenger',1987,255,30000.00,857.00,6,200.00,NULL);
/*!40000 ALTER TABLE `Airplanes` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `airplanes_insert_trig` AFTER INSERT ON `Airplanes` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Airplanes', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowy samolot o serial_number:', NEW.serial_no));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `airplanes_update_trig` AFTER UPDATE ON `Airplanes` FOR EACH ROW INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
VALUES ('Airplanes', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano samolot o serial_number:', NEW.serial_no)) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `airplanes_delete_trig` AFTER DELETE ON `Airplanes` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Airplanes', USER(), NOW(3), 'DELETE', CONCAT('Usunieto samolot o serial_number:', OLD.serial_no));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Announcements`
--

DROP TABLE IF EXISTS `Announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Announcements` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(45) NOT NULL,
  `content` text NOT NULL,
  `valid_until` datetime NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Employee_id` (`Employee_id`),
  CONSTRAINT `Announcements_ibfk_1` FOREIGN KEY (`Employee_id`) REFERENCES `Employees` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcements`
--

LOCK TABLES `Announcements` WRITE;
/*!40000 ALTER TABLE `Announcements` DISABLE KEYS */;
INSERT INTO `Announcements` VALUES (1,'Nowe zasady bezpieczeństwa','Informujemy, że wprowadziliśmy nowe zasady bezpieczeństwa na lotnisku. Prosimy o zapoznanie się z nimi.','2024-05-03 23:59:59',NULL,1),(2,'Zmiana w harmonogramie','Z powodu opóźnień zmieniono godziny odlotów i przylotów','2024-04-30 23:59:59',NULL,1),(3,'Znaleziono klucze','Obsługa prosi o odbiór znalezionych kluczy w informacji.','2024-04-20 23:59:59',NULL,1),(4,'Zmiana w harmonogramie','Z powodu opóźnień zmieniono godziny odlotów i przylotów','2024-04-30 23:59:59',NULL,1);
/*!40000 ALTER TABLE `Announcements` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `announcements_insert_trig` AFTER INSERT ON `Announcements` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Announcements', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowe ogloszenie o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `announcements_update_trig` AFTER UPDATE ON `Announcements` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Announcements', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano ogloszenie o id:', NEW.id));

END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `announcements_delete_trig` AFTER DELETE ON `Announcements` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Announcements', USER(), NOW(3), 'DELETE', CONCAT('Usunieto ogloszenie o id:', OLD.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Cars`
--

DROP TABLE IF EXISTS `Cars`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cars`
--

LOCK TABLES `Cars` WRITE;
/*!40000 ALTER TABLE `Cars` DISABLE KEYS */;
INSERT INTO `Cars` VALUES (1,'Mercedes','AMG',2020,'ABC123',50.00,'171794798628442544028.png','Benzyna','MANUAL'),(2,'Ford','Fiesta',2019,'XYZ123',40.00,'1717863524979686344006.png','Benzyna','MANUAL'),(3,'Audii','A4',2020,'XYZ124',45.00,'1717863547062134511776.png','Benzyna','AUTOMATIC'),(4,'BMW','X5',2021,'XYZ125',60.00,'1717863568815437747001.png','Diesel','MANUAL'),(5,'audi','a3',2019,'KR32454',53.00,'1717863884598809616877.png','Benzyna','MANUAL'),(11,'audi','a3',2020,'KN123456',234.00,'1717864001745118569687.png','Benzyna','AUTOMATIC'),(13,'Audi','A4',2004,'KLI 85W2',40.00,'1717864023750933843642.png','Diesel','MANUAL'),(14,'Audi','S7',2016,'KNT 0233',70.00,'1717864073595491444653.png','Benzyna','MANUAL');
/*!40000 ALTER TABLE `Cars` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `cars_insert_trig` AFTER INSERT ON `Cars` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Cars', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowy samochod o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `cars_update_trig` AFTER UPDATE ON `Cars` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Cars', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano samochod o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `cars_delete_trig` AFTER DELETE ON `Cars` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Cars', USER(), NOW(3), 'DELETE', CONCAT('Usunieto samochod o id:', OLD.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Employees`
--

LOCK TABLES `Employees` WRITE;
/*!40000 ALTER TABLE `Employees` DISABLE KEYS */;
INSERT INTO `Employees` VALUES (1,'admin',1,'FL1',7),(2,'parking_staff',NULL,NULL,6),(16,'admin',NULL,NULL,9),(19,'atc',NULL,NULL,11),(20,'parking_staff',NULL,NULL,13);
/*!40000 ALTER TABLE `Employees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipment`
--

DROP TABLE IF EXISTS `Equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipment`
--

LOCK TABLES `Equipment` WRITE;
/*!40000 ALTER TABLE `Equipment` DISABLE KEYS */;
INSERT INTO `Equipment` VALUES ('EQ039393','Metal Detector','Security','Terminal 1',2),('EQ12347','Runway Lights','Ground Support','Terminal 2',1),('EQ12348','Metal Detector','Security','Terminal 2',2),('EQ12349','Metal Detector','Security','Terminal 4',2);
/*!40000 ALTER TABLE `Equipment` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `equipment_insert_trig` AFTER INSERT ON `Equipment` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Equipment', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowe sprz�t o id:', NEW.serial_no));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `equipment_update_trig` AFTER UPDATE ON `Equipment` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Equipment', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano sprz�t o id:', NEW.serial_no));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `equipment_delete_trig` AFTER DELETE ON `Equipment` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Equipment', USER(), NOW(3), 'DELETE', CONCAT('Usunieto sprz�t o id:', OLD.serial_no));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Event_logs`
--

DROP TABLE IF EXISTS `Event_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Event_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `table_name` varchar(255) NOT NULL,
  `by_user` varchar(255) NOT NULL,
  `timestamp_log` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `action` varchar(255) NOT NULL,
  `log_details` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=338 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event_logs`
--

LOCK TABLES `Event_logs` WRITE;
/*!40000 ALTER TABLE `Event_logs` DISABLE KEYS */;
INSERT INTO `Event_logs` VALUES (1,'Gates','root@172.22.0.3','2024-05-20 13:03:25','INSERT','Dodano nowa bramke o id:7'),(2,'Gates','root@172.22.0.3','2024-05-20 13:12:25','UPDATE','Zaktualizowano bramke o id:7 na:Gate 5i statusie:ON STAND'),(3,'Gates','root@172.22.0.3','2024-05-20 13:13:17','DELETE','Usunieto bramke o id:7'),(4,'Announcements','root@172.22.0.3','2024-05-20 14:13:12','DELETE','Usunieto ogloszenie o id:4'),(5,'Equipment','root@172.22.0.3','2024-05-20 14:45:53','INSERT','Dodano nowe sprzt o id:EQ12349'),(6,'Equipment','root@172.22.0.3','2024-05-20 14:46:00','UPDATE','Zaktualizowano sprzt o id:EQ12349'),(7,'Equipment','root@172.22.0.3','2024-05-20 14:46:03','DELETE','Usunieto sprzt o id:EQ12349'),(8,'Cars','root@172.22.0.3','2024-05-20 17:22:07','INSERT','Dodano nowy samochod o id:15'),(9,'Cars','root@172.22.0.3','2024-05-20 17:22:17','UPDATE','Zaktualizowano samochod o id:15'),(10,'Cars','root@172.22.0.3','2024-05-20 17:22:29','DELETE','Usunieto samochod o id:15'),(11,'Rentals','root@172.22.0.3','2024-05-20 17:25:17','INSERT','Dodano nowe wypozyczenie o id:4'),(12,'Rentals','root@172.22.0.3','2024-05-20 17:25:29','UPDATE','Zaktualizowano wypozyczenie o id:4'),(13,'Rentals','root@172.22.0.3','2024-05-20 17:25:34','DELETE','Usunieto wypozyczenie o id:4'),(14,'Parking_reservations','root@172.22.0.3','2024-05-20 17:29:59','DELETE','Usunieto rezerwacje o id:1'),(15,'Parking_reservations','root@172.22.0.3','2024-05-20 17:30:27','INSERT','Dodano nowa rezerwacje o id:3'),(16,'Runways','root@172.22.0.3','2024-05-20 17:43:36','UPDATE','Zaktualizowano pas startowy o id:RW1'),(17,'Taxiways','root@172.22.0.3','2024-05-20 17:45:48','UPDATE','Zaktualizowano droge koowania o id:TW1'),(18,'Terminals','root@172.22.0.3','2024-05-20 17:48:00','UPDATE','Zaktualizowano terminal o id:1'),(19,'Airplanes','root@localhost','2024-05-20 17:59:44','INSERT','Dodano nowy samolot o serial_number:1234'),(20,'Airplanes','root@localhost','2024-05-20 18:02:53','DELETE','Usunieto samolot o serial_number:1234'),(21,'Rentals','root@172.22.0.3','2024-05-20 18:46:33','INSERT','Dodano nowe wypozyczenie o id:6'),(22,'Cars','root@172.22.0.3','2024-05-20 18:47:28','DELETE','Usunieto samochod o id:14'),(23,'Equipment','root@172.22.0.3','2024-05-20 19:01:45','INSERT','Dodano nowe sprzt o id:EQ12349'),(24,'Gates','admin@172.29.0.3','2024-05-20 19:31:05','INSERT','Dodano nowa bramke o id:5'),(25,'Gates','admin@172.29.0.3','2024-05-20 19:31:08','DELETE','Usunieto bramke o id:5'),(26,'Equipment','root@172.21.0.3','2024-05-21 07:32:22','INSERT','Dodano nowe sprz´┐Żt o id:EQ039393'),(27,'Flights','admin@172.29.0.3','2024-05-26 21:23:23','UPDATE','Zaktualizowano lot o id:LH233'),(28,'Terminals','admin@172.18.0.3','2024-05-26 21:55:14','UPDATE','Zaktualizowano terminal o id:5'),(29,'Terminals','admin@172.18.0.3','2024-05-26 22:02:53','UPDATE','Zaktualizowano terminal o id:5'),(30,'Terminals','admin@172.18.0.3','2024-05-26 22:03:05','UPDATE','Zaktualizowano terminal o id:5'),(31,'Terminals','admin@172.18.0.3','2024-05-26 22:03:23','UPDATE','Zaktualizowano terminal o id:5'),(32,'Terminals','admin@172.18.0.3','2024-05-26 22:04:48','UPDATE','Zaktualizowano terminal o id:5'),(33,'Terminals','admin@172.18.0.3','2024-05-26 22:04:57','UPDATE','Zaktualizowano terminal o id:5'),(34,'Terminals','admin@172.18.0.3','2024-05-26 22:11:53','UPDATE','Zaktualizowano terminal o id:5'),(35,'Terminals','admin@172.18.0.3','2024-05-26 22:12:00','UPDATE','Zaktualizowano terminal o id:5'),(36,'Terminals','admin@172.18.0.3','2024-05-26 22:13:26','UPDATE','Zaktualizowano terminal o id:5'),(37,'Terminals','admin@172.18.0.3','2024-05-26 22:13:37','UPDATE','Zaktualizowano terminal o id:5'),(38,'Terminals','admin@172.18.0.3','2024-05-26 22:15:27','UPDATE','Zaktualizowano terminal o id:5'),(39,'Terminals','admin@172.18.0.3','2024-05-26 22:15:42','UPDATE','Zaktualizowano terminal o id:5'),(40,'Taxiways','admin@172.18.0.3','2024-05-26 22:15:52','UPDATE','Zaktualizowano droge ko´┐Żowania o id:TW1'),(41,'Taxiways','admin@172.18.0.3','2024-05-26 22:15:58','UPDATE','Zaktualizowano droge ko´┐Żowania o id:TW1'),(42,'Users','root@172.18.0.1','2024-05-27 17:33:58','INSERT','Niepoprawny numer telefonu'),(43,'Users','root@172.18.0.1','2024-05-27 17:37:01','INSERT','Hasło jest za krótkie'),(44,'Users','root@172.18.0.1','2024-05-27 17:37:07','INSERT','Niepoprawny adres email'),(45,'Users','admin@172.18.0.3','2024-05-27 17:52:21','INSERT','Dodano nowego użytkownika: pawelporemba123@gmail.com'),(46,'Users','admin@172.18.0.3','2024-05-27 18:41:08','INSERT','Dodano nowego użytkownika: roman@onet.pl'),(47,'Users','admin@172.18.0.3','2024-05-27 18:44:21','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(52,'Users','admin@172.18.0.3','2024-05-27 20:34:28','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(53,'Users','admin@172.18.0.3','2024-05-27 20:34:32','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(54,'Users','admin@172.18.0.3','2024-05-27 20:34:36','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(55,'Users','admin@172.18.0.3','2024-05-27 20:34:40','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(56,'Users','admin@172.18.0.3','2024-05-27 20:34:42','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(57,'Terminals','admin@172.18.0.3','2024-05-27 20:35:09','UPDATE','Zaktualizowano terminal o id:1'),(58,'Terminals','admin@172.18.0.3','2024-05-27 20:35:12','UPDATE','Zaktualizowano terminal o id:1'),(59,'Gates','admin@172.18.0.3','2024-05-27 20:38:03','UPDATE','Zaktualizowano bramke o id:1 na:Gate 1i statusie:BUSY'),(60,'Gates','admin@172.22.0.3','2024-06-01 14:02:23','UPDATE','Zaktualizowano bramke o id:1 na:Gate 1i statusie:ON STAND'),(61,'Gates','admin@172.22.0.3','2024-06-01 14:04:36','INSERT','Dodano nowa bramke o id:6'),(62,'Gates','admin@172.22.0.3','2024-06-01 14:04:42','DELETE','Usunieto bramke o id:6'),(63,'Gates','admin@172.22.0.3','2024-06-01 14:05:35','INSERT','Dodano nowa bramke o id:7'),(64,'Gates','admin@172.22.0.3','2024-06-01 14:05:43','DELETE','Usunieto bramke o id:7'),(65,'Gates','admin@172.22.0.3','2024-06-01 14:10:54','INSERT','Dodano nowa bramke o id:8'),(66,'Gates','admin@172.22.0.3','2024-06-01 14:12:39','UPDATE','Zaktualizowano bramke o id:8 na:Gate 6i statusie:READY'),(67,'Gates','admin@172.22.0.3','2024-06-01 14:14:30','UPDATE','Zaktualizowano bramke o id:3 na:Gate 3i statusie:ON STAND'),(68,'Cars','admin@172.22.0.3','2024-06-01 14:15:42','UPDATE','Zaktualizowano samochod o id:5'),(69,'Rentals','admin@172.22.0.3','2024-06-01 14:16:00','UPDATE','Zaktualizowano wypozyczenie o id:1'),(70,'Airplanes','admin@172.22.0.3','2024-06-01 14:16:20','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(71,'Gates','admin@172.22.0.3','2024-06-01 14:20:42','UPDATE','Zaktualizowano bramke o id:1 na:Gate 1i statusie:BUSY'),(72,'Gates','admin@172.22.0.3','2024-06-01 14:26:57','INSERT','Dodano nowa bramke o id:9'),(73,'Gates','admin@172.22.0.3','2024-06-01 14:28:33','UPDATE','Zaktualizowano bramke o id:2 na:Gate 2i statusie:CLOSED'),(74,'Equipment','admin@172.22.0.3','2024-06-01 14:34:54','INSERT','Dodano nowe sprz´┐Żt o id:EQ12349'),(75,'Gates','admin@172.22.0.3','2024-06-01 16:46:09','INSERT','Dodano nowa bramke o id:10'),(76,'Gates','admin@172.22.0.3','2024-06-01 16:46:18','UPDATE','Zaktualizowano bramke o id:1 na:Gate 1i statusie:ON STAND'),(77,'Gates','admin@172.22.0.3','2024-06-01 16:46:28','DELETE','Usunieto bramke o id:10'),(78,'Equipment','admin@172.22.0.3','2024-06-01 16:46:56','INSERT','Dodano nowe sprz´┐Żt o id:EQ12350'),(79,'Equipment','admin@172.22.0.3','2024-06-01 17:00:32','INSERT','Dodano nowe sprz´┐Żt o id:EQ12351'),(80,'Equipment','admin@172.22.0.3','2024-06-01 17:01:54','INSERT','Dodano nowe sprz´┐Żt o id:EQ12353'),(81,'Gates','admin@172.22.0.3','2024-06-01 17:03:08','UPDATE','Zaktualizowano bramke o id:1 na:Gate 1i statusie:BUSY'),(82,'Gates','admin@172.22.0.3','2024-06-01 17:03:18','DELETE','Usunieto bramke o id:9'),(83,'Equipment','admin@172.22.0.3','2024-06-01 17:24:20','DELETE','Usunieto sprz´┐Żt o id:EQ12353'),(84,'Equipment','admin@172.22.0.3','2024-06-01 17:24:44','INSERT','Dodano nowe sprz´┐Żt o id:EQ12352'),(85,'Equipment','admin@172.22.0.3','2024-06-01 17:24:51','DELETE','Usunieto sprz´┐Żt o id:EQ12352'),(86,'Equipment','admin@172.22.0.3','2024-06-01 17:34:18','UPDATE','Zaktualizowano sprz´┐Żt o id:EQ12351'),(87,'Equipment','admin@172.22.0.3','2024-06-01 17:36:59','INSERT','Dodano nowe sprz´┐Żt o id:EQ12353'),(88,'Equipment','admin@172.22.0.3','2024-06-01 17:37:38','INSERT','Dodano nowe sprz´┐Żt o id:EQ12355'),(89,'Equipment','admin@172.22.0.3','2024-06-01 17:41:05','INSERT','Dodano nowe sprz´┐Żt o id:EQ123454'),(90,'Equipment','admin@172.22.0.3','2024-06-01 17:41:46','DELETE','Usunieto sprz´┐Żt o id:EQ12355'),(91,'Equipment','admin@172.22.0.3','2024-06-01 17:42:29','DELETE','Usunieto sprz´┐Żt o id:EQ12350'),(92,'Equipment','admin@172.22.0.3','2024-06-01 17:49:52','UPDATE','Zaktualizowano sprz´┐Żt o id:EQ12353'),(93,'Equipment','admin@172.22.0.3','2024-06-01 17:51:09','UPDATE','Zaktualizowano sprz´┐Żt o id:EQ12348'),(94,'Gates','admin@172.22.0.3','2024-06-01 17:52:08','UPDATE','Zaktualizowano bramke o id:1 na:Gate 1i statusie:ON STAND'),(95,'Gates','admin@172.22.0.3','2024-06-01 17:52:15','INSERT','Dodano nowa bramke o id:11'),(96,'Equipment','admin@172.22.0.3','2024-06-01 18:00:00','UPDATE','Zaktualizowano sprz´┐Żt o id:EQ12348'),(97,'Gates','admin@172.22.0.3','2024-06-01 18:03:38','UPDATE','Zaktualizowano bramke o id:2 na:Gate 2i statusie:BUSY'),(98,'Gates','admin@172.22.0.3','2024-06-01 18:06:13','INSERT','Dodano nowa bramke o id:12'),(99,'Gates','admin@172.22.0.3','2024-06-01 18:06:19','DELETE','Usunieto bramke o id:12'),(100,'Gates','admin@172.22.0.3','2024-06-01 18:07:33','INSERT','Dodano nowa bramke o id:13'),(101,'Gates','admin@172.22.0.3','2024-06-01 18:07:39','DELETE','Usunieto bramke o id:13'),(102,'Gates','admin@172.22.0.3','2024-06-01 18:07:48','UPDATE','Zaktualizowano bramke o id:11 na:Gate 5i statusie:BUSY'),(103,'Announcements','admin@172.22.0.3','2024-06-01 18:43:34','INSERT','Dodano nowe ogloszenie o id:5'),(104,'Announcements','admin@172.22.0.3','2024-06-01 18:44:15','DELETE','Usunieto ogloszenie o id:5'),(105,'Announcements','admin@172.22.0.3','2024-06-01 18:47:04','INSERT','Dodano nowe ogloszenie o id:6'),(106,'Announcements','admin@172.22.0.3','2024-06-01 18:52:15','INSERT','Dodano nowe ogloszenie o id:7'),(107,'Announcements','admin@172.22.0.3','2024-06-01 18:54:32','DELETE','Usunieto ogloszenie o id:6'),(108,'Announcements','admin@172.22.0.3','2024-06-01 18:54:44','INSERT','Dodano nowe ogloszenie o id:8'),(109,'Announcements','admin@172.22.0.3','2024-06-01 18:58:58','INSERT','Dodano nowe ogloszenie o id:9'),(110,'Announcements','admin@172.22.0.3','2024-06-01 19:02:47','DELETE','Usunieto ogloszenie o id:9'),(111,'Announcements','admin@172.22.0.3','2024-06-01 19:03:28','DELETE','Usunieto ogloszenie o id:8'),(112,'Announcements','admin@172.22.0.3','2024-06-01 19:43:36','INSERT','Dodano nowe ogloszenie o id:10'),(113,'Announcements','admin@172.22.0.3','2024-06-01 22:35:33','UPDATE','Zaktualizowano ogloszenie o id:7'),(114,'Announcements','admin@172.22.0.3','2024-06-01 22:40:43','UPDATE','Zaktualizowano ogloszenie o id:10'),(115,'Announcements','admin@172.22.0.3','2024-06-01 22:40:52','DELETE','Usunieto ogloszenie o id:10'),(116,'Announcements','admin@172.22.0.3','2024-06-01 22:43:30','INSERT','Dodano nowe ogloszenie o id:11'),(117,'Announcements','admin@172.22.0.3','2024-06-01 22:46:25','DELETE','Usunieto ogloszenie o id:11'),(118,'Announcements','admin@172.22.0.3','2024-06-01 22:46:37','INSERT','Dodano nowe ogloszenie o id:12'),(119,'Announcements','admin@172.22.0.3','2024-06-01 22:46:52','UPDATE','Zaktualizowano ogloszenie o id:12'),(120,'Announcements','admin@172.22.0.3','2024-06-01 22:47:43','UPDATE','Zaktualizowano ogloszenie o id:12'),(121,'Announcements','admin@172.22.0.3','2024-06-01 23:19:30','INSERT','Dodano nowe ogloszenie o id:13'),(122,'Announcements','admin@172.22.0.3','2024-06-01 23:21:58','UPDATE','Zaktualizowano ogloszenie o id:13'),(123,'Announcements','admin@172.22.0.3','2024-06-01 23:22:05','DELETE','Usunieto ogloszenie o id:13'),(124,'Gates','admin@172.22.0.3','2024-06-01 23:22:18','INSERT','Dodano nowa bramke o id:14'),(125,'Gates','admin@172.22.0.3','2024-06-01 23:22:24','UPDATE','Zaktualizowano bramke o id:14 na:Gate 7i statusie:ON STAND'),(126,'Gates','admin@172.22.0.3','2024-06-01 23:22:29','DELETE','Usunieto bramke o id:14'),(127,'Equipment','admin@172.22.0.3','2024-06-01 23:22:49','INSERT','Dodano nowe sprz´┐Żt o id:EQ12355'),(128,'Equipment','admin@172.22.0.3','2024-06-01 23:23:00','UPDATE','Zaktualizowano sprz´┐Żt o id:EQ12355'),(129,'Equipment','admin@172.22.0.3','2024-06-01 23:23:08','DELETE','Usunieto sprz´┐Żt o id:EQ12355'),(130,'Gates','admin@172.22.0.3','2024-06-01 23:31:18','INSERT','Dodano nowa bramke o id:15'),(131,'Announcements','admin@172.22.0.3','2024-06-01 23:35:32','DELETE','Usunieto ogloszenie o id:12'),(132,'Announcements','admin@172.22.0.3','2024-06-01 23:35:33','DELETE','Usunieto ogloszenie o id:7'),(133,'Gates','admin@172.22.0.3','2024-06-01 23:43:35','DELETE','Usunieto bramke o id:15'),(134,'Gates','admin@172.22.0.3','2024-06-01 23:44:54','INSERT','Dodano nowa bramke o id:16'),(135,'Gates','admin@172.22.0.3','2024-06-01 23:45:02','UPDATE','Zaktualizowano bramke o id:16 na:Gate 7i statusie:BUSY'),(136,'Gates','admin@172.22.0.3','2024-06-01 23:45:15','DELETE','Usunieto bramke o id:16'),(137,'Cars','admin@172.22.0.3','2024-06-02 13:05:25','INSERT','Dodano nowy samochod o id:15'),(138,'Cars','admin@172.22.0.3','2024-06-02 13:05:39','DELETE','Usunieto samochod o id:15'),(139,'Cars','admin@172.22.0.3','2024-06-02 13:08:09','INSERT','Dodano nowy samochod o id:16'),(140,'Cars','admin@172.22.0.3','2024-06-02 13:08:20','INSERT','Dodano nowy samochod o id:17'),(141,'Cars','admin@172.22.0.3','2024-06-02 13:10:06','DELETE','Usunieto samochod o id:17'),(142,'Cars','admin@172.22.0.3','2024-06-02 13:10:39','INSERT','Dodano nowy samochod o id:18'),(143,'Cars','admin@172.22.0.3','2024-06-02 13:12:05','INSERT','Dodano nowy samochod o id:19'),(144,'Cars','admin@172.22.0.3','2024-06-02 13:13:03','DELETE','Usunieto samochod o id:19'),(145,'Cars','admin@172.22.0.3','2024-06-02 13:13:37','INSERT','Dodano nowy samochod o id:20'),(146,'Cars','admin@172.22.0.3','2024-06-02 13:17:32','INSERT','Dodano nowy samochod o id:21'),(147,'Rentals','admin@172.22.0.3','2024-06-02 13:17:56','INSERT','Dodano nowe wypozyczenie o id:2'),(148,'Rentals','admin@172.22.0.3','2024-06-02 13:18:01','DELETE','Usunieto wypozyczenie o id:1'),(149,'Cars','admin@172.22.0.3','2024-06-02 13:21:28','INSERT','Dodano nowy samochod o id:22'),(150,'Cars','admin@172.22.0.3','2024-06-02 13:21:51','DELETE','Usunieto samochod o id:22'),(151,'Cars','admin@172.22.0.3','2024-06-02 13:22:12','DELETE','Usunieto samochod o id:21'),(152,'Cars','admin@172.22.0.3','2024-06-02 13:22:19','DELETE','Usunieto samochod o id:20'),(153,'Rentals','admin@172.22.0.3','2024-06-02 13:23:06','INSERT','Dodano nowe wypozyczenie o id:5'),(154,'Rentals','admin@172.22.0.3','2024-06-02 13:27:26','DELETE','Usunieto wypozyczenie o id:2'),(155,'Rentals','admin@172.22.0.3','2024-06-02 13:27:51','INSERT','Dodano nowe wypozyczenie o id:6'),(156,'Rentals','admin@172.22.0.3','2024-06-02 13:28:46','DELETE','Usunieto wypozyczenie o id:6'),(157,'Rentals','admin@172.22.0.3','2024-06-02 13:29:10','INSERT','Dodano nowe wypozyczenie o id:7'),(158,'Cars','admin@172.22.0.3','2024-06-02 13:29:38','INSERT','Dodano nowy samochod o id:23'),(159,'Cars','admin@172.22.0.3','2024-06-02 13:29:48','DELETE','Usunieto samochod o id:23'),(160,'Rentals','admin@172.22.0.3','2024-06-02 13:39:53','INSERT','Dodano nowe wypozyczenie o id:8'),(161,'Rentals','admin@172.22.0.3','2024-06-02 13:40:13','DELETE','Usunieto wypozyczenie o id:5'),(162,'Rentals','admin@172.22.0.3','2024-06-02 13:50:04','INSERT','Dodano nowe wypozyczenie o id:9'),(163,'Rentals','admin@172.22.0.3','2024-06-02 13:53:47','INSERT','Dodano nowe wypozyczenie o id:10'),(164,'Rentals','admin@172.22.0.3','2024-06-02 13:54:02','DELETE','Usunieto wypozyczenie o id:7'),(165,'Rentals','admin@172.22.0.3','2024-06-02 13:55:01','INSERT','Dodano nowe wypozyczenie o id:11'),(166,'Rentals','admin@172.22.0.3','2024-06-02 13:56:00','DELETE','Usunieto wypozyczenie o id:8'),(167,'Rentals','admin@172.22.0.3','2024-06-02 14:40:01','UPDATE','Zaktualizowano wypozyczenie o id:9'),(168,'Cars','admin@172.22.0.3','2024-06-02 14:40:54','UPDATE','Zaktualizowano samochod o id:5'),(169,'Cars','admin@172.22.0.3','2024-06-02 14:44:02','UPDATE','Zaktualizowano samochod o id:5'),(170,'Rentals','admin@172.22.0.3','2024-06-02 15:37:11','INSERT','Dodano nowe wypozyczenie o id:12'),(171,'Rentals','admin@172.22.0.3','2024-06-02 15:37:30','UPDATE','Zaktualizowano wypozyczenie o id:9'),(172,'Parking_reservations','admin@172.22.0.3','2024-06-02 15:53:09','INSERT','Dodano nowa rezerwacje o id:2'),(173,'Parking_reservations','admin@172.22.0.3','2024-06-02 15:53:28','DELETE','Usunieto rezerwacje o id:1'),(174,'Parking_reservations','admin@172.22.0.3','2024-06-02 16:48:06','DELETE','Usunieto rezerwacje o id:2'),(175,'Parking_reservations','admin@172.22.0.3','2024-06-02 16:48:37','INSERT','Dodano nowa rezerwacje o id:3'),(176,'Parking_reservations','admin@172.22.0.3','2024-06-02 16:52:03','INSERT','Dodano nowa rezerwacje o id:4'),(177,'Parking_reservations','admin@172.22.0.3','2024-06-02 16:53:45','INSERT','Dodano nowa rezerwacje o id:5'),(178,'Parking_reservations','admin@172.22.0.3','2024-06-02 16:59:01','INSERT','Dodano nowa rezerwacje o id:6'),(179,'Parking_reservations','admin@172.22.0.3','2024-06-02 17:05:54','INSERT','Dodano nowa rezerwacje o id:7'),(180,'Parking_reservations','admin@172.22.0.3','2024-06-02 17:07:08','INSERT','Dodano nowa rezerwacje o id:8'),(181,'Parking_reservations','admin@172.22.0.3','2024-06-02 17:09:35','DELETE','Usunieto rezerwacje o id:8'),(182,'Parking_reservations','admin@172.22.0.3','2024-06-02 17:10:01','DELETE','Usunieto rezerwacje o id:4'),(183,'Parking_reservations','admin@172.22.0.3','2024-06-02 17:17:13','DELETE','Usunieto rezerwacje o id:3'),(184,'Parking_reservations','admin@172.22.0.3','2024-06-02 17:42:09','DELETE','Usunieto rezerwacje o id:6'),(185,'Parking_reservations','admin@172.22.0.3','2024-06-02 20:37:22','UPDATE','Zaktualizowano rezerwacje o id:7'),(186,'Parking_reservations','admin@172.22.0.3','2024-06-02 20:38:53','INSERT','Dodano nowa rezerwacje o id:9'),(187,'Parking_reservations','admin@172.22.0.3','2024-06-02 20:41:19','UPDATE','Zaktualizowano rezerwacje o id:9'),(188,'Parking_reservations','admin@172.22.0.3','2024-06-02 20:41:54','UPDATE','Zaktualizowano rezerwacje o id:7'),(189,'Parking_reservations','admin@172.22.0.3','2024-06-02 21:03:20','INSERT','Dodano nowa rezerwacje o id:10'),(190,'Parking_reservations','admin@172.22.0.3','2024-06-02 21:04:23','UPDATE','Zaktualizowano rezerwacje o id:10'),(191,'Parking_reservations','admin@172.22.0.3','2024-06-02 21:10:29','DELETE','Usunieto rezerwacje o id:10'),(192,'Parking_reservations','admin@172.22.0.3','2024-06-02 21:10:54','INSERT','Dodano nowa rezerwacje o id:11'),(193,'Parking_reservations','admin@172.22.0.3','2024-06-02 21:11:10','UPDATE','Zaktualizowano rezerwacje o id:11'),(194,'Parking_reservations','admin@172.22.0.3','2024-06-02 21:19:37','UPDATE','Zaktualizowano rezerwacje o id:11'),(195,'Rentals','admin@172.22.0.3','2024-06-02 21:19:54','UPDATE','Zaktualizowano wypozyczenie o id:9'),(196,'Rentals','admin@172.22.0.3','2024-06-02 21:21:17','INSERT','Dodano nowe wypozyczenie o id:13'),(197,'Equipment','admin@172.22.0.3','2024-06-02 21:32:36','DELETE','Usunieto sprz´┐Żt o id:EQ12351'),(198,'Equipment','admin@172.22.0.3','2024-06-02 21:32:41','DELETE','Usunieto sprz´┐Żt o id:EQ12353'),(199,'Equipment','admin@172.22.0.3','2024-06-02 21:32:48','DELETE','Usunieto sprz´┐Żt o id:EQ123454'),(200,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:09:49','DELETE','Usunieto rezerwacje o id:11'),(201,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:18:50','INSERT','Dodano nowa rezerwacje o id:12'),(202,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:18:50','INSERT','Dodano nowa rezerwacje o id:13'),(203,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:19:41','DELETE','Usunieto rezerwacje o id:13'),(204,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:20:56','INSERT','Dodano nowa rezerwacje o id:14'),(205,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:20:56','INSERT','Dodano nowa rezerwacje o id:15'),(206,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:22:53','INSERT','Dodano nowa rezerwacje o id:16'),(207,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:22:53','INSERT','Dodano nowa rezerwacje o id:17'),(208,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:23:30','DELETE','Usunieto rezerwacje o id:17'),(209,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:23:32','DELETE','Usunieto rezerwacje o id:16'),(210,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:23:57','DELETE','Usunieto rezerwacje o id:15'),(211,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:29:27','UPDATE','Zaktualizowano rezerwacje o id:7'),(212,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:30:57','UPDATE','Zaktualizowano rezerwacje o id:14'),(213,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:31:35','INSERT','Dodano nowa rezerwacje o id:18'),(214,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:51:55','UPDATE','Zaktualizowano rezerwacje o id:18'),(215,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:55:15','INSERT','Dodano nowa rezerwacje o id:19'),(216,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:55:15','INSERT','Dodano nowa rezerwacje o id:20'),(217,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:56:08','DELETE','Usunieto rezerwacje o id:20'),(218,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:56:15','DELETE','Usunieto rezerwacje o id:7'),(219,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:56:29','DELETE','Usunieto rezerwacje o id:18'),(220,'Parking_reservations','admin@172.22.0.3','2024-06-06 13:56:36','DELETE','Usunieto rezerwacje o id:14'),(221,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:07:04','INSERT','Dodano nowa rezerwacje o id:21'),(222,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:07:04','INSERT','Dodano nowa rezerwacje o id:22'),(223,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:07:44','UPDATE','Zaktualizowano rezerwacje o id:22'),(224,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:07:48','DELETE','Usunieto rezerwacje o id:22'),(225,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:12:35','INSERT','Dodano nowa rezerwacje o id:23'),(226,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:12:35','INSERT','Dodano nowa rezerwacje o id:24'),(227,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:13:12','DELETE','Usunieto rezerwacje o id:24'),(228,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:14:22','DELETE','Usunieto rezerwacje o id:23'),(229,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:15:04','INSERT','Dodano nowa rezerwacje o id:25'),(230,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:15:04','INSERT','Dodano nowa rezerwacje o id:26'),(231,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:16:02','DELETE','Usunieto rezerwacje o id:25'),(232,'Parking_reservations','admin@172.22.0.3','2024-06-06 14:16:05','DELETE','Usunieto rezerwacje o id:26'),(233,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:08:06','INSERT','Dodano nowa rezerwacje o id:27'),(234,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:08:06','INSERT','Dodano nowa rezerwacje o id:28'),(235,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:09:18','DELETE','Usunieto rezerwacje o id:28'),(236,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:12:06','INSERT','Dodano nowa rezerwacje o id:30'),(237,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:12:06','INSERT','Dodano nowa rezerwacje o id:29'),(238,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:12:51','DELETE','Usunieto rezerwacje o id:12'),(239,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:12:56','DELETE','Usunieto rezerwacje o id:30'),(240,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:13:00','DELETE','Usunieto rezerwacje o id:21'),(241,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:13:04','DELETE','Usunieto rezerwacje o id:19'),(242,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:24:50','INSERT','Dodano nowa rezerwacje o id:32'),(243,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:24:50','INSERT','Dodano nowa rezerwacje o id:31'),(244,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:25:32','DELETE','Usunieto rezerwacje o id:32'),(245,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:29:49','INSERT','Dodano nowa rezerwacje o id:33'),(246,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:29:49','INSERT','Dodano nowa rezerwacje o id:34'),(247,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:30:22','DELETE','Usunieto rezerwacje o id:34'),(248,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:40:19','INSERT','Dodano nowa rezerwacje o id:35'),(249,'Parking_reservations','admin@172.22.0.3','2024-06-06 18:41:58','DELETE','Usunieto rezerwacje o id:35'),(250,'Parking_reservations','admin@172.22.0.3','2024-06-06 19:07:29','INSERT','Dodano nowa rezerwacje o id:36'),(251,'Parking_reservations','admin@172.22.0.3','2024-06-07 12:00:35','INSERT','Dodano nowa rezerwacje o id:37'),(252,'Parking_reservations','admin@172.22.0.3','2024-06-07 12:02:10','UPDATE','Zaktualizowano rezerwacje o id:37'),(253,'Parking_reservations','admin@172.22.0.3','2024-06-07 12:42:14','INSERT','Dodano nowa rezerwacje o id:38'),(254,'Users','admin@172.22.0.3','2024-06-07 22:57:48','INSERT','Dodano nowego użytkownika: bartek.bednarek@onet.pl'),(255,'Users','client@172.22.0.3','2024-06-07 22:58:17','UPDATE','Zaktualizowano użytkownika: bartek.bednarek@onet.pl'),(256,'Users','client@172.22.0.3','2024-06-07 22:58:27','UPDATE','Zaktualizowano użytkownika: bartek.bednarek@onet.pl'),(257,'Users','client@172.22.0.3','2024-06-07 22:58:50','UPDATE','Zaktualizowano użytkownika: bartek.bednarek@onet.pl'),(258,'Parking_reservations','client@172.22.0.3','2024-06-07 23:01:06','INSERT','Dodano nowa rezerwacje o id:39'),(259,'Parking_reservations','client@172.22.0.3','2024-06-07 23:04:44','INSERT','Dodano nowa rezerwacje o id:40'),(260,'Parking_reservations','client@172.22.0.3','2024-06-07 23:13:26','INSERT','Dodano nowa rezerwacje o id:41'),(261,'Parking_reservations','admin@172.22.0.3','2024-06-07 23:14:18','DELETE','Usunieto rezerwacje o id:9'),(262,'Parking_reservations','admin@172.22.0.3','2024-06-07 23:14:23','DELETE','Usunieto rezerwacje o id:40'),(263,'Parking_reservations','admin@172.22.0.3','2024-06-07 23:14:26','DELETE','Usunieto rezerwacje o id:39'),(264,'Parking_reservations','admin@172.22.0.3','2024-06-07 23:14:30','DELETE','Usunieto rezerwacje o id:38'),(265,'Parking_reservations','admin@172.22.0.3','2024-06-07 23:14:31','DELETE','Usunieto rezerwacje o id:37'),(266,'Parking_reservations','admin@172.22.0.3','2024-06-07 23:14:37','DELETE','Usunieto rezerwacje o id:33'),(267,'Parking_reservations','admin@172.22.0.3','2024-06-07 23:14:41','DELETE','Usunieto rezerwacje o id:36'),(268,'Parking_reservations','admin@172.22.0.3','2024-06-07 23:17:54','INSERT','Dodano nowa rezerwacje o id:42'),(269,'Parking_reservations','client@172.22.0.3','2024-06-07 23:33:08','INSERT','Dodano nowa rezerwacje o id:43'),(270,'Parking_reservations','client@172.22.0.3','2024-06-07 23:38:12','INSERT','Dodano nowa rezerwacje o id:44'),(271,'Parking_reservations','client@172.22.0.3','2024-06-08 13:13:33','INSERT','Dodano nowa rezerwacje o id:45'),(272,'Parking_reservations','admin@172.22.0.3','2024-06-08 13:15:29','DELETE','Usunieto rezerwacje o id:43'),(273,'Parking_reservations','admin@172.22.0.3','2024-06-08 13:15:36','DELETE','Usunieto rezerwacje o id:45'),(274,'Parking_reservations','admin@172.22.0.3','2024-06-08 13:15:38','DELETE','Usunieto rezerwacje o id:44'),(275,'Parking_reservations','admin@172.22.0.3','2024-06-08 13:15:39','DELETE','Usunieto rezerwacje o id:41'),(276,'Parking_reservations','admin@172.22.0.3','2024-06-08 13:15:46','DELETE','Usunieto rezerwacje o id:42'),(277,'Cars','admin@172.22.0.3','2024-06-08 13:35:30','UPDATE','Zaktualizowano samochod o id:5'),(278,'Cars','admin@172.22.0.3','2024-06-08 13:35:49','UPDATE','Zaktualizowano samochod o id:1'),(279,'Cars','admin@172.22.0.3','2024-06-08 13:36:03','UPDATE','Zaktualizowano samochod o id:1'),(280,'Cars','admin@172.22.0.3','2024-06-08 13:48:24','UPDATE','Zaktualizowano samochod o id:1'),(281,'Cars','admin@172.22.0.3','2024-06-08 13:48:47','UPDATE','Zaktualizowano samochod o id:1'),(282,'Cars','admin@172.22.0.3','2024-06-08 13:50:21','UPDATE','Zaktualizowano samochod o id:1'),(283,'Cars','admin@172.22.0.3','2024-06-08 13:53:36','UPDATE','Zaktualizowano samochod o id:1'),(284,'Cars','admin@172.22.0.3','2024-06-08 13:53:57','UPDATE','Zaktualizowano samochod o id:2'),(285,'Cars','admin@172.22.0.3','2024-06-08 13:58:05','UPDATE','Zaktualizowano samochod o id:1'),(286,'Cars','admin@172.22.0.3','2024-06-08 14:05:49','UPDATE','Zaktualizowano samochod o id:2'),(287,'Cars','admin@172.22.0.3','2024-06-08 14:06:30','UPDATE','Zaktualizowano samochod o id:18'),(288,'Cars','admin@172.22.0.3','2024-06-08 14:10:59','UPDATE','Zaktualizowano samochod o id:1'),(289,'Cars','admin@172.22.0.3','2024-06-08 14:11:40','UPDATE','Zaktualizowano samochod o id:1'),(290,'Cars','admin@172.22.0.3','2024-06-08 14:19:23','UPDATE','Zaktualizowano samochod o id:18'),(291,'Cars','admin@172.22.0.3','2024-06-08 14:30:29','UPDATE','Zaktualizowano samochod o id:18'),(292,'Cars','admin@172.22.0.3','2024-06-08 14:30:42','UPDATE','Zaktualizowano samochod o id:1'),(293,'Cars','admin@172.22.0.3','2024-06-08 14:31:01','UPDATE','Zaktualizowano samochod o id:1'),(294,'Cars','admin@172.22.0.3','2024-06-08 15:35:03','UPDATE','Zaktualizowano samochod o id:1'),(295,'Cars','admin@172.22.0.3','2024-06-08 15:35:09','UPDATE','Zaktualizowano samochod o id:1'),(296,'Cars','admin@172.22.0.3','2024-06-08 15:35:51','UPDATE','Zaktualizowano samochod o id:1'),(297,'Cars','admin@172.22.0.3','2024-06-08 15:36:30','UPDATE','Zaktualizowano samochod o id:1'),(298,'Cars','admin@172.22.0.3','2024-06-08 15:36:54','UPDATE','Zaktualizowano samochod o id:1'),(299,'Cars','admin@172.22.0.3','2024-06-08 15:38:04','UPDATE','Zaktualizowano samochod o id:14'),(300,'Cars','admin@172.22.0.3','2024-06-08 15:38:29','UPDATE','Zaktualizowano samochod o id:14'),(301,'Cars','admin@172.22.0.3','2024-06-08 15:40:40','UPDATE','Zaktualizowano samochod o id:1'),(302,'Cars','admin@172.22.0.3','2024-06-08 15:41:58','UPDATE','Zaktualizowano samochod o id:2'),(303,'Cars','admin@172.22.0.3','2024-06-08 15:45:09','UPDATE','Zaktualizowano samochod o id:1'),(304,'Cars','admin@172.22.0.3','2024-06-08 15:47:38','UPDATE','Zaktualizowano samochod o id:4'),(305,'Cars','admin@172.22.0.3','2024-06-08 15:51:11','UPDATE','Zaktualizowano samochod o id:4'),(306,'Cars','admin@172.22.0.3','2024-06-08 15:51:42','UPDATE','Zaktualizowano samochod o id:4'),(307,'Cars','admin@172.22.0.3','2024-06-08 15:52:31','UPDATE','Zaktualizowano samochod o id:3'),(308,'Cars','admin@172.22.0.3','2024-06-08 15:59:38','UPDATE','Zaktualizowano samochod o id:5'),(309,'Cars','admin@172.22.0.3','2024-06-08 16:00:24','UPDATE','Zaktualizowano samochod o id:1'),(310,'Cars','admin@172.22.0.3','2024-06-08 16:00:52','UPDATE','Zaktualizowano samochod o id:2'),(311,'Cars','admin@172.22.0.3','2024-06-08 16:18:11','UPDATE','Zaktualizowano samochod o id:1'),(312,'Cars','admin@172.22.0.3','2024-06-08 16:18:45','UPDATE','Zaktualizowano samochod o id:2'),(313,'Cars','admin@172.22.0.3','2024-06-08 16:19:07','UPDATE','Zaktualizowano samochod o id:3'),(314,'Cars','admin@172.22.0.3','2024-06-08 16:19:29','UPDATE','Zaktualizowano samochod o id:4'),(315,'Cars','admin@172.22.0.3','2024-06-08 16:24:45','UPDATE','Zaktualizowano samochod o id:5'),(316,'Cars','admin@172.22.0.3','2024-06-08 16:26:42','UPDATE','Zaktualizowano samochod o id:11'),(317,'Cars','admin@172.22.0.3','2024-06-08 16:27:04','UPDATE','Zaktualizowano samochod o id:13'),(318,'Cars','admin@172.22.0.3','2024-06-08 16:27:54','UPDATE','Zaktualizowano samochod o id:14'),(319,'Cars','admin@172.22.0.3','2024-06-08 16:50:08','UPDATE','Zaktualizowano samochod o id:16'),(320,'Cars','admin@172.22.0.3','2024-06-08 20:02:21','UPDATE','Zaktualizowano samochod o id:18'),(321,'Cars','admin@172.22.0.3','2024-06-08 20:03:05','DELETE','Usunieto samochod o id:16'),(322,'Rentals','admin@172.22.0.3','2024-06-08 20:03:25','DELETE','Usunieto wypozyczenie o id:12'),(323,'Cars','admin@172.22.0.3','2024-06-08 20:03:30','DELETE','Usunieto samochod o id:18'),(324,'Parking_reservations','client@172.22.0.3','2024-06-09 10:13:59','INSERT','Dodano nowa rezerwacje o id:46'),(325,'Parking_reservations','client@172.22.0.3','2024-06-09 10:27:42','INSERT','Dodano nowa rezerwacje o id:47'),(326,'Rentals','client@172.22.0.3','2024-06-09 10:36:06','INSERT','Dodano nowe wypozyczenie o id:14'),(327,'Rentals','admin@172.22.0.3','2024-06-09 10:38:25','UPDATE','Zaktualizowano wypozyczenie o id:14'),(328,'Rentals','client@172.22.0.3','2024-06-09 14:42:12','INSERT','Dodano nowe wypozyczenie o id:15'),(329,'Parking_reservations','client@172.22.0.3','2024-06-09 14:43:01','INSERT','Dodano nowa rezerwacje o id:48'),(330,'Rentals','client@172.22.0.3','2024-06-09 14:46:14','INSERT','Dodano nowe wypozyczenie o id:16'),(331,'Parking_reservations','client@172.22.0.3','2024-06-09 14:48:42','INSERT','Dodano nowa rezerwacje o id:49'),(332,'Users','client@172.22.0.3','2024-06-09 14:49:17','UPDATE','Zaktualizowano użytkownika: bartek.bednarek@onet.pl'),(333,'Rentals','client@172.22.0.3','2024-06-09 15:40:45','INSERT','Dodano nowe wypozyczenie o id:17'),(334,'Parking_reservations','client@172.22.0.3','2024-06-09 15:41:32','INSERT','Dodano nowa rezerwacje o id:50'),(335,'Cars','admin@172.22.0.3','2024-06-09 15:46:26','UPDATE','Zaktualizowano samochod o id:1'),(336,'Users','admin@172.22.0.3','2024-06-09 15:51:38','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(337,'Users','admin@172.22.0.3','2024-06-09 15:51:38','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl');
/*!40000 ALTER TABLE `Event_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flight_data`
--

DROP TABLE IF EXISTS `Flight_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flight_data`
--

LOCK TABLES `Flight_data` WRITE;
/*!40000 ALTER TABLE `Flight_data` DISABLE KEYS */;
INSERT INTO `Flight_data` VALUES (1,10000,135,450,0,52.22970,21.01220,'FL1'),(2,110000,180,520,0,52.35340,21.00320,'LH233');
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
  `status` enum('SCHEDULED','WAITING','AIRBORNE','TAKE OFF','LANDING','FINISHED','CANCELED','DELAYED') NOT NULL DEFAULT 'SCHEDULED',
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
INSERT INTO `Flights` VALUES ('EJU 4668','AIRBORNE','EasyJet','PARYŻ (CDG)','2024-05-01 12:53:00','2024-05-01 10:51:00','ABC231'),('EJU 4670','SCHEDULED','EasyJet','Port lotniczy','2024-05-02 16:50:00','2024-05-02 15:50:00','ABC231'),('FL1','TAKE OFF','LOT','WARSZAWA (WAW)','2024-04-10 12:00:00','2024-04-10 10:00:00','ABC123'),('FL2','SCHEDULED','LOT','Port lotniczy','2024-04-11 12:00:00','2024-04-11 10:00:00','ABC123'),('FR 1902','AIRBORNE','Ryanair','DUBLIN (DUB)','2024-05-01 17:30:00','2024-05-01 17:30:00','ABC236'),('FR 1913','SCHEDULED','Ryanair','Port lotniczy','2024-05-02 17:30:00','2024-05-02 17:30:00','ABC236'),('FR 3036','SCHEDULED','Ryanair','BARCELONA (BCN)','2024-05-02 01:25:00','2024-05-01 23:25:00','ABC235'),('FR 3037','SCHEDULED','Ryanair','Port lotniczy','2024-05-02 17:25:00','2024-05-02 17:25:00','ABC235'),('KL 1996','AIRBORNE','KLM','AMSTERDAM (AMS)','2024-05-01 09:00:00','2024-05-01 11:01:00','ABC233'),('KL 1998','AIRBORNE','KLM','FRANKFURT (FRA)','2024-05-02 13:45:00','2024-05-02 11:40:00','ABC237'),('KL 2001','SCHEDULED','KLM','Port lotniczy','2024-05-02 17:45:00','2024-05-02 17:45:00','ABC237'),('KL 2005','SCHEDULED','KLM','Port lotniczy','2024-05-21 17:00:00','2024-05-02 17:00:00','ABC233'),('LH 1623','AIRBORNE','Lufthansa','MONACHIUM (MUC)','2024-05-01 17:20:00','2024-05-01 17:20:00','ABC234'),('LH 1647','SCHEDULED','Lufthansa','Port lotniczy','2024-05-02 17:20:00','2024-05-02 17:20:00','ABC234'),('LH 239','SCHEDULED','Lufthansa','Port lotniczy','2024-04-12 18:25:00','2024-04-12 16:15:00','ABC231'),('LH233','WAITING','Lufthansa','BUDAPESZT (BUD)','2024-04-11 18:25:00','2024-04-12 16:15:00','ABC231'),('W6 5047','AIRBORNE','WizzAir','BARCELONA (BCN)','2024-05-01 16:40:00','2024-05-01 16:40:00','ABC232'),('W6 6021','SCHEDULED','WizzAir','Port lotniczy','2024-05-02 16:40:00','2024-05-02 16:40:00','ABC232');
/*!40000 ALTER TABLE `Flights` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `flights_insert_trig` AFTER INSERT ON `Flights` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Flights', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowy lot o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `flights_update_trig` AFTER UPDATE ON `Flights` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Flights', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano lot o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `flights_delete_trig` AFTER DELETE ON `Flights` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Flights', USER(), NOW(3), 'DELETE', CONCAT('Usunieto lot o id:', OLD.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Gates`
--

DROP TABLE IF EXISTS `Gates`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Gates` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(25) NOT NULL,
  `status` enum('CLOSED','BUSY','ON STAND','READY') NOT NULL DEFAULT 'READY',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gates`
--

LOCK TABLES `Gates` WRITE;
/*!40000 ALTER TABLE `Gates` DISABLE KEYS */;
INSERT INTO `Gates` VALUES (1,'Gate 1','ON STAND'),(2,'Gate 2','BUSY'),(3,'Gate 3','ON STAND'),(4,'Gate4','CLOSED'),(8,'Gate 6','READY'),(11,'Gate 5','BUSY');
/*!40000 ALTER TABLE `Gates` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `gates_insert_trig` AFTER INSERT ON `Gates` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Gates', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowa bramke o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `gates_update_trig` AFTER UPDATE ON `Gates` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Gates', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano bramke o id:', NEW.id,' na:', NEW.name,'i statusie:', NEW.status));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `gates_delete_trig` AFTER DELETE ON `Gates` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Gates', USER(), NOW(3), 'DELETE', CONCAT('Usunieto bramke o id:', OLD.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Logowanie_log`
--

DROP TABLE IF EXISTS `Logowanie_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Logowanie_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `login_date` timestamp NOT NULL,
  `login_details` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logowanie_log`
--

LOCK TABLES `Logowanie_log` WRITE;
/*!40000 ALTER TABLE `Logowanie_log` DISABLE KEYS */;
INSERT INTO `Logowanie_log` VALUES (1,NULL,'bartek.bednarek@onet.pl','2024-05-26 10:35:27','Nie udane logowanie o 2024-05-26 10:35:27'),(2,'Bartek','bartek.bednarek@onet.pl','2024-05-26 10:35:33','Udane logowanie Bartek o 2024-05-26 10:35:33'),(3,'Bartek','bartek.bednarek@onet.pl','2024-05-26 11:19:38','Udane logowanie Bartek o 2024-05-26 11:19:38'),(4,'jan','jan.kowal@onet.pl','2024-05-26 12:53:44','Udane logowanie jan o 2024-05-26 12:53:44'),(5,'Marek','bartek.bednarek1@onet.pl','2024-05-26 13:17:59','Udane logowanie Marek o 2024-05-26 13:17:59'),(6,NULL,'bartek.bednarek@onet.pl','2024-05-26 13:18:15','Nie udane logowanie o 2024-05-26 13:18:15'),(7,'Bartek','bartek.bednarek@onet.pl','2024-05-26 13:18:25','Udane logowanie Bartek o 2024-05-26 13:18:25'),(8,'Mikołaj','bartek.bednarek2@onet.pl','2024-05-26 13:24:53','Udane logowanie Mikołaj o 2024-05-26 13:24:53'),(9,'Bartek','bartek.bednarek3@onet.pl','2024-05-26 13:27:23','Udane logowanie Bartek o 2024-05-26 13:27:23'),(10,'Bartek','bartek.bednarek4@onet.pl','2024-05-26 13:32:06','Udane logowanie Bartek o 2024-05-26 13:32:06'),(11,'Bartek','bartek.bednarek@onet.pl','2024-05-26 13:32:46','Udane logowanie Bartek o 2024-05-26 13:32:46'),(12,'Daniel','bartek.bednarek5@onet.pl','2024-05-26 13:37:23','Udane logowanie Daniel o 2024-05-26 13:37:23'),(13,'Bartek','bartek.bednarek6@onet.pl','2024-05-26 13:38:56','Udana rejestracja nowego uzytkownika o imieniu Bartek o 2024-05-26 13:38:56'),(14,NULL,'bartek.bednarek@onet.pl','2024-05-26 13:39:17','Nie udana rejestracja o 2024-05-26 13:39:17'),(15,'Bartek','bartek.bednarek@onet.pl','2024-05-26 13:39:38','Udane logowanie Bartek o 2024-05-26 13:39:38'),(16,'Tomasz','bartek.bednarek1@onet.pl','2024-05-26 13:47:47','Udana rejestracja nowego uzytkownika o imieniu Tomasz o 2024-05-26 13:47:47'),(17,'Bartek','bartek.bednarek@onet.pl','2024-05-26 13:47:58','Udane logowanie Bartek o 2024-05-26 13:47:58'),(18,'jan','jan.kowal@onet.pl','2024-05-27 07:16:47','Udane logowanie jan o 2024-05-27 07:16:47'),(19,'roman','jjj@onet.pl','2024-05-27 07:29:08','Udane logowanie roman o 2024-05-27 07:29:08'),(20,'jan','jan.kowal@onet.pl','2024-05-27 08:13:41','Udane logowanie jan o 2024-05-27 08:13:41'),(21,'jan','jan.kowal@onet.pl','2024-05-27 08:15:32','Udane logowanie jan o 2024-05-27 08:15:32'),(22,'jan','jan.kowal@onet.pl','2024-05-27 08:26:00','Udane logowanie jan o 2024-05-27 08:26:00'),(23,'roman','jjj@onet.pl','2024-05-27 08:26:06','Udane logowanie roman o 2024-05-27 08:26:06'),(24,'jan','jan.kowal@onet.pl','2024-05-27 13:12:51','Udane logowanie jan o 2024-05-27 13:12:51'),(25,'jan','jan.kowal@onet.pl','2024-05-27 17:52:00','Udane logowanie jan o 2024-05-27 17:52:00'),(26,'Paweł','pawelporemba123@gmail.com','2024-05-27 17:52:21','Udana rejestracja nowego uzytkownika o imieniu Paweł o 2024-05-27 17:52:21'),(27,'jan','jan.kowal@onet.pl','2024-05-27 17:52:57','Udane logowanie jan o 2024-05-27 17:52:57'),(28,'jan','jan.kowal@onet.pl','2024-05-27 18:13:15','Udane logowanie jan o 2024-05-27 18:13:15'),(29,'roman','roman@onet.pl','2024-05-27 18:41:08','Udana rejestracja nowego uzytkownika o imieniu roman o 2024-05-27 18:41:08'),(30,'roman','roman@onet.pl','2024-05-27 18:41:15','Udane logowanie roman o 2024-05-27 18:41:15'),(31,'jan','jan.kowal@onet.pl','2024-05-27 18:41:30','Udane logowanie jan o 2024-05-27 18:41:30'),(32,'jan','jan.kowal@onet.pl','2024-05-27 18:41:38','Udane logowanie jan o 2024-05-27 18:41:38'),(33,'Paweł','pawelporemba123@gmail.com','2024-05-27 18:46:20','Udane logowanie Paweł o 2024-05-27 18:46:20'),(34,'jan','jan.kowal@onet.pl','2024-05-27 18:49:11','Udane logowanie jan o 2024-05-27 18:49:11'),(35,'Paweł','pawelporemba123@gmail.com','2024-05-27 19:33:02','Udane logowanie Paweł o 2024-05-27 19:33:02'),(36,'jan','jan.kowal@onet.pl','2024-05-27 19:39:28','Udane logowanie jan o 2024-05-27 19:39:28'),(37,'jan','jan.kowal@onet.pl','2024-05-27 19:45:58','Udane logowanie jan o 2024-05-27 19:45:58'),(38,'jan','jan.kowal@onet.pl','2024-05-27 19:51:37','Udane logowanie jan o 2024-05-27 19:51:37'),(39,'Paweł','pawelporemba123@gmail.com','2024-05-27 20:05:38','Udane logowanie Paweł o 2024-05-27 20:05:38'),(40,'jan','jan.kowal@onet.pl','2024-05-27 20:06:01','Udane logowanie jan o 2024-05-27 20:06:01'),(41,'Paweł','pawelporemba123@gmail.com','2024-05-27 20:06:45','Udane logowanie Paweł o 2024-05-27 20:06:45'),(42,'jan','jan.kowal@onet.pl','2024-05-27 20:25:39','Udane logowanie jan o 2024-05-27 20:25:39'),(43,NULL,'jan.kowal@onet.pl','2024-05-29 15:08:17','Nie udane logowanie o 2024-05-29 15:08:17'),(44,'jan','jan.kowal@onet.pl','2024-05-29 15:08:24','Udane logowanie jan o 2024-05-29 15:08:24'),(45,'jan','jan.kowal@onet.pl','2024-05-31 20:22:38','Udane logowanie jan o 2024-05-31 22:22:38'),(46,'jan','jan.kowal@onet.pl','2024-06-01 16:45:44','Udane logowanie jan o 2024-06-01 18:45:44'),(47,'jan','jan.kowal@onet.pl','2024-06-06 12:26:25','Udane logowanie jan o 2024-06-06 14:26:25'),(48,'jan','jan.kowal@onet.pl','2024-06-06 13:15:46','Udane logowanie jan o 2024-06-06 15:15:46'),(49,'Bartek','bartek.bednarek@onet.pl','2024-06-07 22:57:48','Udana rejestracja nowego uzytkownika o imieniu Bartek o 2024-06-08 00:57:48'),(50,'Bartek','bartek.bednarek@onet.pl','2024-06-07 22:57:58','Udane logowanie Bartek o 2024-06-08 00:57:58'),(51,'jan','jan.kowal@onet.pl','2024-06-07 23:14:04','Udane logowanie jan o 2024-06-08 01:14:04'),(52,'Bartek','bartek.bednarek@onet.pl','2024-06-07 23:25:50','Udane logowanie Bartek o 2024-06-08 01:25:50'),(53,'jan','jan.kowal@onet.pl','2024-06-08 00:00:10','Udane logowanie jan o 2024-06-08 02:00:10'),(54,'Bartek','bartek.bednarek@onet.pl','2024-06-08 00:08:08','Udane logowanie Bartek o 2024-06-08 02:08:08'),(55,'Bartek','bartek.bednarek@onet.pl','2024-06-08 00:08:34','Udane logowanie Bartek o 2024-06-08 02:08:34'),(56,'jan','jan.kowal@onet.pl','2024-06-08 00:12:08','Udane logowanie jan o 2024-06-08 02:12:08'),(57,NULL,'bartek.bednarek@onet.pl','2024-06-08 00:13:12','Nie udane logowanie o 2024-06-08 02:13:12'),(58,NULL,'bartek.bednarek@onet.pl','2024-06-08 00:13:13','Nie udane logowanie o 2024-06-08 02:13:13'),(59,NULL,'bartek.bednarek@onet.pl','2024-06-08 00:14:34','Nie udane logowanie o 2024-06-08 02:14:34'),(60,NULL,'bartek.bednarek@onet.pl','2024-06-08 00:14:46','Nie udane logowanie o 2024-06-08 02:14:46'),(61,NULL,'bartek.bednarek@onet.pl','2024-06-08 00:15:20','Nie udane logowanie o 2024-06-08 02:15:20'),(62,NULL,'bartek.bednarek@onet.pl','2024-06-08 00:15:23','Nie udane logowanie o 2024-06-08 02:15:23'),(63,NULL,'bartek.bednarek@onet.pl','2024-06-08 00:15:24','Nie udane logowanie o 2024-06-08 02:15:24'),(64,NULL,'bartek.bednarek@onet.pl','2024-06-08 00:15:24','Nie udane logowanie o 2024-06-08 02:15:24'),(65,NULL,'bartek.bednarek@onet.pl','2024-06-08 00:15:24','Nie udane logowanie o 2024-06-08 02:15:24'),(66,'Bartek','bartek.bednarek@onet.pl','2024-06-08 12:52:15','Udane logowanie Bartek o 2024-06-08 14:52:15'),(67,'jan','jan.kowal@onet.pl','2024-06-08 13:15:13','Udane logowanie jan o 2024-06-08 15:15:13'),(68,'Bartek','bartek.bednarek@onet.pl','2024-06-08 23:36:59','Udane logowanie Bartek o 2024-06-09 01:36:59'),(69,'jan','jan.kowal@onet.pl','2024-06-09 10:37:12','Udane logowanie jan o 2024-06-09 12:37:12'),(70,'Bartek','bartek.bednarek@onet.pl','2024-06-09 10:42:14','Udane logowanie Bartek o 2024-06-09 12:42:14'),(71,'Bartek','bartek.bednarek@onet.pl','2024-06-09 14:36:56','Udane logowanie Bartek o 2024-06-09 16:36:56'),(72,'jan','jan.kowal@onet.pl','2024-06-09 15:46:03','Udane logowanie jan o 2024-06-09 17:46:03');
/*!40000 ALTER TABLE `Logowanie_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Luggage`
--

DROP TABLE IF EXISTS `Luggage`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Luggage` (
  `li` int NOT NULL AUTO_INCREMENT,
  `type` varchar(25) NOT NULL,
  `size` varchar(25) NOT NULL,
  `weight` decimal(6,2) NOT NULL,
  `Users_id` int NOT NULL,
  PRIMARY KEY (`li`),
  KEY `fk_Users_uid_luggage` (`Users_id`),
  CONSTRAINT `Luggage_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Luggage`
--

LOCK TABLES `Luggage` WRITE;
/*!40000 ALTER TABLE `Luggage` DISABLE KEYS */;
INSERT INTO `Luggage` VALUES (1,'Walizka','Średnia',15.50,6);
/*!40000 ALTER TABLE `Luggage` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parking_info`
--

DROP TABLE IF EXISTS `Parking_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parking_info`
--

LOCK TABLES `Parking_info` WRITE;
/*!40000 ALTER TABLE `Parking_info` DISABLE KEYS */;
INSERT INTO `Parking_info` VALUES (1,'Parking 1',100,25.00,'ul. Królowej Jadwigi',6,'Nowy Sącz','33-300');
/*!40000 ALTER TABLE `Parking_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Parking_reservations`
--

DROP TABLE IF EXISTS `Parking_reservations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Parking_reservations` (
  `pid` int NOT NULL AUTO_INCREMENT,
  `parking_level` varchar(5) NOT NULL,
  `space_id` varchar(5) NOT NULL,
  `since` datetime NOT NULL,
  `until` datetime NOT NULL,
  `license_plate` varchar(12) NOT NULL,
  `reservation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('PENDING','RESERVED','CANCELLED') DEFAULT 'PENDING',
  `Users_id` int NOT NULL,
  PRIMARY KEY (`pid`),
  KEY `Users_id` (`Users_id`),
  CONSTRAINT `Parking_reservations_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parking_reservations`
--

LOCK TABLES `Parking_reservations` WRITE;
/*!40000 ALTER TABLE `Parking_reservations` DISABLE KEYS */;
INSERT INTO `Parking_reservations` VALUES (5,'B','97','2024-06-19 18:53:00','2024-06-15 18:53:00','ABC123','2024-06-02 16:53:44','PENDING',7),(27,'A','1','2024-06-10 22:00:00','2024-06-11 22:00:00','KN11112','2024-06-06 18:08:06','RESERVED',7),(29,'A','3','2024-06-17 22:00:00','2024-06-18 22:00:00','KN35918','2024-06-06 18:12:06','RESERVED',7),(31,'A','4','2024-06-16 22:00:00','2024-06-17 22:00:00','KN11114','2024-06-06 18:24:50','RESERVED',7),(46,'A','16','2024-06-09 22:00:00','2024-06-11 22:00:00','KN1910P','2024-06-09 10:13:59','RESERVED',14),(47,'A','17','2024-06-10 22:00:00','2024-06-11 22:00:00','KN19101','2024-06-09 10:27:42','RESERVED',14),(48,'A','11','2024-06-09 22:00:00','2024-06-18 22:00:00','kli12314','2024-06-09 14:43:01','RESERVED',14),(49,'A','14','2024-06-16 22:00:00','2024-06-17 22:00:00','KN11114A','2024-06-09 14:48:41','RESERVED',14),(50,'B','65','2024-06-09 22:00:00','2024-06-11 22:00:00','KN19101','2024-06-09 15:41:31','RESERVED',14);
/*!40000 ALTER TABLE `Parking_reservations` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `parking_reservations_insert_trig` AFTER INSERT ON `Parking_reservations` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Parking_reservations', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowa rezerwacje o id:', NEW.pid));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `parking_reservations_update_trig` AFTER UPDATE ON `Parking_reservations` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Parking_reservations', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano rezerwacje o id:', NEW.pid));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `parking_reservations_delete_trig` AFTER DELETE ON `Parking_reservations` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Parking_reservations', USER(), NOW(3), 'DELETE', CONCAT('Usunieto rezerwacje o id:', OLD.pid));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Rentals`
--

DROP TABLE IF EXISTS `Rentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rentals` (
  `id` int NOT NULL AUTO_INCREMENT,
  `since` datetime NOT NULL,
  `until` datetime NOT NULL,
  `status` enum('PENDING','RENTED','RETURNED','CANCELLED') NOT NULL DEFAULT 'PENDING',
  `reservation_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `return_time` timestamp NULL DEFAULT NULL,
  `Cars_id` int NOT NULL,
  `Users_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Users_id` (`Users_id`),
  KEY `Cars_id` (`Cars_id`),
  CONSTRAINT `Rentals_ibfk_1` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `Rentals_ibfk_2` FOREIGN KEY (`Cars_id`) REFERENCES `Cars` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rentals`
--

LOCK TABLES `Rentals` WRITE;
/*!40000 ALTER TABLE `Rentals` DISABLE KEYS */;
INSERT INTO `Rentals` VALUES (9,'2024-06-08 13:49:00','2024-06-06 13:49:00','RENTED','2024-06-02 13:50:04',NULL,3,12),(10,'2024-06-03 13:53:00','2024-06-08 13:53:00','PENDING','2024-06-02 13:53:47',NULL,5,6),(11,'2024-06-05 13:54:00','2024-06-07 13:54:00','PENDING','2024-06-02 13:55:01',NULL,4,12),(13,'2024-06-13 21:21:00','2024-06-16 21:21:00','RETURNED','2024-06-02 21:21:16',NULL,1,9),(14,'2024-06-10 22:00:00','2024-06-12 22:00:00','RENTED','2024-06-09 10:36:05',NULL,14,14),(15,'2024-06-09 22:00:00','2024-06-18 22:00:00','RENTED','2024-06-09 14:42:11',NULL,2,14),(16,'2024-06-28 22:00:00','2024-06-29 22:00:00','RENTED','2024-06-09 14:46:13',NULL,11,14),(17,'2024-06-10 22:00:00','2024-06-12 22:00:00','RENTED','2024-06-09 15:40:44',NULL,3,14);
/*!40000 ALTER TABLE `Rentals` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `rentals_insert_trig` AFTER INSERT ON `Rentals` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Rentals', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowe wypozyczenie o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `rentals_update_trig` AFTER UPDATE ON `Rentals` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Rentals', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano wypozyczenie o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `rentals_delete_trig` AFTER DELETE ON `Rentals` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Rentals', USER(), NOW(3), 'DELETE', CONCAT('Usunieto wypozyczenie o id:', OLD.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Runways`
--

DROP TABLE IF EXISTS `Runways`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Runways`
--

LOCK TABLES `Runways` WRITE;
/*!40000 ALTER TABLE `Runways` DISABLE KEYS */;
INSERT INTO `Runways` VALUES ('RW1',3000,1,'READY','FL1');
/*!40000 ALTER TABLE `Runways` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `runways_update_trig` AFTER UPDATE ON `Runways` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Runways', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano pas startowy o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Taxiways`
--

DROP TABLE IF EXISTS `Taxiways`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Taxiways`
--

LOCK TABLES `Taxiways` WRITE;
/*!40000 ALTER TABLE `Taxiways` DISABLE KEYS */;
INSERT INTO `Taxiways` VALUES ('TW1',1,'READY','FL1');
/*!40000 ALTER TABLE `Taxiways` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `taxiways_update_trig` AFTER UPDATE ON `Taxiways` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Taxiways', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano droge ko�owania o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `Terminals`
--

DROP TABLE IF EXISTS `Terminals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Terminals`
--

LOCK TABLES `Terminals` WRITE;
/*!40000 ALTER TABLE `Terminals` DISABLE KEYS */;
INSERT INTO `Terminals` VALUES (1,1,4,'OCCUPIED','LH 239'),(5,1,1,'EMPTY','FL2');
/*!40000 ALTER TABLE `Terminals` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `terminals_update_trig` AFTER UPDATE ON `Terminals` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Terminals', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano terminal o id:', NEW.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
  `price` decimal(10,2) NOT NULL,
  `status` enum('PURCHASED','EXPIRED','USED','REFUNDED') NOT NULL DEFAULT 'PURCHASED',
  `Users_id` int NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  `Gates_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  KEY `fk_Users_uid_users` (`Users_id`),
  KEY `fk_Gates_id_gates` (`Gates_id`),
  CONSTRAINT `fk_Flight_id_tickets` FOREIGN KEY (`Flight_id`) REFERENCES `Flights` (`id`),
  CONSTRAINT `fk_Gates_id_gates` FOREIGN KEY (`Gates_id`) REFERENCES `Gates` (`id`),
  CONSTRAINT `fk_Users_uid_users` FOREIGN KEY (`Users_id`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tickets`
--

LOCK TABLES `Tickets` WRITE;
/*!40000 ALTER TABLE `Tickets` DISABLE KEYS */;
INSERT INTO `Tickets` VALUES (1,'2024-05-20 23:31:30','2024-05-30 12:00:00','Biznes',2,2800.00,'PURCHASED',7,'LH 1623',2),(2,'2024-05-20 23:32:35','2024-06-02 15:00:00','Ekonomiczna',97,1500.00,'PURCHASED',9,'FR 1913',4),(23,'2024-04-10 10:00:00','2024-04-10 12:00:00','Ekonomiczna',15,1800.00,'USED',6,'FL1',1);
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
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
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (6,'jan.kowal2@onet.pl','$2a$10$v6sgpqM5aauH5N9aGGLHVeewlRnf1/pZzpVSo2UAxbFamSx5NVaxO','2024-05-08 16:52:59','jan','kowalski',NULL,NULL,NULL,NULL,NULL,'$2a$10$v6sgpqM5aauH5N9aGGLHVe'),(7,'jan.kowal@onet.pl','$2a$10$bNwJ3hT6ZFAL5H5LPEx8I.t24Av76UoU7F9VWVoaJj4uosPjW51FW','2024-05-08 16:52:59','jan','kowalski','+48 123 456 789','ul. Królowej Jadwigi 65, Nowy Sącz','M','2001-06-18','1717948298142614587939.png','$2a$10$bNwJ3hT6ZFAL5H5LPEx8I.'),(9,'jan.kowalski@onet.pl','$2a$10$2uBK7gPNyDh1L4LfXVJcwe7InFeykwF3u8U2Ed/MZ5CctK25R3iEO','2024-05-11 18:07:28','Jan','Kowalski','123456789','ul. Krakowska 85b','M','1997-03-12',NULL,'$2a$10$2uBK7gPNyDh1L4LfXVJcwe'),(11,'jjj@onet.pl','$2a$10$pYMFP7/oqQFaD9ZxDp2ngeUpN5X/HSo1OOb13/bIPz0bcaFq/6YTu','2024-05-26 18:35:58','roman','nowak','sdsdsd','','M','2024-05-29',NULL,'$2a$10$pYMFP7/oqQFaD9ZxDp2nge'),(12,'pawelporemba123@gmail.com','$2a$10$x9Fgy1Q/80eYekTYzWC6YeAup3PkJFz8l..H4szkEAbHp7OLGHSXq','2024-05-27 17:52:21','Paweł','Poremba',NULL,NULL,NULL,NULL,NULL,'$2a$10$x9Fgy1Q/80eYekTYzWC6Ye'),(13,'roman@onet.pl','$2a$10$l1wFoUsYBwgNsClm4bWMHuJKcL7hcF.L7dtIa62AoOaiFFR9bo4jq','2024-05-27 18:41:08','roman','nowak',NULL,NULL,NULL,NULL,NULL,'$2a$10$l1wFoUsYBwgNsClm4bWMHu'),(14,'bartek.bednarek@onet.pl','$2a$10$gtdJgVIb2UTU/ZBhfsjyUeNZ0vO0o6rfEJBxQ5RXjJuNutwDc25h6','2024-06-07 22:57:48','Bartek','Bednarek','123123123','','M','2002-02-17',NULL,'$2a$10$gtdJgVIb2UTU/ZBhfsjyUe');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `validate_new_user` BEFORE INSERT ON `Users` FOR EACH ROW BEGIN
    SET NEW.phone_number = TRIM(NEW.phone_number);

    CALL validate_user_data(NEW.email, NEW.phone_number, NEW.birth_date, NEW.password);

    INSERT INTO Event_logs (table_name, by_user, action, log_details)
    VALUES ('Users', USER(), 'INSERT', CONCAT('Dodano nowego u�ytkownika: ', NEW.email));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `validate_update_user` BEFORE UPDATE ON `Users` FOR EACH ROW BEGIN
    SET NEW.phone_number = TRIM(NEW.phone_number);

    CALL validate_user_data(NEW.email, NEW.phone_number, NEW.birth_date, NEW.password);

    INSERT INTO Event_logs (table_name, by_user, action, log_details)
    VALUES ('Users', USER(), 'UPDATE', CONCAT('Zaktualizowano u�ytkownika: ', NEW.email));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `Users_delete_trig` AFTER DELETE ON `Users` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Users', USER(), NOW(3), 'DELETE', CONCAT('Usunieto uzytkownika o id:', OLD.id));
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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

-- Dump completed on 2024-06-09 18:19:14
