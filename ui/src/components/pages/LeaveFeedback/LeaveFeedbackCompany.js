import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import classNames from "classnames";
import starGreen from "@career/assets/img/system/star-green.svg";
import starGrey from "@career/assets/img/system/star-grey.svg";


class LeaveFeedbackCompany extends PureComponent {

    static getTabId() {
        return "leave-feedback-company";
    }


    render() {
        return (
            <div hidden={this.props.selectedTabId !== LeaveFeedbackCompany.getTabId()} className={styles.feedbackContainer}>
                <div className={classNames(styles.tab, styles.active)}>
                    <form>
                        <div className={styles.item}>
                            <div className={styles.title}>О компании</div>
                            <div className={classNames(styles.itemContainer, styles.about)}>
                                <input type="text" name="company" placeholder="Название компании*"/>
                                <div className={styles.workChange}>
                                    <button className={styles.active}>Работаю</button>
                                    <button>Работал(а)</button>
                                </div>
                                <input type="text" name="department"
                                       placeholder="Ваш отдел/подразделение"/>
                                <input type="text" name="position" placeholder="Ваша должность"/>
                                <select>
                                    <option value="">Как долго вы работаете в компании</option>
                                </select>
                                <input type="text" name="salary"
                                       placeholder="Зарплата до вычета налогов"/>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>Оценка компании</div>
                            <div className={classNames(styles.itemContainer, styles.estimate)}>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Общая оценка</div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/>
                                        </div>
                                        <span>2</span>
                                    </div>
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Зарплата</div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img
                                            src={starGreen}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/>
                                        </div>
                                        <span>3</span>
                                    </div>
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Карьера</div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/>
                                        </div>
                                        <span>2</span>
                                    </div>
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Руководство</div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGrey}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/>
                                        </div>
                                        <span>0</span>
                                    </div>
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Баланс работы и жизни</div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img
                                            src={starGreen}/><img
                                            src={starGreen}/><img
                                            src={starGreen}/>
                                        </div>
                                        <span>5</span>
                                    </div>
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Ценности компании</div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/><img
                                            src={starGrey}/>
                                        </div>
                                        <span>2</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>Ваше мнение о компании</div>
                            <div className={classNames(styles.itemContainer, styles.opinion)}>
                                                    <textarea name="opinion"
                                                              placeholder="Общее впечатление о компании*"></textarea>
                                <textarea name="pluses" placeholder="Плюсы в компании*"></textarea>
                                <textarea name="minuses"
                                          placeholder="Минусы в компании*"></textarea>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item}>Советы руководству</div>
                            <div className={classNames(styles.itemContainer, styles.advice)}>
                                                    <textarea name="advice"
                                                              placeholder="Чтобы вы посоветовали руководству этой компании"></textarea>
                                <div className={styles.recommendation}>
                                    <p>Рекомендовали бы вы эту компанию своим друзьям</p>
                                    <div className={styles.choice}>
                                        <button className={styles.like}>Рекомендую</button>
                                        <button className={styles.dislike}>Не рекомендую</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.feedbackSubmit}>
                            <div className={styles.privacy}>
                                <label>
                                    <input type="checkbox"/><span>В соответствии с  <a href='#'>Политикой конфиденциальности</a> ваш отзыв будет гарантированно анонимным</span>
                                </label>
                            </div>
                            <input className={classNames(styles.btn, styles.btnGreen)} type="submit" value="Отправить отзыв"/>
                        </div>
                    </form>
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
)(withRouter(LeaveFeedbackCompany));
