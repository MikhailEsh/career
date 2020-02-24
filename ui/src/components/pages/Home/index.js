import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import classNames from "classnames";
import starGreen from '@career/assets/img/system/star-green.svg';
import star50 from '@career/assets/img/system/star-50.svg';
import starGrey from '@career/assets/img/system/star-grey.svg';
import minus from "@career/assets/img/system/minus.svg";
import plus from "@career/assets/img/system/plus.svg";
import {getTopReview, getAllCompanies} from '@career/services/api';
import {notifyError} from '@career/services/notifications';
import cityIkon from "@career/assets/img/system/city-ikon.svg";
import Moment from 'react-moment';
import 'moment/locale/ru'


class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            allCompanies: [],
            topReviews: []
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

        getTopReview(3, 1)
            .then(topReviews => {
                this.setState({
                    topReviews: topReviews,
                });
            })
            .catch(error => notifyError(error.message));
    };

    getStar(sign, rating) {
        debugger
        if ((rating - sign) > 0) {
            if ((rating - sign) < 1) {
                return star50;
            } else return starGreen;
        } else return starGrey;
    }

    renderRating(scale) {
        const roundRating = Number((scale).toFixed(1));
        const positions = Array.from(Array(5).keys());
        return <div className={styles.rating}>
            <div className="stars">
                {
                    positions.map(position => {
                        return <img src={this.getStar(position, roundRating)}/>;
                    })
                }
            </div>
            <span>{Number((roundRating).toFixed(1))}</span>
        </div>
    }

    renderCompanyItem(company) {
        return <div className={styles.item} id={company.id}>
            <div className={styles.employerInfo}>
                <div className={styles.employerCompanyContainer}>
                    <div className={styles.employerLogo}><img src="/assets/img/companyIcon/sber-ikon.svg"/></div>
                    <div className={styles.employerCompany}>
                        <p>{company.name}</p>
                    </div>
                </div>
                <div className={styles.employerAllReviews}>
                    <p>Всего
                        отзывов: <span>{company.countCompanyReview + company.countSalaryReview + company.countSelectionReview}</span>
                    </p>
                </div>
                <div className={styles.employerReviews}>
                    <p>Отзывы: <span>О компании<a href="#">{company.countCompanyReview}</a></span><span>О зарплате<a
                        href="#">{company.countSalaryReview}</a></span><span>Об отборе<a
                        href="#">{company.countSelectionReview}</a></span></p>
                </div>
            </div>
            {this.renderRating(company.averageCommonScale)}
        </div>;
    }

    calcPlusMinus(rating) {
        debugger
        if (rating >= 2.5) {
            return plus
        } else return minus
    }

    renderReviewItem(review) {
        return <div className={styles.item}>
            <div className={styles.reviewHeader}>
                <div className={styles.reviewCompany}>
                    <div className={styles.logo}><img src="/assets/img/companyIcon/sber-ikon.svg"/></div>
                    <div className={styles.company}>
                        <p>{review.company.name}</p>
                        {this.renderRating(review.commonScale)}
                    </div>
                </div>
                <div className="date"><Moment format="LL" locale="ru" date={review.timeAdded}/></div>
            </div>
            <div className={styles.reviewContent}>
                <p className={styles.title}>Плюсы:</p>
                <p className={styles.text}>{review.plus}</p>
                <br/>
                <p className={styles.title}>Минусы:</p>
                <p className={styles.text}>{review.minuses}</p>
            </div>
            <div className={styles.reviewFooter}>
                <div className={styles.advantages}>
                    <div className={styles.itemAdvantage}><img
                        src={this.calcPlusMinus(review.salaryScale)}/><span>Зарплата</span></div>
                    <div className={styles.itemAdvantage}><img
                        src={this.calcPlusMinus(review.leadershipScale)}/><span>Руководство</span></div>
                    <div className={styles.itemAdvantage}><img
                        src={this.calcPlusMinus(review.careerScale)}/><span>Карьера</span></div>
                </div>
                <div className={styles.city}><img src={cityIkon}/><span>Москва</span></div>
            </div>
        </div>
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.mainScreen}>
                    <div className={styles.overlay}></div>
                    <div className={styles.container}>
                        <p className={styles.title}>Поиск отзывов
                            о <span>работодателях</span> и <span>зарплатах</span> при
                            отборе компании</p>
                        <p className={styles.subtitle}>Больше 5000 отзывов от пользователей в нашей базе. Проверь
                            компанию
                            прежде чем идти на собеседование.</p>
                        <form>
                            <input type="text" name="company" placeholder="Название компании..."/>
                            <select>
                                <option value="prof1" disabled="disabled">Выбрать профессию</option>
                                <option value="prof2">Профессия</option>
                                <option value="prof3">Профессия</option>
                            </select>
                            <input className={classNames(styles.btn, styles.btnGreen)} type="submit"
                                   value="Найти отзыв"/>
                        </form>
                    </div>
                </div>
                <main className={styles.index}>
                    <div className={styles.login}>
                        <div className={styles.container}>
                            <div className={styles.title}>Войдите в систему чтобы оставить отзыв</div>
                        </div>
                    </div>
                    <section className={styles.employers}>
                        <div className={styles.container}>
                            <h1 className={styles.sectionTitle}>Работодатели на Insider<span>Job</span></h1>
                            <div className={styles.employersContainer}>
                                {this.state.allCompanies.map(company => {
                                    return this.renderCompanyItem(company);
                                })}
                            </div>
                            <button className={styles.btn}>Все работодатели</button>
                        </div>
                    </section>
                    <section className={styles.lastReviews}>
                        <div className={styles.container}>
                            <h1 className={styles.sectionTitle}>Последние отзывы</h1>
                            <div className={styles.lastReviewsContainer}>
                                {
                                    this.state.topReviews.map(review => {
                                        return this.renderReviewItem(review);
                                    })
                                }
                            </div>
                            <div className={styles.btn}>
                                <button className={classNames(styles.btn, styles.btnGreen)}>Оставить отзыв</button>
                                <button className={classNames(styles.btn, styles.btnWrite)}>Читать все отзывы</button>
                            </div>
                        </div>
                    </section>
                </main>
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
)(withRouter(Home));
