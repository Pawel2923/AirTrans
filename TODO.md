#### [RESOLVED] Issue 2: api Service Fails on Fresh Boot Until Users Are Manually Provisioned (High)

  • Problem: The migrations container in Docker Compose only executes npm run db:migrate. It does not execute npm run db:provision-users.
  On a clean start, API queries fail with Access denied for user 'client'@'172.x.x.x' until db:provision-users is invoked out-of-band.
  • Resolution: Added npm run db:setup (chaining db:migrate && db:provision-users) and updated migrations service command in docker-compose.yml,
  docker-compose.staging.yml, and docker-compose.prod.yml to use npm run db:setup. Updated provision-users.ts with multi-path dotenv loading and FLUSH PRIVILEGES.

#### [RESOLVED] Issue 3: Local CLI Workflow Fails Out-of-the-Box (Medium)

    When following README.md locally (npm run build && npm run db:migrate outside Docker):

    1. Missing SQL files in dist: Updated npm run build to transpile TS and copy migrations/seeds SQL assets to dist/database via fs.cpSync, along with runtime fallback to source directories.
    2. Missing environment variables: Centralized loadEnv() across database scripts to scan parent and root directories for .env.
    3. Port mismatch on host: Updated client.ts to detect localhost / 127.0.0.1 and default to MYSQLDB_PUBLISHED_PORT (3307) unless DB_PORT is explicitly set.


#### [RESOLVED] Issue 5: MySQL DDL Transactions Cannot Roll Back (Medium)

    • Problem: migrate.ts:86-99 wraps statements in connection.beginTransaction() and connection.rollback(). In MySQL, DDL statements
    (CREATE, ALTER, DROP) trigger an implicit commit. If a migration fails on statement 3 of 5, statements 1 and 2 remain applied, but
    schema_migrations does not record the migration, leaving the database in an inconsistent state.
    • Resolution: Updated migrate.ts to track executed statement count, handle implicit DDL commits during rollback gracefully, and emit a clear warning with statement indices and remediation guidance if a multi-statement migration fails midway. Documented best practices in README.md (single-statement migrations, idempotent DDL, and partial DDL remediation procedures).

#### [RESOLVED] Issue 6: Missing SSL Bind Mounts Crash API in Staging / Prod (Configuration)

    • Problem: docker-compose.staging.yml and docker-compose.prod.yml bind mount /etc/ssl/certs/cloudflare-origin.pem. On systems without
    those certificate files, Docker creates directories on the host, which causes server.ts to fail with EISDIR: illegal operation on a
    directory, read.
    • Resolution: Updated server.ts to verify that SSL certificate files are regular files (isRegularFile with size > 0) rather than directories, safely falling back to HTTP mode when valid certificates are absent. Configured SSL_CERT_PATH and SSL_KEY_PATH as environment variables in compose files and documented them in .env.example.