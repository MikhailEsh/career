import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from "./index.module.css";
import classNames from "classnames";
import markIkon from "@career/assets/img/system/mark-ikon.svg";


class AboutPhotos extends PureComponent {

    constructor(props) {
        super(props);
    }

    static getTabId() {
        return "item-photo";
    }

    render() {
        return (
            <div hidden={this.props.selectedTabId !== AboutPhotos.getTabId()}>
                <div className={styles.cardContainer}>
                    <div className={classNames(styles.cardContent, styles.photos, styles.active)}>
                        <div className={styles.cardContentHeader}>
                            <p className={styles.cardTitle}>Фото</p>
                            <p className={styles.cardRecommended}>Рекомендуют друзьям <span>45%</span></p>
                        </div>
                        <div className={styles.cardContentContainer}>
                            <div className={styles.photo}>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo1.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo2.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo3.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo4.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo5.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo6.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo7.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo8.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo9.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo10.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo11.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo12.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo13.jpg"/></a></div>
                                <div className={styles.item}><a href="#"><img src="/assets/img/office/photo14.jpg"/></a></div>
                            </div>
                            </div>
                            <div className={styles.update}><a href="#"><img
                                src={markIkon}/></a><span>Данные обновлены 18 февраля 2020</span>
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
)(withRouter(AboutPhotos));
