import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import classNames from "classnames";
import markIkon from "@career/assets/img/system/mark-ikon.svg";


class AboutSalary extends PureComponent {

    constructor(props) {
        super(props);
    }

    static getTabId() {
        return "item-salary";
    }


    render() {
        return (
            <div hidden={this.props.selectedTabId !== AboutSalary.getTabId()}>
                <div className={styles.cardContainer}>
                    <div className={classNames(styles.cardContent, styles.salary, styles.active)}>
                        <div className={styles.cardContentHeader}>
                            <p className={styles.cardTitle}>Зарплаты в компании</p>
                            <p className={styles.cardRecommended}>Рекомендуют друзьям <span>45%</span></p>
                        </div>
                        <div className={styles.cardContentContainer}>
                            <div className={styles.salaries}>
                                <div className={classNames(styles.item, styles.analyst)}>
                                    <p className={styles.profession}>Аналитик</p>
                                    <p className={styles.awerage}>средняя 160 000 т.руб</p>
                                    <div className={styles.rangeSalary}>
                                        <div className="wrap"></div>
                                        <span></span>
                                        <div className={styles.active}></div>
                                    </div>
                                    <p className={styles.min}>мин. 70 000 т.руб</p>
                                    <p className={styles.max}>макс. 180 000 т.руб</p>
                                </div>
                                <div className={classNames(styles.item, styles.manager)}>
                                    <p className={styles.profession}>Менеджер</p>
                                    <p className={styles.awerage}>средняя 160 000 т.руб</p>
                                    <div className={styles.rangeSalary}>
                                        <div className="wrap"></div>
                                        <span></span>
                                        <div className={styles.active}></div>
                                    </div>
                                    <p className={styles.min}>мин. 70 000 т.руб</p>
                                    <p className={styles.max}>макс. 180 000 т.руб</p>
                                </div>
                                <div className={classNames(styles.item, styles.officeManager)}>
                                    <p className={styles.profession}>Офис менеджер</p>
                                    <p className={styles.awerage}>средняя 160 000 т.руб</p>
                                    <div className={styles.rangeSalary}>
                                        <div className="wrap"></div>
                                        <span></span>
                                        <div className={styles.active}></div>
                                    </div>
                                    <p className={styles.min}>мин. 70 000 т.руб</p>
                                    <p className={styles.max}>макс. 180 000 т.руб</p>
                                </div>
                                <div className={classNames(styles.item, styles.tester)}>
                                    <p className={styles.profession}>Тестировщик</p>
                                    <p className={styles.awerage}>средняя 160 000 т.руб</p>
                                    <div className={styles.rangeSalary}>
                                        <div className="wrap"></div>
                                        <span></span>
                                        <div className={styles.active}></div>
                                    </div>
                                    <p className={styles.min}>мин. 70 000 т.руб</p>
                                    <p className={styles.max}>макс. 180 000 т.руб</p>
                                </div>
                            </div>
                            <div className={styles.update}><img src={markIkon}/><span>Данные обновлены 18 февраля 2020</span>
                            </div>
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
)(withRouter(AboutSalary));
