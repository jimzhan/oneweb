import { expect, test } from 'vitest'
import i18n from './i18n.js'

test('should get default language translation', () => {
  expect(i18n.t('home')).toBe('Home')
  expect(i18n.t('home', { lng: 'en-us' })).toBe('Home')
  expect(i18n.t('home', { lng: 'zh-cn' })).toBe('首页')
  expect(i18n.t('home', { lng: 'zh-hk' })).toBe('首頁')
})

test('should get language translation from `areas` namespace', () => {
  expect(i18n.t('HK', { ns: 'areas' })).toBe('Hong Kong')
  expect(i18n.t('HK', { ns: 'areas', lng: 'en-us' })).toBe('Hong Kong')
  expect(i18n.t('HK', { ns: 'areas', lng: 'zh-cn' })).toBe('香港')
  expect(i18n.t('HK', { ns: 'areas', lng: 'zh-hk' })).toBe('香港')
})
