import React, { PureComponent, Suspense } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import DefaultLayout from '@career/components/AppLayout';
import LoginPage from '@career/components/pages/Login';
import Page404 from '@career/components/pages/Page404';
import { LOGIN_PAGE } from '@career/constants/routes';
import LoadingProgress from '@career/components/common/LoadingProgress';

class App extends PureComponent {
  state = {
    error: null,
    eventId: null,
  };

  render() {
      return (
        <Suspense fallback={<LoadingProgress />}>
          <Switch>
            <Route exact path="/404" name="Page 404" component={Page404} />
            <Route path="/" name="Home" component={props => <DefaultLayout {...props} />} />
          </Switch>
        </Suspense>
      );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.auth.isAuthenticated,
  username: state.user.info.username,
});

export default withRouter(connect(mapStateToProps)(App));
