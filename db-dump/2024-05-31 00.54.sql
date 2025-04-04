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
INSERT INTO `Airplanes` VALUES ('ABC123','787 Dreamliner','Passenger',2018,350,80000.00,30000.00,3,150000.00,NULL),('ABC231','787 Dreamliner','Passenger',2005,350,80000.00,30000.00,3,150000.00,NULL),('ABC232','A320','Passenger',2010,180,10000.00,10000.00,5,20000.00,NULL),('ABC233','B737','Passenger',2012,160,9000.00,9000.00,5,18000.00,NULL),('ABC234','A330','Passenger',2018,220,15000.00,15000.00,6,25000.00,NULL),('ABC235','B737','Passenger',2013,160,9000.00,9000.00,5,18000.00,NULL),('ABC236','B737','Passenger',2011,160,9000.00,9000.00,5,18000.00,NULL),('ABC237','A320','Passenger',2019,180,10000.00,10000.00,5,20000.00,NULL),('BCA203','Boeing 757-300','passenger',1987,255,30000.00,857.00,6,200.00,NULL);
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `validate_new_airplane` BEFORE INSERT ON `Airplanes` FOR EACH ROW BEGIN
    IF (validate_airplane_fuel(NEW.fuel_tank, NEW.fuel_quant) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ilo�� paliwa przekracza pojemno�� zbiornika';
    END IF;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `validate_update_airplane` BEFORE UPDATE ON `Airplanes` FOR EACH ROW BEGIN
    IF (validate_airplane_fuel(NEW.fuel_tank, NEW.fuel_quant) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ilo�� paliwa przekracza pojemno�� zbiornika';
    END IF;
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
  `id` int NOT NULL,
  `title` varchar(45) NOT NULL,
  `content` text NOT NULL,
  `valid_until` datetime NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `Employee_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `Employee_id` (`Employee_id`),
  CONSTRAINT `Announcements_ibfk_1` FOREIGN KEY (`Employee_id`) REFERENCES `Employees` (`id`) ON DELETE CASCADE
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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cars`
--

LOCK TABLES `Cars` WRITE;
/*!40000 ALTER TABLE `Cars` DISABLE KEYS */;
INSERT INTO `Cars` VALUES (1,'Mercedes','AMG',2020,'ABC123',50.00,'AMGMercedes.jpg','Benzyna','AUTOMATIC'),(2,'Ford','Fiesta',2019,'XYZ123',40.00,'FiestaFord.jpg','Benzyna','MANUAL'),(3,'Audii','A4',2020,'XYZ124',45.00,'A4Audii.jpg','Benzyna','AUTOMATIC'),(4,'BMW','X5',2021,'XYZ125',60.00,'X5BMW.jpg','Diesel','AUTOMATIC'),(5,'audi','a3',2019,'KR32456',53.00,NULL,'Benzyna','AUTOMATIC'),(11,'audi','a3',2020,'KN123456',234.00,NULL,'Benzyna','AUTOMATIC'),(13,'Audi','A4',2004,'KLI 85W2',40.00,NULL,'Diesel','MANUAL'),(14,'Audi','S7',2016,'KNT 0233',70.00,NULL,'Benzyna','MANUAL');
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
 1 AS `origin`,
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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
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
INSERT INTO `Equipment` VALUES ('EQ039393','Metal Detector','Security','Terminal 1',2),('EQ12347','Runway Lights','Ground Support','Terminal 2',1),('EQ12348','Metal Detector','Security','Terminal 3',2);
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
) ENGINE=InnoDB AUTO_INCREMENT=187 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Event_logs`
--

LOCK TABLES `Event_logs` WRITE;
/*!40000 ALTER TABLE `Event_logs` DISABLE KEYS */;
INSERT INTO `Event_logs` VALUES (1,'Gates','root@172.22.0.3','2024-05-20 13:03:25','INSERT','Dodano nowa bramke o id:7'),(2,'Gates','root@172.22.0.3','2024-05-20 13:12:25','UPDATE','Zaktualizowano bramke o id:7 na:Gate 5i statusie:ON STAND'),(3,'Gates','root@172.22.0.3','2024-05-20 13:13:17','DELETE','Usunieto bramke o id:7'),(4,'Announcements','root@172.22.0.3','2024-05-20 14:13:12','DELETE','Usunieto ogloszenie o id:4'),(5,'Equipment','root@172.22.0.3','2024-05-20 14:45:53','INSERT','Dodano nowe sprzt o id:EQ12349'),(6,'Equipment','root@172.22.0.3','2024-05-20 14:46:00','UPDATE','Zaktualizowano sprzt o id:EQ12349'),(7,'Equipment','root@172.22.0.3','2024-05-20 14:46:03','DELETE','Usunieto sprzt o id:EQ12349'),(8,'Cars','root@172.22.0.3','2024-05-20 17:22:07','INSERT','Dodano nowy samochod o id:15'),(9,'Cars','root@172.22.0.3','2024-05-20 17:22:17','UPDATE','Zaktualizowano samochod o id:15'),(10,'Cars','root@172.22.0.3','2024-05-20 17:22:29','DELETE','Usunieto samochod o id:15'),(11,'Rentals','root@172.22.0.3','2024-05-20 17:25:17','INSERT','Dodano nowe wypozyczenie o id:4'),(12,'Rentals','root@172.22.0.3','2024-05-20 17:25:29','UPDATE','Zaktualizowano wypozyczenie o id:4'),(13,'Rentals','root@172.22.0.3','2024-05-20 17:25:34','DELETE','Usunieto wypozyczenie o id:4'),(14,'Parking_reservations','root@172.22.0.3','2024-05-20 17:29:59','DELETE','Usunieto rezerwacje o id:1'),(15,'Parking_reservations','root@172.22.0.3','2024-05-20 17:30:27','INSERT','Dodano nowa rezerwacje o id:3'),(16,'Runways','root@172.22.0.3','2024-05-20 17:43:36','UPDATE','Zaktualizowano pas startowy o id:RW1'),(17,'Taxiways','root@172.22.0.3','2024-05-20 17:45:48','UPDATE','Zaktualizowano droge koowania o id:TW1'),(18,'Terminals','root@172.22.0.3','2024-05-20 17:48:00','UPDATE','Zaktualizowano terminal o id:1'),(19,'Airplanes','root@localhost','2024-05-20 17:59:44','INSERT','Dodano nowy samolot o serial_number:1234'),(20,'Airplanes','root@localhost','2024-05-20 18:02:53','DELETE','Usunieto samolot o serial_number:1234'),(21,'Rentals','root@172.22.0.3','2024-05-20 18:46:33','INSERT','Dodano nowe wypozyczenie o id:6'),(22,'Cars','root@172.22.0.3','2024-05-20 18:47:28','DELETE','Usunieto samochod o id:14'),(23,'Equipment','root@172.22.0.3','2024-05-20 19:01:45','INSERT','Dodano nowe sprzt o id:EQ12349'),(24,'Gates','admin@172.29.0.3','2024-05-20 19:31:05','INSERT','Dodano nowa bramke o id:5'),(25,'Gates','admin@172.29.0.3','2024-05-20 19:31:08','DELETE','Usunieto bramke o id:5'),(26,'Equipment','root@172.21.0.3','2024-05-21 07:32:22','INSERT','Dodano nowe sprz´┐Żt o id:EQ039393'),(27,'Flights','admin@172.29.0.3','2024-05-26 21:23:23','UPDATE','Zaktualizowano lot o id:LH233'),(28,'Terminals','admin@172.18.0.3','2024-05-26 21:55:14','UPDATE','Zaktualizowano terminal o id:5'),(29,'Terminals','admin@172.18.0.3','2024-05-26 22:02:53','UPDATE','Zaktualizowano terminal o id:5'),(30,'Terminals','admin@172.18.0.3','2024-05-26 22:03:05','UPDATE','Zaktualizowano terminal o id:5'),(31,'Terminals','admin@172.18.0.3','2024-05-26 22:03:23','UPDATE','Zaktualizowano terminal o id:5'),(32,'Terminals','admin@172.18.0.3','2024-05-26 22:04:48','UPDATE','Zaktualizowano terminal o id:5'),(33,'Terminals','admin@172.18.0.3','2024-05-26 22:04:57','UPDATE','Zaktualizowano terminal o id:5'),(34,'Terminals','admin@172.18.0.3','2024-05-26 22:11:53','UPDATE','Zaktualizowano terminal o id:5'),(35,'Terminals','admin@172.18.0.3','2024-05-26 22:12:00','UPDATE','Zaktualizowano terminal o id:5'),(36,'Terminals','admin@172.18.0.3','2024-05-26 22:13:26','UPDATE','Zaktualizowano terminal o id:5'),(37,'Terminals','admin@172.18.0.3','2024-05-26 22:13:37','UPDATE','Zaktualizowano terminal o id:5'),(38,'Terminals','admin@172.18.0.3','2024-05-26 22:15:27','UPDATE','Zaktualizowano terminal o id:5'),(39,'Terminals','admin@172.18.0.3','2024-05-26 22:15:42','UPDATE','Zaktualizowano terminal o id:5'),(40,'Taxiways','admin@172.18.0.3','2024-05-26 22:15:52','UPDATE','Zaktualizowano droge ko´┐Żowania o id:TW1'),(41,'Taxiways','admin@172.18.0.3','2024-05-26 22:15:58','UPDATE','Zaktualizowano droge ko´┐Żowania o id:TW1'),(42,'Users','root@172.18.0.1','2024-05-27 17:33:58','INSERT','Niepoprawny numer telefonu'),(43,'Users','root@172.18.0.1','2024-05-27 17:37:01','INSERT','Hasło jest za krótkie'),(44,'Users','root@172.18.0.1','2024-05-27 17:37:07','INSERT','Niepoprawny adres email'),(45,'Users','admin@172.18.0.3','2024-05-27 17:52:21','INSERT','Dodano nowego użytkownika: pawelporemba123@gmail.com'),(46,'Users','admin@172.18.0.3','2024-05-27 18:41:08','INSERT','Dodano nowego użytkownika: roman@onet.pl'),(47,'Users','admin@172.18.0.3','2024-05-27 18:44:21','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(52,'Users','admin@172.18.0.3','2024-05-27 20:34:28','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(53,'Users','admin@172.18.0.3','2024-05-27 20:34:32','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(54,'Users','admin@172.18.0.3','2024-05-27 20:34:36','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(55,'Users','admin@172.18.0.3','2024-05-27 20:34:40','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(56,'Users','admin@172.18.0.3','2024-05-27 20:34:42','UPDATE','Zaktualizowano użytkownika: jan.kowal@onet.pl'),(57,'Terminals','admin@172.18.0.3','2024-05-27 20:35:09','UPDATE','Zaktualizowano terminal o id:1'),(58,'Terminals','admin@172.18.0.3','2024-05-27 20:35:12','UPDATE','Zaktualizowano terminal o id:1'),(59,'Gates','admin@172.18.0.3','2024-05-27 20:38:03','UPDATE','Zaktualizowano bramke o id:1 na:Gate 1i statusie:BUSY'),(60,'Users','admin@172.18.0.3','2024-05-28 07:41:25','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(61,'Users','admin@172.18.0.3','2024-05-28 07:41:26','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(62,'Users','admin@172.18.0.3','2024-05-28 07:44:43','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(63,'Users','admin@172.18.0.3','2024-05-28 07:44:43','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(64,'Flights','root@172.18.0.1','2024-05-29 14:43:25','INSERT','Departure date is later than arrival date'),(65,'Flights','root@172.18.0.1','2024-05-29 14:45:22','INSERT','Departure date is later than arrival date'),(77,'Flights','admin@172.18.0.3','2024-05-29 19:34:24','UPDATE','Zaktualizowano lot o id:KL 1996'),(78,'Flights','admin@172.18.0.3','2024-05-29 19:34:40','UPDATE','Zaktualizowano lot o id:KL 1996'),(92,'Airplanes','admin@172.18.0.3','2024-05-29 20:57:12','UPDATE','Zaktualizowano samolot o serial_number:ABC231'),(93,'Airplanes','admin@172.18.0.3','2024-05-29 20:57:18','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(94,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:04','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(95,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:15','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(96,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:30','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(97,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:32','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(98,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:33','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(99,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:33','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(100,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:34','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(101,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:34','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(102,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:36','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(103,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:36','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(104,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:38','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(105,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:40','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(106,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:50','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(107,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:51','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(108,'Airplanes','admin@172.18.0.3','2024-05-29 21:00:53','UPDATE','Zaktualizowano samolot o serial_number:ABC123'),(109,'Airplanes','admin@172.18.0.3','2024-05-29 21:01:32','UPDATE','Zaktualizowano samolot o serial_number:ABC231'),(117,'Users','client@172.18.0.3','2024-05-30 09:39:37','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(118,'Users','client@172.18.0.3','2024-05-30 09:39:37','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(119,'Users','client@172.18.0.3','2024-05-30 09:40:45','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(120,'Users','client@172.18.0.3','2024-05-30 09:41:05','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(121,'Users','client@172.18.0.3','2024-05-30 09:41:09','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(122,'Users','client@172.18.0.3','2024-05-30 09:41:10','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(123,'Users','client@172.18.0.3','2024-05-30 09:41:10','UPDATE','Zaktualizowano użytkownika: pawelporemba123@gmail.com'),(124,'Flights','root@172.18.0.1','2024-05-30 19:27:24','UPDATE','Zaktualizowano lot o id:EJU 4670'),(125,'Flights','root@172.18.0.1','2024-05-30 19:27:24','UPDATE','Zaktualizowano lot o id:FL2'),(126,'Flights','root@172.18.0.1','2024-05-30 19:27:24','UPDATE','Zaktualizowano lot o id:FR 1913'),(127,'Flights','root@172.18.0.1','2024-05-30 19:27:24','UPDATE','Zaktualizowano lot o id:FR 3037'),(128,'Flights','root@172.18.0.1','2024-05-30 19:27:24','UPDATE','Zaktualizowano lot o id:KL 2001'),(129,'Flights','root@172.18.0.1','2024-05-30 19:27:24','UPDATE','Zaktualizowano lot o id:KL 2005'),(130,'Flights','root@172.18.0.1','2024-05-30 19:27:24','UPDATE','Zaktualizowano lot o id:LH 1647'),(131,'Flights','root@172.18.0.1','2024-05-30 19:27:24','UPDATE','Zaktualizowano lot o id:LH 239'),(132,'Flights','root@172.18.0.1','2024-05-30 19:27:24','UPDATE','Zaktualizowano lot o id:W6 6021'),(133,'Flights','root@172.18.0.1','2024-05-30 19:28:09','UPDATE','Zaktualizowano lot o id:EJU 4670'),(134,'Flights','root@172.18.0.1','2024-05-30 19:28:09','UPDATE','Zaktualizowano lot o id:FL2'),(135,'Flights','root@172.18.0.1','2024-05-30 19:28:09','UPDATE','Zaktualizowano lot o id:FR 1913'),(136,'Flights','root@172.18.0.1','2024-05-30 19:28:09','UPDATE','Zaktualizowano lot o id:FR 3037'),(137,'Flights','root@172.18.0.1','2024-05-30 19:28:09','UPDATE','Zaktualizowano lot o id:KL 2001'),(138,'Flights','root@172.18.0.1','2024-05-30 19:28:09','UPDATE','Zaktualizowano lot o id:KL 2005'),(139,'Flights','root@172.18.0.1','2024-05-30 19:28:09','UPDATE','Zaktualizowano lot o id:LH 1647'),(140,'Flights','root@172.18.0.1','2024-05-30 19:28:09','UPDATE','Zaktualizowano lot o id:LH 239'),(141,'Flights','root@172.18.0.1','2024-05-30 19:28:09','UPDATE','Zaktualizowano lot o id:W6 6021'),(150,'Flights','root@172.18.0.1','2024-05-30 19:31:11','UPDATE','Zaktualizowano lot o id:LH233'),(151,'Flights','root@172.18.0.1','2024-05-30 19:31:25','UPDATE','Zaktualizowano lot o id:EJU 4668'),(152,'Flights','root@172.18.0.1','2024-05-30 19:31:25','UPDATE','Zaktualizowano lot o id:FL1'),(153,'Flights','root@172.18.0.1','2024-05-30 19:31:25','UPDATE','Zaktualizowano lot o id:FR 1902'),(154,'Flights','root@172.18.0.1','2024-05-30 19:31:25','UPDATE','Zaktualizowano lot o id:FR 3036'),(155,'Flights','root@172.18.0.1','2024-05-30 19:31:25','UPDATE','Zaktualizowano lot o id:KL 1996'),(156,'Flights','root@172.18.0.1','2024-05-30 19:31:25','UPDATE','Zaktualizowano lot o id:KL 1998'),(157,'Flights','root@172.18.0.1','2024-05-30 19:31:25','UPDATE','Zaktualizowano lot o id:LH 1623'),(158,'Flights','root@172.18.0.1','2024-05-30 19:31:25','UPDATE','Zaktualizowano lot o id:LH233'),(159,'Flights','root@172.18.0.1','2024-05-30 19:31:25','UPDATE','Zaktualizowano lot o id:W6 5047'),(160,'Flights','root@172.18.0.1','2024-05-30 19:44:32','UPDATE','Zaktualizowano lot o id:EJU 4670'),(161,'Flights','root@172.18.0.1','2024-05-30 19:44:32','UPDATE','Zaktualizowano lot o id:FL2'),(162,'Flights','root@172.18.0.1','2024-05-30 19:44:32','UPDATE','Zaktualizowano lot o id:FR 1913'),(163,'Flights','root@172.18.0.1','2024-05-30 19:44:32','UPDATE','Zaktualizowano lot o id:FR 3037'),(164,'Flights','root@172.18.0.1','2024-05-30 19:44:32','UPDATE','Zaktualizowano lot o id:KL 2001'),(165,'Flights','root@172.18.0.1','2024-05-30 19:44:32','UPDATE','Zaktualizowano lot o id:KL 2005'),(166,'Flights','root@172.18.0.1','2024-05-30 19:44:32','UPDATE','Zaktualizowano lot o id:LH 1647'),(167,'Flights','root@172.18.0.1','2024-05-30 19:44:32','UPDATE','Zaktualizowano lot o id:LH 239'),(168,'Flights','root@172.18.0.1','2024-05-30 19:44:32','UPDATE','Zaktualizowano lot o id:W6 6021'),(169,'Flights','root@172.18.0.1','2024-05-30 19:59:58','UPDATE','Zaktualizowano lot o id:EJU 4670'),(170,'Flights','root@172.18.0.1','2024-05-30 19:59:58','UPDATE','Zaktualizowano lot o id:FL2'),(171,'Flights','root@172.18.0.1','2024-05-30 19:59:58','UPDATE','Zaktualizowano lot o id:FR 1913'),(172,'Flights','root@172.18.0.1','2024-05-30 19:59:58','UPDATE','Zaktualizowano lot o id:FR 3037'),(173,'Flights','root@172.18.0.1','2024-05-30 19:59:58','UPDATE','Zaktualizowano lot o id:KL 2001'),(174,'Flights','root@172.18.0.1','2024-05-30 19:59:58','UPDATE','Zaktualizowano lot o id:KL 2005'),(175,'Flights','root@172.18.0.1','2024-05-30 19:59:58','UPDATE','Zaktualizowano lot o id:LH 1647'),(176,'Flights','root@172.18.0.1','2024-05-30 19:59:58','UPDATE','Zaktualizowano lot o id:LH 239'),(177,'Flights','root@172.18.0.1','2024-05-30 19:59:58','UPDATE','Zaktualizowano lot o id:W6 6021'),(178,'Flights','root@172.18.0.1','2024-05-30 20:00:07','UPDATE','Zaktualizowano lot o id:EJU 4668'),(179,'Flights','root@172.18.0.1','2024-05-30 20:00:07','UPDATE','Zaktualizowano lot o id:FL1'),(180,'Flights','root@172.18.0.1','2024-05-30 20:00:07','UPDATE','Zaktualizowano lot o id:FR 1902'),(181,'Flights','root@172.18.0.1','2024-05-30 20:00:07','UPDATE','Zaktualizowano lot o id:FR 3036'),(182,'Flights','root@172.18.0.1','2024-05-30 20:00:07','UPDATE','Zaktualizowano lot o id:KL 1996'),(183,'Flights','root@172.18.0.1','2024-05-30 20:00:07','UPDATE','Zaktualizowano lot o id:KL 1998'),(184,'Flights','root@172.18.0.1','2024-05-30 20:00:07','UPDATE','Zaktualizowano lot o id:LH 1623'),(185,'Flights','root@172.18.0.1','2024-05-30 20:00:07','UPDATE','Zaktualizowano lot o id:LH233'),(186,'Flights','root@172.18.0.1','2024-05-30 20:00:07','UPDATE','Zaktualizowano lot o id:W6 5047');
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
  `origin` varchar(45) NOT NULL,
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
INSERT INTO `Flights` VALUES ('EJU 4668','AIRBORNE','EasyJet','PARYŻ (CDG)','AirTrans (ATS)','2024-05-01 12:53:00','2024-05-01 10:51:00','ABC231'),('EJU 4670','SCHEDULED','EasyJet','AirTrans (ATS)','PARYŻ (CDG)','2024-05-02 16:50:00','2024-05-02 15:50:00','ABC231'),('FL1','TAKE OFF','LOT','WARSZAWA (WAW)','AirTrans (ATS)','2024-04-10 12:00:00','2024-04-10 10:00:00','ABC123'),('FL2','SCHEDULED','LOT','AirTrans (ATS)','WARSZAWA (WAW)','2024-04-11 12:00:00','2024-04-11 10:00:00','ABC123'),('FR 1902','AIRBORNE','Ryanair','DUBLIN (DUB)','AirTrans (ATS)','2024-05-01 17:30:00','2024-05-01 17:30:00','ABC236'),('FR 1913','SCHEDULED','Ryanair','AirTrans (ATS)','DUBLIN (DUB)','2024-05-02 17:30:00','2024-05-02 17:30:00','ABC236'),('FR 3036','SCHEDULED','Ryanair','BARCELONA (BCN)','AirTrans (ATS)','2024-05-02 01:25:00','2024-05-01 23:25:00','ABC235'),('FR 3037','SCHEDULED','Ryanair','AirTrans (ATS)','BARCELONA (BCN)','2024-05-02 17:25:00','2024-05-02 17:25:00','ABC235'),('KL 1996','AIRBORNE','KLM','AMSTERDAM (AMS)','AirTrans (ATS)','2024-05-10 09:00:00','2024-05-10 02:01:00','ABC233'),('KL 1998','AIRBORNE','KLM','FRANKFURT (FRA)','AirTrans (ATS)','2024-05-02 13:45:00','2024-05-02 11:40:00','ABC237'),('KL 2001','SCHEDULED','KLM','AirTrans (ATS)','FRANKFURT (FRA)','2024-05-02 17:45:00','2024-05-02 17:45:00','ABC237'),('KL 2005','SCHEDULED','KLM','AirTrans (ATS)','AMSTERDAM (AMS)','2024-05-21 17:00:00','2024-05-02 17:00:00','ABC233'),('LH 1623','AIRBORNE','Lufthansa','MONACHIUM (MUC)','AirTrans (ATS)','2024-05-01 17:20:00','2024-05-01 17:20:00','ABC234'),('LH 1647','SCHEDULED','Lufthansa','AirTrans (ATS)','MONACHIUM (MUC)','2024-05-02 17:20:00','2024-05-02 17:20:00','ABC234'),('LH 239','SCHEDULED','Lufthansa','AirTrans (ATS)','PARYŻ (CDG)','2024-04-12 18:25:00','2024-04-12 16:15:00','ABC231'),('LH233','WAITING','Lufthansa','BUDAPESZT (BUD)','AirTrans (ATS)','2024-04-12 18:25:00','2024-04-12 16:15:00','ABC231'),('W6 5047','AIRBORNE','WizzAir','BARCELONA (BCN)','AirTrans (ATS)','2024-05-01 16:40:00','2024-05-01 16:40:00','ABC232'),('W6 6021','SCHEDULED','WizzAir','AirTrans (ATS)','BARCELONA (BCN)','2024-05-02 16:40:00','2024-05-02 16:40:00','ABC232');
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `validate_new_flight` BEFORE INSERT ON `Flights` FOR EACH ROW BEGIN
    IF (validate_arrival_departure(NEW.arrival, NEW.departure) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Data przylotu jest przed dat� odlotu';
    END IF;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `validate_update_flight` BEFORE UPDATE ON `Flights` FOR EACH ROW BEGIN
    IF (validate_arrival_departure(NEW.arrival, NEW.departure) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Data przylotu jest przed dat� odlotu';
    END IF;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gates`
--

LOCK TABLES `Gates` WRITE;
/*!40000 ALTER TABLE `Gates` DISABLE KEYS */;
INSERT INTO `Gates` VALUES (1,'Gate 1','BUSY'),(2,'Gate 2','READY'),(3,'Gate 3','BUSY'),(4,'Gate4','CLOSED');
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
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Logowanie_log`
--

LOCK TABLES `Logowanie_log` WRITE;
/*!40000 ALTER TABLE `Logowanie_log` DISABLE KEYS */;
INSERT INTO `Logowanie_log` VALUES (1,NULL,'bartek.bednarek@onet.pl','2024-05-26 10:35:27','Nie udane logowanie o 2024-05-26 10:35:27'),(2,'Bartek','bartek.bednarek@onet.pl','2024-05-26 10:35:33','Udane logowanie Bartek o 2024-05-26 10:35:33'),(3,'Bartek','bartek.bednarek@onet.pl','2024-05-26 11:19:38','Udane logowanie Bartek o 2024-05-26 11:19:38'),(4,'jan','jan.kowal@onet.pl','2024-05-26 12:53:44','Udane logowanie jan o 2024-05-26 12:53:44'),(5,'Marek','bartek.bednarek1@onet.pl','2024-05-26 13:17:59','Udane logowanie Marek o 2024-05-26 13:17:59'),(6,NULL,'bartek.bednarek@onet.pl','2024-05-26 13:18:15','Nie udane logowanie o 2024-05-26 13:18:15'),(7,'Bartek','bartek.bednarek@onet.pl','2024-05-26 13:18:25','Udane logowanie Bartek o 2024-05-26 13:18:25'),(8,'Mikołaj','bartek.bednarek2@onet.pl','2024-05-26 13:24:53','Udane logowanie Mikołaj o 2024-05-26 13:24:53'),(9,'Bartek','bartek.bednarek3@onet.pl','2024-05-26 13:27:23','Udane logowanie Bartek o 2024-05-26 13:27:23'),(10,'Bartek','bartek.bednarek4@onet.pl','2024-05-26 13:32:06','Udane logowanie Bartek o 2024-05-26 13:32:06'),(11,'Bartek','bartek.bednarek@onet.pl','2024-05-26 13:32:46','Udane logowanie Bartek o 2024-05-26 13:32:46'),(12,'Daniel','bartek.bednarek5@onet.pl','2024-05-26 13:37:23','Udane logowanie Daniel o 2024-05-26 13:37:23'),(13,'Bartek','bartek.bednarek6@onet.pl','2024-05-26 13:38:56','Udana rejestracja nowego uzytkownika o imieniu Bartek o 2024-05-26 13:38:56'),(14,NULL,'bartek.bednarek@onet.pl','2024-05-26 13:39:17','Nie udana rejestracja o 2024-05-26 13:39:17'),(15,'Bartek','bartek.bednarek@onet.pl','2024-05-26 13:39:38','Udane logowanie Bartek o 2024-05-26 13:39:38'),(16,'Tomasz','bartek.bednarek1@onet.pl','2024-05-26 13:47:47','Udana rejestracja nowego uzytkownika o imieniu Tomasz o 2024-05-26 13:47:47'),(17,'Bartek','bartek.bednarek@onet.pl','2024-05-26 13:47:58','Udane logowanie Bartek o 2024-05-26 13:47:58'),(18,'jan','jan.kowal@onet.pl','2024-05-27 07:16:47','Udane logowanie jan o 2024-05-27 07:16:47'),(19,'roman','jjj@onet.pl','2024-05-27 07:29:08','Udane logowanie roman o 2024-05-27 07:29:08'),(20,'jan','jan.kowal@onet.pl','2024-05-27 08:13:41','Udane logowanie jan o 2024-05-27 08:13:41'),(21,'jan','jan.kowal@onet.pl','2024-05-27 08:15:32','Udane logowanie jan o 2024-05-27 08:15:32'),(22,'jan','jan.kowal@onet.pl','2024-05-27 08:26:00','Udane logowanie jan o 2024-05-27 08:26:00'),(23,'roman','jjj@onet.pl','2024-05-27 08:26:06','Udane logowanie roman o 2024-05-27 08:26:06'),(24,'jan','jan.kowal@onet.pl','2024-05-27 13:12:51','Udane logowanie jan o 2024-05-27 13:12:51'),(25,'jan','jan.kowal@onet.pl','2024-05-27 17:52:00','Udane logowanie jan o 2024-05-27 17:52:00'),(26,'Paweł','pawelporemba123@gmail.com','2024-05-27 17:52:21','Udana rejestracja nowego uzytkownika o imieniu Paweł o 2024-05-27 17:52:21'),(27,'jan','jan.kowal@onet.pl','2024-05-27 17:52:57','Udane logowanie jan o 2024-05-27 17:52:57'),(28,'jan','jan.kowal@onet.pl','2024-05-27 18:13:15','Udane logowanie jan o 2024-05-27 18:13:15'),(29,'roman','roman@onet.pl','2024-05-27 18:41:08','Udana rejestracja nowego uzytkownika o imieniu roman o 2024-05-27 18:41:08'),(30,'roman','roman@onet.pl','2024-05-27 18:41:15','Udane logowanie roman o 2024-05-27 18:41:15'),(31,'jan','jan.kowal@onet.pl','2024-05-27 18:41:30','Udane logowanie jan o 2024-05-27 18:41:30'),(32,'jan','jan.kowal@onet.pl','2024-05-27 18:41:38','Udane logowanie jan o 2024-05-27 18:41:38'),(33,'Paweł','pawelporemba123@gmail.com','2024-05-27 18:46:20','Udane logowanie Paweł o 2024-05-27 18:46:20'),(34,'jan','jan.kowal@onet.pl','2024-05-27 18:49:11','Udane logowanie jan o 2024-05-27 18:49:11'),(35,'Paweł','pawelporemba123@gmail.com','2024-05-27 19:33:02','Udane logowanie Paweł o 2024-05-27 19:33:02'),(36,'jan','jan.kowal@onet.pl','2024-05-27 19:39:28','Udane logowanie jan o 2024-05-27 19:39:28'),(37,'jan','jan.kowal@onet.pl','2024-05-27 19:45:58','Udane logowanie jan o 2024-05-27 19:45:58'),(38,'jan','jan.kowal@onet.pl','2024-05-27 19:51:37','Udane logowanie jan o 2024-05-27 19:51:37'),(39,'Paweł','pawelporemba123@gmail.com','2024-05-27 20:05:38','Udane logowanie Paweł o 2024-05-27 20:05:38'),(40,'jan','jan.kowal@onet.pl','2024-05-27 20:06:01','Udane logowanie jan o 2024-05-27 20:06:01'),(41,'Paweł','pawelporemba123@gmail.com','2024-05-27 20:06:45','Udane logowanie Paweł o 2024-05-27 20:06:45'),(42,'jan','jan.kowal@onet.pl','2024-05-27 20:25:39','Udane logowanie jan o 2024-05-27 20:25:39'),(43,'Paweł','pawelporemba123@gmail.com','2024-05-28 00:30:13','Udane logowanie Paweł o 2024-05-28 00:30:13'),(44,'Paweł','pawelporemba123@gmail.com','2024-05-28 00:32:48','Udane logowanie Paweł o 2024-05-28 00:32:48'),(45,'Paweł','pawelporemba123@gmail.com','2024-05-28 00:33:04','Udane logowanie Paweł o 2024-05-28 00:33:04'),(46,'Paweł','pawelporemba123@gmail.com','2024-05-28 00:33:29','Udane logowanie Paweł o 2024-05-28 00:33:29'),(47,'jan','jan.kowal@onet.pl','2024-05-28 00:35:00','Udane logowanie jan o 2024-05-28 00:35:00'),(48,'Paweł','pawelporemba123@gmail.com','2024-05-28 07:39:15','Udane logowanie Paweł o 2024-05-28 07:39:15'),(49,'jan','jan.kowal@onet.pl','2024-05-28 07:39:32','Udane logowanie jan o 2024-05-28 07:39:32'),(50,'Paweł','pawelporemba123@gmail.com','2024-05-28 07:39:57','Udane logowanie Paweł o 2024-05-28 07:39:57'),(51,'Paweł','pawelporemba123@gmail.com','2024-05-30 08:23:00','Udane logowanie Paweł o 2024-05-30 08:23:00'),(52,'Paweł','pawelporemba123@gmail.com','2024-05-30 09:16:04','Udane logowanie Paweł o 2024-05-30 09:16:04'),(53,'jan','jan.kowal@onet.pl','2024-05-30 09:16:25','Udane logowanie jan o 2024-05-30 09:16:25'),(54,NULL,'jan.kowal2@onet.pl','2024-05-30 09:26:11','Nie udane logowanie o 2024-05-30 09:26:11'),(55,'Jan','jan.kowalski@onet.pl','2024-05-30 09:26:15','Udane logowanie Jan o 2024-05-30 09:26:15'),(56,'Paweł','pawelporemba123@gmail.com','2024-05-30 09:37:30','Udane logowanie Paweł o 2024-05-30 09:37:30'),(57,'jan','jan.kowal@onet.pl','2024-05-30 09:37:56','Udane logowanie jan o 2024-05-30 09:37:56'),(58,'jan','jan.kowal@onet.pl','2024-05-30 09:38:26','Udane logowanie jan o 2024-05-30 09:38:26'),(59,'Paweł','pawelporemba123@gmail.com','2024-05-30 09:38:45','Udane logowanie Paweł o 2024-05-30 09:38:45'),(60,'jan','jan.kowal@onet.pl','2024-05-30 11:59:03','Udane logowanie jan o 2024-05-30 11:59:03'),(61,'Paweł','pawelporemba123@gmail.com','2024-05-30 13:18:36','Udane logowanie Paweł o 2024-05-30 13:18:36'),(62,'Paweł','pawelporemba123@gmail.com','2024-05-30 13:44:12','Udane logowanie Paweł o 2024-05-30 13:44:12'),(63,'jan','jan.kowal@onet.pl','2024-05-30 13:44:20','Udane logowanie jan o 2024-05-30 13:44:20'),(64,'Paweł','pawelporemba123@gmail.com','2024-05-30 13:50:14','Udane logowanie Paweł o 2024-05-30 13:50:14'),(65,'jan','jan.kowal@onet.pl','2024-05-30 13:50:48','Udane logowanie jan o 2024-05-30 13:50:48'),(66,'Paweł','pawelporemba123@gmail.com','2024-05-30 13:51:19','Udane logowanie Paweł o 2024-05-30 13:51:19'),(67,'jan','jan.kowal@onet.pl','2024-05-30 17:55:40','Udane logowanie jan o 2024-05-30 17:55:40'),(68,'jan','jan.kowal@onet.pl','2024-05-30 18:40:05','Udane logowanie jan o 2024-05-30 18:40:05'),(69,'Paweł','pawelporemba123@gmail.com','2024-05-30 18:40:10','Udane logowanie Paweł o 2024-05-30 18:40:10'),(70,'Paweł','pawelporemba123@gmail.com','2024-05-30 19:09:35','Udane logowanie Paweł o 2024-05-30 19:09:35'),(71,'jan','jan.kowal@onet.pl','2024-05-30 19:09:50','Udane logowanie jan o 2024-05-30 19:09:50');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Parking_reservations`
--

LOCK TABLES `Parking_reservations` WRITE;
/*!40000 ALTER TABLE `Parking_reservations` DISABLE KEYS */;
INSERT INTO `Parking_reservations` VALUES (1,'A','101','2024-04-10 08:00:00','2024-05-12 08:00:00','','2024-05-08 20:52:31','PENDING',6);
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rentals`
--

LOCK TABLES `Rentals` WRITE;
/*!40000 ALTER TABLE `Rentals` DISABLE KEYS */;
INSERT INTO `Rentals` VALUES (1,'2024-05-08 20:30:53','2024-08-12 09:00:00','RENTED','2024-05-08 20:49:20',NULL,1,6);
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
  `update_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `class` varchar(15) NOT NULL,
  `seat_number` varchar(8) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `status` enum('PURCHASED','EXPIRED','USED','REFUNDED','CANCELLED') NOT NULL DEFAULT 'PURCHASED',
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
INSERT INTO `Tickets` VALUES (1,'2024-05-20 23:31:30','2024-05-30 22:32:50','Biznes','2',2800.00,'CANCELLED',7,'LH 1623',2),(2,'2024-05-20 23:32:35','2024-06-02 15:00:00','EKONOMICZNY','97',1500.00,'PURCHASED',9,'FR 1913',4),(23,'2024-04-10 10:00:00','2024-04-10 12:00:00','EKONOMICZNY','15',1800.00,'USED',6,'FL1',1);
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `tickets_before_insert` BEFORE INSERT ON `Tickets` FOR EACH ROW BEGIN
    IF NEW.status != 'PURCHASED'  THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Bilet musi by� najpierw zakupiony';
    END IF;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`%`*/ /*!50003 TRIGGER `tickets_before_update` BEFORE UPDATE ON `Tickets` FOR EACH ROW BEGIN
    IF NEW.status = "REFUNDED" AND NOW() > OLD.purchase_time THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Bilet nie mo�e by� zwr�cony po czasie 24h od zakupu';
    END IF;

    IF OLD.status = NEW.status THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Nie mo�na zmieni� statusu biletu na ten sam';
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES (6,'jan.kowal2@onet.pl','$2a$10$v6sgpqM5aauH5N9aGGLHVeewlRnf1/pZzpVSo2UAxbFamSx5NVaxO','2024-05-08 16:52:59','jan','kowalski',NULL,NULL,NULL,NULL,NULL,'$2a$10$v6sgpqM5aauH5N9aGGLHVe'),(7,'jan.kowal@onet.pl','$2a$10$bNwJ3hT6ZFAL5H5LPEx8I.t24Av76UoU7F9VWVoaJj4uosPjW51FW','2024-05-08 16:52:59','jan','kowalski','+48 123 456 789','ul. Królowej Jadwigi 65, Nowy Sącz','M','2001-06-18','1716746637705543257096.png','$2a$10$bNwJ3hT6ZFAL5H5LPEx8I.'),(9,'jan.kowalski@onet.pl','$2a$10$2uBK7gPNyDh1L4LfXVJcwe7InFeykwF3u8U2Ed/MZ5CctK25R3iEO','2024-05-11 18:07:28','Jan','Kowalski','123456789','ul. Krakowska 85b','M','1997-03-12',NULL,'$2a$10$2uBK7gPNyDh1L4LfXVJcwe'),(11,'jjj@onet.pl','$2a$10$pYMFP7/oqQFaD9ZxDp2ngeUpN5X/HSo1OOb13/bIPz0bcaFq/6YTu','2024-05-26 18:35:58','roman','nowak','sdsdsd','','M','2024-05-29',NULL,'$2a$10$pYMFP7/oqQFaD9ZxDp2nge'),(12,'pawelporemba123@gmail.com','$2a$10$x9Fgy1Q/80eYekTYzWC6YeAup3PkJFz8l..H4szkEAbHp7OLGHSXq','2024-05-27 17:52:21','Paweł','Poremba','','','M','2002-12-27','1717061977836244644101.png','$2a$10$x9Fgy1Q/80eYekTYzWC6Ye'),(13,'roman@onet.pl','$2a$10$l1wFoUsYBwgNsClm4bWMHuJKcL7hcF.L7dtIa62AoOaiFFR9bo4jq','2024-05-27 18:41:08','roman','nowak',NULL,NULL,NULL,NULL,NULL,'$2a$10$l1wFoUsYBwgNsClm4bWMHu');
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
-- Dumping routines for database 'AirTrans'
--
/*!50003 DROP FUNCTION IF EXISTS `validate_airplane_fuel` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `validate_airplane_fuel`(fuel_tank DECIMAL(10,2), fuel_quantity DECIMAL(10,2)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF fuel_quantity > fuel_tank THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Airplanes', USER(), 'INSERT', 'Ilo�� paliwa przekracza pojemno�� zbiornika');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `validate_arrival_departure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `validate_arrival_departure`(arrival DATETIME, departure DATETIME) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF departure > arrival THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Flights', USER(), 'INSERT', 'Data przylotu jest przed dat� odlotu');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `validate_birth_date` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `validate_birth_date`(birth_date DATE) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF (birth_date < '1900-01-01' OR birth_date > CURRENT_DATE()) THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Users', USER(), 'INSERT', 'Niepoprawna data urodzenia');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `validate_email` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `validate_email`(email VARCHAR(255)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF (email IS NULL OR email NOT REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Users', USER(), 'INSERT', 'Niepoprawny adres email');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `validate_password` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `validate_password`(password VARCHAR(255)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF (password IS NULL OR LENGTH(password) < 3) THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Users', USER(), 'INSERT', 'Has�o jest za kr�tkie');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `validate_phone_number` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `validate_phone_number`(phone_number VARCHAR(255)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    SET phone_number = REPLACE(phone_number, ' ', '');

    IF phone_number NOT REGEXP '^[\+]?[0-9]{9,15}$' THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Users', USER(), 'INSERT', 'Niepoprawny numer telefonu');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Logowanie` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Logowanie`(IN p_first_name VARCHAR(255), IN p_email VARCHAR(255), IN p_login_successful BOOLEAN)
BEGIN
    DECLARE p_log_details TEXT;

    IF p_login_successful THEN
        SET p_log_details = CONCAT('Udane logowanie ', p_first_name, ' o ', NOW());
    ELSE
        SET p_log_details = CONCAT('Nie udane logowanie o ', NOW());
    END IF;

    INSERT INTO Logowanie_log(first_name, email, login_date, login_details)
    VALUES (p_first_name, p_email, NOW(), p_log_details);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Rejestracja` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Rejestracja`(
    IN p_first_name VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_registration_successful BOOLEAN
)
BEGIN
    DECLARE p_log_details TEXT;

    IF p_registration_successful THEN
        SET p_log_details = CONCAT('Udana rejestracja nowego uzytkownika o imieniu ', p_first_name, ' o ', NOW());
    ELSE
        SET p_log_details = CONCAT('Nie udana rejestracja o ', NOW());
    END IF;

    INSERT INTO Logowanie_log(first_name, email, login_date, login_details)
    VALUES (p_first_name, p_email, NOW(), p_log_details);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `validate_user_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = cp852 */ ;
/*!50003 SET character_set_results = cp852 */ ;
/*!50003 SET collation_connection  = cp852_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `validate_user_data`(IN email VARCHAR(255), IN phone_number VARCHAR(255), IN birth_date DATE, IN password VARCHAR(255))
BEGIN
    IF (validate_email(email) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Niepoprawny adres email';
    END IF;

    IF (LENGTH(phone_number) > 0 AND validate_phone_number(phone_number) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Niepoprawny numer telefonu';
    END IF;

    IF (LENGTH(birth_date) > 0 AND validate_birth_date(birth_date) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Niepoprawna data urodzenia';
    END IF;
    
    IF (validate_password(password) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Has�o jest za kr�tkie';
    END IF;
END ;;
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
/*!50001 VIEW `Departures` AS select `Flights`.`id` AS `id`,`Flights`.`status` AS `status`,`Flights`.`airline_name` AS `airline_name`,`Flights`.`destination` AS `destination`,`Flights`.`origin` AS `origin`,`Flights`.`arrival` AS `arrival`,`Flights`.`departure` AS `departure`,`Flights`.`airplane_serial_no` AS `airplane_serial_no`,if((`Flights`.`destination` = (select `Contact_info`.`name` from `Contact_info`)),0,1) AS `is_departure` from `Flights` */;
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

-- Dump completed on 2024-05-31  0:54:27
