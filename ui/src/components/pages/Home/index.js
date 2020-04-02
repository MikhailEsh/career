import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import classNames from "classnames";
import minus from "@career/assets/img/system/minus.svg";
import plus from "@career/assets/img/system/plus.svg";
import Rating from "@career/components/common/Rating";
import {getTopReview, getAllCompanies} from '@career/services/api';
import {notifyError} from '@career/services/notifications';
import 'moment/locale/ru'
import AboutCompanyCardReview from "@career/components/common/AboutCompanyCardReview";
import {COMPANIES} from '@career/constants/routes';


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
                    <p>Отзывы: <span>О компании<a>{company.countCompanyReview}</a></span><span>О зарплате<a
                       >{company.countSalaryReview}</a></span><span>Об отборе<a
                        >{company.countSelectionReview}</a></span></p>
                </div>
            </div>
            <Rating rating={company.averageCommonScale}/>
            {/*{this.renderRating(company.averageCommonScale)}*/}
        </div>;
    }

    calcPlusMinus(rating) {
        if (rating >= 2.5) {
            return plus
        } else return minus
    }

    openAllCompany(ev) {
        ev.preventDefault();
        const {history} = this.props;
        history.push(COMPANIES);
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
                            <button
                                className={styles.btn}
                                onClick={(e) => this.openAllCompany(e)}
                            >Все работодатели</button>
                        </div>
                    </section>
                    <section className={styles.lastReviews}>
                        <div className={styles.container}>
                            <h1 className={styles.sectionTitle}>Последние отзывы</h1>
                            <div className={styles.lastReviewsContainer}>
                                {
                                    this.state.topReviews.map(review => {
                                        return <AboutCompanyCardReview review={review}/>;
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
