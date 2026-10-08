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

Opcjonalnie dla poleceń administracyjnych:

DB_MIGRATION_USER - użytkownik uruchamiający migracje (domyślnie `root`)
DB_MIGRATION_PASSWORD - hasło użytkownika uruchamiającego migracje (domyślnie `MYSQLDB_ROOT_PASSWORD`)
```

Zmienne środowiskowe w folderze [`ui`](/ui/):

```
VITE_CLIENT_API_URL - adres url do api
```

Pamiętaj, aby nie przesyłać pliku `.env` do repozytorium.

### Baza danych

Aplikacja używa wersjonowanych migracji SQL znajdujących się w [`api/database/migrations`](/api/database/migrations/).
Migracje tworzą tabele, widok, funkcje, procedury i wyzwalacze. Każda migracja jest wykonywana tylko raz,
a jej suma kontrolna jest sprawdzana przy każdym kolejnym uruchomieniu.

Przy uruchamianiu przez Docker Compose usługa `migrations` wykonuje migracje przed uruchomieniem API:

```bash
docker compose up --build
```

Polecenia można też uruchomić ręcznie z katalogu [`api`](/api/):

```bash
npm run build
npm run db:migrate
```

Konfiguracja kont, ról i uprawnień jest oddzielona od migracji i wymaga jawnego uruchomienia:

```bash
npm run db:provision-users
```

Eksportowane dane referencyjne są opcjonalne i nie są częścią migracji schematu:

```bash
npm run db:seed
```

### Modyfikowanie schematu bazy danych

Każdą zmianę schematu należy wprowadzić jako nową migrację SQL. Nie należy edytować migracji,
która została już uruchomiona na którejkolwiek bazie, ponieważ runner wykryje zmianę sumy kontrolnej
i przerwie działanie.

#### Aktualizacja istniejącego komponentu

1. Ustal kolejny unikalny timestamp i utwórz plik w [`api/database/migrations`](/api/database/migrations/),
   na przykład `20261008160000_add_status_to_cars.sql`.
2. Dodaj do pliku wyłącznie zmianę wymaganą przez nowe wydanie, na przykład:

   ```sql
   ALTER TABLE `Cars`
     ADD COLUMN `status` ENUM('AVAILABLE', 'RENTED') NOT NULL DEFAULT 'AVAILABLE';
   ```

3. Jeśli zmiana dotyczy istniejącej tabeli, procedury, funkcji, widoku lub wyzwalacza, zachowaj
   kompatybilność z kodem API albo zmień API w tym samym wydaniu.
4. Uruchom migrację na bazie testowej, a następnie sprawdź, że ponowne uruchomienie nie wykonuje
   jej drugi raz:

   ```bash
   npm run build
   npm run db:migrate
   npm run db:migrate
   ```

#### Utworzenie nowego komponentu

Utwórz osobną migrację dla nowego komponentu i nadaj jej timestamp większy od wszystkich istniejących
migracji. Przykładowe komponenty:

- nowa tabela: `CREATE TABLE ...`,
- nowa kolumna lub indeks: `ALTER TABLE ...`,
- nowy widok: `CREATE VIEW ...`,
- nowa funkcja lub procedura: użyj `DELIMITER $$`,
- nowy wyzwalacz: użyj `DELIMITER $$`.

Przykład migracji tworzącej tabelę:

```sql
CREATE TABLE `Maintenance_logs` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `message` VARCHAR(255) NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB;
```

Jeśli nowy komponent jest używany przez inny komponent, rozdziel migracje tak, aby zależność
powstała później. Tabele i wymagane funkcje powinny być utworzone przed procedurami lub
wyzwalaczami, które się do nich odwołują. Duże lub niezależne zmiany warto umieszczać w osobnych
plikach, aby historia zmian była czytelna.

Migracje powinny zawierać tylko definicje schematu. Nie dodawaj do nich danych testowych, haseł,
użytkowników MySQL ani uprawnień. Dane referencyjne dodawaj do osobnego pliku seed, a konta i
uprawnienia aktualizuj w `db:provision-users`.

Przed wysłaniem zmiany:

1. Sprawdź, czy migracja działa na pustej bazie.
2. Sprawdź, czy działa na bazie zawierającej poprzednie migracje.
3. Uruchom `npm run db:migrate` drugi raz i zweryfikuj brak dodatkowych zmian.
4. Nie usuwaj ani nie zmieniaj historycznych plików migracji. Błędy w migracji naprawiaj nową
   migracją korygującą.

Pliki w [`db-dump`](/db-dump/) są historycznymi eksportami do celów referencyjnych. Nie należy ich używać
jako podstawowej procedury aktualizacji schematu ani importować ich na istniejącą bazę produkcyjną.

## Uruchamianie

Aby uruchomić aplikację należy wykonać nastepujące kroki:

1. Upewnij się, że masz uruchomiony Docker Engine oraz istnieje plik `.env` w folderze głównym projektu
2. Uruchom terminal i przejdź do folderu głównego projektu
3. Uruchom polecenie `docker compose up --build`
4. Poczekaj aż kontenery zostaną uruchomione  
   ![Uruchomione kontenery](https://i.postimg.cc/3Rvm56hK/image.png)
5. Uruchom przeglądarkę i wpisz adres, który podałeś w pliku `.env` w zmiennej `CLIENT_ORIGIN`

Aby przejść do dokumentacji API wejdź na stronę dostępną pod adresem `CLIENT_API_URL/api-docs` (domyślnie http://localhost:6868/api-docs).
