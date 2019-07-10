const apiPrefix = '/api/';

export const LOGIN_URL = '/login';

/* refs (Reference information)  */
/*****************************************************************/
export const GET_ALGORITMS_URL = apiPrefix + 'refs/algorithms';
export const PUT_ALGORITMS_URL = apiPrefix + 'algorithms';
export const GET_SUMMARY_URL = apiPrefix + 'refs/summary';
export const GET_TOTAL_URL = apiPrefix + 'report/total';
export const POST_REF_ISSUES_CSV_UPLOAD_URL = apiPrefix + 'refs/csv/upload';

/* mkt (Market data)  */
/*****************************************************************/
export const GET_MARKET_DATA_TICKER_URL = apiPrefix + 'mkt/ticker';
export const GET_MARKET_TABLE_DATA_URL = apiPrefix + 'mkt/all';
export const POST_MARKET_CSV_UPLOAD_URL = apiPrefix + 'mkt/csv/upload';

/* base (dynamic normalized data)  */
/*****************************************************************/

export const GET_DEALS_BY_IDS_URL = apiPrefix + 'base/getByIds';
export const GET_BASE_TABLE_DATA_URL = apiPrefix + 'base/all';
export const POST_BASE_UPLOAD_URL = apiPrefix + 'base/upload';

/* algorithms  */
/*****************************************************************/
const algoPrefix = 'algorithms/';
export const GET_ALGOS_STATUS_URL = apiPrefix + algoPrefix + 'status';
export const GET_START_ALGO_URL = apiPrefix + algoPrefix + 'run';
export const RUN_ALL_SELECTED_ALGOS_URL =
  apiPrefix + algoPrefix + 'run-all-selected';
export const ALGO_FINE_TUNING_URL = apiPrefix + algoPrefix + 'fineTuning';
export const RESET_FINE_TUNING_URL = apiPrefix + algoPrefix + 'resetFineTuning';

/* incidents (incidents information)  */
/*****************************************************************/

export const GET_INCIDENT_URL = apiPrefix + 'incident-card/incident';
export const GET_INCIDENTS_COUNT_URL = apiPrefix + 'report/count';
export const GET_NEWS_URL = apiPrefix + 'incident-card/news';

/* cache control  */
/*****************************************************************/
export const POST_CACHE_LOAD_URL = apiPrefix + 'cache/load';
export const POST_CACHE_LOAD_ALL_URL = apiPrefix + 'cache/load/all';
export const GET_CACHE_LIST_URL = apiPrefix + 'cache/list';

/* filter parameters  */
/*****************************************************************/
export const GET_FILTERS_URL = apiPrefix + 'filters';
export const GET_FILTERS_COUNT_URL = GET_FILTERS_URL + '/count';
export const RESET_FILTERS_URL = GET_FILTERS_URL + '/reset';

/* dashboards data  */
/*****************************************************************/
export const GET_ENTERPRISE_SUMMARY_REPORT =
  apiPrefix + 'report/enterprise-summary';
export const GET_RULE_GROUP_REPORT = apiPrefix + 'report/by-rule-group';
export const GET_PERIOD_REPORT = apiPrefix + '/report/by-period';
export const GET_MONTH_REPORT = apiPrefix + '/report/by-month';
export const GET_RULE_MONTH_REPORT = apiPrefix + 'report/rule-month';

/* downloadable reports  */
/*****************************************************************/
export const GET_EXCEL_REPORT = apiPrefix + 'developer/generate/excel';
export const GET_WORD_REPORT = apiPrefix + 'developer/generate/word';
