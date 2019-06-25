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
    const { isAuthenticated } = true;
      return (
        <Suspense fallback={<LoadingProgress />}>
          {isAuthenticated ? (
            <Switch>
              <Route exact path="/404" name="Page 404" component={Page404} />
              <Route path="/test" name="Home" component={props => <DefaultLayout {...props} />} />
            </Switch>
          ) : (
            <Switch>
              <Route path={LOGIN_PAGE} component={LoginPage} />

              {/* Redirect to Login, but remember requested route to return back after login success */}
              <Route
                render={({ location }) => (
                  <Redirect
                    to={{
                      pathname: LOGIN_PAGE,
                      // this flag will be handled by login page as redirect path after success
                      navigateFrom: location.pathname,
                    }}
                  />
                )}
              />
            </Switch>
          )}
        </Suspense>
      );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.user.auth.isAuthenticated,
  username: state.user.info.username,
});

export default withRouter(connect(mapStateToProps)(App));
