import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


class AboutInterview extends PureComponent {

    constructor(props) {
        super(props);
    }

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
                Здесь пока заглушка, так как у нас нет отзывов в базе
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
)(withRouter(AboutInterview));
