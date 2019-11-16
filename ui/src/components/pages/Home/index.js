import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {getTopReview} from '@career/services/api';
import AutosuggestCompany from '@career/components/common/AutosuggestCompany';
import {notifyError} from '@career/services/notifications';
import CompaniesInfo from '@career/components/common/CompaniesInfo'

class Home extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            topReview: undefined
        }
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        getTopReview()
            .then(topReview => {
                this.setState({
                    topReview: topReview,
                });
            })
            .catch(error => notifyError(error.message));
    };

    renderTopReview = () => {
        if (this.state.topReview !== undefined) {
            return <Card className={styles.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {this.state.topReview.company.name}
                    </Typography>
                    <Typography className={styles.title} color="textSecondary" gutterBottom>
                        {this.state.topReview.position}
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
                    <Typography className={styles.pos} color="textSecondary">
                        Отзыв
                    </Typography>
                    <Typography variant="body2" component="p">
                        {this.state.topReview.name}
                    </Typography>
                    <Typography className={styles.pos} color="textSecondary">
                        Плюсы
                    </Typography>
                    <Typography variant="body2" component="p">
                        {this.state.topReview.plus}
                    </Typography>
                    <Typography className={styles.pos} color="textSecondary">
                        Минусы
                    </Typography>
                    <Typography variant="body2" component="p">
                        {this.state.topReview.minuses}
                    </Typography>
                </CardContent>
            </Card>
        } else return "";


    };

    render() {
        // const [age, setAge] = React.useState('');
        // const classes = useStyles();
        const bull = <span className={styles.bullet}>•</span>;
        return (
            <div>
                <div>
                    <h1>Поиск отзывов о работодателях и зарплатах при отборе компании</h1>
                </div>
                <AutosuggestCompany/>
                <hr className={styles.lineseparator}/>
                <div>
                    {this.renderTopReview()}
                    <hr className={styles.lineseparator}/>
                    <CompaniesInfo/>
                </div>
                <div>
                    <br/>
                    <br/>
                    <br/>

                    <div>Работодатели на ScanJob</div>
                    <div> Имя компании Отзывы: 10 о компании, 15 о зарплате, 4 о отборе общая оценца 4.5</div>
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
)(withRouter(Home));
