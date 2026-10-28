# AirTrans

_System zarządzania portem lotniczym_ - projekt na systemy baz danych

Aplikacja ma na celu umożliwić personelowi zarządzaniem portem lotniczym oraz informowanie i obsługiwanie klientów portu przy pomocy strony internetowej.

[Dokumentacja projektowa](https://drive.google.com/file/d/1yTJbPoBC-0tY5WbNETv8-7BlDOxRRcVz/view?usp=sharing)

[Dokumentacja API](https://airtrans.nis-lab.com:8443/api-docs/)

[Demo](https://airtrans.nis-lab.com)

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

- Skonfigurowane zmienne środowiskowe

- Baza danych z kontami i uprawnieniami

## Instalacja

### Docker

Do działania aplikacji wymagany jest Docker. Więcej informacji o tym jak zainstalować Dockera na swoim systemie operacyjnym znajdziesz na: [Get Docker | Docker docs](https://docs.docker.com/get-docker/?_gl=1*1mcsaa1*_gcl_au*MjA4MzY4OTA0NS4xNzE3MTY0NzI4*_ga*NDQxMzY4NjQuMTcwODQ2NzU1Nw..*_ga_XJWPQMJYHQ*MTcxNzg1Nzc4MC4xNi4xLjE3MTc4NTc3ODcuNTMuMC4w).

### Zmienne środowiskowe

Do poprawnego działania aplikacji, potrzebne są odpowiednio skonfigurowane zmienne środowiskowe. W repozytorium dostarczony jest plik `.env.example` z udokumentowanymi zmiennymi, które należy odpowiednio wypełnić i zapisać w pliku `.env` w katalogu głównym projektu.

### Baza danych

Aby aplikacja działała poprawnie, należy utworzyć bazę danych z kontami i uprawnieniami. W katalogu [`db-dump`](/db-dump/) znajdują się plki `.sql` z eksportami bazy danych. Należy zaimportować najnowszy plik do swojej bazy danych.

## Uruchamianie

Aby uruchomić aplikację należy wykonać nastepujące kroki:

1. Upewnij się, że masz uruchomiony Docker Engine oraz istnieje plik `.env` w folderze głównym projektu
2. Uruchom terminal i przejdź do folderu głównego projektu
3. Uruchom polecenie `docker compose up --build`
4. Poczekaj aż kontenery zostaną uruchomione  
   ![Uruchomione kontenery](https://i.postimg.cc/3Rvm56hK/image.png)
5. Uruchom przeglądarkę i wpisz adres, który podałeś w pliku `.env` w zmiennej `UI_ORIGIN` (domyślnie http://localhost:3000)
6. Aby przejść do dokumentacji API wejdź na stronę dostępną pod adresem `API_ORIGIN/api-docs` (domyślnie http://localhost:6868/api-docs).
