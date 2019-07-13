    import axios from 'axios';
import { stringify } from 'query-string';
import { format, addDays } from 'date-fns';
import ApolloClient from 'apollo-boost';

import { LOGOUT_SUCCESS } from '../constants/actions';
import {
  LOGIN_URL,
  GET_ALGORITMS_URL,
  GET_SUMMARY_URL,
  GET_TOTAL_URL,
  POST_REF_ISSUES_CSV_UPLOAD_URL,
  GET_MARKET_DATA_TICKER_URL,
  POST_MARKET_CSV_UPLOAD_URL,
  POST_BASE_UPLOAD_URL,
  GET_INCIDENTS_COUNT_URL,
  GET_FILTERS_URL,
  GET_FILTERS_COUNT_URL,
  RESET_FILTERS_URL,
  GET_ENTERPRISE_SUMMARY_REPORT,
  GET_RULE_GROUP_REPORT,
  GET_MONTH_REPORT,
  GET_PERIOD_REPORT,
  GET_RULE_MONTH_REPORT,
  POST_CACHE_LOAD_URL,
  POST_CACHE_LOAD_ALL_URL,
  GET_CACHE_LIST_URL,
  GET_ALGOS_STATUS_URL,
  GET_START_ALGO_URL,
  RUN_ALL_SELECTED_ALGOS_URL,
  GET_INCIDENT_URL,
  GET_NEWS_URL,
  PUT_ALGORITMS_URL,
  ALGO_FINE_TUNING_URL,
  RESET_FINE_TUNING_URL,
} from '../constants/api';
import { apiHost } from '../settings';
import store from '../store';
import {
  getRuleFineTuningQuery,
  getChartDealsPriceQuery,
  getChartIncidentsPriceQuery,
  getChartDealsVolumeQuery,
  getChartIncidentsVolumeQuery,
  getDealQuery,
} from '@career/constants/queries';

const getResult = response => response.data;

const axi = axios.create({
  baseURL: apiHost,
  headers: {
    Accept: 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json; charset=utf-8',
  },
});

// Add a response interceptor
// when response status is unautorized we perform logout
axi.interceptors.response.use(undefined, data => {
  if (data.response.status === 401) {
    store.dispatch({ type: LOGOUT_SUCCESS });
  } else {
    const error =
      data.response.data.message || data.message || data.response.statusText;
    throw new Error(error);
  }
  return data;
});

export const { get: apiGet } = axi;
export const { post: apiPost } = axi;

export const graphql = new ApolloClient({
  uri: apiHost + '/graphql',
});

export function login(username, password) {
  return new Promise((resolve, reject) =>
    axi
      .post(
        LOGIN_URL,
        stringify({
          username,
          password,
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getAlgorithms() {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_ALGORITMS_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}