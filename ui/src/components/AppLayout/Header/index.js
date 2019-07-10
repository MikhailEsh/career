import React, { PureComponent } from 'react';
import {connect} from "react-redux";
import {logOut } from '@career/acs/auth';
import styles from './index.module.css';

class Header extends PureComponent {
    render() {
        return (
            <div className={styles.header}>

            </div>
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