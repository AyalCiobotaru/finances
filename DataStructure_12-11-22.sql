CREATE DATABASE  IF NOT EXISTS `myServer` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `myServer`;
-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: myServer
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `id` varchar(255) NOT NULL,
  `balance` decimal(19,2) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `rollover` decimal(19,2) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `parent_id` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKsx8nx0ugqfe6y25297f2ge0r0` (`parent_id`),
  CONSTRAINT `FKsx8nx0ugqfe6y25297f2ge0r0` FOREIGN KEY (`parent_id`) REFERENCES `parent_category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('de3f7e05-7951-11ed-ab90-0242c0a8f002',0.00,'Citi Double Cash Back',-72.05,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de424e35-7951-11ed-ab90-0242c0a8f002',0.00,'Discover It Credit Card',-242.07,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de43a41e-7951-11ed-ab90-0242c0a8f002',0.00,'Capital One Savor',-453.50,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de449030-7951-11ed-ab90-0242c0a8f002',0.00,'AMEX Blue Cash',-148.87,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de45c419-7951-11ed-ab90-0242c0a8f002',0.00,'BofA Cash Card',-2572.21,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de46bd6c-7951-11ed-ab90-0242c0a8f002',0.00,'Amazon Store Card',20.66,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de48f6cd-7951-11ed-ab90-0242c0a8f002',0.00,'Chase Sapphire',0.00,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de4a94ad-7951-11ed-ab90-0242c0a8f002',0.00,'TD Cash Card',0.00,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de4cc991-7951-11ed-ab90-0242c0a8f002',0.00,'Apple Card',0.00,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de4dc9fc-7951-11ed-ab90-0242c0a8f002',0.00,'Capital One Quicksilver',0.00,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de4f3caf-7951-11ed-ab90-0242c0a8f002',0.00,'TJX Rewards Card',0.00,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de5152a4-7951-11ed-ab90-0242c0a8f002',0.00,'Costco Citi Card',487.85,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de531cbd-7951-11ed-ab90-0242c0a8f002',0.00,'Costco Citi - Syd',0.00,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de553375-7951-11ed-ab90-0242c0a8f002',0.00,'Venmo',280.54,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de57c631-7951-11ed-ab90-0242c0a8f002',0.00,'SquareCash',206.25,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de5951ed-7951-11ed-ab90-0242c0a8f002',0.00,'Cashback - Citi',378.73,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de5b1a0d-7951-11ed-ab90-0242c0a8f002',0.00,'Cashback - Discover',143.52,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de5e2843-7951-11ed-ab90-0242c0a8f002',0.00,'Cashback - Savor',260.98,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de5fd72b-7951-11ed-ab90-0242c0a8f002',0.00,'Cashback - AMEX',185.08,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de612146-7951-11ed-ab90-0242c0a8f002',0.00,'Cashback - TD',0.00,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de6289b3-7951-11ed-ab90-0242c0a8f002',0.00,'Cashback - Amazon Card',121.94,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de63a776-7951-11ed-ab90-0242c0a8f002',0.00,'Cashback - B of A',416.93,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de64ee97-7951-11ed-ab90-0242c0a8f002',0.00,'Cashback - Citi Costco',0.00,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de66d5c3-7951-11ed-ab90-0242c0a8f002',0.00,'Paypal',0.00,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de687369-7951-11ed-ab90-0242c0a8f002',0.00,'Vanguard',20000.00,'Actual','de2fb959-7951-11ed-ab90-0242c0a8f002'),('de69df9b-7951-11ed-ab90-0242c0a8f002',0.00,'TD Bank',1318.36,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de6b0798-7951-11ed-ab90-0242c0a8f002',0.00,'Treasury Direct',0.00,'Actual','de2fb959-7951-11ed-ab90-0242c0a8f002'),('de703d7a-7951-11ed-ab90-0242c0a8f002',0.00,'Tower FCU Checking',562.61,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de733d47-7951-11ed-ab90-0242c0a8f002',0.00,'Tower FCU Savings',55.34,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de75ba76-7951-11ed-ab90-0242c0a8f002',0.00,'Capital One Checking',5624.03,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de7924df-7951-11ed-ab90-0242c0a8f002',0.00,'Capital One Savings',42432.20,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de7b22d9-7951-11ed-ab90-0242c0a8f002',0.00,'HSA',0.00,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de7e483b-7951-11ed-ab90-0242c0a8f002',0.00,'401k',21337.96,'Actual','de2fb959-7951-11ed-ab90-0242c0a8f002'),('de80eb27-7951-11ed-ab90-0242c0a8f002',0.00,'401k - Syd',18231.53,'Actual','de2fb959-7951-11ed-ab90-0242c0a8f002'),('de82fd71-7951-11ed-ab90-0242c0a8f002',0.00,'HSA',3580.90,'Actual','de2d5abf-7951-11ed-ab90-0242c0a8f002'),('de84aa0b-7951-11ed-ab90-0242c0a8f002',0.00,'Chase Sapphire - Syd',0.00,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de87b775-7951-11ed-ab90-0242c0a8f002',0.00,'Chase Sapphire',NULL,'Actual','de27c480-7951-11ed-ab90-0242c0a8f002'),('de8a9a53-7951-11ed-ab90-0242c0a8f002',0.00,'Groceries',NULL,'Paper','de30f273-7951-11ed-ab90-0242c0a8f002'),('de8d2574-7951-11ed-ab90-0242c0a8f002',0.00,'Dry cleaning',NULL,'Paper','de30f273-7951-11ed-ab90-0242c0a8f002'),('de8fc9ab-7951-11ed-ab90-0242c0a8f002',0.00,'Dining Out',NULL,'Paper','de30f273-7951-11ed-ab90-0242c0a8f002'),('de92acd8-7951-11ed-ab90-0242c0a8f002',0.00,'Delivery/ Carry-Out',NULL,'Paper','de30f273-7951-11ed-ab90-0242c0a8f002'),('de94a511-7951-11ed-ab90-0242c0a8f002',0.00,'Snacks',NULL,'Paper','de30f273-7951-11ed-ab90-0242c0a8f002'),('de976526-7951-11ed-ab90-0242c0a8f002',0.00,'Coffee Shops',NULL,'Paper','de30f273-7951-11ed-ab90-0242c0a8f002'),('de9aa34b-7951-11ed-ab90-0242c0a8f002',0.00,'Camper',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('de9d7934-7951-11ed-ab90-0242c0a8f002',0.00,'Camping',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('de9fa9ae-7951-11ed-ab90-0242c0a8f002',0.00,'Movies/plays',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('dea31f93-7951-11ed-ab90-0242c0a8f002',0.00,'Concerts/clubs',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('dea617c2-7951-11ed-ab90-0242c0a8f002',0.00,'Massage',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('dea9ff5c-7951-11ed-ab90-0242c0a8f002',0.00,'Electronics',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('deac73c8-7951-11ed-ab90-0242c0a8f002',0.00,'Activities',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('dead8c26-7951-11ed-ab90-0242c0a8f002',0.00,'Alcohol/Bars',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('deafaa6c-7951-11ed-ab90-0242c0a8f002',0.00,'Volleyball',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('deb253bf-7951-11ed-ab90-0242c0a8f002',0.00,'D&D',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('deb52036-7951-11ed-ab90-0242c0a8f002',0.00,'Crafts',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('deb88b9f-7951-11ed-ab90-0242c0a8f002',0.00,'Wedding',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('deba3234-7951-11ed-ab90-0242c0a8f002',0.00,'Nail Salon',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('debb6efc-7951-11ed-ab90-0242c0a8f002',0.00,'Movie Rentals',NULL,'Paper','de31f785-7951-11ed-ab90-0242c0a8f002'),('debce5b1-7951-11ed-ab90-0242c0a8f002',0.00,'Doctor Visit',NULL,'Paper','de32f52e-7951-11ed-ab90-0242c0a8f002'),('debe1ab7-7951-11ed-ab90-0242c0a8f002',0.00,'Nutritional Items',NULL,'Paper','de32f52e-7951-11ed-ab90-0242c0a8f002'),('debfaedf-7951-11ed-ab90-0242c0a8f002',0.00,'Cleaning Service',NULL,'Paper','de32f52e-7951-11ed-ab90-0242c0a8f002'),('dec1d088-7951-11ed-ab90-0242c0a8f002',0.00,'Pharmacy',NULL,'Paper','de32f52e-7951-11ed-ab90-0242c0a8f002'),('dec38b4c-7951-11ed-ab90-0242c0a8f002',0.00,'Health',NULL,'Paper','de32f52e-7951-11ed-ab90-0242c0a8f002'),('dec55d2a-7951-11ed-ab90-0242c0a8f002',0.00,'CACI',NULL,'Income','de344c98-7951-11ed-ab90-0242c0a8f002'),('dec74e11-7951-11ed-ab90-0242c0a8f002',0.00,'CACI Contr.',NULL,'Income','de344c98-7951-11ed-ab90-0242c0a8f002'),('dec8958c-7951-11ed-ab90-0242c0a8f002',0.00,'Various Income',NULL,'Income','de3af5c2-7951-11ed-ab90-0242c0a8f002'),('decab86b-7951-11ed-ab90-0242c0a8f002',0.00,'Volleyball Winnings',NULL,'Income','de3af5c2-7951-11ed-ab90-0242c0a8f002'),('decca413-7951-11ed-ab90-0242c0a8f002',0.00,'Savings Interest',NULL,'Income','de39781e-7951-11ed-ab90-0242c0a8f002'),('decf0d11-7951-11ed-ab90-0242c0a8f002',0.00,'Checking Interest',NULL,'Income','de39781e-7951-11ed-ab90-0242c0a8f002'),('ded0768b-7951-11ed-ab90-0242c0a8f002',0.00,'Gifts-R',NULL,'Income','de3af5c2-7951-11ed-ab90-0242c0a8f002'),('ded22676-7951-11ed-ab90-0242c0a8f002',0.00,'Cashback',NULL,'Income','de3af5c2-7951-11ed-ab90-0242c0a8f002'),('ded59932-7951-11ed-ab90-0242c0a8f002',0.00,'Auto Insurance',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('ded7c17a-7951-11ed-ab90-0242c0a8f002',0.00,'Audible',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('deda3812-7951-11ed-ab90-0242c0a8f002',0.00,'Mortgage',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('dedc50c4-7951-11ed-ab90-0242c0a8f002',0.00,'BGE',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('dede24bd-7951-11ed-ab90-0242c0a8f002',0.00,'Water & Sewage',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('dedfe11c-7951-11ed-ab90-0242c0a8f002',0.00,'Defender Razor',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('dee28f9a-7951-11ed-ab90-0242c0a8f002',0.00,'Peacock',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('dee4977a-7951-11ed-ab90-0242c0a8f002',0.00,'Ring',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('dee69ce9-7951-11ed-ab90-0242c0a8f002',0.00,'Instacart',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('dee8fe48-7951-11ed-ab90-0242c0a8f002',0.00,'Tower FCU Car Loan',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('deea09a8-7951-11ed-ab90-0242c0a8f002',0.00,'Tower FCU RV Loan',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('deec533e-7951-11ed-ab90-0242c0a8f002',0.00,'Costco',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('deeea1aa-7951-11ed-ab90-0242c0a8f002',0.00,'Syds Insurance',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('def0e1e0-7951-11ed-ab90-0242c0a8f002',0.00,'Phone Bill',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('def30cbb-7951-11ed-ab90-0242c0a8f002',0.00,'Spotify',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('def480a4-7951-11ed-ab90-0242c0a8f002',0.00,'Verizon',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('def657c7-7951-11ed-ab90-0242c0a8f002',0.00,'Amazon',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('def87acc-7951-11ed-ab90-0242c0a8f002',0.00,'Apartment',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('defa8eb2-7951-11ed-ab90-0242c0a8f002',0.00,'Car Payments',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('defbb974-7951-11ed-ab90-0242c0a8f002',0.00,'Discover Student Loan',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('deff5d3b-7951-11ed-ab90-0242c0a8f002',0.00,'Nelnet Loan',NULL,'Paper','de34f38a-7951-11ed-ab90-0242c0a8f002'),('df00cced-7951-11ed-ab90-0242c0a8f002',0.00,'Clothing',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df02d974-7951-11ed-ab90-0242c0a8f002',0.00,'Gifts',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df0517b4-7951-11ed-ab90-0242c0a8f002',0.00,'Home',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df077bcc-7951-11ed-ab90-0242c0a8f002',0.00,'Pupper',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df096289-7951-11ed-ab90-0242c0a8f002',0.00,'Grooming',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df0affe0-7951-11ed-ab90-0242c0a8f002',0.00,'Nail Salon',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df0ce4c1-7951-11ed-ab90-0242c0a8f002',0.00,'Furniture',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df0eea32-7951-11ed-ab90-0242c0a8f002',0.00,'Apartment Stuff',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df100e66-7951-11ed-ab90-0242c0a8f002',0.00,'Business',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df120be0-7951-11ed-ab90-0242c0a8f002',0.00,'Donations',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df14326a-7951-11ed-ab90-0242c0a8f002',0.00,'Personal',NULL,'Paper','de35be69-7951-11ed-ab90-0242c0a8f002'),('df16d7be-7951-11ed-ab90-0242c0a8f002',0.00,'Gas',NULL,'Paper','de36aeaf-7951-11ed-ab90-0242c0a8f002'),('df17c227-7951-11ed-ab90-0242c0a8f002',0.00,'Public Transportation',NULL,'Paper','de36aeaf-7951-11ed-ab90-0242c0a8f002'),('df19725d-7951-11ed-ab90-0242c0a8f002',0.00,'Tolls/EZ-Pass',NULL,'Paper','de36aeaf-7951-11ed-ab90-0242c0a8f002'),('df1b5802-7951-11ed-ab90-0242c0a8f002',0.00,'Maintenance',NULL,'Paper','de36aeaf-7951-11ed-ab90-0242c0a8f002'),('df1dc87a-7951-11ed-ab90-0242c0a8f002',0.00,'Motorcycle',NULL,'Paper','de36aeaf-7951-11ed-ab90-0242c0a8f002'),('df1fd5e6-7951-11ed-ab90-0242c0a8f002',0.00,'Tickets/Fines',NULL,'Paper','de36aeaf-7951-11ed-ab90-0242c0a8f002'),('df21d468-7951-11ed-ab90-0242c0a8f002',0.00,'Uber',NULL,'Paper','de36aeaf-7951-11ed-ab90-0242c0a8f002'),('df23faf7-7951-11ed-ab90-0242c0a8f002',0.00,'Parking',NULL,'Paper','de36aeaf-7951-11ed-ab90-0242c0a8f002'),('df26ca1c-7951-11ed-ab90-0242c0a8f002',0.00,'Prev. Year Transfer',NULL,'Paper','de379e83-7951-11ed-ab90-0242c0a8f002'),('df28cadd-7951-11ed-ab90-0242c0a8f002',0.00,'Taxes',NULL,'Paper','de379e83-7951-11ed-ab90-0242c0a8f002');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `credit_account_transaction`
--

DROP TABLE IF EXISTS `credit_account_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `credit_account_transaction` (
  `account_id` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `FK5e564txassg0mprq1og0h2bhw` (`account_id`),
  CONSTRAINT `FK1t1j721qqsan83wg8o7w0ldtx` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`),
  CONSTRAINT `FK5e564txassg0mprq1og0h2bhw` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `credit_account_transaction`
--

LOCK TABLES `credit_account_transaction` WRITE;
/*!40000 ALTER TABLE `credit_account_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `credit_account_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `debit_account_transaction`
--

DROP TABLE IF EXISTS `debit_account_transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `debit_account_transaction` (
  `account_id` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) NOT NULL,
  PRIMARY KEY (`transaction_id`),
  KEY `FKcl3chya7pgcxuim6mwf58hnvw` (`account_id`),
  CONSTRAINT `FKcl3chya7pgcxuim6mwf58hnvw` FOREIGN KEY (`account_id`) REFERENCES `account` (`id`),
  CONSTRAINT `FKex14o16g7ectt0hlx2gj85s0t` FOREIGN KEY (`transaction_id`) REFERENCES `transaction` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `debit_account_transaction`
--

LOCK TABLES `debit_account_transaction` WRITE;
/*!40000 ALTER TABLE `debit_account_transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `debit_account_transaction` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parent_category`
--

DROP TABLE IF EXISTS `parent_category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parent_category` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parent_category`
--

LOCK TABLES `parent_category` WRITE;
/*!40000 ALTER TABLE `parent_category` DISABLE KEYS */;
INSERT INTO `parent_category` VALUES ('de27c480-7951-11ed-ab90-0242c0a8f002','Credit Card'),('de2d5abf-7951-11ed-ab90-0242c0a8f002','Bank'),('de2fb959-7951-11ed-ab90-0242c0a8f002','Investment'),('de30f273-7951-11ed-ab90-0242c0a8f002','Daily Living'),('de31f785-7951-11ed-ab90-0242c0a8f002','Entertainment'),('de32f52e-7951-11ed-ab90-0242c0a8f002','Health'),('de344c98-7951-11ed-ab90-0242c0a8f002','Career'),('de34f38a-7951-11ed-ab90-0242c0a8f002','Monthly Payments'),('de35be69-7951-11ed-ab90-0242c0a8f002','Personal'),('de36aeaf-7951-11ed-ab90-0242c0a8f002','Transportation'),('de379e83-7951-11ed-ab90-0242c0a8f002','Catch-All'),('de39781e-7951-11ed-ab90-0242c0a8f002','Interest'),('de3af5c2-7951-11ed-ab90-0242c0a8f002','Misc.'),('de3cb1b6-7951-11ed-ab90-0242c0a8f002','Loan');
/*!40000 ALTER TABLE `parent_category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transaction`
--

DROP TABLE IF EXISTS `transaction`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `transaction` (
  `id` varchar(255) NOT NULL,
  `amount` decimal(19,2) DEFAULT NULL,
  `date` datetime(3) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transaction`
--

LOCK TABLES `transaction` WRITE;
/*!40000 ALTER TABLE `transaction` DISABLE KEYS */;
/*!40000 ALTER TABLE `transaction` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-12-11  7:57:46
