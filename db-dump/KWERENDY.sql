CREATE DATABASE AirTrans;
USE AirTrans;
CREATE TABLE Personnel (
     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     first_name VARCHAR(45) NOT NULL,
     last_name VARCHAR(45) NOT NULL,
     position VARCHAR(45) NOT NULL,
     permissions VARCHAR(45) NOT NULL,
     login VARCHAR(45) NOT NULL,
     password LONGTEXT NOT NULL,
     path_to_avatar VARCHAR(45) NOT NULL
     );
 CREATE TABLE Gates (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(25) NOT NULL,
    status VARCHAR(25) NOT NULL
    );
CREATE TABLE Tickets (
     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     purchase_date DATETIME NOT NULL,
     expiry_date DATETIME NOT NULL,
     ticket_class VARCHAR(15) NOT NULL,
     seat_no INT NOT NULL,
     status VARCHAR(15) NOT NULL
     );
CREATE TABLE Flight (
     id VARCHAR(10) NOT NULL PRIMARY KEY,
     Status VARCHAR(25) NOT NULL,
     Airline_name VARCHAR(25) NOT NULL,
     Destination VARCHAR(45) NOT NULL,
     Arrival DATETIME NOT NULL,
     Departure DATETIME NOT NULL
     );
CREATE TABLE Radar (
     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     Altitude FLOAT NOT NULL,
     Track INT NOT NULL,
     Ground_speed INT NOT NULL,
     Latitude FLOAT NOT NULL,
     Longitude FLOAT NOT NULL
     );
CREATE TABLE Airplane (
     Serial_no VARCHAR(25) NOT NULL PRIMARY KEY,
     Model VARCHAR(25) NOT NULL,
     Type VARCHAR(25) NOT NULL,
     Production_year YEAR NOT NULL,
     Num_of_seats INT NOT NULL,
     Fuel_tank FLOAT NOT NULL,
     Fuel_quant FLOAT NOT NULL,
     Crew_size INT NOT NULL,
     Max_cargo FLOAT NOT NULL
     );
CREATE TABLE Taxiway (
     Id VARCHAR(8) NOT NULL PRIMARY KEY,
     Is_available TINYINT NOT NULL
     );
CREATE TABLE Apron (
     Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     Is_available VARCHAR(8) NOT NULL
     );
CREATE TABLE Runway (
     Id VARCHAR(8) NOT NULL PRIMARY KEY,
     Length FLOAT NOT NULL,
     Is_available TINYINT NOT NULL
     );
CREATE TABLE Announcements (
     Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     Title VARCHAR(45) NOT NULL,
     Content TEXT NOT NULL,
     Valid_until DATETIME NOT NULL
     );
CREATE TABLE Luggage (
     Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     Type VARCHAR(25) NOT NULL,
     Size VARCHAR(25) NOT NULL,
     Weight FLOAT NOT NULL
     );
CREATE TABLE Equipment (
     Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     Name VARCHAR(45) NOT NULL,
     Type VARCHAR(45) NOT NULL,
     Serial_no VARCHAR(45) NOT NULL,
     Location VARCHAR(45) NOT NULL
     );
 CREATE TABLE Client (
     Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     First_name VARCHAR(45) NOT NULL,
     Last_name VARCHAR(45) NOT NULL,
     Date_of_birth DATE NULL,
     Gender ENUM('M','F')  NULL,
     Phone_no INT NULL,
     Address VARCHAR(45) NULL,
     Zip_code VARCHAR(12) NULL,
     Login VARCHAR(50) NOT NULL,
     Password LONGTEXT NOT NULL,
     Email VARCHAR(45) NOT NULL,
     Path_to_avatar VARCHAR(45) NULL
     );
CREATE TABLE Rentals (
     Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     Rental_date DATETIME NOT NULL,
     Return_date DATETIME NOT NULL,
     Status VARCHAR(15) NOT NULL
     );
CREATE TABLE Cars (
     Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     Brand VARCHAR(25) NOT NULL,
     Model VARCHAR(25) NOT NULL,
     Production_year YEAR NOT NULL,
     License_plate VARCHAR(25) NOT NULL,
     Price_per_day FLOAT NOT NULL,
     Path_to_img VARCHAR(45) NOT NULL,
     Fuel_type VARCHAR(45) NOT NULL,
     Transmission_type VARCHAR(45) NOT NULL
     );
CREATE TABLE Parking_reservations (
     Id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
     Parking_level VARCHAR(5) NOT NULL,
     Space_id VARCHAR(5) NOT NULL,
     Since DATETIME NOT NULL,
     Until DATETIME NOT NULL,
     License_plate VARCHAR(12) NOT NULL,
     Price_per_day FLOAT NOT NULL
     );
ALTER TABLE Personnel
     ADD COLUMN Gates_id INT NOT NULL;
ALTER TABLE Personnel
     ADD CONSTRAINT fk_gates_id
     FOREIGN KEY (Gates_id) REFERENCES Gates(id);
ALTER TABLE Personnel
     ADD COLUMN Flight_id VARCHAR(10) NOT NULL;
 ALTER TABLE Personnel
     ADD CONSTRAINT fk_Flight_id
     FOREIGN KEY (Flight_id) REFERENCES Flight(id);
ALTER TABLE Gates
     ADD COLUMN Ticket_id INT NOT NULL;
ALTER TABLE Gates
     ADD CONSTRAINT fk_ticket_id
     FOREIGN KEY (Ticket_id) REFERENCES Tickets(id);

 ALTER TABLE Tickets
     ADD COLUMN Client_id INT NOT NULL;
ALTER TABLE Tickets
     ADD CONSTRAINT fk_Client_id
     FOREIGN KEY (Client_id) REFERENCES Client(id);
ALTER TABLE Tickets
     ADD COLUMN Flight_id VARCHAR(10) NOT NULL;
ALTER TABLE Tickets
     ADD CONSTRAINT fk_Flight_id_tickets
     FOREIGN KEY (Flight_id) REFERENCES Flight(id);

ALTER TABLE Flight
     ADD COLUMN Radar_id INT NOT NULL;
ALTER TABLE Flight
     ADD CONSTRAINT fk_Radar_id
     FOREIGN KEY (Radar_id) REFERENCES Radar(id);
ALTER TABLE Flight
     ADD COLUMN Airplane_serial_no VARCHAR(25) NOT NULL;
ALTER TABLE Flight
     ADD CONSTRAINT fk_Airplane_serial_no
     FOREIGN KEY (Airplane_serial_no) REFERENCES Airplane(Serial_no);

ALTER TABLE Equipment
     ADD COLUMN Personel_id INT NOT NULL;
ALTER TABLE Equipment
     ADD CONSTRAINT fk_Personel_id
     FOREIGN KEY (Personel_id) REFERENCES Personnel(id);
ALTER TABLE Taxiway
     ADD COLUMN Flight_id VARCHAR(10) NOT NULL;
ALTER TABLE Taxiway
     ADD CONSTRAINT fk_Flight_id_taxiway
     FOREIGN KEY (Flight_id) REFERENCES Flight(id);

ALTER TABLE Runway
     ADD COLUMN Flight_id VARCHAR(10) NOT NULL;
ALTER TABLE Runway
     ADD CONSTRAINT fk_Flight_id_runway
     FOREIGN KEY (Flight_id) REFERENCES Flight(id);
ALTER TABLE Apron
     ADD COLUMN Flight_id VARCHAR(10) NOT NULL;
ALTER TABLE Apron
     ADD CONSTRAINT fk_Flight_id_apron
     FOREIGN KEY (Flight_id) REFERENCES Flight(id);
 ALTER TABLE Announcements
     ADD COLUMN Personnel_id INT NOT NULL;
ALTER TABLE Announcements
     ADD CONSTRAINT fk_Personnel_id_announcements
     FOREIGN KEY (Personnel_id) REFERENCES Personnel(id);

ALTER TABLE Luggage
     ADD COLUMN Client_id INT NOT NULL;
ALTER TABLE Luggage
     ADD CONSTRAINT fk_Client_id_luggage
     FOREIGN KEY (Client_id) REFERENCES Client(id);

ALTER TABLE Parking_reservations
    ADD COLUMN Client_id INT NOT NULL;
ALTER TABLE Parking_reservations
     ADD CONSTRAINT fk_Client_id_Parking
     FOREIGN KEY (Client_id) REFERENCES Client(id);

ALTER TABLE Rentals
     ADD COLUMN Client_id INT NOT NULL;
ALTER TABLE Rentals
     ADD CONSTRAINT fk_Client_id_Rentals
     FOREIGN KEY (Client_id) REFERENCES Client(id);

ALTER TABLE Cars
     ADD COLUMN Rentals_id INT NOT NULL;
ALTER TABLE Cars
     ADD CONSTRAINT fk_Rentals_id_cars
     FOREIGN KEY (Rentals_id) REFERENCES Rentals(id);