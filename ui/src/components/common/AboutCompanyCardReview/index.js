import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from "./index.module.css";
import starGreen from "@career/assets/img/system/star-green.svg";
import classNames from "classnames";
import minusLogo from "@career/assets/img/system/minus.svg";
import plusLogo from "@career/assets/img/system/plus.svg";
import arrowToDown from "@career/assets/img/system/arrowToDown.svg";
import {STATUS} from "@career/constants/system";
import {NOT_LOADED} from '@career/constants/state';
import StarRatingComponent from "react-star-rating-component";
import starGrey from "@career/assets/img/system/star-grey.svg";
import Moment from "react-moment";
import Popover from '@material-ui/core/Popover';


class AboutCompanyCardReview extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            review: NOT_LOADED,
            visibleRating: false,
            anchorEl: null
        }
    }

    handleClose = () => {
        this.setState({
            anchorEl: null
        });
    };

    handlerOpenRating(e) {
        e.preventDefault();
        const currentTarget = e.currentTarget;
        this.setState({
            visibleRating: !this.state.visibleRating,
            anchorEl: currentTarget
        });
    }

    renderRating(scale) {
        return <StarRatingComponent
            editing={false}
            renderStarIcon={(index, value) => {
                return (
                    <span>
                                                        {index <= value ? <img src={starGreen}/> :
                                                            <img src={starGrey}/>}
                                                    </span>
                );
            }}
            starCount={5}
            value={scale}
        />
    }

    getStatus(status) {
        if (status === STATUS.WORK_NOW) {
            return <span>Текущий сотрудник</span>
        } else if (status === STATUS.WORKED) {
            return <span>Бывший сотрудник</span>
        } else return <span>Бывший сотрудник</span>
    }

    renderItemDetailedRating(title, scale) {
        return <div className={styles.itemDetailedRating}>
            <p className={styles.textTitle}>{title}</p>
            <div className={styles.rating}>
                {this.renderRating(scale)}
            </div>
            {/*<p className={styles.textRate}>2.0</p>*/}
        </div>
    }

    render() {
        return (
            <div className={styles.reviewsContainer} id={this.props.review.id}>
                <div className={styles.item}>
                    <div className={styles.who}>{this.getStatus(this.props.review.status)}</div>
                    <div className={styles.position}>
                        <span>{this.props.review.position}</span>
                    </div>
                    <p className={styles.title}>{this.props.review.name}</p>
                    <div className={styles.rating}>
                        {this.renderRating(this.props.review.commonScale)}
                        <a
                            href="#"
                            onClick={(e) => this.handlerOpenRating(e)}
                        >
                            <img src={arrowToDown} className={styles.arrowToDown}/>
                            <Popover
                                id={this.props.review.id}
                                open={this.state.visibleRating}
                                anchorEl={this.state.anchorEl}
                                onClose={(e) => this.handleClose()}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                            >
                                <div className={styles.detailedRatingContainer}>
                                    {this.renderItemDetailedRating("Зарплата", this.props.review.salaryScale)}
                                    {this.renderItemDetailedRating("Руководство", this.props.review.leadershipScale)}
                                    {this.renderItemDetailedRating("Ценности", this.props.review.cultureScale)}
                                    {this.renderItemDetailedRating("Карьера", this.props.review.careerScale)}
                                    {this.renderItemDetailedRating("Баланс работы и жизнь", this.props.review.balanceWorkHomeScale)}
                                </div>
                            </Popover>
                        </a>
                    </div>
                    <div className={styles.plus}>
                        <div>
                            <img src={plusLogo}/>
                        </div>
                        <div>
                            <p className={styles.text}>{this.props.review.plus}</p>
                        </div>
                    </div>
                    <div className={styles.minuses}>
                        <img src={minusLogo}/><p className={styles.text}>{this.props.review.minuses}</p>
                    </div>
                    <span className={styles.date}><Moment format="LL" locale="ru"
                                                          date={this.props.review.timeAdded}/></span>
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
)(withRouter(AboutCompanyCardReview));
