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
-- Table structure for table `Airplane`
--

DROP TABLE IF EXISTS `Airplane`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Airplane` (
  `Serial_no` varchar(25) NOT NULL,
  `Model` varchar(25) NOT NULL,
  `Type` varchar(25) NOT NULL,
  `Production_year` year NOT NULL,
  `Num_of_seats` int NOT NULL,
  `Fuel_tank` float NOT NULL,
  `Fuel_quant` float NOT NULL,
  `Crew_size` int NOT NULL,
  `Max_cargo` float NOT NULL,
  PRIMARY KEY (`Serial_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Airplane`
--

LOCK TABLES `Airplane` WRITE;
/*!40000 ALTER TABLE `Airplane` DISABLE KEYS */;
INSERT INTO `Airplane` VALUES ('ABC123','787 Dreamliner','Passenger',2018,350,80000,30000,3,150000);
/*!40000 ALTER TABLE `Airplane` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Announcements`
--

DROP TABLE IF EXISTS `Announcements`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Announcements` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Title` varchar(45) NOT NULL,
  `Content` text NOT NULL,
  `Valid_until` datetime NOT NULL,
  `Personnel_id` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Personnel_id_announcements` (`Personnel_id`),
  CONSTRAINT `fk_Personnel_id_announcements` FOREIGN KEY (`Personnel_id`) REFERENCES `Personnel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Announcements`
--

LOCK TABLES `Announcements` WRITE;
/*!40000 ALTER TABLE `Announcements` DISABLE KEYS */;
INSERT INTO `Announcements` VALUES (1,'Nowe zasady bezpieczeÅ„stwa','Informujemy, Å¼e wprowadziliÅ›my nowe zasady bezpieczeÅ„stwa na lotnisku. Prosimy o zapoznanie siÄ™ z nimi.','2024-04-30 23:59:59',1);
/*!40000 ALTER TABLE `Announcements` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Apron`
--

DROP TABLE IF EXISTS `Apron`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Apron` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Is_available` varchar(8) NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  CONSTRAINT `fk_Flight_id_apron` FOREIGN KEY (`Flight_id`) REFERENCES `Flight` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Apron`
--

LOCK TABLES `Apron` WRITE;
/*!40000 ALTER TABLE `Apron` DISABLE KEYS */;
INSERT INTO `Apron` VALUES (1,'Wolny','FL1');
/*!40000 ALTER TABLE `Apron` ENABLE KEYS */;
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
  `Path_to_img` varchar(45) NOT NULL,
  `Fuel_type` varchar(45) NOT NULL,
  `Transmission_type` varchar(45) NOT NULL,
  `Rentals_id` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Rentals_id_cars` (`Rentals_id`),
  CONSTRAINT `fk_Rentals_id_cars` FOREIGN KEY (`Rentals_id`) REFERENCES `Rentals` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Cars`
--

LOCK TABLES `Cars` WRITE;
/*!40000 ALTER TABLE `Cars` DISABLE KEYS */;
INSERT INTO `Cars` VALUES (1,'Mercedes','AMG',2020,'ABC123',50,'AMGMercedes.jpg','Benzyna','Automatyczna',1);
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Client`
--

LOCK TABLES `Client` WRITE;
/*!40000 ALTER TABLE `Client` DISABLE KEYS */;
INSERT INTO `Client` VALUES (1,'Jan','Kowalski','1990-05-15','M',123456789,'ul. Kwiatowa 10','12-345','jan.kowalski','haslo123','jan.kowalski@onet.com','j\nan_kowalski.jpg',NULL),(2,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'bb11970','bartek','bartek.bednarek@onet.pl',NULL,NULL),(9,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'happy','$2a$10$9LKaYQbDKKPXj0kDNHf3gOBkKMDFKUkyHFYZRPxp5c0pJ4pVnfiwC','bartek.bednarek@onet.pl1',NULL,NULL),(10,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'bb119701','$2a$10$ZY47p6CGU6dZ4KLPq5uorOPzbNwzdtiTbHwnYvWZkDVfTrOlw66.q','bartek.bednarek@onet.lo',NULL,NULL),(11,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'bartek11','$2a$10$DWSQ.98jHuvK3/4w.YrXR.qGkMdG95MMVRkn7CM6Ap.TIhSgvV3Uy','bartek.bednarek@onet.l1',NULL,NULL),(12,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'bbbbb','$2a$10$fA3fOmP8fXxB09U8U5yRGeFFh6m01a7TDDI.7O32e7WzyUsVtKNmC','bartek.bednarek@on.pl',NULL,NULL),(13,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'bbbbbbb','$2a$10$TfleoZo6G/gR6QzXYQ0AQumS5GKCDNuXMYLnnMtCCrsTb8rorhxXy','bartek.bednarek@one.pl',NULL,NULL),(14,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'bb1197011','$2a$10$9pdI7R1Kaxo.FZGwr3FGOuAliN3Wrqh2B4dVROTNBhjMw54BAGd0O','bartek.bednarek@1onet.pl',NULL,NULL),(15,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'dad1','$2a$10$PpJ5C5kmIK8fRiE0sd5XTeL2iR0XqbGdSkwcROXnrStGRBm4PEfhi','kolorowy.majtek@op.pl12',NULL,NULL),(16,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'badba','$2a$10$55rwy2hKfCpdYkJ0f9QK1uX8rJwxMiAyc8JSsLbdutLRIwjPC5ybS','kolorowy.majtek@op.pl11',NULL,'$2a$10$55rwy2hKfCpdYkJ0f9QK1u'),(17,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'ssasd','$2a$10$cRHdd.RFpJUrYi/SIJZLMO2jsQZ/gOjcfvvmKXFUOUsfEbmkFDLR6','kolorowy.majtek@op.pl22',NULL,'$2a$10$cRHdd.RFpJUrYi/SIJZLMO'),(18,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'alaa','$2a$10$VXfDNyrqcAujVzHgujtdXe6iG5anoJdY6DaKKd6wr029QhJPYyesi','kolorowy.majtek@op.pl33',NULL,'$2a$10$VXfDNyrqcAujVzHgujtdXe'),(19,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'ajaja','$2a$10$uihCC13EfkVUl7SyFXvVsunRgSFmSVMbqgVu5OGIvr2rWNMdbJ.le','kolorowy.majtek@op.pl44',NULL,'$2a$10$uihCC13EfkVUl7SyFXvVsu'),(20,'Bartek','Bednarek',NULL,NULL,NULL,NULL,NULL,'ahaja','$2a$10$BIQD/3fTqEFuhjaFWC4fo.DSOl/1zbLncEwjtRHQoigLnzQG6JXOC','kolorowy.majtek@op.pl55',NULL,'$2a$10$BIQD/3fTqEFuhjaFWC4fo.');
/*!40000 ALTER TABLE `Client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Equipment`
--

DROP TABLE IF EXISTS `Equipment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Equipment` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(45) NOT NULL,
  `Type` varchar(45) NOT NULL,
  `Serial_no` varchar(45) NOT NULL,
  `Location` varchar(45) NOT NULL,
  `Personel_id` int NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `fk_Personel_id` (`Personel_id`),
  CONSTRAINT `fk_Personel_id` FOREIGN KEY (`Personel_id`) REFERENCES `Personnel` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Equipment`
--

LOCK TABLES `Equipment` WRITE;
/*!40000 ALTER TABLE `Equipment` DISABLE KEYS */;
INSERT INTO `Equipment` VALUES (1,'Laptop','Komputer przenoÅ›ny','ABC123','Biuro',1);
/*!40000 ALTER TABLE `Equipment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Flight`
--

DROP TABLE IF EXISTS `Flight`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Flight` (
  `id` varchar(10) NOT NULL,
  `Status` varchar(25) NOT NULL,
  `Airline_name` varchar(25) NOT NULL,
  `Destination` varchar(45) NOT NULL,
  `Arrival` datetime NOT NULL,
  `Departure` datetime NOT NULL,
  `Radar_id` int NOT NULL,
  `Airplane_serial_no` varchar(25) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Airplane_serial_no` (`Airplane_serial_no`),
  KEY `fk_Radar_id` (`Radar_id`),
  CONSTRAINT `fk_Airplane_serial_no` FOREIGN KEY (`Airplane_serial_no`) REFERENCES `Airplane` (`Serial_no`),
  CONSTRAINT `fk_Radar_id` FOREIGN KEY (`Radar_id`) REFERENCES `Radar` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Flight`
--

LOCK TABLES `Flight` WRITE;
/*!40000 ALTER TABLE `Flight` DISABLE KEYS */;
INSERT INTO `Flight` VALUES ('FL1','STARTUJE','LOT','Warszawa','2024-04-10 12:00:00','2024-04-10 10:00:00',1,'ABC123');
/*!40000 ALTER TABLE `Flight` ENABLE KEYS */;
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
  `Ticket_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Ticket_id` (`Ticket_id`),
  CONSTRAINT `fk_ticket_id` FOREIGN KEY (`Ticket_id`) REFERENCES `Tickets` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Gates`
--

LOCK TABLES `Gates` WRITE;
/*!40000 ALTER TABLE `Gates` DISABLE KEYS */;
INSERT INTO `Gates` VALUES (1,'Gate 1','Open',1);
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
INSERT INTO `Luggage` VALUES (1,'Walizka','Åšrednia',15.5,1);
/*!40000 ALTER TABLE `Luggage` ENABLE KEYS */;
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
-- Table structure for table `Personnel`
--

DROP TABLE IF EXISTS `Personnel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Personnel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `position` varchar(45) NOT NULL,
  `permissions` varchar(45) NOT NULL,
  `login` varchar(45) NOT NULL,
  `password` longtext NOT NULL,
  `path_to_avatar` varchar(45) NOT NULL,
  `Gates_id` int NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_gates_id` (`Gates_id`),
  KEY `fk_Flight_id` (`Flight_id`),
  CONSTRAINT `fk_Flight_id` FOREIGN KEY (`Flight_id`) REFERENCES `Flight` (`id`),
  CONSTRAINT `fk_gates_id` FOREIGN KEY (`Gates_id`) REFERENCES `Gates` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Personnel`
--

LOCK TABLES `Personnel` WRITE;
/*!40000 ALTER TABLE `Personnel` DISABLE KEYS */;
INSERT INTO `Personnel` VALUES (1,'Jan','Nowak','Pracownik lotniska','Administrator','jan.nowak','haslo123','jan_nowak.jpg',1,'FL1');
/*!40000 ALTER TABLE `Personnel` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Radar`
--

DROP TABLE IF EXISTS `Radar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Radar` (
  `id` int NOT NULL AUTO_INCREMENT,
  `Altitude` float NOT NULL,
  `Track` int NOT NULL,
  `Ground_speed` int NOT NULL,
  `Latitude` float NOT NULL,
  `Longitude` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Radar`
--

LOCK TABLES `Radar` WRITE;
/*!40000 ALTER TABLE `Radar` DISABLE KEYS */;
INSERT INTO `Radar` VALUES (1,10000.5,135,450,52.2297,21.0122);
/*!40000 ALTER TABLE `Radar` ENABLE KEYS */;
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
  PRIMARY KEY (`Id`),
  UNIQUE KEY `uc_Client_id` (`Client_id`),
  CONSTRAINT `fk_Client_id_Rentals` FOREIGN KEY (`Client_id`) REFERENCES `Client` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rentals`
--

LOCK TABLES `Rentals` WRITE;
/*!40000 ALTER TABLE `Rentals` DISABLE KEYS */;
INSERT INTO `Rentals` VALUES (1,'2024-04-10 09:00:00','2024-08-12 09:00:00','Zarezerwowany',1);
/*!40000 ALTER TABLE `Rentals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Runway`
--

DROP TABLE IF EXISTS `Runway`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Runway` (
  `Id` varchar(8) NOT NULL,
  `Length` float NOT NULL,
  `Is_available` tinyint NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  CONSTRAINT `fk_Flight_id_runway` FOREIGN KEY (`Flight_id`) REFERENCES `Flight` (`id`)
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
  `Id` varchar(8) NOT NULL,
  `Is_available` tinyint NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  CONSTRAINT `fk_Flight_id_taxiway` FOREIGN KEY (`Flight_id`) REFERENCES `Flight` (`id`)
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
-- Table structure for table `Tickets`
--

DROP TABLE IF EXISTS `Tickets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Tickets` (
  `id` int NOT NULL AUTO_INCREMENT,
  `purchase_date` datetime NOT NULL,
  `expiry_date` datetime NOT NULL,
  `ticket_class` varchar(15) NOT NULL,
  `seat_no` int NOT NULL,
  `status` varchar(15) NOT NULL,
  `Client_id` int NOT NULL,
  `Flight_id` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uc_Flight_id` (`Flight_id`),
  KEY `fk_Client_id` (`Client_id`),
  CONSTRAINT `fk_Client_id` FOREIGN KEY (`Client_id`) REFERENCES `Client` (`Id`),
  CONSTRAINT `fk_Flight_id_tickets` FOREIGN KEY (`Flight_id`) REFERENCES `Flight` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Tickets`
--

LOCK TABLES `Tickets` WRITE;
/*!40000 ALTER TABLE `Tickets` DISABLE KEYS */;
INSERT INTO `Tickets` VALUES (1,'2024-04-10 10:00:00','2024-04-10 12:00:00','Ekonomiczna',15,'Potwierdzony',1,'FL1');
/*!40000 ALTER TABLE `Tickets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `airplanes`
--

DROP TABLE IF EXISTS `airplanes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `airplanes` (
  `Serial_no` varchar(255) NOT NULL,
  `Model` varchar(255) DEFAULT NULL,
  `Type` varchar(255) DEFAULT NULL,
  `Production_year` int DEFAULT NULL,
  `Num_of_seats` int DEFAULT NULL,
  `Fuel_tank` float DEFAULT NULL,
  `Fuel_quant` float DEFAULT NULL,
  `Crew_size` int DEFAULT NULL,
  `Max_cargo` float DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`Serial_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `airplanes`
--

LOCK TABLES `airplanes` WRITE;
/*!40000 ALTER TABLE `airplanes` DISABLE KEYS */;
/*!40000 ALTER TABLE `airplanes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-23  7:18:08
