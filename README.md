# OneWeb
An opinionated Web application startup kit with a set of best practices.


## Prerequisites

- [Podman](https://podman.io/) for local development


## Foundations

- **Configuration** [Confidence](https://www.npmjs.com/package/@hapipal/confidence)
- **Local Infrastruture** [Kafka](https://kafka.apache.org/) + [PostgreSQL@16](https://www.postgresql.org/) + [Redis](https://redis.io/) with [Podman](https://podman.io/)
- **SCA** [ESLint](https://eslint.org/) + [StandardJS](https://standardjs.com/)
- **Test Runner** [Ava](https://github.com/avajs/ava)
- **Web Server** [hapi](https://hapi.dev/)
- **i18n** [i18next](https://www.i18next.com/)


## TODOs

- [x] Configuration
- [x] Authentication (with local PG user pool)
- [x] Swagger Integration (available on `/docs`, SEE `src/server/plugins/swagger.js`).
- [x] i18n Support (`querystring` > `cookie` > `session` > `header`, i18n key: `lang`).
- [ ] Server-Sent Event supports
- [ ] Standard Log (refer to [AWS Logging](https://docs.aws.amazon.com/prescriptive-guidance/latest/logging-monitoring-for-application-owners/event-attributes.html))


## Configuration Profiles

1. `process.env.NODE_ENV=development` - for local development ONLY, relevant services will be running with containers.
2. `process.env.NODE_ENV=production` - for production deployment, relevant services will be running with actual production services.
3. `process.env.NODE_ENV=test` - for test environment ONLY, relevant services will be running with mock services.


## Folder Structrure (Grouped by Features)
