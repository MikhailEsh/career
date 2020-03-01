import gql from 'graphql-tag';
import { getTime } from 'date-fns';

export const getAllCompanyQuery = (size, page) => ({
  query: gql`
    query{
      CompanyEntityList(paginator: {
        size:${size},page:${page}
      }){
      totalPages
      totalElements
      content {
        countSelectionReview
        id
        countCompanyReview
        name
        countSalaryReview
        averageCommonScale
      }  
    }
   }
  `,
  fetchPolicy: 'network-only',
});

export const getCompanyByIdQuery = (id) => ({
  query: gql`
  query{
    CompanyEntity(id: "${id}"){
      countSelectionReview,
      countCompanyReview,
      id,
      name,
      countSalaryReview,
      averageCommonScale,
      averageSalaryScale,
      averageLeadershipScale,
      averageCareerScale,
      averageBalanceScale,
      averageCultureScale
    }
  }
  `,
  fetchPolicy: 'network-only',
});

export const getAllReviewByCompanyQuery = (companyId, size, page) => ({
  query: gql`
    query {
        ReviewCompanyEntityList(paginator:{
  size:${size},page:${page}
  }, qfilter: {operator: equals, key: "company.id", value: "${companyId}"}) {
    totalPages
    totalElements
    content {
      salaryScale
      minuses
      recommend
      date
      leadershipScale
      useful
      workDepartment
      company {
        id
      }
      commonScale
      plus
      timeAdded
      position
      userId
      id
      status
      dateWork
      balanceWorkHomeScale
      name
      careerScale
      cultureScale
      managementAdvice
    } 
  }
    }
  `,
  fetchPolicy: 'no-cache',
});


export const getReviewSalariesByCompanyQuery = companyId => ({
  query: gql`
    query {
        ReviewSalaryEntityList(paginator:{
  size:100,page:1
  }, qfilter: {operator: equals, key: "company.id", value: "${companyId}"}) {
     totalPages
    totalElements
    content {
      timeAdded
      isApproved
      position
      salaryRubInMonth
      id
    } 
    }
    }
  `,
  fetchPolicy: 'no-cache',
});


export const getTopReviewQuery = (size, page) => ({
  query: gql`
    query{
    ReviewCompanyEntityList(paginator:{
    size:${size},page:${page}
    }) {
      totalPages
      totalElements
      content {
        salaryScale
        minuses
        recommend
        date
        leadershipScale
        useful
        workDepartment
        company {
          id
          name
        }
        commonScale
        plus
        position
        userId
        id
        status
        dateWork
        balanceWorkHomeScale
        name
        careerScale
        cultureScale
        timeAdded(OrderBy: DESC)
        managementAdvice
      } 
    }
  }
  `,
  fetchPolicy: 'no-cache',
});

