import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import {notifyError} from '@career/services/notifications';
import {getAllCompanies} from '@career/services/api';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import TabAboutCompany from './TabAboutCompany';



class LeaveFeedback extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            companies: [],
            value: 0
        }
    }

    componentDidMount() {
        this.loadData();
    }

    a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
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

    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
        });
    };

    render() {
        return (
            <div className={styles.root}>
                <Grid container spacing={3}>
                    <Grid item xs={9}>
                        <Paper className={styles.root}>
                            <h1>Ваш анонимный отзыв</h1>
                            <div className={styles.root}>
                                <AppBar position="static">
                                    <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                                        <Tab label="Item One" {...this.a11yProps(0)} />
                                        <Tab label="Item Two" {...this.a11yProps(1)} />
                                        <Tab label="Item Three" {...this.a11yProps(2)} />
                                    </Tabs>
                                </AppBar>
                                <TabAboutCompany value={this.state.value} index={0}>
                                    Item One
                                </TabAboutCompany>
                                <TabAboutCompany value={this.state.value} index={1}>
                                    Item Two
                                </TabAboutCompany>
                                <TabAboutCompany value={this.state.value} index={2}>
                                    Item Three
                                </TabAboutCompany>
                            </div>
                        </Paper>
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
)(withRouter(LeaveFeedback));
