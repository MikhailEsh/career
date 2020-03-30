import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import classNames from "classnames";

const RecommendEnum = {
    RECOMMEND: "RECOMMEND",
    NEUTRAL: "NEUTRAL",
    UNRECOMMEND: "UNRECOMMEND"
};

const HowToGetIntervew = {
    RESPONDED_ONLINE: {
        back: "RESPONDED_ONLINE",
        ui: "Через онлайн"
    },
    CAREER_EVENT: {
        back: "CAREER_EVENT",
        ui: "Ярмарка вакансий"
    },
    INVITED_COWORKER_OF_THE_COMPANY: {
        back: "INVITED_COWORKER_OF_THE_COMPANY",
        ui: "Пригласил знакомы из компании"
    },
    THROUGH_THE_AGENCY: {
        back: "THROUGH_THE_AGENCY",
        ui: "Через агенство"
    },
    OTHER: {
        back: "OTHER",
        ui: "другое"
    }
};


const TypeOfInterviewOrTestEnum = {
    SKYPE: "SKYPE",
    OFFLINE: "OFFLINE",
    PROGRAM: "PROGRAM",
    GROUP: "GROUP",
    SKILLS: "SKILLS",
    PSYCHOLOGICAL: "PSYCHOLOGICAL",
    ENGLISH: "ENGLISH",
    TECH_TASK: "TECH_TASK",
    MATH: "MATH",
    SECURITY: "SECURITY",
    HOME_WORK: "HOME_WORK"
};

const TimeTakenEnum = {
    WEEK: {
        back: "WEEK",
        ui: "Меньше недели"
    },
    FEW_WEEK: {
        back: "FEW_WEEK",
        ui: "Меньше 1 месяца"
    },
    MONTH: {
        back: "MONTH",
        ui: "Меньше 2ух месяцев"
    },
    MONTH_2: {
        back: "MONTH_2",
        ui: "Меньше 3ех месяцев"
    },
    MONTH_3_6: {
        back: "MONTH_3_6",
        ui: "От 3ех до 6 месяцев"
    },
    MORE_6_MONTH: {
        back: "MORE_6_MONTH",
        ui: "Больше 6 месяцев"
    }
};

const SelectInEnum = {
    yes: "yes",
    no: "no"
};

const defaultValueSelect = "defaultValueSelect";

class LeaveFeedbackSelection extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            howGetInterviewSelectVal: defaultValueSelect,
            timeTakenEnumSelectVal: defaultValueSelect,
            feedback: {
                companyId: null,
                companyName: "",
                jobTitle: "",
                selectIn: "",
                feedbackGrade: "",
                howGetInterview: "",
                dateInterview: null,
                typeOfInterview: {},
                difficult: 0,
                overview: "",
                timeTaken: ""
            }

        };
    }

    static getTabId() {
        return "leave-feedback-selection";
    }

    changeStateOfByName = (ev, name) => {
        const vl = ev.target.value;
        this.setState(prevState => ({
            feedback: {                   // object that we want to update
                ...prevState.feedback,    // keep all other key-value pairs
                [name]: vl       // update the value of specific key
            }
        }));
    };

    renderSelect(enumMappingObject) {
        return Object.entries(enumMappingObject).map(obj => {
            const val = obj[1];
            return <option value={val.back}>{val.ui}</option>;
        })
    }

    renderSelectArr(startVal, endVal) {
        let arr = [];
        for(var i = startVal, j = 0; i <= endVal; i++, j++){
            arr[j] = i
        }
        return arr.map(obj => {
            return <option value={obj}>{obj}</option>;
        })
    }

    handleChangeSelectHowGetInterviewSelect(event) {
        this.setState({
            howGetInterviewSelectVal: event.target.value
        });
    }

    handleChangeTimeTakenEnumSelectVal(e) {
        this.setState({
            timeTakenEnumSelectVal: e.target.value
        });
    }


    handleOnChangeCheckbox = (ev) => {
        const id = ev.target.id;
        const checked = ev.target.checked;
        this.setState(prevState => ({
            typeOfInterview: {                   // object that we want to update
                ...prevState.typeOfInterview,    // keep all other key-value pairs
                [id]: checked       // update the value of specific key
            }
        }));
    };

    renderTypeOfInterview() {
        return <div className={styles.item}>
            <div className={styles.title}>Какие этапы отбора вы проходили?</div>
            <div className={classNames(styles.itemContainer, styles.stagesSelection)}>
                <div className={classNames(styles.stagesSelectionItem, styles.interview)}><span
                    className={styles.stagesSelectionName}>Укажите тип собеседования:</span>
                    <div className={styles.stagesSelectionContainer}>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    id = {TypeOfInterviewOrTestEnum.SKYPE}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                /><span>По телефону/Skype</span>
                            </label>
                        </div>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    id = {TypeOfInterviewOrTestEnum.OFFLINE}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                /><span>Вживую</span>
                            </label>
                        </div>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    id = {TypeOfInterviewOrTestEnum.GROUP}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                /><span>Групповое тестирование</span>
                            </label>
                        </div>
                        <div className={classNames(styles.stagesItem, styles.active)}>
                            <label>
                                <input
                                    type="checkbox"
                                    id = {TypeOfInterviewOrTestEnum.PROGRAM}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                /><span>Собеседование с программой</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.stagesSelectionItem, styles.testing)}><span
                    className={styles.stagesSelectionName}>Тестирование:</span>
                    <div className={styles.stagesSelectionContainer}>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    id = {TypeOfInterviewOrTestEnum.SKILLS}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                /><span>Навыки и способности</span>
                            </label>
                        </div>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    id = {TypeOfInterviewOrTestEnum.PSYCHOLOGICAL}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                /><span>Психологический тест</span>
                            </label>
                        </div>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    id = {TypeOfInterviewOrTestEnum.TECH_TASK}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                /><span>Техническое задание</span>
                            </label>
                        </div>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    id = {TypeOfInterviewOrTestEnum.ENGLISH}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                /><span>Английский язык</span>
                            </label>
                        </div>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    type="checkbox"
                                    id = {TypeOfInterviewOrTestEnum.MATH}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                /><span>Математический тест</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className={classNames(styles.stagesSelectionItem, styles.other)}><span
                    className={styles.stagesSelectionName}>Другое:</span>
                    <div className={styles.stagesSelectionContainer}>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    id = {TypeOfInterviewOrTestEnum.HOME_WORK}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                    type="checkbox"
                                /><span>Домашнее задание</span>
                            </label>
                        </div>
                        <div className={styles.stagesItem}>
                            <label>
                                <input
                                    id = {TypeOfInterviewOrTestEnum.SECURITY}
                                    onChange={(e) => this.handleOnChangeCheckbox(e)}
                                    type="checkbox"
                                /><span>Проверка службы безопасности</span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }

    onClickBtnRecom(e) {
        e.preventDefault();
        const id = e.target.id;
        this.setState(prevState => ({
            feedback: {                   // object that we want to update
                ...prevState.feedback,    // keep all other key-value pairs
                feedbackGrade: id       // update the value of specific key
            }
        }));
    }

    onClickBtnSelectIn(e) {
        e.preventDefault();
        const id = e.target.id;
        if (id !== undefined) {
            this.setState(prevState => ({
                feedback: {                   // object that we want to update
                    ...prevState.feedback,    // keep all other key-value pairs
                    selectIn: id       // update the value of specific key
                }
            }));
        }
    }

    render() {
        return (
            <div hidden={this.props.selectedTabId !== LeaveFeedbackSelection.getTabId()}
                 className={styles.feedbackContainer}>
                <div className={classNames(styles.tab, styles.active)}>
                    <form>
                        <div className={styles.item}>
                            <div className={styles.title}>Процесс отбора в компанию</div>
                            <div className={classNames(styles.itemContainer, styles.processSelection)}>
                                <input
                                    id="name-company-id"
                                    type="text"
                                    onChange={(e) => this.changeStateOfByName(e, "companyName")}
                                    className={styles.company}
                                    placeholder="Название компании*"/>
                                <input
                                    id="position-id"
                                    type="text"
                                    onChange={(e) => this.changeStateOfByName(e, "jobTitle")}
                                    className={styles.jobTitle}
                                    placeholder="Ваша должность/название вакансии"/>
                                <select
                                    value={this.state.howGetInterviewSelectVal}
                                    className={styles.howGetInterview}
                                    onChange={(e) => this.handleChangeSelectHowGetInterviewSelect(e)}
                                >
                                    <option value={defaultValueSelect} disabled>Как попали на собеседование</option>
                                    {this.renderSelect(HowToGetIntervew)}
                                </select>
                                <select
                                    value={this.state.timeTakenEnumSelectVal}
                                    className={styles.dateInterview}
                                    onChange={(e) => this.handleChangeTimeTakenEnumSelectVal(e)}
                                >
                                    <option
                                        value={defaultValueSelect}
                                        disabled
                                        selected>Как давно проходили
                                        собеседование
                                    </option>
                                    {this.renderSelectArr(2014, 2020)}
                                </select>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={styles.title}>Расскажите как проходил отбор?</div>
                            <div className={classNames(styles.itemContainer, styles.processSelectionWithFirstOverview)}>
                                <textarea
                                    onChange={(e) => this.changeStateOfByName(e, "overview")}
                                    name="process-selection"
                                    placeholder="Опишите процесс отбора в компанию*"></textarea>
                                <select
                                    value={this.state.timeTakenEnumSelectVal}
                                    onChange={(e) => this.handleChangeTimeTakenEnumSelectVal(e)}
                                >
                                    <option value={defaultValueSelect} disabled selected>Сколько длился отбор</option>
                                    {this.renderSelect(TimeTakenEnum)}
                                </select>
                                <select>
                                    <option value={defaultValueSelect} disabled selected>Сложность отбора</option>
                                    {this.renderSelectArr(1,5)}
                                </select>
                            </div>
                        </div>
                        {this.renderTypeOfInterview()}
                        <div className={styles.item}>
                            <div className={styles.title}>Ваше впечатление от процесса отбора?</div>
                            <div
                                className={classNames(styles.itemContainer, styles.impression)}
                                onClick={(e) => this.onClickBtnRecom(e)}
                            >
                                <button
                                    id = {RecommendEnum.RECOMMEND}
                                    className={classNames(styles.btn, styles.btnGreen, styles.positive, this.state.feedback.feedbackGrade === RecommendEnum.RECOMMEND ? styles.active: "")}>Положительное
                                </button>
                                <button
                                    id = {RecommendEnum.NEUTRAL}
                                    className={classNames(styles.btn, styles.neutrally, this.state.feedback.feedbackGrade === RecommendEnum.NEUTRAL ? styles.active: "")}
                                >Нейтральное</button>
                                <button
                                    id = {RecommendEnum.UNRECOMMEND}
                                    className={classNames(styles.btn, styles.negatively, this.state.feedback.feedbackGrade === RecommendEnum.UNRECOMMEND ? styles.active: "")}
                                >Отрицательное</button>
                            </div>
                        </div>
                        <div className={styles.item}>
                            <div className={classNames(styles.itemContainer, styles.proposal)}>
                                <p>Вы получили предложение о работе от этой компании?</p>
                                <div
                                    className={styles.choise}
                                    onClick={(e) => this.onClickBtnSelectIn(e)}
                                >
                                    <button id={SelectInEnum.yes} className={classNames(styles.btn, styles.btnBorder, styles.yes, this.state.feedback.selectIn === SelectInEnum.yes ? styles.active: "")}>Да</button>
                                    <button id={SelectInEnum.no} className={classNames(styles.btn, styles.no, this.state.feedback.selectIn === SelectInEnum.no ? styles.active: "")}>Нет</button>
                                </div>
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
)(withRouter(LeaveFeedbackSelection));
