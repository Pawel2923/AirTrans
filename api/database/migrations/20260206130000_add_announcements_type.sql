ALTER TABLE `Announcements`
ADD COLUMN `type` ENUM('wazne', 'zmiana', 'informacja') NOT NULL DEFAULT 'informacja';
