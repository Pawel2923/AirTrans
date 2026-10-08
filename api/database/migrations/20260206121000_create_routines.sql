-- Routines retained from the historical dump because the current export omitted them.
DELIMITER $$
CREATE FUNCTION `validate_airplane_fuel`(fuel_tank DECIMAL(10,2), fuel_quantity DECIMAL(10,2)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF fuel_quantity > fuel_tank THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Airplanes', USER(), 'INSERT', 'Ilo�� paliwa przekracza pojemno�� zbiornika');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END $$
DELIMITER ;
DELIMITER $$
CREATE FUNCTION `validate_arrival_departure`(arrival DATETIME, departure DATETIME) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF departure > arrival THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Flights', USER(), 'INSERT', 'Data przylotu jest przed dat� odlotu');
        RETURN FALSE;
    END IF;

    IF arrival < NOW() OR departure < NOW() THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Flights', USER(), 'INSERT', 'Data przylotu lub odlotu jest w przesz�o�ci');
        RETURN FALSE;
    END IF;

    IF arrival < DATE_ADD(departure, INTERVAL 30 MINUTE) THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Flights', USER(), 'INSERT', '30 minut przerwy mi�dzy odlotem i przylotem nie zosta�o zachowane');
        RETURN FALSE;
    END IF;

    IF EXISTS (
        SELECT 1
        FROM Flights
        WHERE (departure BETWEEN DATE_SUB(arrival, INTERVAL 5 MINUTE) AND arrival
            OR arrival BETWEEN departure AND DATE_ADD(departure, INTERVAL 5 MINUTE))
            AND (departure != arrival)
    ) THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Flights', USER(), 'INSERT', '5 minut przerwy mi�dzy lotami nie zosta�o zachowane');
        RETURN FALSE;
    END IF;

    RETURN TRUE;
END $$
DELIMITER ;
DELIMITER $$
CREATE FUNCTION `validate_birth_date`(birth_date DATE) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF (birth_date < '1900-01-01' OR birth_date > CURRENT_DATE()) THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Users', USER(), 'INSERT', 'Niepoprawna data urodzenia');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END $$
DELIMITER ;
DELIMITER $$
CREATE FUNCTION `validate_email`(email VARCHAR(255)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF (email IS NULL OR email NOT REGEXP '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$') THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Users', USER(), 'INSERT', 'Niepoprawny adres email');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END $$
DELIMITER ;
DELIMITER $$
CREATE FUNCTION `validate_password`(password VARCHAR(255)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    IF (password IS NULL OR LENGTH(password) < 3) THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Users', USER(), 'INSERT', 'Has�o jest za kr�tkie');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END $$
DELIMITER ;
DELIMITER $$
CREATE FUNCTION `validate_phone_number`(phone_number VARCHAR(255)) RETURNS tinyint(1)
    DETERMINISTIC
BEGIN
    SET phone_number = REPLACE(phone_number, ' ', '');

    IF phone_number NOT REGEXP '^[\+]?[0-9]{9,15}$' THEN
        INSERT INTO Event_logs (table_name, by_user, action, log_details)
        VALUES ('Users', USER(), 'INSERT', 'Niepoprawny numer telefonu');
        RETURN FALSE;
    END IF;
    RETURN TRUE;
END $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE `Logowanie`(IN p_first_name VARCHAR(255), IN p_email VARCHAR(255), IN p_login_successful BOOLEAN)
BEGIN
    DECLARE p_log_details TEXT;

    IF p_login_successful THEN
        SET p_log_details = CONCAT('Udane logowanie ', p_first_name, ' o ', NOW());
    ELSE
        SET p_log_details = CONCAT('Nie udane logowanie o ', NOW());
    END IF;

    INSERT INTO Logowanie_log(first_name, email, login_date, login_details)
    VALUES (p_first_name, p_email, NOW(), p_log_details);
END $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE `Rejestracja`(
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
END $$
DELIMITER ;
DELIMITER $$
CREATE PROCEDURE `validate_user_data`(IN email VARCHAR(255), IN phone_number VARCHAR(255), IN birth_date DATE, IN password VARCHAR(255))
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
        SET MESSAGE_TEXT = 'Hasło jest za krótkie';
    END IF;
END $$
DELIMITER ;
