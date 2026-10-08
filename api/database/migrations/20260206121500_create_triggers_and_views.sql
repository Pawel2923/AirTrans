DELIMITER $$
CREATE TRIGGER `validate_new_airplane` BEFORE INSERT ON `Airplanes` FOR EACH ROW BEGIN
    IF (validate_airplane_fuel(NEW.fuel_tank, NEW.fuel_quant) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ilo�� paliwa przekracza pojemno�� zbiornika';
    END IF;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `airplanes_insert_trig` AFTER INSERT ON `Airplanes` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Airplanes', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowy samolot o serial_number:', NEW.serial_no));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `validate_update_airplane` BEFORE UPDATE ON `Airplanes` FOR EACH ROW BEGIN
    IF (validate_airplane_fuel(NEW.fuel_tank, NEW.fuel_quant) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Ilo�� paliwa przekracza pojemno�� zbiornika';
    END IF;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `airplanes_update_trig` AFTER UPDATE ON `Airplanes` FOR EACH ROW INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
VALUES ('Airplanes', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano samolot o serial_number:', NEW.serial_no))$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `airplanes_delete_trig` AFTER DELETE ON `Airplanes` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Airplanes', USER(), NOW(3), 'DELETE', CONCAT('Usunieto samolot o serial_number:', OLD.serial_no));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `announcements_insert_trig` AFTER INSERT ON `Announcements` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Announcements', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowe ogloszenie o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `announcements_update_trig` AFTER UPDATE ON `Announcements` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Announcements', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano ogloszenie o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `announcements_delete_trig` AFTER DELETE ON `Announcements` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Announcements', USER(), NOW(3), 'DELETE', CONCAT('Usunieto ogloszenie o id:', OLD.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `cars_insert_trig` AFTER INSERT ON `Cars` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Cars', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowy samochod o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `cars_update_trig` AFTER UPDATE ON `Cars` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Cars', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano samochod o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `cars_delete_trig` AFTER DELETE ON `Cars` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Cars', USER(), NOW(3), 'DELETE', CONCAT('Usunieto samochod o id:', OLD.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `equipment_insert_trig` AFTER INSERT ON `Equipment` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Equipment', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowe sprz�t o id:', NEW.serial_no));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `equipment_update_trig` AFTER UPDATE ON `Equipment` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Equipment', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano sprz�t o id:', NEW.serial_no));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `equipment_delete_trig` AFTER DELETE ON `Equipment` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Equipment', USER(), NOW(3), 'DELETE', CONCAT('Usunieto sprz�t o id:', OLD.serial_no));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `validate_new_flight` BEFORE INSERT ON `Flights` FOR EACH ROW BEGIN
    IF (validate_arrival_departure(NEW.arrival, NEW.departure) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Data przylotu jest przed dat� odlotu';
    END IF;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `flights_insert_trig` AFTER INSERT ON `Flights` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Flights', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowy lot o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `validate_update_flight` BEFORE UPDATE ON `Flights` FOR EACH ROW BEGIN
    IF (validate_arrival_departure(NEW.arrival, NEW.departure) = FALSE) THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Data przylotu jest przed dat� odlotu';
    END IF;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `flights_update_trig` AFTER UPDATE ON `Flights` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Flights', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano lot o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `flights_delete_trig` AFTER DELETE ON `Flights` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Flights', USER(), NOW(3), 'DELETE', CONCAT('Usunieto lot o id:', OLD.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `gates_insert_trig` AFTER INSERT ON `Gates` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Gates', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowa bramke o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `gates_update_trig` AFTER UPDATE ON `Gates` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Gates', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano bramke o id:', NEW.id,' na:', NEW.name,'i statusie:', NEW.status));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `gates_delete_trig` AFTER DELETE ON `Gates` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Gates', USER(), NOW(3), 'DELETE', CONCAT('Usunieto bramke o id:', OLD.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `parking_reservations_insert_trig` AFTER INSERT ON `Parking_reservations` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Parking_reservations', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowa rezerwacje o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `parking_reservations_update_trig` AFTER UPDATE ON `Parking_reservations` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Parking_reservations', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano rezerwacje o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `parking_reservations_delete_trig` AFTER DELETE ON `Parking_reservations` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Parking_reservations', USER(), NOW(3), 'DELETE', CONCAT('Usunieto rezerwacje o id:', OLD.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `rentals_insert_trig` AFTER INSERT ON `Rentals` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Rentals', USER(), NOW(3), 'INSERT', CONCAT('Dodano nowe wypozyczenie o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `rentals_update_trig` AFTER UPDATE ON `Rentals` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Rentals', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano wypozyczenie o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `rentals_delete_trig` AFTER DELETE ON `Rentals` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Rentals', USER(), NOW(3), 'DELETE', CONCAT('Usunieto wypozyczenie o id:', OLD.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `runways_update_trig` AFTER UPDATE ON `Runways` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Runways', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano pas startowy o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `taxiways_update_trig` AFTER UPDATE ON `Taxiways` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Taxiways', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano droge ko�owania o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `terminals_update_trig` AFTER UPDATE ON `Terminals` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Terminals', USER(), NOW(3), 'UPDATE', CONCAT('Zaktualizowano terminal o id:', NEW.id));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tickets_before_insert` BEFORE INSERT ON `Tickets` FOR EACH ROW BEGIN
    IF NEW.status != 'PURCHASED'  THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Bilet musi by� najpierw zakupiony';
    END IF;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tickets_before_update` BEFORE UPDATE ON `Tickets` FOR EACH ROW BEGIN
    IF NEW.status = "REFUNDED" AND NOW() > OLD.purchase_time THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Bilet nie mo�e by� zwr�cony po czasie 24h od zakupu';
    END IF;
    IF OLD.status = NEW.status THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Nie mo�na zmieni� statusu biletu na ten sam';
    END IF;
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `validate_new_user` BEFORE INSERT ON `Users` FOR EACH ROW BEGIN
    SET NEW.phone_number = TRIM(NEW.phone_number);
    CALL validate_user_data(NEW.email, NEW.phone_number, NEW.birth_date, NEW.password);
    INSERT INTO Event_logs (table_name, by_user, action, log_details)
    VALUES ('Users', USER(), 'INSERT', CONCAT('Dodano nowego u�ytkownika: ', NEW.email));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `validate_update_user` BEFORE UPDATE ON `Users` FOR EACH ROW BEGIN
    SET NEW.phone_number = TRIM(NEW.phone_number);
    CALL validate_user_data(NEW.email, NEW.phone_number, NEW.birth_date, NEW.password);
    INSERT INTO Event_logs (table_name, by_user, action, log_details)
    VALUES ('Users', USER(), 'UPDATE', CONCAT('Zaktualizowano u�ytkownika: ', NEW.email));
END$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Users_delete_trig` AFTER DELETE ON `Users` FOR EACH ROW BEGIN
    INSERT INTO Event_logs (table_name, by_user, timestamp_log, action, log_details)
    VALUES ('Users', USER(), NOW(3), 'DELETE', CONCAT('Usunieto uzytkownika o id:', OLD.id));
END$$
DELIMITER ;
CREATE VIEW `Departures` AS select `Flights`.`id` AS `id`,`Flights`.`status` AS `status`,`Flights`.`airline_name` AS `airline_name`,`Flights`.`destination` AS `destination`,`Flights`.`origin` AS `origin`,`Flights`.`arrival` AS `arrival`,`Flights`.`departure` AS `departure`,`Flights`.`airplane_serial_no` AS `airplane_serial_no`,if((`Flights`.`destination` like concat('%',(select `Contact_info`.`name` from `Contact_info`),'%')),0,1) AS `is_departure` from `Flights` ;
