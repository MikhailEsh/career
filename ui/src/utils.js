import { STATE_KEY } from './constants/state';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STATE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STATE_KEY, serializedState);
  } catch (err) {
    console.exception(err);
  }
};

export const getQueryObject = locationSearchString =>
  locationSearchString
    .substr(1)
    .split('&')
    .reduce((queryObject, keyValuePair) => {
      const [key, value] = keyValuePair.split('=');

      queryObject[key] = value;
      return queryObject;
    }, {});

export const getQueryArray = locationSearchString =>
  locationSearchString
    .substr(1)
    .split('&')
    .reduce((queryArray, keyValuePair) => {
      const [key, value] = keyValuePair.split('=');

      queryArray.push({ name: key, value });
      return queryArray;
    }, []);

export const getCurrentLang = () => {
  const regex = new RegExp(`(?:(?:^|.*;*)lang*=*([^;]*).*$)|^.*$`);
  return document.cookie.replace(regex, '$1') || 'en';
};
