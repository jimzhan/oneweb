import test from 'ava'
import i18n from './i18n.js'

test('should get default langauge translation', (t) => {
  t.is(i18n.t('home'), 'Home')
  t.is(i18n.t('home', { lng: 'en-us' }), 'Home')
  t.is(i18n.t('home', { lng: 'zh-cn' }), '首页')
  t.is(i18n.t('home', { lng: 'zh-hk' }), '首頁')
})

test('should get language translation from `areas` namespace', (t) => {
  t.is(i18n.t('HK', { ns: 'areas' }), 'Hong Kong')
  t.is(i18n.t('HK', { ns: 'areas', lng: 'en-us' }), 'Hong Kong')
  t.is(i18n.t('HK', { ns: 'areas', lng: 'zh-cn' }), '香港')
  t.is(i18n.t('HK', { ns: 'areas', lng: 'zh-hk' }), '香港')
})
