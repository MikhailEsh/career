import gql from 'graphql-tag';
import { getTime } from 'date-fns';

export const getRuleFineTuningQuery = ruleId => ({
  query: gql`
    query($id: UUID!) {
      RefRulesEntity(id: $id) {
        id
        ruleCode
        isWork
        isGraph
        favourite
        tunings {
          id
          user
          priority
          params {
            id
            name
            value
            defaultValue
            operator
            editable
          }
        }
        ruleGroup
      }
    }
  `,
  variables: {
    id: ruleId,
  },
  fetchPolicy: 'network-only',
});

export const getChartDealsPriceQuery = (dateFrom, dateTo, ticker) => ({
  query: gql`
    query {
      MktEntityList (
        qfilter: {
          key: "mktDTime",
          value: "${getTime(new Date(dateFrom))}",
          operator: greaterThan,
          combinator: AND,
          next: {
            key: "mktDTime",
            value: "${getTime(new Date(dateTo))}",
            operator: lessThan,
            combinator: AND,
            next: {
              key: "ticker",
              value: "${ticker}",
              operator: equals
            }
          }
        }
      ) {
        content {
          mktDTime
          mktLow
          mktHigh
        }
      }
      BaseEntityList (
        qfilter: {
          key: "dealDtime",
          value: "${getTime(new Date(dateFrom))}",
          operator: greaterThan,
          combinator: AND,
          next: {
            key: "dealDtime",
            value: "${getTime(new Date(dateTo))}",
            operator: lessThan,
            combinator: AND,
            next: {
              key: "ticker",
              value: "${ticker}",
              operator: equals
            }
          }
        }
      ) {
        content {
          dealDtime
          baseDealId{
            dealId
          }
          baseSpotForward {
            price
          }
        }
      }
    }
  `,
});

export const getChartIncidentsPriceQuery = (dateFrom, dateTo, ticker) => ({
  query: gql`
    query {
      MktEntityList (
        qfilter: {
          key: "mktDTime",
          value: "${getTime(new Date(dateFrom))}",
          operator: greaterThan,
          combinator: AND,
          next: {
            key: "mktDTime",
            value: "${getTime(new Date(dateTo))}",
            operator: lessThan,
            combinator: AND,
            next: {
              key: "ticker",
              value: "${ticker}",
              operator: equals
            }
          }
        }
      ) {
        content{
          mktDTime
          mktLow
          mktHigh
        }
      }
      IncidentEntityList (
        qfilter: {
          key: "deals.dealDtime",
          value: "${getTime(new Date(dateFrom))}",
          operator: greaterThan,
          combinator: AND,
          next: {
            key: "deals.dealDtime",
            value: "${getTime(new Date(dateTo))}",
            operator: lessThan,
            combinator: AND,
            next: {
              key: "deals.ticker",
              value: "${ticker}",
              operator: equals
            }
          }
        }
      ) {
        content{
          deals{
            ticker
            dealDtime
            baseDealId{
              dealId
            }
            baseSpotForward{
              price
            }
          }
        }
      }
    }
  `,
});

export const getChartDealsVolumeQuery = (dateFrom, dateTo, ticker) => ({
  query: gql`
    query {
      MktEntityList (
        qfilter: {
          key: "mktDTime",
          value: "${getTime(new Date(dateFrom))}",
          operator: greaterThan,
          combinator: AND,
          next: {
            key: "mktDTime",
            value: "${getTime(new Date(dateTo))}",
            operator: lessThan,
            combinator: AND,
            next: {
              key: "ticker",
              value: "${ticker}",
              operator: equals
            }
          }
        }
      ) {
        content{
          mktDTime
          mktVolA
        }
      }
      BaseEntityList (
        qfilter: {
          key: "dealDtime",
          value: "${getTime(new Date(dateFrom))}",
          operator: greaterThan,
          combinator: AND,
          next: {
            key: "dealDtime",
            value: "${getTime(new Date(dateTo))}",
            operator: lessThan,
            combinator: AND,
            next: {
              key: "ticker",
              value: "${ticker}",
              operator: equals
            }
          }
        }
      ) {
        content{
          dealDtime
          baseDealId{
            dealId
          }
          baseSpotForward{
            volumeAsset
          }
        }
      }
    }
  `,
});

export const getChartIncidentsVolumeQuery = (dateFrom, dateTo, ticker) => ({
  query: gql`
    query {
      MktEntityList (
        qfilter: {
          key: "mktDTime",
          value: "${getTime(new Date(dateFrom))}",
          operator: greaterThan,
          combinator: AND,
          next: {
            key: "mktDTime",
            value: "${getTime(new Date(dateTo))}",
            operator: lessThan,
            combinator: AND,
            next: {
              key: "ticker",
              value: "${ticker}",
              operator: equals
            }
          }
        }
      ) {
        content{
          mktDTime
          mktVolA
        }
      }
      IncidentEntityList (
        qfilter: {
          key: "deals.dealDtime",
          value: "${getTime(new Date(dateFrom))}",
          operator: greaterThan,
          combinator: AND,
          next: {
            key: "deals.dealDtime",
            value: "${getTime(new Date(dateTo))}",
            operator: lessThan,
            combinator: AND,
            next: {
              key: "deals.ticker",
              value: "${ticker}",
              operator: equals
            }
          }
        }
      ) {
        content{
          deals{
            ticker
            dealDtime
            baseDealId{
              dealId
            }
            baseSpotForward{
              volumeAsset
            }
          }
        }
      }
    }
  `,
});

export const getDealQuery = dealId => ({
  query: gql`
    query($id: UUID!) {
      BaseEntity(id: $id) {
        venue
        desk
        trader
        salesTeam
        dealDtime
        contractcode
        dealtype
        ticker
        asset
        assetClass
        businessLine
        backOffice
        middleOffice
        lastEditedBy
        user
        statusDeal
        location
        client
        counterparty
        dealsourcetype
        dealmode
        portfolio
        broker
        currencyContract
        dealDtimeAmended
        dealDtimeAmendedEntry
        dealDtimeCancelled
        baseSpotForward {
          contractDirection
          mktHigh
          mktLow
          vdateAsset
          vdateBase
          clientMargin
          price
          volumeAsset
          volumeBase
          mktOpen
          mktClose
          currency
          discount
          netting
        }
        baseOption {
          optionPremium
          strike
          optionType
        }
        baseDealId {
          dealId01
          dealIdLinked
          orderIdAg
          dealIdSwapRepo
          dealNum
        }
        baseSpotAddFi {
          accrued
          interestRate
          interestRateType
          maturityDate
        }
      }
    }
  `,
  variables: {
    id: dealId,
  },
  fetchPolicy: 'network-only',
});
