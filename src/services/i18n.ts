// @flow
import i18next from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';

import zu from './locales/zu.json';
import de from './locales/de.json';

const mapResources = (): any => ({
  de: de[0],
  zu: zu[0],
});

i18next.use(LngDetector).init({
  debug: process.env.NODE_ENV === 'development',
  fallbackLng: ['de', 'zu'],
  resources: mapResources(),
});

export const translate = (
  scope: string,
  path: string,
  params?: Record<any, any>,
): string => i18next.t(`${scope}.${path}`, params);

export const getTranslateByScope = (scope: string) => (
  key: string,
  params?: Record<any, any>,
): any => translate(scope, key, params);

export const getBrowserLocale = (): string => navigator.language;

export default i18next;
