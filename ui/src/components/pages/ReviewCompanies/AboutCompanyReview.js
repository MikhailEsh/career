import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from "./index.module.css";
import starGreen from "@career/assets/img/system/star-green.svg";
import star50 from "@career/assets/img/system/star-50.svg";
import classNames from "classnames";
import minus from "@career/assets/img/system/minus.svg";
import plus from "@career/assets/img/system/plus.svg";
import {getAllReviewByCompany} from '@career/services/api';
import {notifyError} from '@career/services/notifications';
import {NOT_LOADED} from '@career/constants/state';


class AboutCompanyReview extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            review: NOT_LOADED
        }

    }


    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getAllReviewByCompany(this.props.idCompany, 20, 1)
            .then(review => {
                this.setState({
                    review: review,
                });
            })
            .catch(error => notifyError(error.message));
    };

    renderCompanyReview(review) {
        return <div className={styles.item}>
            <div className={styles.who}><span>{review.position}</span></div>
            <span className={styles.date}>12 января 2020 г.</span>
            <p className={styles.title}>{review.name}</p>
            <p className={styles.text}>Очень дружный коллектив профессионалов, коллеги делятся
                своим
                опытом, спустя несколько месяцев стажёр уже готов стать полноценным
                специалистом, Мало вакансий в головном офисе, сложно устроиться в штат на
                начальные позиции, небольшая...</p>
            <div className={styles.advantages}>
                <div className={styles.itemAdvantage}><img
                    src={minus}/><span>Зарплата</span></div>
                <div className={styles.itemAdvantage}><img
                    src={minus}/><span>Руководство</span></div>
                <div className={styles.itemAdvantage}><img
                    src={plus}/><span>Карьера</span>
                </div>
            </div>
            <div className={styles.more}>
                <button className={classNames(styles.btn, styles.btnBorder)}>Подробнее</button>
            </div>
            <div className={styles.rating}>
                <div className="stars"><img src={starGreen}/><img
                    src={starGreen}/><img src={starGreen}/><img
                    src={starGreen}/><img src={star50}/>
                </div>
                <span>4.8</span>
            </div>
        </div>
    }

    render() {
        return (
            <div className={styles.reviews}>
                <h1>Отзывы о компании</h1>
                <div className={styles.reviewsContainer}>
                    <div className={styles.item}>
                        <div className={styles.who}><span>Бывший сотрудник</span></div>
                        <span className={styles.date}>12 января 2020 г.</span>
                        <p className={styles.title}>Компания очень хорошая. Можно идти работать.</p>
                        <p className={styles.text}>Очень дружный коллектив профессионалов, коллеги делятся
                            своим
                            опытом, спустя несколько месяцев стажёр уже готов стать полноценным
                            специалистом, Мало вакансий в головном офисе, сложно устроиться в штат на
                            начальные позиции, небольшая...</p>
                        <div className={styles.advantages}>
                            <div className={styles.itemAdvantage}><img
                                src={minus}/><span>Зарплата</span></div>
                            <div className={styles.itemAdvantage}><img
                                src={minus}/><span>Руководство</span></div>
                            <div className={styles.itemAdvantage}><img
                                src={plus}/><span>Карьера</span>
                            </div>
                        </div>
                        <div className={styles.more}>
                            <button className={classNames(styles.btn, styles.btnBorder)}>Подробнее</button>
                        </div>
                        <div className={styles.rating}>
                            <div className="stars"><img src={starGreen}/><img
                                src={starGreen}/><img src={starGreen}/><img
                                src={starGreen}/><img src={star50}/>
                            </div>
                            <span>4.8</span>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.who}><span>Бывший сотрудник</span></div>
                        <span className={styles.date}>12 января 2020 г.</span>
                        <p className={styles.title}>Компания очень хорошая. Можно идти работать.</p>
                        <p className={styles.text}>Очень дружный коллектив профессионалов, коллеги делятся
                            своим
                            опытом, спустя несколько месяцев стажёр уже готов стать полноценным
                            специалистом, Мало вакансий в головном офисе, сложно устроиться в штат на
                            начальные позиции, небольшая...</p>
                        <div className={styles.advantages}>
                            <div className={styles.itemAdvantage}><img
                                src={minus}/><span>Зарплата</span></div>
                            <div className={styles.itemAdvantage}><img
                                src={minus}/><span>Руководство</span></div>
                            <div className={styles.itemAdvantage}><img
                                src={plus}/><span>Карьера</span>
                            </div>
                        </div>
                        <div className={styles.more}>
                            <button className={classNames(styles.btn, styles.btnBorder)}>Подробнее</button>
                        </div>
                        <div className={styles.rating}>
                            <div className="stars"><img src={starGreen}/><img
                                src={starGreen}/><img src={starGreen}/><img
                                src={starGreen}/><img src={star50}/>
                            </div>
                            <span>4.8</span>
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.who}><span>Бывший сотрудник</span></div>
                        <span className={styles.date}>12 января 2020 г.</span>
                        <p className={styles.title}>Компания очень хорошая. Можно идти работать.</p>
                        <p className={styles.text}>Очень дружный коллектив профессионалов, коллеги делятся
                            своим
                            опытом, спустя несколько месяцев стажёр уже готов стать полноценным
                            специалистом, Мало вакансий в головном офисе, сложно устроиться в штат на
                            начальные позиции, небольшая...</p>
                        <div className={styles.advantages}>
                            <div className={styles.itemAdvantage}><img
                                src={minus}/><span>Зарплата</span></div>
                            <div className={styles.itemAdvantage}><img
                                src={minus}/><span>Руководство</span></div>
                            <div className={styles.itemAdvantage}><img
                                src={plus}/><span>Карьера</span>
                            </div>
                        </div>
                        <div className={styles.more}>
                            <button className={classNames(styles.btn, styles.btnBorder)}>Подробнее</button>
                        </div>
                        <div className={styles.rating}>
                            <div className="stars"><img src={starGreen}/><img
                                src={starGreen}/><img src={starGreen}/><img
                                src={starGreen}/><img src={star50}/>
                            </div>
                            <span>4.8</span>
                        </div>
                    </div><a href="#">Загрузить еще</a>
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
)(withRouter(AboutCompanyReview));
