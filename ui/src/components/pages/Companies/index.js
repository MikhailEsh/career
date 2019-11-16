import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import {notifyError} from '@career/services/notifications';
import {getAllCompanies} from '@career/services/api';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CompaniesInfo from '@career/components/common/CompaniesInfo'


class Companies extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            companies: []
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getAllCompanies()
            .then(companies => {
                this.setState({
                    companies: companies,
                });
            })
            .catch(error => notifyError(error.message));
    };

    render() {
        return (
            <div className={styles.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={styles.paper}>Здесь находиться поисковая строка</Paper>
                    </Grid>
                    <Grid item xs={9}>
                        Компании
                    </Grid>
                    <hr className={styles.lineseparator}/>
                    <Grid item xs={9}>
                        <CompaniesInfo/>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={styles.paper}>Здесь находиться боковая панель и прочяя херня</Paper>
                    </Grid>
                </Grid>
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
)(withRouter(Companies));
