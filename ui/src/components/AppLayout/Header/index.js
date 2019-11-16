import React, { PureComponent } from 'react';
import {connect} from "react-redux";
import {logOut } from '@career/acs/auth';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
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
        return (
            <div className={styles.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" name = {COMPANIES} onClick={this.openPage}>Все компании</Button>
                        <Button color="inherit" name = {LEAVEFEEDBACK} onClick={this.openPage}>Оставить отзыв</Button>
                        <Button color="inherit">Зарегистрироваться</Button>
                    </Toolbar>
                </AppBar>
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