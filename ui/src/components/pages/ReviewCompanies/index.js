import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AboutCompany from './AboutCompany';
import AboutInterview from './AboutInterview';
import {getCompanyById} from '@career/services/api';
import AboutSalary from './AboutSalary';
import {notifyError} from '@career/services/notifications';

class ReviewCompanies extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            company: {},
            valueOfTab: 0,
            id: this.props.match.params.id
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getCompanyById(this.state.id)
            .then(company => {
                this.setState({
                    company: company,
                });
            })
            .catch(error => notifyError(error.message));
    };

    a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    handleChangeTab = (event, newValue) => {
        this.setState({
            valueOfTab: newValue,
        });
    };

    render() {
        const lableAboutCompany = "О компании " + this.state.company.countCompanyReview;
        const lableSalary = "Зарплаты " + this.state.company.countSalaryReview;
        const lableInterview = "Отбор " + this.state.company.countSelectionReview;
        return (
            <div className={styles.root}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={styles.paper}>Здесь находиться поисковая строка</Paper>
                    </Grid>
                    <hr className={styles.lineseparator}/>
                    <Grid item xs={9}>
                        <Typography variant="h3" gutterBottom>
                            {this.state.company.name}
                        </Typography>
                        <br/>
                        <div className={styles.root}>
                            <AppBar position="static">
                                <Tabs
                                    value={this.state.valueOfTab}
                                    onChange={this.handleChangeTab}
                                    aria-label="simple tabs example"
                                >
                                    <Tab label={lableAboutCompany} {...this.a11yProps(0)} />
                                    <Tab label={lableSalary} {...this.a11yProps(1)} />
                                    <Tab label={lableInterview} {...this.a11yProps(2)} />
                                </Tabs>
                            </AppBar>
                            <AboutCompany value={this.state.valueOfTab} index={0} company={this.state.company} idCompany = {this.state.id}/>
                            <AboutSalary value={this.state.valueOfTab} index={1}/>
                            <AboutInterview value={this.state.valueOfTab} index={2}/>
                        </div>
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
)(withRouter(ReviewCompanies));
