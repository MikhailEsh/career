import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import classNames from "classnames";
import starGreen from "@career/assets/img/system/star-green.svg";
import starGrey from "@career/assets/img/system/star-grey.svg";
import StarRatingComponent from 'react-star-rating-component';


const STATUS = {
    WORK_NOW: "WORK_NOW",
    WORKED: "WORKED",
};


const commonScale = "commonScale";
const salaryScale = "salaryScale";
const cultureScale = "cultureScale";
const careerScale = "careerScale";
const leadershipScale = "leadershipScale";
const balanceWorkHomeScale = "balanceWorkHomeScale";
const name = "name";
const plus = "plus";
const minuses = "minuses";
const managementAdvice = "managementAdvice";

class LeaveFeedbackCompany extends PureComponent {

    static getTabId() {
        return "leave-feedback-company";
    }

    constructor(props) {
        super(props);
        this.state = {
            feedback: {
                companyId: null,
                companyName: "",
                title: "",
                salaryrubinmonth: "",
                commonScale: 0,
                salaryScale: 0,
                leadershipScale: 0,
                cultureScale: 0,
                careerScale: 0,
                balanceWorkHomeScale: 0,
                plus: "",
                minuses: "",
                status: STATUS.WORK_NOW,
                position: "",
                useful: "",
                dateWork: "",
                workDepartment: "",
                managementAdvice: ""
            }
        };
    }

    changeStateNameOfCompany = (ev) => {
        if (ev !== undefined) {
            const vl = ev.target.value;
            this.setState(prevState => ({
                feedback: {                   // object that we want to update
                    ...prevState.feedback,    // keep all other key-value pairs
                    companyId: vl       // update the value of specific key
                }
            }));
        }
    };

    changeStateOfByName = (ev, name) => {
        const vl = ev.target.value;
        this.setState(prevState => ({
                    feedback: {                   // object that we want to update
                        ...prevState.feedback,    // keep all other key-value pairs
                        [name]: vl       // update the value of specific key
                    }
        }));
    };

    changeStateWorkDepartment = (ev) => {
        if (ev !== undefined) {
            const vl = ev.target.value;
            this.setState(prevState => ({
                feedback: {                   // object that we want to update
                    ...prevState.feedback,    // keep all other key-value pairs
                    workDepartment: vl       // update the value of specific key
                }
            }));
        }
    };


    changeStatePosition = (ev) => {
        if (ev !== undefined) {
            const vl = ev.target.value;
            this.setState(prevState => ({
                feedback: {                   // object that we want to update
                    ...prevState.feedback,    // keep all other key-value pairs
                    position: vl       // update the value of specific key
                }
            }));
        }
    };

    changeStateSalary = (ev) => {
        if (ev !== undefined) {
            const vl = ev.target.value;
            this.setState(prevState => ({
                feedback: {                   // object that we want to update
                    ...prevState.feedback,    // keep all other key-value pairs
                    salaryrubinmonth: vl       // update the value of specific key
                }
            }));
        }
    };

    onClickBtn(e) {
        e.preventDefault();
        const btnName = e.target.name;
        if (btnName !== undefined && btnName !== "") {
            this.setState(prevState => ({
                feedback: {                   // object that we want to update
                    ...prevState.feedback,    // keep all other key-value pairs
                    status: btnName       // update the value of specific key
                }
            }));
        }
    }

    onStarClick(nextValue, prevValue, name) {
        debugger
        if (name !== undefined) {
            this.setState(prevState => ({
                feedback: {                   // object that we want to update
                    ...prevState.feedback,    // keep all other key-value pairs
                    [name]: nextValue       // update the value of specific key
                }
            }));
        }
        // this.setState({rating: nextValue});
    }

    renderRating(nameOfScale) {
        return <div className={styles.rating}>
            <StarRatingComponent
                name= {nameOfScale}
                editing={true}
                onStarClick={this.onStarClick.bind(this)}
                renderStarIcon={(index, value) => {
                    return (
                        <span>
                                                        {index <= value ? <img src={starGreen}/> : <img src={starGrey}/>}
                                                    </span>
                    );
                }}
                starCount={5}
                value={this.state.feedback[nameOfScale]}
            />
            <span>{this.state.feedback[nameOfScale]}</span>
        </div>
    }


    render() {
        return (
            <div hidden={this.props.selectedTabId !== LeaveFeedbackCompany.getTabId()}
                 className={styles.feedbackContainer}>
                <div className={classNames(styles.tab, styles.active)}>
                    <form>
                        <div className={styles.item}>
                            <div className={styles.title}>О компании</div>
                            <div className={classNames(styles.itemContainer, styles.about)}>
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Название компании*"
                                    value={this.state.feedback.companyId}
                                    onChange={this.changeStateNameOfCompany}/>
                                <div className={styles.workChange}>
                                    <button
                                        name={STATUS.WORK_NOW}
                                        onClick={(e) => this.onClickBtn(e)}
                                        className={this.state.feedback.status === STATUS.WORK_NOW ? styles.active : ""}>
                                        Работаю
                                    </button>
                                    <button
                                        name={STATUS.WORKED}
                                        onClick={(e) => this.onClickBtn(e)}
                                        className={this.state.feedback.status === STATUS.WORKED ? styles.active : ""}
                                    >Работал(а)
                                    </button>
                                </div>
                                <input type="text"
                                       name="department"
                                       placeholder="Ваш отдел/подразделение"
                                       value={this.state.feedback.workDepartment}
                                       onChange={this.changeStateWorkDepartment}
                                />
                                <input
                                    type="text"
                                    name="position"
                                    placeholder="Ваша должность"
                                    value={this.state.feedback.position}
                                    onChange={this.changeStatePosition}
                                />
                                <select>
                                    <option value="" disabled>Как долго вы работаете в компании</option>
                                    <option value="">Как долго вы работаете в компании</option>
                                    <option value="">Как долго вы работаете в компании1</option>
                                </select>
                                <input
                                    type="number"
                                    name="salary"
                                    placeholder="Зарплата до вычета налогов"
                                    value={this.state.feedback.salaryrubinmonth}
                                    onChange={this.changeStateSalary}
                                />
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>Оценка компании</div>
                            <div className={classNames(styles.itemContainer, styles.estimate)}>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Общая оценка</div>
                                    {this.renderRating(commonScale)}
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Зарплата</div>
                                    {this.renderRating(salaryScale)}
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Карьера</div>
                                    {this.renderRating(careerScale)}
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Руководство</div>
                                    {this.renderRating(leadershipScale)}
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Баланс работы и жизни</div>
                                    {this.renderRating(balanceWorkHomeScale)}
                                </div>
                                <div className={styles.estimateItem}>
                                    <div className={styles.estimateTitle}>Ценности компании</div>
                                    {this.renderRating(cultureScale)}
                                </div>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>Ваше мнение о компании</div>
                            <div className={classNames(styles.itemContainer, styles.opinion)}>
                                                    <textarea name="opinion"
                                                              onChange={(e) => this.changeStateOfByName(e, name)}
                                                              placeholder="Общее впечатление о компании*"></textarea>
                                <textarea
                                    name="pluses"
                                    onChange={(e) => this.changeStateOfByName(e, plus)}
                                    placeholder="Плюсы в компании*"></textarea>
                                <textarea name="minuses"
                                          onChange={(e) => this.changeStateOfByName(e, minuses)}
                                          placeholder="Минусы в компании*"></textarea>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.item}>Советы руководству</div>
                            <div className={classNames(styles.itemContainer, styles.advice)}>
                                                    <textarea name="advice"
                                                              onChange={(e) => this.changeStateOfByName(e, managementAdvice)}
                                                              placeholder="Чтобы вы посоветовали руководству этой компании"></textarea>
                            </div>
                        </div>
                        <div className={styles.feedbackSubmit}>
                            <div className={styles.privacy}>
                                <label>
                                    <input type="checkbox"/><span>В соответствии с  <a href='#'>Политикой конфиденциальности</a> ваш отзыв будет гарантированно анонимным</span>
                                </label>
                            </div>
                            <input className={classNames(styles.btn, styles.btnGreen)} type="submit"
                                   value="Отправить отзыв"/>
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
