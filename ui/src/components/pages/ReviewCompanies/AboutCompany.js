import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styles from "../Home/index.module.css";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import {getAllReviewByCompany} from '@career/services/api';
import {notifyError} from '@career/services/notifications';


class AboutCompany extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            company:{}
        }
    }

    componentDidMount() {
        this.loadData();
    }



    loadData = () => {
        getAllReviewByCompany(this.props.idCompany)
            .then(reviews => {
                this.setState({
                    reviews: reviews,
                });
            })
            .catch(error => notifyError(error.message));
    };

    renderReview = (review) => {
       return <Card className={styles.card}>
           <CardContent>
               <Typography className={styles.pos} color="textSecondary">
                   {review.date}
               </Typography>
               <Typography variant="body2" component="p">
                   {review.name}
               </Typography>
               <Typography className={styles.pos} color="textSecondary">
                   Плюсы:
               </Typography>
               <Typography variant="body2" component="p">
                   {review.plus}
               </Typography>
               <Typography className={styles.pos} color="textSecondary">
                   Минусы
               </Typography>
               <Typography variant="body2" component="p">
                   {review.minuses}
               </Typography>
               <Typography variant="body2" component="p">
                   Зарплата и соцпакет {review.salaryScale === null ? '-': review.salaryScale}
                   <br/>
                   Руководство {review.leadershipScale === null ? '-': review.leadershipScale}
                   <br/>
                   Карьерные возможности {review.careerScale === null ? '-': review.careerScale}
                   <br/>
                   Культура и ценности {review.cultureScale === null ? '-': review.cultureScale}
                   <br/>
                   Баланс работы и жизни {review.balanceWorkHomeScale === null ? '-': review.balanceWorkHomeScale}
               </Typography>
           </CardContent>
       </Card>
    };

    render() {
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={this.props.value !== this.props.index}
                id={`full-width-tabpanel-${this.props.index}`}
                aria-labelledby={`full-width-tab-${this.props.index}`}
                {...this.props.other}
            >
                <Box p={3}>{this.props.children}</Box>
                <Card className={styles.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            Обзор компании
                        </Typography>
                        <Typography className={styles.title} color="textSecondary" gutterBottom>
                            {this.props.company.countCompanyReview} отзыва
                        </Typography>
                        <Typography variant="body2" component="p">
                            Зарплата и соцпакет 4,6
                            <br/>
                            Руководство 3,5
                            <br/>
                            Карьерные возможности 4,4
                            <br/>
                            Культура и ценности 4,3
                            <br/>
                            Баланс работы и жизни 4,3
                        </Typography>
                    </CardContent>
                </Card>
                <br/>
                {this.state.reviews.map(company => {
                    return this.renderReview(company);
                })}
            </Typography>
        );
    }
}


const mapDispatchToProps = {
    logIn,
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(AboutCompany));
