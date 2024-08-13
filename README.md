# OneWeb
An opinionated Web application startup kit with a set of best practices.


## Prerequisites

- [Podman](https://podman.io/) for local development


## Foundations

- **Configuration** [Config](https://www.npmjs.com/package/config)
- **Local Infrastruture** [Kafka](https://kafka.apache.org/) + [PostgreSQL@16](https://www.postgresql.org/) + [Redis](https://redis.io/) with [Podman](https://podman.io/)
- **SCA** [ESLint](https://eslint.org/) + [StandardJS](https://standardjs.com/)
- **Test Runner** [Vitest](https://vitest.dev)
- **Web Server** [hapi](https://hapi.dev/)
- **i18n** [i18next](https://www.i18next.com/)


## TODOs

- [x] Configuration
- [x] Authentication (with local PG user pool)
- [x] Swagger Integration (available on `/docs`, SEE `backoffice/src/server/plugins/swagger.js`).
- [x] i18n Support (`querystring` > `cookie` > `session` > `header`, i18n key: `lang`).
- [x] Redis Integration
- [x] Kafka Connector
- [ ] Server-Sent Event supports
- [ ] Standard Log (refer to [AWS Logging](https://docs.aws.amazon.com/prescriptive-guidance/latest/logging-monitoring-for-application-owners/event-attributes.html))


## Configuration Profiles

1. `process.env.NODE_ENV=development` - for local development ONLY, relevant services will be running with containers.
2. `process.env.NODE_ENV=production` - for production deployment, relevant services will be running with actual production services.
3. `process.env.NODE_ENV=test` - for test environment ONLY, relevant services will be running with mock services.


## Folder Structrure (Grouped by Features)

```bash
├── config                                  # Configuration
│   ├── custom-environment-variables.yml    # Custom environment variables with highest priority.
│   ├── default.cjs                         # default settings shared across all environments & deployments.
│   ├── development.cjs                     # `process.env.NODE_ENV=development`local devlopment settings.
│   ├── production.cjs                      # `process.env.NODE_ENV=production` for production settings.
│   ├── test.cjs                            # `process.env.NODE_ENV=test`.
├── db                                      # db's seeds and migrations.
├── e2e                                     # E2E test cases.
├── i18n                                    # i18n languages' supports.
├── src
│   ├── apps
│   │   ├── auth
│   │   │   ├── auth.api.js                 # Auth API
│   │   │   ├── auth.consts.js              # Auth Constants.
│   │   │   └── auth.models.js              # Auth Models Definitions.
│   │   │   ├── auth.schema.js              # Auth I/O schema.
│   │   │   ├── auth.services.js            # Auth services based on Repositories.
│   │   │   └── index.js                    # Auth routes.
│   │   └── index.js                        # Applications' routes
│   ├── core                                # All core and shared modules (biz-agnostic).
│   ├── db                                  # All db related modules (biz-agnostic).
│   ├── server                              # All server related modules (biz-agnostic).
```
