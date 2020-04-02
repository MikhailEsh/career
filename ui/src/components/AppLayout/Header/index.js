import React, { PureComponent } from 'react';
import {connect} from "react-redux";
import classNames from "classnames"
import {logOut } from '@career/acs/auth';
import logo from '@career/assets/img/system/logo.svg';
import logo2 from '@career/assets/img/system/logo2.svg';
import styles from './index.module.css';
import {withRouter} from "react-router-dom";

class Header extends PureComponent {

    constructor(props) {
        super(props);
    }

    openPage = ev => {
        ev.preventDefault();
        const {history} = this.props;
        if (ev.currentTarget) {
            const url = ev.currentTarget.name;
            history.push(url);
        }
    };

    getClassName(name) {
        const pathname = this.props.location.pathname;
        if ("/" + name === pathname) {
            return styles.active;
        } else {
            return "";
        }
    }

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
                                <li className={this.getClassName("home")}><
                                    a href="#"
                                      name="home"
                                      onClick={(e) => this.openPage(e)}>Главная</a></li>
                                <li className={this.getClassName("companies")}><a
                                    href="#"
                                    name="companies"
                                    onClick={(e) => this.openPage(e)}
                                >Все компании</a></li>
                                {/*<li className={this.getClassName("employers")}><a href="#">Работодателям</a></li>*/}
                            </ul>
                        </nav>
                        <div className={styles.account}><a href="#"><img src="./img/user-ikon.svg"/><span>Личный кабинет</span></a>
                        </div>
                        <div className={styles.reviewHeader}>
                            <button
                                name="leavefeedback"
                                className={classNames(styles.btn, styles.btnGreen)}
                                onClick={(e) => this.openPage(e)}
                            >Оставить отзыв</button>
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
)(withRouter(Header));