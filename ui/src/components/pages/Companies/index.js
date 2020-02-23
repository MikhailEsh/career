import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import Aside from '@career/components/common/Aside';
import styles from './index.module.css';
import sortIkon from '@career/assets/img/system/sort-ikon.svg';
import starGreen from '@career/assets/img/system/star-green.svg';
import star50 from '@career/assets/img/system/star-50.svg';
import starGrey from '@career/assets/img/system/star-grey.svg';
import sberIkon from '@career/assets/img/companies/sber-ikon.svg';
import cityIkon from '@career/assets/img/system/city-ikon.svg';
import classNames from "classnames";


class Companies extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const btnBorderClName = classNames(styles.btn, styles.btnBorder);
        const rootAllCompaniesClName = classNames(styles.allCompanies, styles.root);
        return (
            <main className={rootAllCompaniesClName}>
                <div className={styles.container}>
                    <div className={styles.content}>
                        <h1>Все компании</h1>
                        <div className={styles.sort}>
                            <p>Больше 5000 отзывов от пользователей в нашей базе.</p><a
                            href="#"><span>Сортировать</span> <img src={sortIkon}/></a>
                        </div>
                        <div className={styles.allCompaniesContainer}>
                            <div className={styles.item}>
                                <div className={styles.company}>
                                    <div className={styles.logo}><img src={sberIkon}/></div>
                                    <div className={styles.info}>
                                        <p className={styles.name}>Сбербанк</p>
                                        <p className={styles.service}>Банковские услуги частным клиентам.</p>
                                    </div>
                                </div>
                                <div className={styles.rating}>
                                    <div className={styles.stars}><img src={starGreen}/><img
                                        src={starGreen}/><img src={star50}/><img
                                        src={starGrey}/><img src={starGrey}/>
                                    </div>
                                    <span>2.4</span>
                                </div>
                                <div className={styles.city}><img src={cityIkon}/><span>Москва</span></div>
                                <div className={styles.reviews}>
                                    <p>Отзывы:</p>
                                    <div><span><a href="#">О компании</a><a href="#">24</a></span><span><a href="#">Об отборе</a><a
                                        href="#">37</a></span><span><a href="#">О зарплате</a><a href="#">15</a></span>
                                    </div>
                                </div>
                                <div className={styles.addReview}>
                                    <button className={btnBorderClName}>Оставить отзыв</button>
                                </div>
                            </div>
                            <div className={styles.item}>
                                <div className={styles.company}>
                                    <div className={styles.logo}><img src={sberIkon}/></div>
                                    <div className={styles.info}>
                                        <p className={styles.name}>Сбербанк</p>
                                        <p className={styles.service}>Банковские услуги частным клиентам.</p>
                                    </div>
                                </div>
                                <div className={styles.rating}>
                                    <div className={styles.stars}><img src={starGreen}/><img
                                        src={starGreen}/><img src={star50}/><img
                                        src={starGrey}/><img src={starGrey}/>
                                    </div>
                                    <span>2.4</span>
                                </div>
                                <div className={styles.city}><img src={cityIkon}/><span>Москва</span></div>
                                <div className={styles.reviews}>
                                    <p>Отзывы:</p>
                                    <div><span><a href="#">О компании</a><a href="#">24</a></span><span><a href="#">Об отборе</a><a
                                        href="#">37</a></span><span><a href="#">О зарплате</a><a href="#">15</a></span>
                                    </div>
                                </div>
                                <div className={styles.addReview}>
                                    <button className={btnBorderClName}>Оставить отзыв</button>
                                </div>
                            </div>
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
