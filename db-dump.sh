#!bin/bash
currentDatetime=$(date +"%Y.%m.%d_%H-%M-%S")
mysqldump -u root -p --databases AirTrans > /db-dump/$currentDatetime.sql