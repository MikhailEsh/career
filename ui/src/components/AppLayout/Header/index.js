import React, { PureComponent } from 'react';
import {connect} from "react-redux";
import {withTranslation} from "react-i18next";
import { logOut } from '@career/acs/auth';

class Header extends PureComponent {
    render() {
        return (
            <div>
                Misha
            </div>
        );
    }
}


const mapDispatchToProps = {
    logOut,
};

export default connect(
    mapDispatchToProps
)(withTranslation()(Header));