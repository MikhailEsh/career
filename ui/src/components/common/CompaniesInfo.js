import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import {notifyError} from '@career/services/notifications';
import {getAllCompanies} from '@career/services/api';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import {
    REVIEWCOMPANIES
} from '@career/constants/routes';
import Paper from "@material-ui/core/Paper";

class CompaniesInfo extends PureComponent {

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

    openRewieCompany = ev => {
        const {history} = this.props;
        if (ev.currentTarget) {
            const dealId = ev.currentTarget.name;
            history.push(REVIEWCOMPANIES.replace(':id', dealId));
        }
    };

    renderCardOfCompany = (company) => {
        return <Card className={styles.card}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {company.name}
                </Typography>
                <Typography variant="body2" component="p">
                    <Grid container spacing={3}>
                        <Grid item xs={3}>
                            <Typography component="p">
                                О компании {company.countCompanyReview}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography component="p">
                                Зарплаты  {company.countSalaryReview}
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography component="p">
                                Отбор  {company.countSelectionReview}
                            </Typography>
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    size="small"
                    name = {company.id}
                    onClick={this.openRewieCompany}
                >Learn More</Button>
            </CardActions>
        </Card>
    }

    render() {
        return (

                <Paper className={styles.paper}>
                    {
                        this.state.companies.map(company => {
                            return this.renderCardOfCompany(company);
                        })
                    }

                </Paper>

        );
    }
}


const mapDispatchToProps = {
    logIn,
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(CompaniesInfo));
