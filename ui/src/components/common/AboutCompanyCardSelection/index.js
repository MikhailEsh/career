import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from "./index.module.css";
import Moment from "react-moment";


class AboutCompanyCardSelection extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    getStatus(selectIn) {
        if (selectIn === true) {
            return <span>Прошел успешно</span>
        } else if (selectIn === false) {
            return <span>Не прошел отбор</span>
        } else return <span/>
    }

    render() {
        return (
            <div className={styles.reviewsContainer} id={this.props.review.id}>
                <div className={styles.item}>
                    <div className={styles.selectIn}>{this.getStatus(this.props.review.selectIn)}</div>
                    <p className={styles.title}>{this.props.review.reviewTitle}</p>
                    <div className={styles.detailSelection}>
                        <div>
                            <span className={styles.title}>Год интервью: </span>
                            <a className={styles.text}><Moment
                                // style = {styles.text}
                                format="YYYY " locale="ru"
                                       date={this.props.review.timeAdded}/></a>
                        </div>
                        <div>
                            <span className={styles.title}>Тип интервью:</span>
                            <a className={styles.text}>{this.props.review.typeOfInterview}</a>
                        </div>
                        <div>
                            <span className={styles.title}>Длительность:</span>
                            <a  className={styles.text}>{this.props.review.timeTaken}</a>
                        </div>
                    </div>
                    <div className={styles.overview}>
                        <span className={styles.text}>{this.props.review.overview}</span>
                    </div>
                    <hr className={styles.hr}/>
                    <div className={styles.cardFooter}>
                        <div>
                            <span className={styles.text}>Сложность интервью: {this.props.review.difficult}</span>
                        </div>
                        <div>
                            <span className={styles.text}>Общее впечатление: {this.props.review.positiveExperience}</span>
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
)(withRouter(AboutCompanyCardSelection));
