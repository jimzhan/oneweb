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
- **Yarn Workspaces** [Monorepo with Yarn](https://yarnpkg.com/features/workspaces)


## TODOs

- [x] Configuration
- [ ] Authentication (with local PG user pool)
- [ ] Swagger Integration
- [ ] Redis Integration
- [ ] Kafka Connector
- [ ] i18n Support
- [ ] Standard Log (refer to [AWS Logging](https://docs.aws.amazon.com/prescriptive-guidance/latest/logging-monitoring-for-application-owners/event-attributes.html))
- [ ] Server-Sent Event supports


## Bootstrap

```shell
yarn
yarn workspace backoffice infra:up
yarn workspace backoffice db:init
```


## Folder Structrure (Grouped by Features) for Backoffice

```bash
├── config                                  # Configuration
│   ├── custom-environment-variables.yml    # Custom environment variables with highest priority.
│   ├── default.yml                         # default settings shared across all environments & deployments.
│   ├── localhost.yml                       # `process.env.NODE_CONFIG_ENV=localhost`local devlopment settings.
│   ├── test.yml                            # `process.env.NODE_ENV=test`.
│   ├── uat.yml                             # `process.env.NODE_ENV=production` and `process.env.NODE_CONFIG_ENV=uat`.
├── db                                      # db's seeds and migrations.
├── e2e                                     # E2E test cases.
├── i18n                                    # i18n languages' supports.
├── src
│   ├── apps
│   │   ├── auth
│   │   │   ├── auth.api.js                 # Auth API
│   │   │   ├── auth.consts.js              # Auth Constants.
│   │   │   └── auth.models.js              # Auth Models Definitions.
│   │   │   └── auth.repos.js               # Auth Repositories for Data Access Abstractions.
│   │   │   ├── auth.schema.js              # Auth I/O schema.
│   │   │   ├── auth.services.js            # Auth services based on Repositories.
│   │   │   └── index.js                    # Auth routes.
│   │   └── index.js                        # Applications' routes
│   ├── core                                # All core and shared modules (biz-agnostic).
│   ├── db                                  # All db related modules (biz-agnostic).
│   ├── server                              # All server related modules (biz-agnostic).
```
