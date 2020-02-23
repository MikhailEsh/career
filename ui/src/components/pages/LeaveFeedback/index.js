import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import LeaveFeedbackCompany from './LeaveFeedbackCompany'
import LeaveFeedbackSelection from './LeaveFeedbackSelection'


class LeaveFeedback extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedTabId: LeaveFeedbackCompany.getTabId()
        }
    }

    onClickTab(e) {
        debugger
        e.preventDefault();
        const  tabId = e.target.id;
        if (tabId !== undefined && tabId !== "") {
            this.setState({
                selectedTabId: tabId,
            });
        }
    }

    classOfTab(tabId) {
        if (this.state.selectedTabId === tabId) {
            return styles.active
        } else return "";
    }



    render() {
        return (
            <div className={styles.root}>
                <main className={styles.feedback}>
                    <div className={styles.container}>
                        <div className={styles.content}>
                            <div className={styles.feedback}>
                                <h2>Анонимный отзыв о компании</h2>
                                <p className={styles.subtitle}>Напишите реальный опыт работы в компании или процесс отбора в
                                    компанию.</p>
                                <div className={styles.tabs} onClick={(e) => this.onClickTab(e)}>
                                    <ul>
                                        <li  className={this.classOfTab(LeaveFeedbackCompany.getTabId())}><a href="#" id={LeaveFeedbackCompany.getTabId()}>О компании</a></li>
                                        <li  className={this.classOfTab(LeaveFeedbackSelection.getTabId())}><a href="#" id={LeaveFeedbackSelection.getTabId()}>Процесс отбора</a></li>
                                    </ul>
                                </div>
                                {<LeaveFeedbackCompany selectedTabId = {this.state.selectedTabId}/>}
                                {<LeaveFeedbackSelection selectedTabId = {this.state.selectedTabId}/>}
                            </div>
                        </div>
                    </div>
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
)(withRouter(LeaveFeedback));
