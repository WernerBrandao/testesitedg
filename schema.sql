-- Adminer 5.4.2 MySQL 8.0.45 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

DROP TABLE IF EXISTS `__drizzle_migrations`;
CREATE TABLE `__drizzle_migrations` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `hash` text NOT NULL,
  `created_at` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `analytics`;
CREATE TABLE `analytics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int DEFAULT NULL,
  `pageUrl` varchar(1024) DEFAULT NULL,
  `viewCount` int NOT NULL DEFAULT '0',
  `uniqueVisitors` int NOT NULL DEFAULT '0',
  `avgTimeOnPage` int NOT NULL DEFAULT '0',
  `bounceRate` int NOT NULL DEFAULT '0',
  `date` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `audit_logs`;
CREATE TABLE `audit_logs` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `action` varchar(64) NOT NULL,
  `entityType` varchar(64) NOT NULL,
  `entityId` int DEFAULT NULL,
  `changes` text,
  `ipAddress` varchar(45) DEFAULT NULL,
  `userAgent` varchar(500) DEFAULT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'success',
  `errorMessage` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `audit_logs_userId_users_id_fk` (`userId`),
  CONSTRAINT `audit_logs_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `banners`;
CREATE TABLE `banners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `subtitle` text,
  `imageUrl` text NOT NULL,
  `linkUrl` text,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `visibility` enum('site','intranet','both') NOT NULL DEFAULT 'site',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `color` varchar(7) DEFAULT NULL,
  `icon` varchar(64) DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categories_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `color_themes`;
CREATE TABLE `color_themes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `description` text,
  `primaryColor` varchar(7) NOT NULL DEFAULT '#003366',
  `secondaryColor` varchar(7) NOT NULL DEFAULT '#D4AF37',
  `accentColor` varchar(7) NOT NULL DEFAULT '#0066CC',
  `textColor` varchar(7) NOT NULL DEFAULT '#333333',
  `textLightColor` varchar(7) NOT NULL DEFAULT '#666666',
  `backgroundColor` varchar(7) NOT NULL DEFAULT '#FFFFFF',
  `surfaceColor` varchar(7) NOT NULL DEFAULT '#F5F5F5',
  `searchBgColor` varchar(7) NOT NULL DEFAULT '#003366',
  `searchTextColor` varchar(7) NOT NULL DEFAULT '#FFFFFF',
  `searchBorderColor` varchar(7) NOT NULL DEFAULT '#D4AF37',
  `isActive` tinyint(1) NOT NULL DEFAULT '0',
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `authorName` varchar(255) NOT NULL,
  `authorEmail` varchar(320) NOT NULL,
  `content` text NOT NULL,
  `status` enum('pending','approved','rejected','spam') NOT NULL DEFAULT 'pending',
  `moderatedBy` int DEFAULT NULL,
  `moderationReason` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `document_categories`;
CREATE TABLE `document_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `document_categories_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `document_download_stats`;
CREATE TABLE `document_download_stats` (
  `id` int NOT NULL AUTO_INCREMENT,
  `documentId` int NOT NULL,
  `totalDownloads` int NOT NULL DEFAULT '0',
  `lastDownloadedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `document_download_stats_documentId_documents_id_fk` (`documentId`),
  CONSTRAINT `document_download_stats_documentId_documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `document_downloads`;
CREATE TABLE `document_downloads` (
  `id` int NOT NULL AUTO_INCREMENT,
  `documentId` int NOT NULL,
  `versionId` int DEFAULT NULL,
  `userAgent` varchar(500) DEFAULT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `downloadedAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `document_downloads_documentId_documents_id_fk` (`documentId`),
  KEY `document_downloads_versionId_document_versions_id_fk` (`versionId`),
  CONSTRAINT `document_downloads_documentId_documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `document_downloads_versionId_document_versions_id_fk` FOREIGN KEY (`versionId`) REFERENCES `document_versions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `document_versions`;
CREATE TABLE `document_versions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `documentId` int NOT NULL,
  `versionNumber` int NOT NULL,
  `fileUrl` varchar(1024) NOT NULL,
  `fileKey` varchar(1024) NOT NULL,
  `fileSize` int NOT NULL,
  `mimeType` varchar(100) NOT NULL,
  `uploadedBy` int NOT NULL,
  `changeDescription` text,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `document_versions_documentId_documents_id_fk` (`documentId`),
  KEY `document_versions_uploadedBy_users_id_fk` (`uploadedBy`),
  CONSTRAINT `document_versions_documentId_documents_id_fk` FOREIGN KEY (`documentId`) REFERENCES `documents` (`id`) ON DELETE CASCADE,
  CONSTRAINT `document_versions_uploadedBy_users_id_fk` FOREIGN KEY (`uploadedBy`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `documents`;
CREATE TABLE `documents` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text,
  `categoryId` int NOT NULL,
  `fileUrl` varchar(1024) NOT NULL,
  `fileKey` varchar(1024) NOT NULL,
  `fileSize` int NOT NULL,
  `mimeType` varchar(100) NOT NULL,
  `uploadedBy` int NOT NULL,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  `sortOrder` int NOT NULL DEFAULT '0',
  `visibility` enum('site','intranet','both') NOT NULL DEFAULT 'site',
  PRIMARY KEY (`id`),
  KEY `documents_categoryId_document_categories_id_fk` (`categoryId`),
  KEY `documents_uploadedBy_users_id_fk` (`uploadedBy`),
  CONSTRAINT `documents_categoryId_document_categories_id_fk` FOREIGN KEY (`categoryId`) REFERENCES `document_categories` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `documents_uploadedBy_users_id_fk` FOREIGN KEY (`uploadedBy`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `images_bank`;
CREATE TABLE `images_bank` (
  `id` int NOT NULL AUTO_INCREMENT,
  `url` varchar(1024) NOT NULL,
  `fileKey` varchar(1024) NOT NULL,
  `fileName` varchar(255) NOT NULL,
  `fileSize` int NOT NULL,
  `mimeType` varchar(100) NOT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `alt` varchar(255) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `sourceType` enum('post','service','document','banner','manual') NOT NULL,
  `sourceId` int DEFAULT NULL,
  `uploadedBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `images_bank_uploadedBy_users_id_fk` (`uploadedBy`),
  CONSTRAINT `images_bank_uploadedBy_users_id_fk` FOREIGN KEY (`uploadedBy`) REFERENCES `users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `media_library`;
CREATE TABLE `media_library` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `url` text NOT NULL,
  `fileKey` varchar(500) NOT NULL,
  `fileType` enum('image','video') NOT NULL,
  `mimeType` varchar(100) NOT NULL,
  `fileSize` int DEFAULT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `duration` int DEFAULT NULL,
  `uploadedBy` int NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `menuItems`;
CREATE TABLE `menuItems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `label` varchar(255) NOT NULL,
  `linkType` enum('internal','external') NOT NULL,
  `internalPageId` int DEFAULT NULL,
  `externalUrl` varchar(1024) DEFAULT NULL,
  `parentId` int DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `openInNewTab` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `isColumnTitle` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `menu_items_internalPageId_pages_id_fk` (`internalPageId`),
  KEY `menu_items_parentId_menu_items_id_fk` (`parentId`),
  CONSTRAINT `menu_items_internalPageId_pages_id_fk` FOREIGN KEY (`internalPageId`) REFERENCES `pages` (`id`) ON DELETE SET NULL,
  CONSTRAINT `menu_items_parentId_menu_items_id_fk` FOREIGN KEY (`parentId`) REFERENCES `menuItems` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `menu_access_permissions`;
CREATE TABLE `menu_access_permissions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role` enum('user','admin','contributor') NOT NULL,
  `menuItemId` int NOT NULL,
  `canAccess` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `page_block_items`;
CREATE TABLE `page_block_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `blockId` int NOT NULL,
  `itemType` enum('service','documentCategory','image') NOT NULL,
  `itemId` int DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `customData` json DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `page_block_items_blockId_page_blocks_id_fk` (`blockId`),
  CONSTRAINT `page_block_items_blockId_page_blocks_id_fk` FOREIGN KEY (`blockId`) REFERENCES `page_blocks` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `page_blocks`;
CREATE TABLE `page_blocks` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageId` int NOT NULL,
  `blockType` enum('services','documentCategories','images','text','html') NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `sortOrder` int NOT NULL DEFAULT '0',
  `config` json DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `page_blocks_pageId_pages_id_fk` (`pageId`),
  CONSTRAINT `page_blocks_pageId_pages_id_fk` FOREIGN KEY (`pageId`) REFERENCES `pages` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `page_history`;
CREATE TABLE `page_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pageId` int NOT NULL,
  `title` varchar(500) NOT NULL,
  `content` text NOT NULL,
  `excerpt` text,
  `featuredImage` text,
  `status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
  `menuLabel` varchar(255) DEFAULT NULL,
  `showInMenu` tinyint(1) NOT NULL DEFAULT '0',
  `editorId` int DEFAULT NULL,
  `changeDescription` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `pages`;
CREATE TABLE `pages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `slug` varchar(500) NOT NULL,
  `content` text NOT NULL,
  `excerpt` text,
  `featuredImage` text,
  `parentId` int DEFAULT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `status` enum('draft','published','archived') NOT NULL DEFAULT 'draft',
  `showInMenu` tinyint(1) NOT NULL DEFAULT '0',
  `menuLabel` varchar(128) DEFAULT NULL,
  `authorId` int DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `visibility` enum('site','intranet','both') NOT NULL DEFAULT 'site',
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `expiresAt` timestamp NOT NULL,
  `usedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `password_reset_tokens_token_unique` (`token`),
  KEY `password_reset_tokens_userId_users_id_fk` (`userId`),
  CONSTRAINT `password_reset_tokens_userId_users_id_fk` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `post_history`;
CREATE TABLE `post_history` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `title` varchar(500) NOT NULL,
  `excerpt` text,
  `content` text NOT NULL,
  `featuredImage` text,
  `status` enum('draft','published','archived','scheduled') NOT NULL DEFAULT 'draft',
  `isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  `editorId` int DEFAULT NULL,
  `changeDescription` varchar(500) DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `post_tags`;
CREATE TABLE `post_tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `tagId` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `post_view_limits`;
CREATE TABLE `post_view_limits` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `ipAddress` varchar(45) NOT NULL,
  `viewedAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `post_view_limits_postId_posts_id_fk` (`postId`),
  CONSTRAINT `post_view_limits_postId_posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `slug` varchar(500) NOT NULL,
  `excerpt` text,
  `content` text NOT NULL,
  `featuredImage` text,
  `categoryId` int DEFAULT NULL,
  `authorId` int DEFAULT NULL,
  `status` enum('draft','published','archived','scheduled') NOT NULL DEFAULT 'draft',
  `publishedAt` timestamp NULL DEFAULT NULL,
  `scheduledAt` timestamp NULL DEFAULT NULL,
  `isScheduled` tinyint(1) NOT NULL DEFAULT '0',
  `isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  `viewCount` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `visibility` enum('site','intranet','both') NOT NULL DEFAULT 'site',
  PRIMARY KEY (`id`),
  UNIQUE KEY `posts_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `service_analytics`;
CREATE TABLE `service_analytics` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceId` int NOT NULL,
  `clickCount` int NOT NULL DEFAULT '0',
  `lastClickedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `service_analytics_serviceId_services_id_fk` (`serviceId`),
  CONSTRAINT `service_analytics_serviceId_services_id_fk` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `service_click_log`;
CREATE TABLE `service_click_log` (
  `id` int NOT NULL AUTO_INCREMENT,
  `serviceId` int NOT NULL,
  `userAgent` varchar(500) DEFAULT NULL,
  `referer` varchar(1024) DEFAULT NULL,
  `ipAddress` varchar(45) DEFAULT NULL,
  `clickedAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `service_click_log_serviceId_services_id_fk` (`serviceId`),
  CONSTRAINT `service_click_log_serviceId_services_id_fk` FOREIGN KEY (`serviceId`) REFERENCES `services` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `services`;
CREATE TABLE `services` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `icon` varchar(500) NOT NULL,
  `link` varchar(1024) NOT NULL,
  `color` varchar(7) NOT NULL DEFAULT '#0066CC',
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `visibility` enum('site','intranet','both') NOT NULL DEFAULT 'site',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `site_config`;
CREATE TABLE `site_config` (
  `id` int NOT NULL AUTO_INCREMENT,
  `configKey` varchar(128) NOT NULL,
  `configValue` text,
  `description` text,
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `site_config_configKey_unique` (`configKey`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `social_media_shares`;
CREATE TABLE `social_media_shares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `platform` varchar(50) NOT NULL,
  `externalId` varchar(255) DEFAULT NULL,
  `status` varchar(50) NOT NULL DEFAULT 'pending',
  `errorMessage` text,
  `sharedAt` timestamp NULL DEFAULT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `social_shares`;
CREATE TABLE `social_shares` (
  `id` int NOT NULL AUTO_INCREMENT,
  `postId` int NOT NULL,
  `platform` varchar(50) NOT NULL,
  `ipAddress` varchar(45) NOT NULL,
  `userAgent` varchar(500) DEFAULT NULL,
  `sharedAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  KEY `social_shares_postId_posts_id_fk` (`postId`),
  CONSTRAINT `social_shares_postId_posts_id_fk` FOREIGN KEY (`postId`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `tags`;
CREATE TABLE `tags` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(128) NOT NULL,
  `slug` varchar(128) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  PRIMARY KEY (`id`),
  UNIQUE KEY `tags_slug_unique` (`slug`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `transparency_items`;
CREATE TABLE `transparency_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` text,
  `linkUrl` text,
  `icon` varchar(64) DEFAULT NULL,
  `section` varchar(128) NOT NULL,
  `sortOrder` int NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `units`;
CREATE TABLE `units` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(500) NOT NULL,
  `type` enum('internacao','internacao_provisoria','semiliberdade','meio_aberto') NOT NULL,
  `address` text,
  `phone` varchar(64) DEFAULT NULL,
  `email` varchar(320) DEFAULT NULL,
  `visitDays` text,
  `mapsUrl` text,
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `openId` varchar(64) NOT NULL,
  `name` text,
  `email` varchar(320) DEFAULT NULL,
  `loginMethod` varchar(64) DEFAULT NULL,
  `role` enum('user','admin','contributor') NOT NULL DEFAULT 'user',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `lastSignedIn` timestamp NOT NULL DEFAULT (now()),
  `categoryId` int DEFAULT NULL,
  `functionalId` varchar(64) DEFAULT NULL,
  `passwordHash` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_openId_unique` (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


DROP TABLE IF EXISTS `videos`;
CREATE TABLE `videos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(500) NOT NULL,
  `youtubeUrl` text NOT NULL,
  `description` text,
  `thumbnailUrl` text,
  `isFeatured` tinyint(1) NOT NULL DEFAULT '0',
  `isActive` tinyint(1) NOT NULL DEFAULT '1',
  `sortOrder` int NOT NULL DEFAULT '0',
  `createdAt` timestamp NOT NULL DEFAULT (now()),
  `updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
  `visibility` enum('site','intranet','both') NOT NULL DEFAULT 'site',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- 2026-04-06 16:07:32 UTC