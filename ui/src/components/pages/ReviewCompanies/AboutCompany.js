import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from "./index.module.css";
import classNames from "classnames";
import cityIkon from "@career/assets/img/system/city-ikon.svg";
import markIkon from "@career/assets/img/system/mark-ikon.svg";
import AboutCompanyCardReview from "@career/components/common/AboutCompanyCardReview";
import {getAllReviewByCompany} from "@career/services/api";
import {notifyError} from "@career/services/notifications";


class AboutCompany extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
    }

    static getTabId() {
        return "item-company";
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getAllReviewByCompany(this.props.company.id, 20, 1)
            .then(reviews => {
                this.setState({
                    reviews: reviews,
                });
            })
            .catch(error => notifyError(error.message));
    };

    calcWidth(rating) {
        return (rating / 5 * 100) + "%";
    }

    render() {
        const width = {width: 50 };
        return (
            <div hidden={this.props.selectedTabId !== AboutCompany.getTabId()}>
                <div className={styles.cardContainer}>
                    <div className={classNames(styles.cardContent, styles.about, styles.active)}>
                        <div className={styles.cardContentHeader}>
                            <p className={styles.cardTitle}>Обзор компании</p>
                            <p className={styles.cardRecommended}>Рекомендуют друзьям <span>45%</span></p>
                        </div>
                        <div className={styles.cardContentContainer}>
                            <div className={styles.review}>
                                <div className={styles.item}>
                                    <p>Сайт:</p><span><a href="#">https://sberbank.ru</a></span>
                                </div>
                                <div className={styles.item}>
                                    <p>Сфера деятельности:</p><span>Банк</span>
                                </div>
                                <div className={styles.item}>
                                    <p>Город:</p><span>Москва</span>
                                </div>
                                <div className={styles.item}>
                                    <p>Год основания:</p><span>1997</span>
                                </div>
                                <div className={styles.item}>
                                    <p>Кол-во сотрудников:</p><span>более 5000</span>
                                </div>
                            </div>
                            <div className={styles.description}>
                                <p>Сбербанк — крупнейший банк в России, Центральной и Восточной Европе,
                                    один
                                    из ведущих международных финансовых институтов. </p>
                            </div>
                            <div className={styles.city}><img src={cityIkon}/><span>Москва</span>
                            </div>
                            <div className={styles.dataLines}>
                                <div className={classNames(styles.item, styles.salary)} >
                                    <div className={styles.line} >
                                        <div style={{width: this.calcWidth(this.props.company.averageSalaryScale)}}></div>
                                    </div>
                                    <span>{Number((this.props.company.averageSalaryScale).toFixed(1))}</span>
                                    <p>Зарплата и соцпакет</p>
                                </div>
                                <div className={classNames(styles.item, styles.boss)}>
                                    <div className={styles.line}>
                                        <div  style={{width: this.calcWidth(this.props.company.averageLeadershipScale)}}></div>
                                    </div>
                                    <span>{Number((this.props.company.averageLeadershipScale).toFixed(1))}</span>
                                    <p>Руководство</p>
                                </div>
                                <div className={classNames(styles.item, styles.career)}>
                                    <div className={styles.line}>
                                        <div  style={{width: this.calcWidth(this.props.company.averageCareerScale)}}/>
                                    </div>
                                    <span>{Number((this.props.company.averageCareerScale).toFixed(1))}</span>
                                    <p>Карьерные возможности</p>
                                </div>
                                <div className={classNames(styles.item, styles.culture)}>
                                    <div className={styles.line}>
                                        <div  style={{width: this.calcWidth(this.props.company.averageCultureScale)}}/>
                                    </div>
                                    <span>{Number((this.props.company.averageCultureScale).toFixed(1))}</span>
                                    <p>Культуры и ценности</p>
                                </div>
                                <div className={classNames(styles.item, styles.balance)}>
                                    <div className={styles.line}>
                                        <div  style={{width: this.calcWidth(this.props.company.averageBalanceScale)}}/>
                                    </div>
                                    <span>{Number((this.props.company.averageBalanceScale).toFixed(1))}</span>
                                    <p>Баланс работы и жизни</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.reviews}>
                    <h1>Отзывы о компании</h1>
                    {
                        this.state.reviews.map(review => {
                            return <AboutCompanyCardReview review={review}/>;
                        })
                    }
                </div>
            </div>
        );
    }
}


const mapDispatchToProps = {
    logIn,
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(AboutCompany));
