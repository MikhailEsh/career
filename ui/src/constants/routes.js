export const LOGIN_PAGE = '/login';
export const IAM_PAGE = '/iam';

/**********************************************************************************/

export const SCHEDULED_PAGE = '/schedule';
export const SCHEDULED_REPORTS_PAGE = SCHEDULED_PAGE + '/reportpage';
export const SCHEDULED_INCIDENTS_BY_RULE_PAGE =
  SCHEDULED_REPORTS_PAGE + '/incidents-by-rule';
export const SCHEDULED_INCIDENT_PAGE =
  SCHEDULED_INCIDENTS_BY_RULE_PAGE + '/incident/:id';
export const SCHEDULED_RULES_PAGE = SCHEDULED_PAGE + '/favorite-algos';
export const RULES_INCIDENTS_BY_RULE_PAGE =
  SCHEDULED_RULES_PAGE + '/incidents-by-rule';
export const SCHEDULED_DEAL_CARD_PAGE =
  RULES_INCIDENTS_BY_RULE_PAGE + '/deal/:id';
export const SCHEDULED_COMPARISON_CHART_PAGE = SCHEDULED_PAGE + '/comparison';
export const SCHEDULED_ARCHIVE_PAGE = SCHEDULED_PAGE + '/archive';
export const SCHEDULED_INCIDENT_LIST_PAGE = '/incidents/';

export const SCHEDULED_NEIGHBORHOOD_DEALS_PAGE =
  RULES_INCIDENTS_BY_RULE_PAGE + '/deal/Neighborhood/:id';
export const SCHEDULED_DEALS_PAGE = SCHEDULED_PAGE + '/deals';

/**********************************************************************************/

export const INVESTIGATION_PAGE = '/investigation';
export const INVESTIGATION_REPORTS_PAGE = INVESTIGATION_PAGE + '/reportpage';
export const INVESTIGATION_RULES_PAGE = INVESTIGATION_PAGE + '/favorite-algos';
export const INVESTIGATION_ARCHIVE_PAGE = INVESTIGATION_PAGE + '/archive';
export const INVESTIGATION_DEALS_PAGE = INVESTIGATION_PAGE + '/deals';

/**********************************************************************************/

export const SANDBOX_PAGE = '/sandbox';
export const SANDBOX_REPORTS_PAGE = SANDBOX_PAGE + '/reportpage';
export const SANDBOX_RULES_PAGE = SANDBOX_PAGE + '/favorite-algos';
export const SANDBOX_ARCHIVE_PAGE = SANDBOX_PAGE + '/archive';
export const UPLOAD_PAGE = SANDBOX_PAGE + '/upload-data';
export const SANDBOX_DEALS_PAGE = SANDBOX_PAGE + '/deals';

/**********************************************************************************/

export const ORDER_PAGE = '/order';
export const MARKET_PAGE = '/market';
export const DEAL_CARD_PAGE = '/deal/:id';
export const CASES_PAGE = '/cases';

/**********************************************************************************/

export const REFERENCE_PAGE = '/reference';
export const REFERENCE_ISSUES_PAGE = REFERENCE_PAGE + '/issues';
export const REFERENCE_STAFF_PAGE = REFERENCE_PAGE + '/staff';

/**********************************************************************************/

export const DEV_TOOLS_PAGE = '/dev';
export const DEV_TOOLS_CONTROL_PANEL_PAGE = DEV_TOOLS_PAGE + '/control';
export const DEV_TOOLS_BASE_CSV_PAGE = DEV_TOOLS_PAGE + '/base-csv';
export const DEV_TOOLS_DEALS_FULL_PAGE = DEV_TOOLS_PAGE + '/deals-full';
export const DEV_TOOLS_PAIRED_DEALS_PAGE = DEV_TOOLS_PAGE + '/d6106';
export const DEV_TOOLS_REF_COUNTERPARTY_PAGE =
  DEV_TOOLS_PAGE + '/ref/counterparty';
export const DEV_TOOLS_REF_ISSUES_PAGE = DEV_TOOLS_PAGE + '/ref/issues';
export const DEV_TOOLS_REF_PORTFOLIO_PAGE = DEV_TOOLS_PAGE + '/ref/portfolio';
export const DEV_TOOLS_REF_STAFF_PAGE = DEV_TOOLS_PAGE + '/ref/staff';
