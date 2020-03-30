import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import Aside from '@career/components/common/Aside';
import styles from './index.module.css';
import sortIkon from '@career/assets/img/system/sort-ikon.svg';
import sberIkon from '@career/assets/img/companies/sber-ikon.svg';
import cityIkon from '@career/assets/img/system/city-ikon.svg';
import classNames from "classnames";
import {getAllCompanies} from '@career/services/api';
import {notifyError} from '@career/services/notifications';
import Rating from "@career/components/common/Rating";
import {REVIEWCOMPANIES, LEAVEFEEDBACK} from '@career/constants/routes';

const btnFeedBack = "btnFeedBack";


class Companies extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            allCompanies: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getAllCompanies(100, 1)
            .then(allCompanies => {
                this.setState({
                    allCompanies: allCompanies,
                });
            })
            .catch(error => notifyError(error.message));
    };

    openPageCompany = ev => {
        ev.preventDefault();
        const {history} = this.props;
        if (ev.currentTarget && ev.currentTarget.name !== btnFeedBack) {
            const urlId = ev.currentTarget.id;
            const name = ev.currentTarget.name;
            history.push(REVIEWCOMPANIES.replace(':id', urlId));
        }
    };

    openPageFeedBack = ev => {
        ev.preventDefault();
        ev.stopPropagation();
        const {history} = this.props;
        if (ev.currentTarget) {
            const urlId = ev.currentTarget.id;
            history.push(LEAVEFEEDBACK);
        }
    };

    renderCompanyItem(company) {
        return  <div
            className={styles.item}
            id = {company.id}
            onClick={(e) => this.openPageCompany(e)}
        >
            <div className={styles.company}>
                <div className={styles.logo}><img src={sberIkon}/></div>
                <div className={styles.info}>
                    <p className={styles.name}>{company.name}</p>
                    <p className={styles.service}></p>
                </div>
            </div>

            <div className={styles.rating}>
                <Rating rating={company.averageCommonScale}/>
            </div>
            <div className={styles.city}><img src={cityIkon}/><span>Москва</span></div>
            <div className={styles.reviews}>
                <p>Отзывы:</p>
                <div><span><a href="#">О компании</a><a href="#">{company.countCompanyReview}</a></span><span><a href="#">Об отборе</a><a
                    href="#">{company.countSelectionReview}</a></span><span><a href="#">О зарплате</a><a href="#">{company.countSalaryReview}</a></span>
                </div>
            </div>
            <div className={styles.addReview}>
                <button
                    name = {btnFeedBack}
                    className={classNames(styles.btn, styles.btnBorder)}
                    onClick={(e) => this.openPageFeedBack(e)}
                >Оставить отзыв</button>
            </div>
        </div>
    }

    render() {
        return (
            <main className={classNames(styles.allCompanies, styles.root)}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h1>Все компании</h1>
                        <div className={styles.sort}>
                            <p>Больше 5000 отзывов от пользователей в нашей базе.</p><a
                            href="#"><span>Сортировать</span> <img src={sortIkon}/></a>
                        </div>
                        <div className={styles.allCompaniesContainer}>
                            {
                                this.state.allCompanies.map(company => {
                                    return this.renderCompanyItem(company);
                                })
                            }
                            <a href="#">Загрузить еще</a>
                            <div className={styles.pagination}>
                                <ul>
                                    <li className={styles.active}><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                    <li><a href="#">6</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    {<Aside/>}
                </div>
            </main>
        );
    }
}


const mapDispatchToProps = {
    logIn,
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(Companies));
