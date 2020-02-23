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
import cityIkon from "@career/assets/img/system/city-ikon.svg";
import Header from '@career/components/AppLayout/Header';

class Home extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.root}>
                <div className={styles.mainScreen}>
                    <div className={styles.overlay}></div>
                    <div className={styles.container}>
                        <p className={styles.title}>Поиск отзывов о <span>работодателях</span> и <span>зарплатах</span> при
                            отборе компании</p>
                        <p className={styles.subtitle}>Больше 5000 отзывов от пользователей в нашей базе. Проверь компанию
                            прежде чем идти на собеседование.</p>
                        <form>
                            <input type="text" name="company" placeholder="Название компании..."/>
                            <select>
                                <option value="prof1" disabled="disabled">Выбрать профессию</option>
                                <option value="prof2">Профессия</option>
                                <option value="prof3">Профессия</option>
                            </select>
                            <input className={classNames(styles.btn, styles.btnGreen)} type="submit" value="Найти отзыв"/>
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
                                <div className={styles.item}>
                                    <div className={styles.employerInfo}>
                                        <div className={styles.employerCompanyContainer}>
                                            <div className={styles.employerLogo}><img src="./img/sber-ikon.png"/></div>
                                            <div className={styles.employerCompany}>
                                                <p>Сбербанк</p>
                                            </div>
                                        </div>
                                        <div className={styles.employerAllReviews}>
                                            <p>Всего отзывов: <span>115</span></p>
                                        </div>
                                        <div className={styles.employerReviews}>
                                            <p>Отзывы: <span>О компании<a href="#">24</a></span><span>О зарплате<a
                                                href="#">15</a></span><span>Об отборе<a href="#">37</a></span></p>
                                        </div>
                                    </div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img src={star50}/><img
                                            src={starGrey}/><img src={starGrey}/>
                                        </div>
                                        <span>2.4</span>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.employerInfo}>
                                        <div className={styles.employerCompanyContainer}>
                                            <div className={styles.employerLogo}><img src="./img/sber-ikon.png"/></div>
                                            <div className={styles.employerCompany}>
                                                <p>Сбербанк</p>
                                            </div>
                                        </div>
                                        <div className={styles.employerAllReviews}>
                                            <p>Всего отзывов: <span>115</span></p>
                                        </div>
                                        <div className={styles.employerReviews}>
                                            <p>Отзывы: <span>О компании<a href="#">24</a></span><span>О зарплате<a
                                                href="#">15</a></span><span>Об отборе<a href="#">37</a></span></p>
                                        </div>
                                    </div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img src={star50}/><img
                                            src={starGrey}/><img src={starGrey}/>
                                        </div>
                                        <span>2.4</span>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.employerInfo}>
                                        <div className={styles.employerCompanyContainer}>
                                            <div className={styles.employerLogo}><img src="./img/sber-ikon.png"/></div>
                                            <div className={styles.employerCompany}>
                                                <p>Сбербанк</p>
                                            </div>
                                        </div>
                                        <div className={styles.employerAllReviews}>
                                            <p>Всего отзывов: <span>115</span></p>
                                        </div>
                                        <div className={styles.employerReviews}>
                                            <p>Отзывы: <span>О компании<a href="#">24</a></span><span>О зарплате<a
                                                href="#">15</a></span><span>Об отборе<a href="#">37</a></span></p>
                                        </div>
                                    </div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img src={star50}/><img
                                            src={starGrey}/><img src={starGrey}/>
                                        </div>
                                        <span>2.4</span>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.employerInfo}>
                                        <div className={styles.employerCompanyContainer}>
                                            <div className={styles.employerLogo}><img src="./img/sber-ikon.png"/></div>
                                            <div className={styles.employerCompany}>
                                                <p>Сбербанк</p>
                                            </div>
                                        </div>
                                        <div className={styles.employerAllReviews}>
                                            <p>Всего отзывов: <span>115</span></p>
                                        </div>
                                        <div className={styles.employerReviews}>
                                            <p>Отзывы: <span>О компании<a href="#">24</a></span><span>О зарплате<a
                                                href="#">15</a></span><span>Об отборе<a href="#">37</a></span></p>
                                        </div>
                                    </div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img src={star50}/><img
                                            src={starGrey}/><img src={starGrey}/>
                                        </div>
                                        <span>2.4</span>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.employerInfo}>
                                        <div className={styles.employerCompanyContainer}>
                                            <div className={styles.employerLogo}><img src="./img/sber-ikon.png"/></div>
                                            <div className={styles.employerCompany}>
                                                <p>Сбербанк</p>
                                            </div>
                                        </div>
                                        <div className={styles.employerAllReviews}>
                                            <p>Всего отзывов: <span>115</span></p>
                                        </div>
                                        <div className={styles.employerReviews}>
                                            <p>Отзывы: <span>О компании<a href="#">24</a></span><span>О зарплате<a
                                                href="#">15</a></span><span>Об отборе<a href="#">37</a></span></p>
                                        </div>
                                    </div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img src={star50}/><img
                                            src={starGrey}/><img src={starGrey}/>
                                        </div>
                                        <span>2.4</span>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.employerInfo}>
                                        <div className={styles.employerCompanyContainer}>
                                            <div className={styles.employerLogo}><img src="./img/sber-ikon.png"/></div>
                                            <div className={styles.employerCompany}>
                                                <p>Сбербанк</p>
                                            </div>
                                        </div>
                                        <div className={styles.employerAllReviews}>
                                            <p>Всего отзывов: <span>115</span></p>
                                        </div>
                                        <div className={styles.employerReviews}>
                                            <p>Отзывы: <span>О компании<a href="#">24</a></span><span>О зарплате<a
                                                href="#">15</a></span><span>Об отборе<a href="#">37</a></span></p>
                                        </div>
                                    </div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img src={star50}/><img
                                            src={starGrey}/><img src={starGrey}/>
                                        </div>
                                        <span>2.4</span>
                                    </div>
                                </div>
                            </div>
                            <button className={styles.btn}>Все работодатели</button>
                        </div>
                    </section>
                    <section className={styles.lastReviews}>
                        <div className={styles.container}>
                            <h1 className={styles.sectionTitle}>Последние отзывы</h1>
                            <div className={styles.lastReviewsContainer}>
                                <div className={styles.item}>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.reviewCompany}>
                                            <div className={styles.logo}><img src="./img/sber-ikon.png"/></div>
                                            <div className={styles.company}>
                                                <p>Сбербанк Технологии.</p>
                                                <div className={styles.rating}>
                                                    <div className="stars"><img src={starGreen}/><img
                                                        src={starGreen}/><img src={star50}/><img
                                                        src={starGrey}/><img src={starGrey}/>
                                                    </div>
                                                    <span>2.4</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="date">12 января 2020 г</div>
                                    </div>
                                    <div className={styles.reviewContent}>
                                        <p className={styles.title}>Компания очень хорошая. Можно идти работать.</p>
                                        <p className={styles.text}>Очень дружный коллектив профессионалов, коллеги делятся
                                            своим опытом, спустя несколько месяцев стажёр уже готов стать полноценным
                                            специалистом, Мало вакансий в головном офисе, сложно устроиться в штат на
                                            начальные позиции, небольшая зп...</p>
                                    </div>
                                    <div className={styles.reviewFooter}>
                                        <div className={styles.advantages}>
                                            <div className={styles.itemAdvantage}><img
                                                src={minus}/><span>Зарплата</span></div>
                                            <div className={styles.itemAdvantage}><img
                                                src={minus}/><span>Руководство</span></div>
                                            <div className={styles.itemAdvantage}><img
                                                src={plus}/><span>Карьера</span></div>
                                        </div>
                                        <div className={styles.city}><img src={cityIkon}/><span>Москва</span></div>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.reviewCompany}>
                                            <div className={styles.logo}><img src="./img/sber-ikon.png"/></div>
                                            <div className={styles.company}>
                                                <p>Сбербанк Технологии.</p>
                                                <div className={styles.rating}>
                                                    <div className="stars"><img src={starGreen}/><img
                                                        src={starGreen}/><img src={star50}/><img
                                                        src={starGrey}/><img src={starGrey}/>
                                                    </div>
                                                    <span>2.4</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.date}>12 января 2020 г</div>
                                    </div>
                                    <div className={styles.reviewContent}>
                                        <p className={styles.title}>Компания очень хорошая. Можно идти работать.</p>
                                        <p className={styles.text}>Очень дружный коллектив профессионалов, коллеги делятся
                                            своим опытом, спустя несколько месяцев стажёр уже готов стать полноценным
                                            специалистом, Мало вакансий в головном офисе, сложно устроиться в штат на
                                            начальные позиции, небольшая зп...</p>
                                    </div>
                                    <div className={styles.reviewFooter}>
                                        <div className={styles.advantages}>
                                            <div className={styles.itemAdvantage}><img
                                                src={minus}/><span>Зарплата</span></div>
                                            <div className={styles.itemAdvantage}><img
                                                src={plus}/><span>Руководство</span></div>
                                            <div className={styles.itemAdvantage}><img
                                                src={minus}/><span>Карьера</span></div>
                                        </div>
                                        <div className={styles.city}><img
                                            src={cityIkon}/><span>Санкт-Петербург</span></div>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <div className={styles.reviewHeader}>
                                        <div className={styles.reviewCompany}>
                                            <div className={styles.logo}><img src="./img/sber-ikon.png"/></div>
                                            <div className={styles.company}>
                                                <p>Сбербанк Технологии.</p>
                                                <div className={styles.rating}>
                                                    <div className="stars"><img src={starGreen}/><img
                                                        src={starGreen}/><img src={star50}/><img
                                                        src={starGrey}/><img src={starGrey}/>
                                                    </div>
                                                    <span>2.4</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.date}>12 января 2020 г</div>
                                    </div>
                                    <div className={styles.reviewContent}>
                                        <p className={styles.title}>Компания очень хорошая. Можно идти работать.</p>
                                        <p className={styles.text}>Очень дружный коллектив профессионалов, коллеги делятся
                                            своим опытом, спустя несколько месяцев стажёр уже готов стать полноценным
                                            специалистом, Мало вакансий в головном офисе, сложно устроиться в штат на
                                            начальные позиции, небольшая зп...</p>
                                    </div>
                                    <div className={styles.reviewFooter}>
                                        <div className={styles.advantages}>
                                            <div className={styles.itemAdvantage}><img
                                                src={plus}/><span>Зарплата</span></div>
                                            <div className={styles.itemAdvantage}><img
                                                src={plus}/><span>Руководство</span></div>
                                            <div className={styles.itemAdvantage}><img
                                                src={plus}/><span>Карьера</span></div>
                                        </div>
                                        <div className={styles.city}><img src={cityIkon}/><span>Воронеж</span></div>
                                    </div>
                                </div>
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
