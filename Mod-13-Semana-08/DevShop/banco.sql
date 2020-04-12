-- MySQL Workbench Forward Engineering
/*
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS
, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS
, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE
, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema devshop
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema devshop
-- -----------------------------------------------------
CREATE SCHEMA
IF NOT EXISTS `devshop` DEFAULT CHARACTER
SET utf8 ;
USE `devshop`
;

-- -----------------------------------------------------
-- Table `devshop`.`products`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `devshop`.`products`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR
(245) NULL,
  `description` TEXT NULL,
  PRIMARY KEY
(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`product_variations`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `devshop`.`product_variations`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `sku` VARCHAR
(45) NULL,
  `avaiable` INT NULL,
  `variation_name` VARCHAR
(245) NULL,
  `price` FLOAT NULL,
  `price_from` FLOAT NULL,
  `weight` INT NULL,
  `order` INT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY
(`id`),
  INDEX `fk_product_variations_products_idx`
(`product_id` ASC),
  CONSTRAINT `fk_product_variations_products`
    FOREIGN KEY
(`product_id`)
    REFERENCES `devshop`.`products`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`product_images`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `devshop`.`product_images`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR
(245) NULL,
  `url` VARCHAR
(245) NULL,
  `order` INT NULL,
  `product_variation_id` INT NOT NULL,
  PRIMARY KEY
(`id`),
  INDEX `fk_product_images_product_variations1_idx`
(`product_variation_id` ASC),
  CONSTRAINT `fk_product_images_product_variations1`
    FOREIGN KEY
(`product_variation_id`)
    REFERENCES `devshop`.`product_variations`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`categories`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `devshop`.`categories`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `category` VARCHAR
(245) NULL,
  `description` TEXT NULL,
  PRIMARY KEY
(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`categories_products`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `devshop`.`categories_products`
(
  `category_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  PRIMARY KEY
(`category_id`, `product_id`),
  INDEX `fk_categories_has_products_products1_idx`
(`product_id` ASC),
  INDEX `fk_categories_has_products_categories1_idx`
(`category_id` ASC),
  CONSTRAINT `fk_categories_has_products_categories1`
    FOREIGN KEY
(`category_id`)
    REFERENCES `devshop`.`categories`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION,
  CONSTRAINT `fk_categories_has_products_products1`
    FOREIGN KEY
(`product_id`)
    REFERENCES `devshop`.`products`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`banner_types`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `devshop`.`banner_types`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` VARCHAR
(245) NULL,
  PRIMARY KEY
(`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`banners`
-- -----------------------------------------------------
CREATE TABLE
IF NOT EXISTS `devshop`.`banners`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR
(245) NULL,
  `url` VARCHAR
(245) NULL,
  `image_url` VARCHAR
(245) NULL,
  `order` INT NULL,
  `banner_type_id` INT NOT NULL,
  PRIMARY KEY
(`id`, `banner_type_id`),
  INDEX `fk_banners_banner_types1_idx`
(`banner_type_id` ASC),
  CONSTRAINT `fk_banners_banner_types1`
    FOREIGN KEY
(`banner_type_id`)
    REFERENCES `devshop`.`banner_types`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`users`
-- -----------------------------------------------------
CREATE TABLE `users`
(
  `id` int
(11) NOT NULL AUTO_INCREMENT,
  `name` varchar
(245) DEFAULT NULL,
  `email` varchar
(245) DEFAULT NULL,
  `password` varchar
(245) DEFAULT NULL,
  `email_checked` varchar
(45) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY
(`id`)
) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`email_tokens`
-- -----------------------------------------------------
CREATE TABLE `devshop`.`email_tokens`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `token` VARCHAR
(245) NULL,
  `expires_at` DATETIME NULL,
  `email` VARCHAR
(45) NULL,
  `used` VARCHAR
(45) NULL,
  `user_id` INT NULL,
  PRIMARY KEY
(`id`),
  CONSTRAINT `fk_email_tokens_1`
    FOREIGN KEY
(`id`)
    REFERENCES `devshop`.`users`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Table `devshop`.`roles`
-- -----------------------------------------------------

CREATE TABLE `devshop`.`roles`
(
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR
(245) NULL,
  PRIMARY KEY
(`id`)) ENGINE=InnoDB;


-- -----------------------------------------------------
-- Table `devshop`.`user_roles`
-- -----------------------------------------------------
CREATE TABLE `devshop`.`user_roles`
(
  `user_id` INT NOT NULL,
  `role_id` INT NOT NULL,
  INDEX `fk_user_roles_1_idx`
(`user_id` ASC),
  INDEX `fk_user_roles_2_idx`
(`role_id` ASC),
  CONSTRAINT `fk_user_roles_1`
    FOREIGN KEY
(`user_id`)
    REFERENCES `devshop`.`users`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION,
  CONSTRAINT `fk_user_roles_2`
    FOREIGN KEY
(`role_id`)
    REFERENCES `devshop`.`roles`
(`id`)
    ON
DELETE NO ACTION
    ON
UPDATE NO ACTION) ENGINE=InnoDB;



SET SQL_MODE
=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS
=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS
=@OLD_UNIQUE_CHECKS;