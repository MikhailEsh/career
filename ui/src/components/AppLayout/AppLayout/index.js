import React, {PureComponent} from 'react';
import Header from '@career/components/AppLayout/Header';
import  Footer from '@career/components/AppLayout/Footer';
import {Switch, Route, Redirect} from 'react-router-dom';
import {logOut} from '@career/acs/auth';
import routes from '@career/routesConfig';
import {connect} from 'react-redux';
import {HOME} from '@career/constants/routes';

class AppLayout extends PureComponent {

    render() {
        return (
            <div>
                <div>
                    <Header/>
                </div>
                <div>
                    <Switch>
                        {routes.map(
                            ({
                                 component: Component,
                                 ...route
                             }) =>
                                Component ? (
                                    <Route
                                        key={`${route.path}_${route.name}`}
                                        render={props => <Component {...props} />}
                                        {...route}
                                    />
                                ) : (
                                    route.redirectTo && (
                                        <Route
                                            key={`${route.path}_${route.name}`}
                                            exact
                                            render={() => <Redirect to={route.redirectTo}/>}
                                            {...route}
                                        />
                                    )
                                )
                        )}
                        <Redirect exact from="/" to={HOME}/>
                    </Switch>
                </div>
                <div>
                    <Footer/>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    logOut,
};

export default connect(
    null,
    mapDispatchToProps
)(AppLayout);