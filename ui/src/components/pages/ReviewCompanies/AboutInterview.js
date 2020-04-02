import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from "./index.module.css";
import classNames from "classnames";
import AboutCompanyCardSelection from "@career/components/common/AboutCompanyCardSelection";
import {getReviewSelectionEntityListByCompany} from "@career/services/api";
import {notifyError} from "@career/services/notifications";


class AboutInterview extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            reviews: []
        }
    }

    static getTabId() {
        return "item-review";
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getReviewSelectionEntityListByCompany(this.props.company.id, 20, 1)
            .then(reviews => {
                this.setState({
                    reviews: reviews,
                });
            })
            .catch(error => notifyError(error.message));
    };

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
                                    {/*<div className={styles.graph}><img src="./img/graph1.png"/></div>*/}
                                    <div className={styles.textblock}>
                                        <ul>
                                            <li className={styles.purple}>
                                                <div></div>
                                                <p>Откликнулся онлайн</p><span>{this.props.company.howToGetSelectionRespondedOnlinepercent}%</span>
                                            </li>
                                            <li className={styles.lightBlue}>
                                                <div></div>
                                                <p>По рекоммендации</p><span>{this.props.company.howToGetSelectionInvitedCoworkerOfTheCompanyPercent}%</span>
                                            </li>
                                            <li className={styles.green}>
                                                <div></div>
                                                <p>Через агенство</p><span>{this.props.company.howToGetSelectionThroughTheAgencyPercent}%</span>
                                            </li>
                                            <li className={styles.blue}>
                                                <div></div>
                                                <p>Узнал на ярмарке вакансий</p><span>{this.props.company.howToGetSelectionCareerEventPercent}%</span>
                                            </li>
                                            <li className={styles.grey}>
                                                <div></div>
                                                <p>Другое</p><span>{this.props.company.howToGetSelectionOtherPercent}%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={styles.item}>
                                    <p className={styles.title}>Впечатления после собеседования</p>
                                    {/*<div className={styles.graph}><img src="./img/graph2.png"/></div>*/}
                                    <div className={styles.textblock}>
                                        <ul>
                                            <li className={styles.green}>
                                                <div></div>
                                                <p>Положительное</p><span>{this.props.company.usefulGoodPercent}%</span>
                                            </li>
                                            <li className={styles.yellow}>
                                                <div></div>
                                                <p>Нейтральное</p><span>{this.props.company.usefulNeutralPercent}%</span>
                                            </li>
                                            <li className={styles.red}>
                                                <div></div>
                                                <p>Отрицательное</p><span>{this.props.company.usefulBadPercent}%</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className={styles.reviews}>
                        <h1>Отзывы об отборе</h1>
                        {
                            this.state.reviews.map(review => {
                                return <AboutCompanyCardSelection review={review}/>;
                            })
                        }
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
