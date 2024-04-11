USE AirTrans;
INSERT INTO Radar (Altitude, Track, Ground_speed, Latitude, Longitude)
    VALUES (10000.5, 135, 450, 52.2297, 21.0122);
INSERT INTO Airplane (Serial_no, Model, Type, Production_year, Num_of_seats, Fuel_tank, Fuel_quant, Crew_size, Max_cargo)
    VALUES ('ABC123', '787 Dreamliner', 'Passenger', 2018, 350, 80000.0, 30000.0, 3, 150000.0);
INSERT INTO Flight (id, Status, Airline_name, Destination, Arrival, Departure,Radar_id,Airplane_serial_no)
    VALUES ('FL1', 'STARTUJE', 'LOT', 'Warszawa', '2024-04-10 12:00:00', '2024-04-10 10:00:00','1','ABC123');
INSERT INTO Client (First_name, Last_name, Date_of_birth, Gender, Phone_no, Address, Zip_code, Login, Password, Email, Path_to_avatar)
    VALUES ('Jan', 'Kowalski', '1990-05-15', 'M', 123456789, 'ul. Kwiatowa 10', '12-345', 'jan.kowalski', 'haslo123', 'jan.kowalski@onet.com', 'j
an_kowalski.jpg');
INSERT INTO Tickets (purchase_date, expiry_date, ticket_class, seat_no, status, Client_id, Flight_id)
    VALUES ('2024-04-10 10:00:00', '2024-04-10 12:00:00', 'Ekonomiczna', 15, 'Potwierdzony', 1, 'FL1');
INSERT INTO Gates (name, status, Ticket_id)
    VALUES ('Gate 1', 'Open', 1);    
INSERT INTO Personnel (first_name, last_name, position, permissions, login, password, path_to_avatar, Gates_id, Flight_id)
     VALUES ('Jan', 'Nowak', 'Pracownik lotniska', 'Administrator', 'jan.nowak', 'haslo123', 'jan_nowak.jpg', 1, 'FL1');
INSERT INTO Announcements (Title, Content, Valid_until, Personnel_id)
    VALUES ('Nowe zasady bezpieczeństwa', 'Informujemy, że wprowadziliśmy nowe zasady bezpieczeństwa na lotnisku. Prosimy o zapoznanie się z nimi.', '2024-04-30 23:59:59', 1);
INSERT INTO Equipment (Name, Type, Serial_no, Location, Personel_id)
     VALUES ('Laptop', 'Komputer przenośny', 'ABC123', 'Biuro', 1);
INSERT INTO Luggage (Type, Size, Weight, Client_id)
     VALUES ('Walizka', 'Średnia', 15.5, 1);
INSERT INTO Parking_reservations (Parking_level, Space_id, Since, Until, License_plate, Price_per_day, Client_id)
    VALUES ('A', '101', '2024-04-10 08:00:00', '2024-05-12 08:00:00', 'ABC123', 25.00, 1);
INSERT INTO Rentals (Rental_date, Return_date, Status, Client_id)
     VALUES ('2024-04-10 09:00:00', '2024-08-12 09:00:00', 'Zarezerwowany', 1);
INSERT INTO Cars (Brand, Model, Production_year, License_plate, Price_per_day, Path_to_img, Fuel_type, Transmission_type, Rentals_id)
     VALUES ('Mercedes', 'AMG', 2020, 'ABC123', 50.00, 'AMGMercedes.jpg', 'Benzyna', 'Automatyczna', 1);
INSERT INTO Runway (Id, Length, Is_available, Flight_id)
    VALUES ('RW1', 3000.0, 1, 'FL1'); 
INSERT INTO Apron (Is_available, Flight_id)
     VALUES ('Wolny', 'FL1');
INSERT INTO Taxiway (Id, Is_available, Flight_id)
     VALUES ('TW1', 1, 'FL1');    