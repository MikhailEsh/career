import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import {getReviewSalariesByCompany} from '@career/services/api';
import styles from "../Home/index.module.css";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import {notifyError} from '@career/services/notifications';

function createData(name, calories, fat, carbs, protein) {
    return {name, calories, fat, carbs, protein};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];


class AboutSalary extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            company:{}
        }
    }

    loadData = () => {
        getReviewSalariesByCompany(this.props.idCompany)
            .then(reviews => {
                this.setState({
                    reviews: reviews,
                });
            })
            .catch(error => notifyError(error.message));
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
                {/*<Paper className={styles.root}>*/}
                {/*    <Table className={styles.table} aria-label="simple table">*/}
                {/*        <TableHead>*/}
                {/*            <TableRow>*/}
                {/*                <TableCell>Название компании</TableCell>*/}
                {/*                <TableCell align="right">Отзывы о компании</TableCell>*/}
                {/*                <TableCell align="right">Отзывы зарплаты</TableCell>*/}
                {/*                <TableCell align="right">Об отборе</TableCell>*/}
                {/*            </TableRow>*/}
                {/*        </TableHead>*/}
                {/*        <TableBody>*/}
                {/*            {rows.map(row => (*/}
                {/*                <TableRow key={row.name}>*/}
                {/*                    <TableCell component="th" scope="row">*/}
                {/*                        {row.name}*/}
                {/*                    </TableCell>*/}
                {/*                    <TableCell align="right">{row.calories}</TableCell>*/}
                {/*                    <TableCell align="right">{row.fat}</TableCell>*/}
                {/*                    <TableCell align="right">{row.carbs}</TableCell>*/}
                {/*                </TableRow>*/}
                {/*            ))}*/}
                {/*        </TableBody>*/}
                {/*    </Table>*/}
                {/*</Paper>*/}
                Тут пока заглушка так как нужно доделать на бэке агрегирование по сущностям
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
)(withRouter(AboutSalary));
