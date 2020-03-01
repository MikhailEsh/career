import React, {PureComponent} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn} from '@career/acs/auth';
import starGreen from '@career/assets/img/system/star-green.svg';
import star50 from '@career/assets/img/system/star-50.svg';
import styles from './index.module.css';
import starGrey from "@career/assets/img/system/star-grey.svg";


class Rating extends PureComponent {

    constructor(props) {
        super(props);
    }

    getStar(sign, rating) {
        if ((rating - sign) > 0) {
            if ((rating - sign) < 1) {
                return star50;
            } else return starGreen;
        } else return starGrey;
    }

    render() {
        const roundRating = Number((this.props.rating).toFixed(1));
        const positions = Array.from(Array(5).keys());
        return (
            <div className={styles.rating}>
                <div className="stars">
                    {
                        positions.map(position => {
                            return <img src={this.getStar(position, roundRating)}/>;
                        })
                    }
                </div>
                <span>{Number((roundRating).toFixed(1))}</span>
            </div>
        )
            ;
    }
}


const mapDispatchToProps = {
    logIn,
};

export default connect(
    null,
    mapDispatchToProps
)(withRouter(Rating));
