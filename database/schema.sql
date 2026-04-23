-- GSM SHTOOL Database Schema (v1.1.0)

-- User Wallets Table
CREATE TABLE IF NOT EXISTS `user_wallets` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `balance` DECIMAL(10, 2) DEFAULT 0.00,
  `currency` VARCHAR(10) DEFAULT 'USD',
  `last_update` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Support Tickets Table
CREATE TABLE IF NOT EXISTS `support_tickets` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `user_id` INT NOT NULL,
  `subject` VARCHAR(255) NOT NULL,
  `category` ENUM('icloud', 'network_unlock', 'server_issue', 'billing') NOT NULL,
  `priority` ENUM('low', 'medium', 'high', 'emergency') DEFAULT 'medium',
  `status` ENUM('open', 'in_progress', 'answered', 'closed') DEFAULT 'open',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
