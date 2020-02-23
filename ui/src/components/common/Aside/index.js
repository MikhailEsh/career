import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import starGreen from '@career/assets/img/system/star-green.svg';
import star50 from '@career/assets/img/system/star-50.svg';
import styles from './index.module.css';


class Aside extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <aside>
                <div className={styles.searchCompany}>
                    <p className={styles.asideTitle}>Найти компанию</p>
                    <form>
                        <input type="search" placeholder="Введите название компании..." name="company"/>
                        <input type="submit" value=""/>
                    </form>
                </div>
                <div className={styles.topCompanies}>
                    <p className={styles.asideTitle}>Топ компаний:</p>
                    <div className={styles.topCompaniesContainer}>
                        <div className={styles.item}><a href="#">Яндекс</a>
                            <div className={styles.rating}>
                                <div className="stars"><img src={starGreen}/><img
                                    src={starGreen}/><img src={starGreen}/><img
                                    src={starGreen}/><img src={star50}/>
                                </div>
                                <span>4.4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </aside>
        );
    }
}


const mapDispatchToProps = {
    logIn,
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(Aside));
