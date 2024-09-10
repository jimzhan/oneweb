import fs from 'node:fs'
import path from 'node:path'
import i18next from 'i18next'
import FS from 'i18next-fs-backend'
import { LanguageDetector } from 'i18next-http-middleware'

import * as fsx from './fsx.js'

const key = 'lang' // default is `lng`.
const basedir = fsx.join(import.meta, '../../i18n')

i18next
  .use(FS)
  .use(LanguageDetector)
  .init({
    initImmediate: false,
    returnObjects: true,
    ns: ['areas', 'message'],
    defaultNS: 'message',
    fallbackLng: 'en-us',
    preload: fs.readdirSync(basedir).filter((filename) => {
      const langdir = path.join(basedir, filename)
      return fs.lstatSync(langdir).isDirectory()
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

export default i18next
