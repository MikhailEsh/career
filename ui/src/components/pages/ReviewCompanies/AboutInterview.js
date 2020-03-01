import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from "./index.module.css";
import classNames from "classnames";
import markIkon from "@career/assets/img/system/mark-ikon.svg";


class AboutInterview extends PureComponent {

    static getTabId() {
        return "item-review";
    }

    render() {
        return (
            <div hidden={this.props.selectedTabId !== AboutInterview.getTabId()}>
                <div className={styles.cardContainer}>
                    <div className={classNames(styles.cardContent, styles.selection, styles.active)}>
                        <div className={styles.cardContentHeader}>
                            <p className={styles.cardTitle}>Процесс отбора</p>
                            <p className={styles.cardRecommended}>Рекомендуют друзьям <span>45%</span></p>
                        </div>
                        <div className={styles.cardContentContainer}>
                            <div className={styles.graphs}>
                                <div className={styles.item}>
                                    <p className={styles.title}>Как попали на собеседование</p>
                                    <div className={styles.graph}><img src="./img/graph1.png"/></div>
                                    <div className={styles.textblock}>
                                        <ul>
                                            <li className={styles.purple}>
                                                <div></div>
                                                <p>Откликнулся онлайн</p><span>14%</span>
                                            </li>
                                            <li className={styles.lightBlue}>
                                                <div></div>
                                                <p>По рекоммендации</p><span>26%</span>
                                            </li>
                                            <li className={styles.green}>
                                                <div></div>
                                                <p>Через агенство</p><span>10%</span>
                                            </li>
                                            <li className={styles.blue}>
                                                <div></div>
                                                <p>Узнал на ярмарке вакансий</p><span>25%</span>
                                            </li>
                                            <li className={styles.grey}>
                                                <div></div>
                                                <p>Другое</p><span>25%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <p className={styles.title}>Впечатления после собеседования</p>
                                    <div className={styles.graph}><img src="./img/graph2.png"/></div>
                                    <div className={styles.textblock}>
                                        <ul>
                                            <li className={styles.green}>
                                                <div></div>
                                                <p>Положительное</p><span>56%</span>
                                            </li>
                                            <li className={styles.yellow}>
                                                <div></div>
                                                <p>Нейтральное</p><span>13%</span>
                                            </li>
                                            <li className={styles.red}>
                                                <div></div>
                                                <p>Отрицательное</p><span>31%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.update}><a href="#"><img src={markIkon}/></a><span>Данные обновлены 18 февраля 2020</span>
                        </div>
                    </div>
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
)(withRouter(AboutInterview));
