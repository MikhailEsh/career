import axios from 'axios';
import {stringify} from 'query-string';
import ApolloClient from 'apollo-boost';

import {LOGOUT_SUCCESS} from '../constants/actions';
import {
    LOGIN_URL
} from '../constants/api';
import {apiHost} from '../settings';
import store from '../store';
import {
    getAllCompanyQuery,
    getCompanyByIdQuery,
    getAllReviewByCompanyQuery,
    getReviewSalariesByCompanyQuery,
    getTopReviewQuery
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
        store.dispatch({type: LOGOUT_SUCCESS});
    } else {
        const error =
            data.response.data.message || data.message || data.response.statusText;
        throw new Error(error);
    }
    return data;
});

export const {get: apiGet} = axi;
export const {post: apiPost} = axi;

export const graphql = new ApolloClient({
    uri: apiHost + '/graphql',
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'ignore',
        },
        query: {
            fetchPolicy: 'no-cache',
            errorPolicy: 'all',
        },
    },
});

export function getAllCompanies() {
    return new Promise((resolve, reject) =>
        graphql
            .query(getAllCompanyQuery())
            .then(response => {
                if (response.errors) {
                    throw new Error(response.errors[0]);
                }
                resolve(response.data.CompanyEntityList.content);
            })
            .catch(error => reject(error))
    );
}

export function getCompanyById(id) {
    return new Promise((resolve, reject) =>
        graphql
            .query(getCompanyByIdQuery(id))
            .then(response => {
                if (response.errors) {
                    throw new Error(response.errors[0]);
                }
                resolve(response.data.CompanyEntity);
            })
            .catch(error => reject(error))
    );
}

export function getAllReviewByCompany(companyId) {
    return new Promise((resolve, reject) =>
        graphql
            .query(getAllReviewByCompanyQuery(companyId))
            .then(response => {
                if (response.errors) {
                    throw new Error(response.errors[0]);
                }
                resolve(response.data.ReviewCompanyEntityList.content);
            })
            .catch(error => reject(error))
    );
}

export function getReviewSalariesByCompany(companyId) {
    return new Promise((resolve, reject) =>
        graphql
            .query(getReviewSalariesByCompanyQuery(companyId))
            .then(response => {
                if (response.errors) {
                    throw new Error(response.errors[0]);
                }
                resolve(response.data.ReviewSalaryEntityList.content);
            })
            .catch(error => reject(error))
    );
}

export function getTopReview() {
    return new Promise((resolve, reject) =>
        graphql
            .query(getTopReviewQuery())
            .then(response => {
                if (response.errors) {
                    throw new Error(response.errors[0]);
                }
                resolve(response.data.ReviewCompanyEntityList.content[0]);
            })
            .catch(error => reject(error))
    );
}


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


