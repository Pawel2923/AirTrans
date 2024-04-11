USE AirTrans;
INSERT INTO Apron (Is_available, Flight_id)
     VALUES ('Wolny', 'FL1');
INSERT INTO Taxiway (Id, Is_available, Flight_id)
     VALUES ('TW1', 1, 'FL1'); 