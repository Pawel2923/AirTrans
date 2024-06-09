CREATE USER admin@'172.%' IDENTIFIED WITH caching_sha2_password BY '';
GRANT ALL ON AirTrans.* TO admin@'172.%';

CREATE ROLE 'user';
GRANT SELECT ON `AirTrans`.`Airplanes` TO 'user';
GRANT SELECT ON `AirTrans`.`Announcements` TO 'user';
GRANT SELECT ON `AirTrans`.`Cars` TO 'user';
GRANT SELECT ON `AirTrans`.`Contact_info` TO 'user';
GRANT SELECT ON `AirTrans`.`Departures` TO 'user';
GRANT SELECT ON `AirTrans`.`Flights` TO 'user';
GRANT SELECT ON `AirTrans`.`Flight_data` TO 'user';
GRANT SELECT ON `AirTrans`.`Gates` TO 'user';
GRANT SELECT, INSERT, UPDATE, DELETE ON `AirTrans`.`Luggage` TO 'user';
GRANT SELECT ON `AirTrans`.`Parking_info` TO 'user';
GRANT SELECT, INSERT, UPDATE ON `AirTrans`.`Parking_reservations` TO 'user';
GRANT SELECT, INSERT, UPDATE ON `AirTrans`.`Rentals` TO 'user';
GRANT SELECT ON `AirTrans`.`Runways` TO 'user';
GRANT SELECT ON `AirTrans`.`Taxiways` TO 'user';
GRANT SELECT ON `AirTrans`.`Terminals` TO 'user';
GRANT SELECT, INSERT, UPDATE ON `AirTrans`.`Tickets` TO 'user';
GRANT SELECT, INSERT, UPDATE, DELETE ON `AirTrans`.`Users` TO 'user';
GRANT SELECT ON `AirTrans`.`Employees` TO 'user';
GRANT SELECT, INSERT, UPDATE ON `AirTrans`.`Reset_password` TO 'user';

CREATE USER client@'172.%' IDENTIFIED WITH caching_sha2_password BY '';
GRANT 'user' TO client@'172.%';
SET DEFAULT ROLE 'user' TO client@'172.%';

CREATE USER atc@'172.%' IDENTIFIED WITH caching_sha2_password BY '';
CREATE USER ground_crew@'172.%' IDENTIFIED WITH caching_sha2_password BY '';
CREATE USER airport_staff@'172.%' IDENTIFIED WITH caching_sha2_password BY '';
CREATE USER parking_staff@'172.%' IDENTIFIED WITH caching_sha2_password BY '';
CREATE USER rental_staff@'172.%' IDENTIFIED WITH caching_sha2_password BY '';

GRANT 'user' TO atc@'172.%';
GRANT 'user' TO ground_crew@'172.%';
GRANT 'user' TO airport_staff@'172.%';
GRANT 'user' TO parking_staff@'172.%';
GRANT 'user' TO rental_staff@'172.%';

CREATE ROLE 'employee';
GRANT INSERT, UPDATE, DELETE ON AirTrans.Announcements TO 'employee';

GRANT SELECT, INSERT, UPDATE, DELETE ON `AirTrans`.`Flight_data` TO `atc`@`172.%`
GRANT SELECT, INSERT, UPDATE, DELETE ON `AirTrans`.`Flights` TO `atc`@`172.%`
GRANT SELECT, INSERT, UPDATE, DELETE ON `AirTrans`.`Runways` TO `atc`@`172.%`
GRANT SELECT, INSERT, UPDATE, DELETE ON `AirTrans`.`Taxiways` TO `atc`@`172.%`
GRANT SELECT, INSERT, UPDATE, DELETE ON `AirTrans`.`Terminals` TO `atc`@`172.%`
GRANT 'employee' TO atc@'172.%';

GRANT SELECT, INSERT, UPDATE, DELETE ON AirTrans.Equipment TO ground_crew@'172.%';
GRANT 'employee' TO ground_crew@'172.%';

GRANT UPDATE ON AirTrans.Tickets TO airport_staff@'172.%';
GRANT UPDATE, INSERT, DELETE ON AirTrans.Gates TO airport_staff@'172.%';
GRANT UPDATE ON AirTrans.Contact_info TO airport_staff@'172.%';
GRANT 'employee' TO airport_staff@'172.%';

GRANT DELETE ON AirTrans.Parking_reservations TO parking_staff@'172.%';
GRANT INSERT, UPDATE, DELETE ON AirTrans.Parking_info TO parking_staff@'172.%';
GRANT 'employee' TO parking_staff@'172.%';

GRANT INSERT, UPDATE, DELETE ON AirTrans.Cars TO rental_staff@'172.%';
GRANT DELETE ON AirTrans.Rentals TO rental_staff@'172.%';
GRANT 'employee' TO rental_staff@'172.%';

SET DEFAULT ROLE 'user', 'employee' TO atc@'172.%';
SET DEFAULT ROLE 'user', 'employee' TO ground_crew@'172.%';
SET DEFAULT ROLE 'user', 'employee' TO airport_staff@'172.%';
SET DEFAULT ROLE 'user', 'employee' TO parking_staff@'172.%';
SET DEFAULT ROLE 'user', 'employee' TO rental_staff@'172.%';
