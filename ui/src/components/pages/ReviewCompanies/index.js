import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import breadcrambArrow from '@career/assets/img/system/breadcramb-arrow.svg';
import AboutCompanyCard from './AboutCompanyСard'
import AboutSalary from './AboutSalary'
import AboutPhotos from './AboutPhotos'
import AboutInterview from './AboutInterview'
import sberIkon from "@career/assets/img/companies/sber-ikon.svg";
import starGreen from "@career/assets/img/system/star-green.svg";
import star50 from "@career/assets/img/system/star-50.svg";
import starGrey from "@career/assets/img/system/star-grey.svg";
import Aside from '@career/components/common/Aside';

class ReviewCompanies extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedTabId: AboutCompanyCard.getTabId()
        }
    }

    onClickTab(e) {
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
                <main className={styles.company}>
                    <div className={styles.container}>
                        <div className={styles.breadcrambs}><a href="#"><img src={breadcrambArrow}/><span>Вернуться к списку компаний</span></a>
                            <p>В нашей базе свыше 1280 компаний</p>
                        </div>
                        <div className={styles.content}>
                            <div className={styles.card}>
                                <div className={styles.header}>
                                    <div className={styles.company}>
                                        <div className={styles.logo}><img src={sberIkon}/></div>
                                        <div className={styles.info}>
                                            <p className={styles.name}>Сбербанк</p>
                                            <p className={styles.service}>Банковские услуги частным клиентам.</p>
                                        </div>
                                    </div>
                                    <div className={styles.rating}>
                                        <div className="stars"><img src={starGreen}/><img
                                            src={starGreen}/><img src={star50}/><img
                                            src={starGrey}/><img src={starGrey}/></div>
                                        <span>2.4</span>
                                    </div>
                                    <div className={styles.tabs} onClick={(e) => this.onClickTab(e)}>
                                        <ul>
                                            <li className={this.classOfTab(AboutCompanyCard.getTabId())}><a href="#" id={AboutCompanyCard.getTabId()}>О
                                                компании <span>(24)</span></a></li>
                                            <li className={this.classOfTab(AboutSalary.getTabId())}><a href="#" id={AboutSalary.getTabId()}>О зарплате <span>(4)</span></a>
                                            </li>
                                            <li className={this.classOfTab(AboutInterview.getTabId())}><a href="#" id={AboutInterview.getTabId()}>Об
                                                отборе <span>(10)</span></a></li>
                                            <li className={this.classOfTab(AboutPhotos.getTabId())}><a href="#" id={AboutPhotos.getTabId()}>Фото</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            {<AboutCompanyCard selectedTabId = {this.state.selectedTabId}/>}
                            {<AboutSalary selectedTabId = {this.state.selectedTabId}/>}
                            {<AboutInterview selectedTabId = {this.state.selectedTabId}/>}
                            {<AboutPhotos selectedTabId = {this.state.selectedTabId}/>}
                        </div>
                        {<Aside/>}
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
)(withRouter(ReviewCompanies));
