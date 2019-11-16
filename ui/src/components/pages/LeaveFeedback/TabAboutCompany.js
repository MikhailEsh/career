import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import styles from './index.module.css';
import Typography from "@material-ui/core/Typography";
import Box from '@material-ui/core/Box';
import AutosuggestCompany from '@career/components/common/AutosuggestCompany';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Rating from '@material-ui/lab/Rating';


class TabAboutCompany extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            value: 0,
            rating: 0
        }
    }

    handleChangeTab = (event, newValue) => {
        this.setState({
            value: newValue,
        });
    };

    renderRating(legend, value, onChange, newValue) {
        return <Box component="fieldset" mb={3} borderColor="transparent">
            <Typography component="legend">{legend}</Typography>
            <Rating
                name="simple-controlled"
                value={value}
                precision={1}
                onChange={(event, newHover) => {
                    onChange(newValue)
                }}
            />
        </Box>
    }

    // raintings = [
    //     {
    //         label =
    //     }
    // ];

    render() {
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={this.props.value !== this.props.index}
                id={`simple-tabpanel-${this.props.index}`}
                aria-labelledby={`simple-tab-${this.props.index}`}
                {...this.props.other}
            >
                <Box p={3}>
                    <h2> О компании </h2>
                    <br/>
                    <p>Название компании обязательно</p>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <AutosuggestCompany/>
                        </Grid>
                        <hr className={styles.lineseparator}/>
                        <Grid item xs={6}>
                            <Paper className={styles.paper}>
                                <TextField
                                    id="outlined-basic"
                                    className={styles.textField}
                                    label="Должность"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={6}>
                            <Paper className={styles.paper}>
                                <TextField
                                    id="outlined-basic"
                                    className={styles.textField}
                                    label="Ваш отдел / подразделение"
                                    margin="normal"
                                    variant="outlined"
                                />
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <h2>Оценка компании</h2>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography component="legend">Общий рейтинг</Typography>
                            <Rating
                                name="simple-controlled"
                                value={this.state.rating}
                                precision={1}
                                onChange={(event, newHover) => {
                                    this.setState({
                                        rating: newHover,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Typography component="legend">Зарплата и соцпакет</Typography>
                            <Rating
                                name="simple-controlled"
                                value={this.state.rating}
                                precision={1}
                                onChange={(event, newHover) => {
                                    this.setState({
                                        rating: newHover,
                                    });
                                }}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <h2>Оценка компании</h2>
                        </Grid>
                    </Grid>
                </Box>
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
)(withRouter(TabAboutCompany));
