-- MySQL dump 10.13  Distrib 8.0.39, for Win64 (x86_64)
--
-- Host: localhost    Database: alterlearn
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `id_administrador` int NOT NULL AUTO_INCREMENT,
  `nombre_admin` varchar(50) DEFAULT NULL,
  `correo_admin` varchar(45) DEFAULT NULL,
  `contrasenia` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_administrador`),
  UNIQUE KEY `correo_admin` (`correo_admin`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'Ana Perez','ana.perez@admin.com','Ana2023*'),(2,'Luis Fernández','luis.fernandez@admin.com','Luis!45'),(3,'Maria Lopez','maria.lopez@admin.com','Maria$99'),(4,'Carlos Ruiz','carlos.ruiz@admin.com','C@rlos22'),(5,'Isabel Ortega','isabel.ortega@admin.com','IsaB3l2023'),(6,'Pedro Gomez','pedro.gomez@admin.com','P3dro_45'),(7,'Laura Marquez','laura.marquez@admin.com','L@uraM7'),(8,'David Jimenez','david.jimenez@admin.com','D@vid#32'),(9,'Sara Castro','sara.castro@admin.com','S@ra2024'),(10,'Jose Sanchez','jose.sanchez@admin.com','J0se$98');
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asignatura` (
  `id_asignatura` int NOT NULL AUTO_INCREMENT,
  `nombre_asignatura` varchar(65) NOT NULL,
  PRIMARY KEY (`id_asignatura`),
  UNIQUE KEY `nombre_asignatura` (`nombre_asignatura`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES (4,'Biología'),(9,'Economía'),(2,'Física'),(7,'Geografía'),(5,'Historia del Arte'),(8,'Informática'),(6,'Lengua Española'),(1,'Matemáticas'),(10,'Música Clásica'),(3,'Química');
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `publicacompra`
--

DROP TABLE IF EXISTS `publicacompra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `publicacompra` (
  `id_usuario` int DEFAULT NULL,
  `id_recurso` int DEFAULT NULL,
  `id_compra_publicacion` int NOT NULL AUTO_INCREMENT,
  `fecha_compra` date DEFAULT NULL,
  `fecha_publicacion` date DEFAULT NULL,
  PRIMARY KEY (`id_compra_publicacion`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_recurso` (`id_recurso`),
  CONSTRAINT `publicacompra_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `publicacompra_ibfk_2` FOREIGN KEY (`id_recurso`) REFERENCES `recurso` (`id_recurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `publicacompra`
--

LOCK TABLES `publicacompra` WRITE;
/*!40000 ALTER TABLE `publicacompra` DISABLE KEYS */;
INSERT INTO `publicacompra` VALUES (1,1,1,'2024-01-10','2024-01-11'),(2,2,2,'2024-02-12','2024-02-13'),(3,3,3,'2024-03-14','2024-03-15'),(4,4,4,'2024-04-16','2024-04-17'),(5,5,5,'2024-05-18','2024-05-19'),(6,6,6,'2024-06-20','2024-06-21'),(7,7,7,'2024-07-22','2024-07-23'),(8,8,8,'2024-08-24','2024-08-25'),(9,9,9,'2024-09-26','2024-09-27'),(10,10,10,'2024-10-28','2024-10-29');
/*!40000 ALTER TABLE `publicacompra` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recurso`
--

DROP TABLE IF EXISTS `recurso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `recurso` (
  `id_recurso` int NOT NULL AUTO_INCREMENT,
  `precio` int DEFAULT NULL,
  `control` varchar(65) DEFAULT NULL,
  `certamen_con_sol` varchar(65) DEFAULT NULL,
  `certamen_sin_sol` varchar(65) DEFAULT NULL,
  `tarea` varchar(65) DEFAULT NULL,
  `profesor` varchar(40) DEFAULT NULL,
  `id_asignatura` int DEFAULT NULL,
  PRIMARY KEY (`id_recurso`),
  KEY `id_asignatura` (`id_asignatura`),
  CONSTRAINT `recurso_ibfk_1` FOREIGN KEY (`id_asignatura`) REFERENCES `asignatura` (`id_asignatura`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recurso`
--

LOCK TABLES `recurso` WRITE;
/*!40000 ALTER TABLE `recurso` DISABLE KEYS */;
INSERT INTO `recurso` VALUES (1,2000,'Control Matematicas 1','Certamen Matematicas 1','Certamen Matematicas 2','Tarea Algebra','Prof. Martin Vega',1),(2,4000,'Control Fisica 1','Certamen Fisica 1','Certamen Fisica 2','Tarea Física I','Prof. Elena Robles',2),(3,2000,'Control Quimica 1','Certamen Quimica 1','Certamen Quimica 2','Tarea Química Orgánica','Prof. Alberto Sánchez',3),(4,2000,'Control Biología 1','Certamen Biología 1','Certamen Biología 2','Tarea Genética','Prof. Javier Torres',4),(5,1000,'Control Arte 1','Certamen Arte 1','Certamen Arte 2','Tarea Renacimiento','Prof. Laura Fernández',5),(6,1000,'Control Lengua 1','Certamen Lengua 1','Certamen Lengua 2','Tarea Gramática','Prof. Carmen López',6),(7,1000,'Control Geografía 1','Certamen Geografía 1','Certamen Geografía 2','Tarea Geografía Humana','Prof. Julio Paredes',7),(8,3000,'Control Informática 1','Certamen Informática 1','Certamen Informática 2','Tarea Programación','Prof. Roberto Iglesias',8),(9,2000,'Control Economía 1','Certamen Economía 1','Certamen Economía 2','Tarea Microeconomía','Prof. Alicia Ortega',9),(10,1000,'Control Música 1','Certamen Música 1','Certamen Música 2','Tarea Teoría Musical','Prof. Daniel Castro',10);
/*!40000 ALTER TABLE `recurso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supervisado`
--

DROP TABLE IF EXISTS `supervisado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supervisado` (
  `id_administrador` int DEFAULT NULL,
  `id_recurso` int DEFAULT NULL,
  `id_supervisado` int NOT NULL AUTO_INCREMENT,
  `aprobacion` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_supervisado`),
  KEY `id_administrador` (`id_administrador`),
  KEY `id_recurso` (`id_recurso`),
  CONSTRAINT `supervisado_ibfk_1` FOREIGN KEY (`id_administrador`) REFERENCES `administrador` (`id_administrador`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `supervisado_ibfk_2` FOREIGN KEY (`id_recurso`) REFERENCES `recurso` (`id_recurso`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supervisado`
--

LOCK TABLES `supervisado` WRITE;
/*!40000 ALTER TABLE `supervisado` DISABLE KEYS */;
INSERT INTO `supervisado` VALUES (1,1,1,1),(2,2,2,1),(3,3,3,1),(4,4,4,1),(5,5,5,0),(6,6,6,1),(7,7,7,0),(8,8,8,1),(9,9,9,1),(10,10,10,0);
/*!40000 ALTER TABLE `supervisado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id_usuario` int NOT NULL AUTO_INCREMENT,
  `nombre_usuario` varchar(50) DEFAULT NULL,
  `correo_electronico` varchar(45) DEFAULT NULL,
  `contrasenia` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `correo_electronico` (`correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'Juan Perez','juan.perez@gmail.com','JuaN2024!'),(2,'Carla Rodriguez','carla.rodriguez@yahoo.com','Carla*99'),(3,'Santiago Luna','santiago.luna@hotmail.com','Santi123_'),(4,'Fernanda Diaz','fernanda.diaz@outlook.com','F3rnanD@'),(5,'Miguel Torres','miguel.torres@mail.com','Miguel2023!'),(6,'Lucia Moreno','lucia.moreno@live.com','LuM#45'),(7,'Pablo Rivas','pablo.rivas@gmail.com','P@blo88'),(8,'Andrea Ruiz','andrea.ruiz@gmail.com','A.ndrea2022'),(9,'Roberto Martinez','roberto.martinez@gmail.com','Roberto2020@'),(10,'Victoria Reyes','victoria.reyes@gmail.com','V!ctoria97');
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-24 20:58:06
