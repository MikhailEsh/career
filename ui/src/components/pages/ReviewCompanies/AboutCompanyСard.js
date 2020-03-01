import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from "./index.module.css";
import classNames from "classnames";
import cityIkon from "@career/assets/img/system/city-ikon.svg";
import markIkon from "@career/assets/img/system/mark-ikon.svg";
import AboutCompanyReview from './AboutCompanyReview'


class AboutCompanyCard extends PureComponent {
    constructor(props) {
        super(props);
    }

    static getTabId() {
        return "item-company";
    }

    calcWidth(rating) {
        return (rating / 5 * 100) + "%";
    }

    render() {
        const width = {width: 50 };
        return (
            <div hidden={this.props.selectedTabId !== AboutCompanyCard.getTabId()}>
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
                                        <div  style={{width: this.calcWidth(this.props.company.averageCareerScale)}}></div>
                                    </div>
                                    <span>{Number((this.props.company.averageCareerScale).toFixed(1))}</span>
                                    <p>Карьерные возможности</p>
                                </div>
                                <div className={classNames(styles.item, styles.culture)}>
                                    <div className={styles.line}>
                                        <div  style={{width: this.calcWidth(this.props.company.averageCultureScale)}}></div>
                                    </div>
                                    <span>{Number((this.props.company.averageCultureScale).toFixed(1))}</span>
                                    <p>Культуры и ценности</p>
                                </div>
                                <div className={classNames(styles.item, styles.balance)}>
                                    <div className={styles.line}>
                                        <div  style={{width: this.calcWidth(this.props.company.averageBalanceScale)}}></div>
                                    </div>
                                    <span>{Number((this.props.company.averageBalanceScale).toFixed(1))}</span>
                                    <p>Баланс работы и жизни</p>
                                </div>
                            </div>
                            <div className={styles.update}><a href="#"><img
                                src={markIkon}/></a><span>Данные обновлены 18 февраля 2020</span>
                            </div>
                        </div>
                    </div>
                </div>
                {<AboutCompanyReview idCompany={this.props.company.id}/>}
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
)(withRouter(AboutCompanyCard));
