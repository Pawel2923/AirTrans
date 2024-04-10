USE AirTrans;
ALTER TABLE Flight
ADD CONSTRAINT uc_Airplane_serial_no UNIQUE (Airplane_serial_no);

ALTER TABLE Runway
ADD CONSTRAINT uc_Flight_id UNIQUE (Flight_id);

ALTER TABLE Apron
ADD CONSTRAINT uc_Flight_id UNIQUE (Flight_id);

ALTER TABLE Taxiway
ADD CONSTRAINT uc_Flight_id UNIQUE (Flight_id);

ALTER TABLE Tickets
ADD CONSTRAINT uc_Flight_id UNIQUE (Flight_id);

ALTER TABLE Gates
ADD CONSTRAINT uc_Ticket_id UNIQUE (Ticket_id);

ALTER TABLE Rentals
ADD CONSTRAINT uc_Client_id UNIQUE (Client_id);

ALTER TABLE Luggage
ADD CONSTRAINT uc_Client_id UNIQUE (Client_id);
 