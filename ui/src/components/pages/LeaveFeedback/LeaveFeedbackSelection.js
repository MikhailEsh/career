import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import classNames from "classnames";


class LeaveFeedbackSelection extends PureComponent {

    static getTabId() {
        return "leave-feedback-selection";
    }


    render() {
        return (
            <div hidden={this.props.selectedTabId !== LeaveFeedbackSelection.getTabId()} className={styles.feedbackContainer}>
                <div className={classNames(styles.tab, styles.active)}>
                    <form>
                        <div className={styles.item}>
                            <div className={styles.title}>Процесс отбора в компанию</div>
                            <div className={classNames(styles.itemContainer, styles.processSelection)}>
                                <input type="text" name="company" placeholder="Название компании*"/>
                                <input type="text" name="department" placeholder="Ваш отдел/подразделение"/>
                                <input type="text" name="position" placeholder="Ваша должность"/>
                                <select>
                                    <option value="">Как попали на собеседование</option>
                                </select>
                                <select>
                                    <option value="">Как давно проходили собеседование</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>Расскажите как проходил отбор?</div>
                            <div className={classNames(styles.itemContainer, styles.processSelection)}>
                                    <textarea name="process-selection"
                                              placeholder="Опишите процесс отбора в компанию*"></textarea>
                                <select>
                                    <option value="">Сколько длился отбор</option>
                                </select>
                                <select>
                                    <option value="">Сложность отбора</option>
                                </select>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>Какие этапы отбора вы проходили?</div>
                            <div className={classNames(styles.itemContainer, styles.stagesSelection)}>
                                <div className={classNames(styles.stagesSelectionItem, styles.interview)}><span
                                    className={styles.stagesSelectionName}>Укажите тип собеседования:</span>
                                    <div className={styles.stagesSelectionContainer}>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>По телефону/Skype</span>
                                            </label>
                                        </div>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>Вживую</span>
                                            </label>
                                        </div>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>Групповое тестирование</span>
                                            </label>
                                        </div>
                                        <div className={classNames(styles.stagesItem, styles.active)}>
                                            <label>
                                                <input type="checkbox"/><span>Собеседование с программой</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={classNames(styles.stagesSelectionItem, styles.testing)}><span
                                    className={styles.stagesSelectionName}>Тестирование:</span>
                                    <div className={styles.stagesSelectionContainer}>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>Навыки и способности</span>
                                            </label>
                                        </div>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>Психологический тест</span>
                                            </label>
                                        </div>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>Техническое задание</span>
                                            </label>
                                        </div>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>Английский язык</span>
                                            </label>
                                        </div>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>Математический тест</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className={classNames(styles.stagesSelectionItem, styles.other)}><span
                                    className={styles.stagesSelectionName}>Другое:</span>
                                    <div className={styles.stagesSelectionContainer}>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>Домашнее задание</span>
                                            </label>
                                        </div>
                                        <div className={styles.stagesItem}>
                                            <label>
                                                <input type="checkbox"/><span>Проверка службы безопасности</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>Ваше впечатление от процесса отбора?</div>
                            <div className={classNames(styles.itemContainer, styles.impression)}>
                                <button className={classNames(styles.btn, styles.btnGreen, styles.positive, styles.active)}>Положительное</button>
                                <button className={classNames(styles.btn, styles.neutrally)}>Нейтральное</button>
                                <button className={classNames(styles.btn, styles.negatively)}>Отрицательное</button>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={classNames(styles.itemContainer, styles.proposal)}>
                                <p>Вы получили предложение о работе от этой компании?</p>
                                <div className={styles.choise}>
                                    <button className={classNames(styles.btn, styles.btnBorder, styles.yes)}>Да</button>
                                    <button className={classNames(styles.btn, styles.no)}>Нет</button>
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
)(withRouter(LeaveFeedbackSelection));
