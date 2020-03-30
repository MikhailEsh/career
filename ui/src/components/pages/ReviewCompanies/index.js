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
import Aside from '@career/components/common/Aside';
import {getCompanyById} from '@career/services/api';
import {NOT_LOADED} from '@career/constants/state';
import {COMPANIES} from '@career/constants/routes';
import {notifyError} from '@career/services/notifications';
import Rating from "@career/components/common/Rating";

class ReviewCompanies extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            selectedTabId: AboutCompanyCard.getTabId(),
            idCompany: this.props.match.params.id,
            company: NOT_LOADED
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getCompanyById(this.state.idCompany)
            .then(company => {
                this.setState({
                    company: company,
                });
            })
            .catch(error => notifyError(error.message));
    };

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
        if (this.state.company !== NOT_LOADED) {
            return (
                <div className={styles.root}>
                    <main className={styles.company}>
                        <div className={styles.container}>
                            <div className={styles.breadcrambs}><a href={COMPANIES}><img src={breadcrambArrow}/><span>Вернуться к списку компаний</span></a>
                                <p>В нашей базе свыше 1280 компаний</p>
                            </div>
                            <div className={styles.content}>
                                <div className={styles.card}>
                                    <div className={styles.header}>
                                        <div className={styles.company}>
                                            <div className={styles.logo}><img src={sberIkon}/></div>
                                            <div className={styles.info}>
                                                <p className={styles.name}>{this.state.company.name}</p>
                                                <p className={styles.service}>Банковские услуги частным клиентам.</p>
                                            </div>
                                        </div>
                                        <div className={styles.rating}>
                                            <Rating rating={this.state.company.averageCommonScale}/>
                                        </div>
                                        <div className={styles.tabs} onClick={(e) => this.onClickTab(e)}>
                                            <ul>
                                                <li className={this.classOfTab(AboutCompanyCard.getTabId())}><a href="#" id={AboutCompanyCard.getTabId()}>О
                                                    компании <span>({this.state.company.countCompanyReview})</span></a></li>
                                                <li className={this.classOfTab(AboutSalary.getTabId())}><a href="#" id={AboutSalary.getTabId()}>О зарплате <span>({this.state.company.countSalaryReview})</span></a>
                                                </li>
                                                <li className={this.classOfTab(AboutInterview.getTabId())}><a href="#" id={AboutInterview.getTabId()}>Об
                                                    отборе <span>({this.state.company.countSelectionReview})</span></a></li>
                                                <li className={this.classOfTab(AboutPhotos.getTabId())}><a href="#" id={AboutPhotos.getTabId()}>Фото</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                {<AboutCompanyCard selectedTabId = {this.state.selectedTabId} company={this.state.company}/>}
                                {<AboutSalary selectedTabId = {this.state.selectedTabId}  company={this.state.company}/>}
                                {<AboutInterview selectedTabId = {this.state.selectedTabId}  company={this.state.company}/>}
                                {<AboutPhotos selectedTabId = {this.state.selectedTabId}/>}
                            </div>
                            {<Aside/>}
                        </div>
                    </main>
                </div>
            );
        } else return "";

    }
}


const mapDispatchToProps = {
    logIn,
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(ReviewCompanies));
