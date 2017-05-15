/**
 * @typedef {'en'|'zh-HK'} translationOptions
 */

import Reflux from 'reflux';
import tStrings from './data/translations.js';

import Http from '../services/http';

export const TranslationActions = Reflux.createActions([
  'setLocale',
  'getTranslations'
]);

export const getLocale = () => {
  return localStorage.getItem("locale") || "en";
};

/** @param {translationOptions} str */
export const getTranslations = (str) => {
  const key = str || getLocale();
  return tStrings[key];
};

class TranslationStore extends Reflux.Store {
  constructor() {
    super();
    this.state = {
      locale: getLocale(),
      tStrings: getTranslations()
    };
    this.listenables = TranslationActions;
  }

  /** @param {translationOptions} str */
  setLocale(str) {
    if (!str) return null;
    const nextState = this.state;
    nextState.locale = str;
    nextState.tStrings = tStrings[str];
    this.setState(nextState);
    Http.log({
      name: "ChangeTranslation",
      action: "Click",
      target: str,
      component: "Navbar"
    });
  }
}

export default TranslationStore;
