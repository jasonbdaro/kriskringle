CREATE DATABASE  IF NOT EXISTS `homestead` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin */;
USE `homestead`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: homestead
-- ------------------------------------------------------
-- Server version	5.7.19-0ubuntu0.16.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lists`
--

DROP TABLE IF EXISTS `lists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` text COLLATE utf8mb4_unicode_ci,
  `user_parent_id` int(10) unsigned NOT NULL,
  `user_child_id` varbinary(255) DEFAULT NULL,
  `round_id` int(10) unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lists_user_parent_id_user_child_id_round_id_unique` (`user_parent_id`,`user_child_id`,`round_id`),
  KEY `lists_user_child_id_foreign` (`user_child_id`),
  KEY `lists_round_id_foreign` (`round_id`),
  CONSTRAINT `lists_round_id_foreign` FOREIGN KEY (`round_id`) REFERENCES `rounds` (`id`),
  CONSTRAINT `lists_user_parent_id_foreign` FOREIGN KEY (`user_parent_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lists`
--

LOCK TABLES `lists` WRITE;
/*!40000 ALTER TABLE `lists` DISABLE KEYS */;
INSERT INTO `lists` VALUES (1,NULL,2,'·\ÜÍ›\Í!jö\è¢&',1,'2017-11-08 02:19:33','2017-11-08 02:19:33',NULL),(2,'{\"entityMap\":{},\"blocks\":[{\"key\":\"artro\",\"text\":\"Test.abc\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}',3,'hf¼\ëôr\Ø9¶lD9|¬',1,'2017-11-08 02:46:58','2017-11-08 02:47:08',NULL),(3,'{\"entityMap\":{},\"blocks\":[{\"key\":\"f1sin\",\"text\":\"tttt.com\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}',7,'R\ÇKm_D²,„86cK',1,'2017-11-08 02:47:38','2017-11-08 02:47:41',NULL),(4,'{\"entityMap\":{},\"blocks\":[{\"key\":\"8frgt\",\"text\":\"the\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"cuvvq\",\"text\":\"quick\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"aib6l\",\"text\":\"brown\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"2hlsq\",\"text\":\"fox\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"d2044\",\"text\":\"jumps\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"bku26\",\"text\":\"over\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"c09rv\",\"text\":\"the\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"b7bts\",\"text\":\"lazy\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}},{\"key\":\"ejkn5\",\"text\":\"dog.com\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}',4,'·\ÜÍ›\Í!jö\è¢&',2,'2017-11-08 05:26:18','2017-11-08 05:27:39',NULL),(5,'{\"entityMap\":{},\"blocks\":[{\"key\":\"f3r0g\",\"text\":\"aaa.cm\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}]}',2,'hf¼\ëôr\Ø9¶lD9|¬',2,'2017-11-08 05:27:54','2017-11-08 05:27:58',NULL);
/*!40000 ALTER TABLE `lists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,'2014_10_12_000000_create_users_table',1),(2,'2014_10_12_100000_create_password_resets_table',1),(3,'2017_09_21_055404_create_seasons_table',2),(4,'2017_09_21_055900_create_rounds_table',3),(5,'2017_09_21_061653_create_lists_table',4),(6,'2017_10_17_054426_add_is_admin_to_users_table',5);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rounds`
--

DROP TABLE IF EXISTS `rounds`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rounds` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(300) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `season_id` int(10) unsigned NOT NULL,
  `current` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_season_id_name` (`season_id`,`name`),
  CONSTRAINT `rounds_season_id_foreign` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rounds`
--

LOCK TABLES `rounds` WRITE;
/*!40000 ALTER TABLE `rounds` DISABLE KEYS */;
INSERT INTO `rounds` VALUES (1,'W1','The quick brown fox jumps over the lazy dog',1,0,'2017-11-08 00:24:32','2017-11-08 02:47:57',NULL),(2,'W2','The quick brown fox jumps over the lazy dog',1,1,'2017-11-08 00:32:48','2017-11-08 02:47:57',NULL);
/*!40000 ALTER TABLE `rounds` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `seasons`
--

DROP TABLE IF EXISTS `seasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `seasons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `current` tinyint(4) DEFAULT NULL,
  `lock` tinyint(4) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `seasons`
--

LOCK TABLES `seasons` WRITE;
/*!40000 ALTER TABLE `seasons` DISABLE KEYS */;
INSERT INTO `seasons` VALUES (1,'S1',1,1,'2017-11-08 00:23:20','2017-11-08 02:46:48',NULL);
/*!40000 ALTER TABLE `seasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_admin` tinyint(4) NOT NULL DEFAULT '0',
  `pick_key` varchar(60) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_name_unique` (`name`),
  UNIQUE KEY `users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Administrator','admin','$2y$10$85rvZPTgcvrIuYDOzIROMOVTYDMwQ1jqjzRZ8owkgOXNOO6Af3bv.',1,NULL,'2017-10-24 08:45:25','2017-10-24 08:45:25',NULL),(2,'Christine Suguran','user2','$2y$10$jBAf4lfUclW0ukvUQ77HvO6va3l/gVqO4ZmCBeDWzdQLgRe3LqyTy',0,'77b71226d1825f675ae4f8b6a743b34f','2017-10-24 08:47:46','2017-10-24 08:47:46',NULL),(3,'Jason Daro','user3','$2y$10$0D329IA9WQZklUor1o4HYOK1lwmK7Dtg4rhb.K80D.CZftOuhNM/6',0,'0380532277405fe5cfd6e97554ff07ef','2017-10-24 08:48:01','2017-10-24 08:48:01',NULL),(4,'Florito Doyohim','user4','$2y$10$99AnFyBxNwO0c97F68b7weKUlOdqbqUB1Xls/ibQi.uRi2LtxtzEe',0,'e616f024dae25dfcbab67d669db8cff4','2017-10-24 08:48:12','2017-10-24 08:48:12',NULL),(5,'Ianne Elcamel','user5','$2y$10$UTaiJD0YRd6.90MeiADg9eT/3qM7/Xby2mVG7p2F07NL/ZrmWXuTe',0,'04683ee88891c45673bf6d0f47d48e96','2017-10-24 08:48:30','2017-10-24 08:48:30',NULL),(6,'Adora Cordero','user6','$2y$10$7sIBBFsS4GWdAz9T5Z8Id.oyblv0q1s9xERW.5pmAcwSs5ybwwROe',0,'0fcda020b49971bbd92653de144ad5c1','2017-10-24 08:48:46','2017-10-24 08:48:46',NULL),(7,'Giezel Cabal','user7','$2y$10$EXd26n.sB9s2i5gghzDTWu6MmLu4a/6WSJ/1umkj4PSQ9l1/3n4oq',0,'f99816403aca7b49176c64769b7ef94c','2017-10-24 08:49:09','2017-10-24 08:49:09',NULL),(8,'Johnny Martillan','user8','$2y$10$puGpXLD4JKXrz0p00R7VZukZKw91ErwaFUR3vjTjkh.4SDB3TC6Vy',0,'5672f1e01349e4624ce6edd4d3ce1154','2017-10-24 08:49:36','2017-10-24 08:49:36',NULL),(9,'Juve Canete','user9','$2y$10$JbM8RzwlfMuVRgSRmOtmTuNST97kctsKM42v5uUPh2yqVllyiov5W',0,'7f29b7d025205b706371d4afc071a1a3','2017-10-24 08:49:58','2017-10-24 08:49:58',NULL),(10,'John Mark Dua','user10','$2y$10$9gohW8MQXvuih7FaLjcT8etJyhu19auURLoul1jlCQLnSmyLEhe6.',0,'f362efb397813ba22f01d17d54076f4f','2017-10-24 08:50:10','2017-10-24 08:50:10',NULL),(11,'Jhunard Cabiles','user11','$2y$10$.RMqMygV/1foHbP1h8/jpOvMWfe2ISAMYxI/BW6jELUMNiaNb4n5K',0,'e690124475adf5611347e3570e220562','2017-10-24 08:50:25','2017-10-24 08:50:25',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `view_lists`
--

DROP TABLE IF EXISTS `view_lists`;
/*!50001 DROP VIEW IF EXISTS `view_lists`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view_lists` AS SELECT 
 1 AS `id`,
 1 AS `name`,
 1 AS `updated_at`,
 1 AS `user_parent_id`,
 1 AS `user_child_id`,
 1 AS `round_id`,
 1 AS `season_id`,
 1 AS `current_round`,
 1 AS `current_season`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `view_users`
--

DROP TABLE IF EXISTS `view_users`;
/*!50001 DROP VIEW IF EXISTS `view_users`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `view_users` AS SELECT 
 1 AS `user_id`,
 1 AS `user_name`,
 1 AS `description`,
 1 AS `updated`,
 1 AS `season_id`,
 1 AS `round_id`,
 1 AS `has_pick`,
 1 AS `current_round`,
 1 AS `current_season`,
 1 AS `user_picked`,
 1 AS `user_picked_by`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping events for database 'homestead'
--

--
-- Dumping routines for database 'homestead'
--
/*!50003 DROP FUNCTION IF EXISTS `decrypt_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`homestead`@`%` FUNCTION `DECRYPT_DATA`(dt VARBINARY(255)) RETURNS int(11) unsigned
BEGIN
	DECLARE decrypted_text INTEGER UNSIGNED;
    SELECT AES_DECRYPT(dt,'B6A2S3H5','0520028850035475') INTO decrypted_text;    
	RETURN decrypted_text;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `encrypt_data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`homestead`@`%` FUNCTION `ENCRYPT_DATA`(dt INT) RETURNS varbinary(255)
BEGIN
	DECLARE encrypted VARBINARY(255);
    SELECT AES_ENCRYPT(dt,'B6A2S3H5','0520028850035475') INTO encrypted;
	RETURN encrypted;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `encrypter` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`homestead`@`%` PROCEDURE `encrypter`(IN plain_text VARCHAR(50))
BEGIN
SET block_encryption_mode = 'aes-256-cbc';
SET @key_str = SHA2('B6A2S3H5',512);
SET @init_vector = RANDOM_BYTES(16);
SET @crypt_str = AES_ENCRYPT(plain_text,@key_str,@init_vector);
SELECT CAST(AES_DECRYPT(@crypt_str,@key_str,@init_vector) AS CHAR(10000) CHARACTER SET utf8);

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_pick` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`homestead`@`%` PROCEDURE `sp_pick`(IN user_id INT)
BEGIN

	DECLARE done INT DEFAULT 0;
	DECLARE childId INT;
    DECLARE hasPicked INT;
    DECLARE hasLocked INT;    
    DECLARE cRoundId INT;
    DECLARE posId INT;
    DECLARE uId INT;
    DECLARE maxOccurence INT;
	    
    -- check if current season is locked
    SELECT `lock` INTO hasLocked FROM seasons WHERE `current`;
	
    -- check if user has already picked in the current season and round
	SELECT EXISTS(SELECT id FROM view_lists WHERE user_parent_id = user_id AND current_round AND current_season) INTO hasPicked;    
    
	-- set the current round id
	SELECT id INTO cRoundId FROM rounds WHERE current AND season_id = (SELECT id FROM seasons WHERE current);
	
    START TRANSACTION;
    
    IF !hasPicked AND hasLocked THEN
		BLOCK1: BEGIN
			DECLARE notPickable INT;
			DECLARE rPosIds CURSOR FOR 
				SELECT id FROM users WHERE is_admin = 0 AND id NOT IN (
					SELECT user_id AS id UNION ALL 
					SELECT decrypt_data(user_child_id) FROM view_lists WHERE current_season AND current_round UNION ALL 
					SELECT decrypt_data(user_child_id) FROM view_lists WHERE user_parent_id = user_id AND current_season);
				
			DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;			
			CREATE TEMPORARY TABLE IF NOT EXISTS tmp_tbl(id INT);
			
			OPEN rPosIds;
			
			read_loop: REPEAT
				FETCH rPosIds INTO posId;
					IF done = 0 THEN
						BLOCK2: BEGIN
							DECLARE done2 INT DEFAULT 0;
							DECLARE rUIds CURSOR FOR
								SELECT id FROM users WHERE is_admin = 0 AND id <> user_id AND id NOT IN (
									SELECT user_parent_id FROM view_lists WHERE current_season AND current_round);
								
								DECLARE CONTINUE HANDLER FOR NOT FOUND SET done2 = 1;
								CREATE TEMPORARY TABLE IF NOT EXISTS tmp_test_tbl(id INT);
								
								OPEN rUIds;
									read_loop2: REPEAT
										FETCH rUIds INTO uId;
											IF done2 = 0 THEN
												SELECT NOT EXISTS (
													SELECT id FROM users WHERE is_admin = 0 AND id NOT IN (
														SELECT uId AS id UNION ALL 
														SELECT decrypt_data(user_child_id) FROM view_lists WHERE user_parent_id = uId AND current_season UNION ALL
														SELECT decrypt_data(user_child_id) FROM view_lists WHERE current_season AND current_round UNION ALL
														SELECT posId)
												) INTO notPickable;
												INSERT INTO tmp_test_tbl VALUES(notPickable);
											END IF;
									UNTIL done2
									END REPEAT read_loop2;
								CLOSE rUIds;
						
						END BLOCK2;
						
						IF NOT EXISTS(SELECT * FROM tmp_test_tbl WHERE id = 1) THEN
							INSERT INTO tmp_tbl VALUES(posId);                            
						END IF;
                        
						DROP TEMPORARY TABLE IF EXISTS tmp_test_tbl;                        
                        
					END IF;
                    
				UNTIL done
			END REPEAT read_loop;
			
			CLOSE rPosIds;
            
            CREATE TEMPORARY TABLE IF NOT EXISTS tmp_tbl_filter(id INT, occurence INT);
            
            BLOCK3: BEGIN
				DECLARE done3 INT DEFAULT 0;
                DECLARE uId2 INT;
				DECLARE rUIds2 CURSOR FOR
					SELECT * FROM tmp_tbl;
					
				DECLARE CONTINUE HANDLER FOR NOT FOUND SET done3 = 1;
				
                
                OPEN rUIds2;
                
                read_loop3: REPEAT
					FETCH rUIds2 INTO uId2;
                    IF done3 = 0 THEN
						BLOCK4: BEGIN
							DECLARE done4 INT DEFAULT 0;
							DECLARE uId3 INT;
                            DECLARE occurence INT;
							DECLARE rUIds3 CURSOR FOR
								SELECT id FROM users WHERE is_admin = 0 AND id <> user_id AND id NOT IN (
								SELECT user_parent_id FROM view_lists WHERE current_season AND current_round);
								
							DECLARE CONTINUE HANDLER FOR NOT FOUND SET done4 = 1;
                            
                            
                            SET occurence = 0;
                            
                            OPEN rUIds3;
							
                            read_loop4: REPEAT
								FETCH rUIds3 INTO uId3;
                                IF done4 = 0 THEN
									IF EXISTS(
										SELECT id FROM (
											SELECT uId3 AS id UNION ALL 
											SELECT decrypt_data(user_child_id) FROM view_lists WHERE user_parent_id = uId3 AND current_season UNION ALL
											SELECT decrypt_data(user_child_id) FROM view_lists WHERE current_season AND current_round
										) AS tmpTbl WHERE id = uId2
                                    ) THEN
										SET occurence = occurence + 1;
									END IF;
								END IF;
                                
                                UNTIL done4
                                
                            END REPEAT read_loop4;                            
                            
                            CLOSE rUIds3;
                            
                            INSERT INTO tmp_tbl_filter(id, occurence) VALUES(uId2, occurence);
                            SET occurence = 0;
                            
						END BLOCK4;
                        
                    END IF;
                    
					UNTIL done3
                    
                END REPEAT read_loop3;
                
                CLOSE rUIds2;				
				
			END BLOCK3;

            SET maxOccurence = (SELECT MAX(occurence) FROM tmp_tbl_filter);
            SELECT id INTO childId FROM tmp_tbl_filter WHERE occurence = (maxOccurence) ORDER BY RAND() LIMIT 1;
            
			DROP TEMPORARY TABLE IF EXISTS tmp_tbl;
            DROP TEMPORARY TABLE IF EXISTS tmp_tbl_filter;            
            
		END BLOCK1;
        
        IF (childId IS NOT NULL) THEN
			INSERT INTO lists(
				user_parent_id,
				user_child_id,
				round_id,
				created_at,
				updated_at
			) VALUES (
				user_id,
                encrypt_data(childId),
				cRoundId,
				CURRENT_TIMESTAMP(),
				CURRENT_TIMESTAMP()
			);
            
            UPDATE users SET pick_key = MD5(CONCAT(user_id, UNIX_TIMESTAMP(), cRoundId, childId)) WHERE id = user_id;
			
			SELECT 1 AS `status`;
		END IF;
	
    ELSE SELECT 0 AS `status`;
	END IF;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sp_pick_backup` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`homestead`@`%` PROCEDURE `sp_pick_backup`(IN user_id INT)
BEGIN

	DECLARE done INT DEFAULT 0;
	DECLARE childId INT;
    DECLARE hasPicked INT;    
    DECLARE cRoundId INT;
    DECLARE posId INT;
    DECLARE uId INT;
    DECLARE maxOccurence INT;
	    
    -- check if user has already picked in the current season and round
	SELECT EXISTS(SELECT id FROM view_lists WHERE user_parent_id = user_id AND current_round AND current_season) INTO hasPicked;
    
	-- set the current round id
	SELECT id INTO cRoundId FROM rounds WHERE current AND season_id = (SELECT id FROM seasons WHERE current);
	
    START TRANSACTION;
    
    IF !hasPicked THEN
		BLOCK1: BEGIN
			DECLARE notPickable INT;
			DECLARE rPosIds CURSOR FOR 
				SELECT id FROM users WHERE is_admin = 0 AND id NOT IN (
					SELECT user_id AS id UNION ALL 
					SELECT user_child_id FROM view_lists WHERE current_season AND current_round UNION ALL 
					SELECT  user_child_id FROM view_lists WHERE user_parent_id = user_id AND current_season);
				
			DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = 1;			
			CREATE TEMPORARY TABLE IF NOT EXISTS tmp_tbl(id INT);
			
			OPEN rPosIds;
			
			read_loop: REPEAT
				FETCH rPosIds INTO posId;
					IF done = 0 THEN
						BLOCK2: BEGIN
							DECLARE done2 INT DEFAULT 0;
							DECLARE rUIds CURSOR FOR
								SELECT id FROM users WHERE is_admin = 0 AND id <> user_id AND id NOT IN (
									SELECT user_parent_id FROM view_lists WHERE current_season AND current_round);
								
								DECLARE CONTINUE HANDLER FOR NOT FOUND SET done2 = 1;
								CREATE TEMPORARY TABLE IF NOT EXISTS tmp_test_tbl(id INT);
								
								OPEN rUIds;
									read_loop2: REPEAT
										FETCH rUIds INTO uId;
											IF done2 = 0 THEN
												SELECT NOT EXISTS (
													SELECT id FROM users WHERE is_admin = 0 AND id NOT IN (
														SELECT uId AS id UNION ALL 
														SELECT user_child_id FROM view_lists WHERE user_parent_id = uId AND current_season UNION ALL
														SELECT user_child_id FROM view_lists WHERE current_season AND current_round UNION ALL
														SELECT posId)
												) INTO notPickable;
												INSERT INTO tmp_test_tbl VALUES(notPickable);
											END IF;
									UNTIL done2
									END REPEAT read_loop2;
								CLOSE rUIds;
						
						END BLOCK2;
						
						IF NOT EXISTS(SELECT * FROM tmp_test_tbl WHERE id = 1) THEN
							INSERT INTO tmp_tbl VALUES(posId);                            
						END IF;
                        
						DROP TEMPORARY TABLE IF EXISTS tmp_test_tbl;                        
                        
					END IF;
                    
				UNTIL done
			END REPEAT read_loop;
			
			CLOSE rPosIds;
            
            CREATE TEMPORARY TABLE IF NOT EXISTS tmp_tbl_filter(id INT, occurence INT);
            
            BLOCK3: BEGIN
				DECLARE done3 INT DEFAULT 0;
                DECLARE uId2 INT;
				DECLARE rUIds2 CURSOR FOR
					SELECT * FROM tmp_tbl;
					
				DECLARE CONTINUE HANDLER FOR NOT FOUND SET done3 = 1;
				
                
                OPEN rUIds2;
                
                read_loop3: REPEAT
					FETCH rUIds2 INTO uId2;
                    IF done3 = 0 THEN
						BLOCK4: BEGIN
							DECLARE done4 INT DEFAULT 0;
							DECLARE uId3 INT;
                            DECLARE occurence INT;
							DECLARE rUIds3 CURSOR FOR
								SELECT id FROM users WHERE is_admin = 0 AND id <> user_id AND id NOT IN (
								SELECT user_parent_id FROM view_lists WHERE current_season AND current_round);
								
							DECLARE CONTINUE HANDLER FOR NOT FOUND SET done4 = 1;
                            
                            
                            SET occurence = 0;
                            
                            OPEN rUIds3;
							
                            read_loop4: REPEAT
								FETCH rUIds3 INTO uId3;
                                IF done4 = 0 THEN
									IF EXISTS(
										SELECT id FROM (
											SELECT uId3 AS id UNION ALL 
											SELECT user_child_id FROM view_lists WHERE user_parent_id = uId3 AND current_season UNION ALL
											SELECT user_child_id FROM view_lists WHERE current_season AND current_round
										) AS tmpTbl WHERE id = uId2
                                    ) THEN
										SET occurence = occurence + 1;
									END IF;
								END IF;
                                
                                UNTIL done4
                                
                            END REPEAT read_loop4;                            
                            
                            CLOSE rUIds3;
                            
                            INSERT INTO tmp_tbl_filter(id, occurence) VALUES(uId2, occurence);
                            SET occurence = 0;
                            
						END BLOCK4;
                        
                    END IF;
                    
					UNTIL done3
                    
                END REPEAT read_loop3;
                
                CLOSE rUIds2;				
				
			END BLOCK3;

            SET maxOccurence = (SELECT MAX(occurence) FROM tmp_tbl_filter);
            SELECT id INTO childId FROM tmp_tbl_filter WHERE occurence = (maxOccurence) ORDER BY RAND() LIMIT 1;
            
			DROP TEMPORARY TABLE IF EXISTS tmp_tbl;
            DROP TEMPORARY TABLE IF EXISTS tmp_tbl_filter;            
            
		END BLOCK1;
        
        IF (childId IS NOT NULL) THEN
			INSERT INTO lists(
				user_parent_id,
				user_child_id,
                user_child_encrypted,
				round_id,
				created_at,
				updated_at
			) VALUES (
				user_id, 
				childId,
                encrypt_data(childId),
				cRoundId,
				CURRENT_TIMESTAMP(),
				CURRENT_TIMESTAMP()
			);
			
			SELECT 1 AS `status`;
		END IF;
	
    ELSE SELECT 0 AS `status`;
	END IF;
    
    COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `test_new` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`homestead`@`%` PROCEDURE `test_new`(IN num INT)
BEGIN

	DECLARE i INT;
    DECLARE j INT;
    
	SET FOREIGN_KEY_CHECKS = 0;
    TRUNCATE TABLE users;
	TRUNCATE TABLE lists;
	TRUNCATE TABLE rounds;
	TRUNCATE TABLE seasons;	
	SET FOREIGN_KEY_CHECKS = 1;   
    
    INSERT INTO users(name,username,password,is_admin,created_at,updated_at) VALUES('Administrator','admin','admin',1,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP());
    INSERT INTO seasons(name,current,`lock`,created_at,updated_at) VALUES('Season 2017',1,1,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP());
    SET @season_id = LAST_INSERT_ID();    
    
    SET i = 2;
    SET j = 1;
    
    WHILE i <= num + 1 DO
		INSERT INTO users(name,username,password,created_at,updated_at) VALUES(CONCAT('User_',i),CONCAT('user',i),'user',CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP());
		SET i = i + 1;
    END WHILE;
    
    WHILE j <= num - 1 DO
		IF j = 1 THEN
			INSERT INTO rounds(name,season_id,current,created_at,updated_at) VALUES(CONCAT('WK ',j),@season_id,1,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP());
		ELSE
			INSERT INTO rounds(name,season_id,current,created_at,updated_at) VALUES(CONCAT('WK ',j),@season_id,0,CURRENT_TIMESTAMP(),CURRENT_TIMESTAMP());
        END IF;
		SET j = j + 1;
    END WHILE;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `test_procedure` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`homestead`@`%` PROCEDURE `test_procedure`(IN x INT)
BEGIN
DECLARE i INT;
DECLARE j INT;

SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE lists;
SET FOREIGN_KEY_CHECKS = 1;

SET i = 1;
SET j = 2;

WHILE i <= x DO
	UPDATE rounds SET current = 0 WHERE current;
    UPDATE rounds SET current = 1 WHERE id = i;
    
	
    WHILE j <= x + 1 DO
		CALL sp_pick(j);
        SET j = j + 1;
    END WHILE;
    
    SET i = i + 1;
    SET j = 2;
END WHILE;

/*
SELECT IF(COUNT(user_parent_id) = (SELECT COUNT(id) FROM users WHERE username <> 'admin')*x, 'no errors', 'has errors') AS `status` FROM (SELECT @a) AS tmp;

SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 2 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 3 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 4 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 5 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 6 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 7 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 8 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 9 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 10 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 11 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 12 AND current_season;    


SELECT IF(COUNT(user_parent_id) = (SELECT COUNT(id) FROM users WHERE username <> 'admin')*x, 'no errors', 'has errors') AS `status` FROM (
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 2 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 3 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 4 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 5 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 6 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 7 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 8 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 9 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 10 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 11 AND current_season UNION ALL
SELECT user_parent_id, user_child_id FROM view_lists WHERE user_parent_id = 12 AND current_season
) AS tmp;
*/


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `view_lists`
--

/*!50001 DROP VIEW IF EXISTS `view_lists`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`homestead`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_lists` AS select `l`.`id` AS `id`,`l`.`name` AS `name`,`l`.`updated_at` AS `updated_at`,`l`.`user_parent_id` AS `user_parent_id`,`l`.`user_child_id` AS `user_child_id`,`l`.`round_id` AS `round_id`,`r`.`season_id` AS `season_id`,`r`.`current` AS `current_round`,`s`.`current` AS `current_season` from ((`lists` `l` left join `rounds` `r` on((`l`.`round_id` = `r`.`id`))) left join `seasons` `s` on((`r`.`season_id` = `s`.`id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `view_users`
--

/*!50001 DROP VIEW IF EXISTS `view_users`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`homestead`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `view_users` AS select distinct `u`.`id` AS `user_id`,`u`.`name` AS `user_name`,(select `view_lists`.`name` from `view_lists` where ((`view_lists`.`user_parent_id` = `u`.`id`) and (`view_lists`.`season_id` = `r`.`season_id`) and (`view_lists`.`round_id` = `r`.`id`))) AS `description`,(select `view_lists`.`updated_at` from `view_lists` where ((`view_lists`.`user_parent_id` = `u`.`id`) and (`view_lists`.`season_id` = `r`.`season_id`) and (`view_lists`.`round_id` = `r`.`id`))) AS `updated`,`r`.`season_id` AS `season_id`,`r`.`id` AS `round_id`,if(exists(select 1 from `lists` where ((`lists`.`user_parent_id` = `u`.`id`) and (`lists`.`round_id` = `r`.`id`))),1,0) AS `has_pick`,`r`.`current` AS `current_round`,if(exists(select `seasons`.`id` from `seasons` where (`seasons`.`current` and (`seasons`.`id` = `r`.`season_id`))),1,0) AS `current_season`,(case when exists(select 1 from `lists` where ((`lists`.`user_parent_id` = `u`.`id`) and (`lists`.`round_id` = `r`.`id`))) then (case when (`l`.`current_round` and `l`.`current_season`) then '' else (select (select `users`.`name` from `users` where (`users`.`id` = `DECRYPT_DATA`(`view_lists`.`user_child_id`))) from `view_lists` where ((`view_lists`.`user_parent_id` = `u`.`id`) and (`view_lists`.`season_id` = `r`.`season_id`) and (`view_lists`.`round_id` = `r`.`id`))) end) else '' end) AS `user_picked`,(case when exists(select 1 from `lists` where ((`lists`.`user_parent_id` = `u`.`id`) and (`lists`.`round_id` = `r`.`id`))) then (case when (`l`.`current_round` and `l`.`current_season`) then '' else (select (select `users`.`name` from `users` where (`users`.`id` = (select `vl2`.`user_parent_id` from `view_lists` `vl2` where ((`vl2`.`user_child_id` = `ENCRYPT_DATA`(`vl`.`user_parent_id`)) and (`vl2`.`season_id` = `r`.`season_id`) and (`vl2`.`round_id` = `r`.`id`))))) from `view_lists` `vl` where ((`vl`.`user_parent_id` = `u`.`id`) and (`vl`.`season_id` = `r`.`season_id`) and (`vl`.`round_id` = `r`.`id`))) end) else '' end) AS `user_picked_by` from ((`users` `u` join `rounds` `r`) left join `view_lists` `l` on((`l`.`round_id` = `r`.`id`))) where (`u`.`is_admin` = 0) */;
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

-- Dump completed on 2017-11-08 15:43:00
