    import axios from 'axios';
import { stringify } from 'query-string';
import { format, addDays } from 'date-fns';
import ApolloClient from 'apollo-boost';
import * as Sentry from '@sentry/browser';

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
    Sentry.withScope(scope => {
      scope.setExtras({ description: error });
      Sentry.captureException(new Error(data.request.responseURL));
    });
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

export function saveAlgorithms(algos) {
  return new Promise((resolve, reject) =>
    axi
      .put(PUT_ALGORITMS_URL, algos)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getAlgosStatus(mode) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_ALGOS_STATUS_URL, {
        params: {
          mode,
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function startAlgo(rule) {
  return new Promise((resolve, reject) =>
    axi
      .post(GET_START_ALGO_URL, rule)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getSummary() {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_SUMMARY_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function runSummary() {
  return new Promise((resolve, reject) =>
    axi
      .post(GET_SUMMARY_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getTotal(priorities, mode) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_TOTAL_URL, {
        params: {
          mode,
          priorities: priorities.join(','),
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Reference tables: upload ref_issues data as CSV
 */
export function postRefIssuesCSVUpload({ file, isUpdate }) {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('isUpdate', isUpdate);
  return new Promise((resolve, reject) =>
    axi
      .post(POST_REF_ISSUES_CSV_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Market data: Short letter designation of the contract
 */
export function getMarketDataTicker() {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_MARKET_DATA_TICKER_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Market data: upload market data as CSV
 */
export function postMarketCSVUpload({
  file,
  currencyContract,
  settlePeriod,
  settleCode,
  timeZone,
  venue,
  isUpdate,
  isPersistence,
}) {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('currencyContract', currencyContract);
  formData.append('settlePeriod', settlePeriod);
  formData.append('settleCode', settleCode);
  formData.append('timeZone', timeZone);
  formData.append('venue', venue);
  formData.append('isUpdate', isUpdate);
  formData.append('isPersistence', isPersistence);
  return new Promise((resolve, reject) =>
    axi
      .post(POST_MARKET_CSV_UPLOAD_URL, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Base data: upload base data as CSV
 */
export function postBaseUpload({ file, isUpdate, isPersistence, type }) {
  let formData = new FormData();
  formData.append('file', file);
  formData.append('isUpdate', isUpdate);
  formData.append('isPersistence', isPersistence);
  return new Promise((resolve, reject) =>
    axi
      .post(POST_BASE_UPLOAD_URL + '/' + type, formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function runAllSelectedAlgos() {
  return new Promise((resolve, reject) =>
    axi
      .post(RUN_ALL_SELECTED_ALGOS_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Incidents information: clients with most incidents
 */
export function getIncidentsCount({ priorities, field, mode }) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_INCIDENTS_COUNT_URL, {
        params: {
          mode,
          priorities: priorities.join(','),
          field: field,
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Get incident by idIncident
 */
export function getIncident(id) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_INCIDENT_URL, { params: { id } })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Get deal by id
 */
export function getDeal(id) {
  return new Promise((resolve, reject) =>
    graphql
      .query(getDealQuery(id))
      .then(response => {
        if (response.errors) {
          throw new Error(response.errors[0]);
        }
        resolve(response.data.BaseEntity);
      })
      .catch(error => reject(error))
  );
}

/**
 * Get filters
 */
export function getFilters() {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_FILTERS_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function putFilters(filters) {
  return new Promise((resolve, reject) =>
    axi
      .put(GET_FILTERS_URL, filters)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function resetFilters() {
  return new Promise((resolve, reject) =>
    axi
      .post(RESET_FILTERS_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Get report slices data counts
 */
export function getFiltersCount() {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_FILTERS_COUNT_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Load specified cache
 */
export function loadCache(cache) {
  return new Promise((resolve, reject) =>
    axi
      .post(POST_CACHE_LOAD_URL, cache)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Load all cache
 */
export function loadCacheAll() {
  return new Promise((resolve, reject) =>
    axi
      .post(POST_CACHE_LOAD_ALL_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getCacheList() {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_CACHE_LIST_URL)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getEnterpriseSummaryReport({
  columns,
  mode,
  ruleGroup,
  priorities,
  ...filters
}) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_ENTERPRISE_SUMMARY_REPORT, {
        params: {
          columns: columns.join(','),
          mode: mode,
          priorities: priorities.join(','),
          rulegroup: ruleGroup,
          ...filters,
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Get report data by rulegroup and columns
 */
export function getRuleGroupReport({
  columns,
  mode,
  ruleGroup,
  priorities,
  ...filters
}) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_RULE_GROUP_REPORT, {
        params: {
          mode: mode,
          columns: columns.join(','),
          priorities: priorities.join(','),
          rulegroup: ruleGroup,
          ...filters,
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Get report data by period and columns
 */
export function getPeriodReport({
  columns,
  mode,
  ruleGroup,
  priorities,
  ...filters
}) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_PERIOD_REPORT, {
        params: {
          mode: mode,
          columns: columns.join(','),
          priorities: priorities.join(','),
          rulegroup: ruleGroup,
          ...filters,
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Get report data by month and columns
 */
export function getMonthReport({
  columns,
  mode,
  ruleGroup,
  priorities,
  ...filters
}) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_MONTH_REPORT, {
        params: {
          mode: mode,
          columns: columns.join(','),
          priorities: priorities.join(','),
          rulegroup: ruleGroup,
          ...filters,
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Get report data by rulegroup and month
 */
export function getRuleMonthReport(priorities, mode) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_RULE_MONTH_REPORT, {
        params: {
          mode: mode,
          priorities: priorities.join(','),
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getNewsByDateRange(start, end) {
  return new Promise((resolve, reject) =>
    axi
      .get(GET_NEWS_URL, {
        params: {
          dateStart: format(start, 'yyyy-MM-dd HH:mm'),
          dateEnd: format(end, 'yyyy-MM-dd HH:mm'),
        },
      })
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getRuleFineTuning(ruleId) {
  return new Promise((resolve, reject) =>
    graphql
      .query(getRuleFineTuningQuery(ruleId))
      .then(response => {
        if (response.errors) {
          throw new Error(response.errors[0]);
        }
        resolve(response.data.RefRulesEntity);
      })
      .catch(error => reject(error))
  );
}

export function saveTuningParams(params) {
  return new Promise((resolve, reject) =>
    axi
      .post(ALGO_FINE_TUNING_URL, params)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function resetTuningParams(fineTuningIds) {
  return new Promise((resolve, reject) =>
    axi
      .post(RESET_FINE_TUNING_URL, fineTuningIds)
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

/**
 * Get comparison chart data
 */
export function getChartDealsPrice(dateFrom, dateTo, ticker) {
  return new Promise((resolve, reject) =>
    graphql
      .query(
        getChartDealsPriceQuery(
          format(dateFrom, 'yyyy-MM-dd'),
          format(addDays(dateTo, 1), 'yyyy-MM-dd'), // until next day
          ticker
        )
      )
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getChartIncidentsPrice(dateFrom, dateTo, ticker) {
  return new Promise((resolve, reject) =>
    graphql
      .query(
        getChartIncidentsPriceQuery(
          format(dateFrom, 'yyyy-MM-dd'),
          format(addDays(dateTo, 1), 'yyyy-MM-dd'), // until next day
          ticker
        )
      )
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getChartDealsVolume(dateFrom, dateTo, ticker) {
  return new Promise((resolve, reject) =>
    graphql
      .query(
        getChartDealsVolumeQuery(
          format(dateFrom, 'yyyy-MM-dd'),
          format(addDays(dateTo, 1), 'yyyy-MM-dd'), // until next day
          ticker
        )
      )
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}

export function getChartIncidentsVolume(dateFrom, dateTo, ticker) {
  return new Promise((resolve, reject) =>
    graphql
      .query(
        getChartIncidentsVolumeQuery(
          format(dateFrom, 'yyyy-MM-dd'),
          format(addDays(dateTo, 1), 'yyyy-MM-dd'), // until next day
          ticker
        )
      )
      .then(response => {
        resolve(getResult(response));
      })
      .catch(error => reject(error))
  );
}
