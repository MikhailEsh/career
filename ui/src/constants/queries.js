import gql from 'graphql-tag';
import { getTime } from 'date-fns';

export const getAllCompanyQuery = () => ({
  query: gql`
    query{
      CompanyEntityList(paginator: {
        size:100,page:1
      }){
      totalPages
      totalElements
      content {
        countSelectionReview
        id
        countCompanyReview
        name
        countSalaryReview
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
      countSalaryReview
    }
  }
  `,
  fetchPolicy: 'network-only',
});

export const getAllReviewByCompanyQuery = companyId => ({
  query: gql`
    query {
        ReviewCompanyEntityList(paginator:{
  size:20,page:1
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
      approved
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
  size:20,page:1
  }, qfilter: {operator: equals, key: "company.id", value: "${companyId}"}) {
     totalPages
    totalElements
    content {
      position
      userId
      id
      salaryRubInMonth
    } 
    }
  `,
  fetchPolicy: 'no-cache',
});


export const getTopReviewQuery = () => ({
  query: gql`
    query{
    ReviewCompanyEntityList(paginator:{
    size:1,page:1
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
        approved
        cultureScale
        timeAdded(OrderBy: DESC)
        managementAdvice
      } 
    }
  }
  `,
  fetchPolicy: 'no-cache',
});

