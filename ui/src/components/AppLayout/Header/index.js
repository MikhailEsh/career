import React, { PureComponent } from 'react';
import {connect} from "react-redux";
import classNames from "classnames"
import {logOut } from '@career/acs/auth';
import logo from '@career/assets/img/system/logo.svg';
import logo2 from '@career/assets/img/system/logo2.svg';
import styles from './index.module.css';
import {
    COMPANIES,
    LEAVEFEEDBACK
} from '@career/constants/routes';

class Header extends PureComponent {

    constructor(props) {
        super(props);
    }

    openPage = ev => {
        const {history} = this.props;
        if (ev.currentTarget) {
            const url = ev.currentTarget.name;
            history.push(url);
        }
    };

    render() {
        var logoLocal = logo;
        if (this.props.isWhiteLogo === true) {
            logoLocal = logo2;
        }
        return (
            <header>
                <div className={styles.container}>
                    <div className={styles.logo}><a href="#"><img src={logoLocal}/></a></div>
                    <div className={styles.search}>
                        <form>
                            <input type="search" name="header-search" placeholder=""/>
                            <input type="submit" value=""/>
                        </form>
                    </div>
                    <div className={styles.burger}>
                        <button></button>
                    </div>
                    <div className={styles.headerDropdown}>
                        <nav>
                            <ul>
                                <li className={styles.active}><a href="#">Главная</a></li>
                                <li><a href="/allcompanies">Все компании</a></li>
                                <li><a href="#">Работодателям</a></li>
                            </ul>
                        </nav>
                        <div className={styles.account}><a href="#"><img src="./img/user-ikon.svg"/><span>Личный кабинет</span></a>
                        </div>
                        <div className={styles.reviewHeader}>
                            <button className={classNames(styles.btn, styles.btnGreen)}>Оставить отзыв</button>
                        </div>
                    </div>
                </div>
            </header>

        );
    }
}


const mapDispatchToProps = {
    logOut,
};

export default connect(
    null,
    mapDispatchToProps
)((Header));