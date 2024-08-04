import i18next from 'i18next'
import FS from 'i18next-fs-backend'
import path from 'node:path'
import { lstatSync, readdirSync } from 'node:fs'
import { LanguageDetector } from 'i18next-http-middleware'

import { fsx, pkg } from '../../core/index.js'

const key = 'lang' // default is `lng`.
const basedir = fsx.dirname(import.meta, '../../../i18n')

i18next
  .use(FS)
  .use(LanguageDetector)
  .init({
    initImmediate: false,
    returnObjects: true,
    ns: ['areas', 'message'],
    defaultNS: 'message',
    fallbackLng: 'en-us',
    preload: readdirSync(basedir).filter((filename) => {
      const langdir = path.join(basedir, filename)
      return lstatSync(langdir).isDirectory()
    }),
    backend: {
      loadPath: path.join(basedir, '{{ lng }}/{{ ns }}.json')
    },
    detection: {
      caches: ['cookie'],
      // order and from where user language should be detected.
      order: ['querystring', 'cookie', 'session', 'header'],
      ignoreCase: true,
      // keys or params to lookup language from
      lookupCookie: key,
      lookupQuerystring: key,
      lookupSession: key,
      lookupHeader: 'accept-language'
    }
  })

export const plugin = {
  name: 'i18next',
  version: pkg.version,
  register: async function(server, _) {
    server.ext('onPreHandler', (request, h) => {
      const t = i18next.getFixedT(request.headers['accept-language'])
      request.i18n = i18next
      request.t = t
      return h.continue
    })
  }
}
