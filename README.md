# AirTrans

*System zarządzania portem lotniczym* - projekt na systemy baz danych

Aplikacja ma na celu umożliwić personelowi zarządzaniem portem lotniczym oraz informowanie i obsługiwanie klientów portu przy pomocy strony internetowej.

[Dokumentacja projektowa](https://drive.google.com/file/d/1yTJbPoBC-0tY5WbNETv8-7BlDOxRRcVz/view?usp=sharing)

[Dokumentacja API](https://airtrans.ddns.net:8443/api-docs/)

[Demo](https://airtrans.ddns.net)

## Funkcjonalności

### Dla klientów

- Rezerwacja parkingu

- Rezerwacja samochodu

- Sprawdzanie lotów

- Sprawdzanie ogłoszeń

### Dla personelu

- Zarządzanie klientami

- Zarządzanie samochodami

- Zarządzanie lotami

- Zarządzanie parkingiem

- Zarządzanie kontami

- Zarządzanie ogłoszeniami

## Technologie

- React - biblioteka do tworzenia interfejsów użytkownika

- Node.js - środowisko uruchomieniowe do tworzenia aplikacji serwerowych

- Express.js - framework do tworzenia aplikacji serwerowych

- MySQL - system zarządzania relacyjnymi bazami danych

- Docker - narzędzie do automatyzacji wdrażania aplikacji w kontenerach

- Stripe - platforma płatności online

- Swagger - narzędzie do tworzenia dokumentacji API

- Nodemailer - moduł do wysyłania emaili

## Status projektu

Główne funkcjonalności aplikacji zostały zaimplementowane. Aplikacja będzie rozwijana w przyszłości.

## Wymagania

Do uruchomienia aplikacji wymagane są następujące składniki:

- Zainstalowany Docker

- Pliki zmiennych środowiskowych `.env` z odpowiednimi zniennymi

- Baza danych z kontami i uprawnieniami

## Instalacja

### Docker

Do działania aplikacji wymagany jest Docker. Więcej informacji o tym jak zainstalować Dockera na swoim systemie operacyjnym znajdziesz na: [Get Docker | Docker docs](https://docs.docker.com/get-docker/?_gl=1*1mcsaa1*_gcl_au*MjA4MzY4OTA0NS4xNzE3MTY0NzI4*_ga*NDQxMzY4NjQuMTcwODQ2NzU1Nw..*_ga_XJWPQMJYHQ*MTcxNzg1Nzc4MC4xNi4xLjE3MTc4NTc3ODcuNTMuMC4w).

### Zmienne środowiskowe

Zmienne środowiskowe znajdują się w plikach `.env`. Należy utworzyć plik w folderze głównym oraz w folderze [`ui`](/ui/) i wprowadzić wymagane zmienne środowiskowe.

Zmienne środowiskowe dla całej aplikacji:

```
MYSQLDB_ROOT_PASSWORD - hasło do konta root bazy danych
MYSQLDB_ADMIN_PASSWORD - hasło do konta admina bazy danych
MYSQLDB_CLIENT_PASSWORD - hasło do konta klienta bazy danych
MYSQLDB_ATC_PASSWORD - hasło do konta atc bazy danych
MYSQLDB_GROUND_CREW_PASSWORD - hasło do konta ground crew bazy danych
MYSQLDB_AIRPORT_STAFF_PASSWORD - hasło do konta airport staff bazy danych
MYSQLDB_PARKING_STAFF_PASSWORD - hasło do konta parking staff bazy danych
MYSQLDB_RENTAL_STAFF_PASSWORD - hasło do konta rental staff bazy danych

MYSQLDB_DATABASE - nazwa bazy danych
MYSQLDB_LOCAL_PORT - port lokalny bazy
MYSQLDB_DOCKER_PORT - port dockera bazy

NODE_LOCAL_PORT - port lokalny api
NODE_DOCKER_PORT - port dockera api

CLIENT_ORIGIN - adres url do ui
CLIENT_API_URL - adres url do api

REACT_LOCAL_PORT - port lokalny ui
REACT_DOCKER_PORT - port dockera ui

SECRET_TOKEN - token logowania
REFRESH_SECRET_TOKEN - token do odświeżania tokenu

STRIPE_PUBLISHABLE_KEY - publiczny klucz do stripe
STRIPE_SECRET_KEY - prywatny klucz do stripe

GMAIL_PASSWORD - hasło aplikacji konta Google
```

Zmienne środowiskowe w folderze [`ui`](/ui/):

```
VITE_CLIENT_API_URL - adres url do api
```

Pamiętaj, aby nie przesyłać pliku `.env` do repozytorium.

### Baza danych

Aby aplikacja działała poprawnie, należy utworzyć bazę danych z kontami i uprawnieniami. W katalogu [`db-dump`](/db-dump/) znajdują się plki `.sql` z eksportami bazy danych. Należy zaimportować najnowszy plik do swojej bazy danych.

## Uruchamianie

Aby uruchomić aplikację należy wykonać nastepujące kroki:

1. Upewnij się, że masz uruchomiony Docker Engine oraz istnieje plik `.env` w folderze głównym projektu
2. Uruchom terminal i przejdź do folderu głównego projektu
3. Uruchom polecenie `docker compose up --build`
4. Poczekaj aż kontenery zostaną uruchomione  
![Uruchomione kontenery](https://i.postimg.cc/3Rvm56hK/image.png)
5. Uruchom przeglądarkę i wpisz adres, który podałeś w pliku `.env` w zmiennej `CLIENT_ORIGIN`

Aby przejść do dokumentacji API wejdź na stronę dostępną pod adresem `CLIENT_API_URL/api-docs` (domyślnie http://localhost:6868/api-docs).
