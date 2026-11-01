#### [RESOLVED] Issue 2: api Service Fails on Fresh Boot Until Users Are Manually Provisioned (High)

  • Problem: The migrations container in Docker Compose only executes npm run db:migrate. It does not execute npm run db:provision-users.
  On a clean start, API queries fail with Access denied for user 'client'@'172.x.x.x' until db:provision-users is invoked out-of-band.
  • Resolution: Added npm run db:setup (chaining db:migrate && db:provision-users) and updated migrations service command in docker-compose.yml,
  docker-compose.staging.yml, and docker-compose.prod.yml to use npm run db:setup. Updated provision-users.ts with multi-path dotenv loading and FLUSH PRIVILEGES.

#### Issue 3: Local CLI Workflow Fails Out-of-the-Box (Medium)

    When following README.md locally (npm run build && npm run db:migrate outside Docker):

    1. Missing SQL files in dist: tsc only transpiles .ts to .js; it does not copy .sql files into dist/database/migrations. The runner
    throws ENOENT: no such file or directory, scandir .../dist/database/migrations.
    2. Missing environment variables: migrate.ts calls dotenv.config() without specifying a path, looking only for api/.env rather than the
    root .env.
    3. Port mismatch on host: client.ts defaults to port 3306 (MYSQLDB_INTERNAL_PORT), but Docker publishes MySQL to port 3307
    (MYSQLDB_PUBLISHED_PORT), causing connection timeouts when connecting from localhost.


#### Issue 5: MySQL DDL Transactions Cannot Roll Back (Medium)

    • Problem: migrate.ts:86-99 wraps statements in connection.beginTransaction() and connection.rollback(). In MySQL, DDL statements
    (CREATE, ALTER, DROP) trigger an implicit commit. If a migration fails on statement 3 of 5, statements 1 and 2 remain applied, but
    schema_migrations does not record the migration, leaving the database in an inconsistent state.
    • Remediation: Emphasize single-statement migrations or idempotent DDL, and document that partial DDL migrations require manual
    remediation.

#### Issue 6: Missing SSL Bind Mounts Crash API in Staging / Prod (Configuration)

    • Problem: docker-compose.staging.yml and docker-compose.prod.yml bind mount /etc/ssl/certs/cloudflare-origin.pem. On systems without
    those certificate files, Docker creates directories on the host, which causes server.ts to fail with EISDIR: illegal operation on a
    directory, read.