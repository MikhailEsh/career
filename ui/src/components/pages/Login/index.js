import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import logo from '@career/assets/img/brand/logo.svg';
import { logIn } from '@career/acs/auth';
import styles from './index.module.css';

class Login extends PureComponent {
  state = {
    username: 'user',
    password: 'pass',
    loading: false,
  };

  handleInputChange = ev =>
    this.setState({ [ev.target.name]: ev.target.value });

  handleSubmit = ev => {
    const { history, location, logIn } = this.props;
    const { username, password } = this.state;

    this.setState({ loading: true });
    ev.preventDefault();

    logIn(username, password).then(res => {
      console.log(res);
      const pageToNavigate = location.navigateFrom;
      if (pageToNavigate) {
        history.replace(pageToNavigate);
      }
    });
  };

  render() {
    const { password, username } = this.state;

    return (
      <main className={styles.main}>
        <CssBaseline />
        <Paper className={styles.paper}>
          <img src={logo} alt="TAFS engine" className={styles.logo} />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={styles.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Login</InputLabel>
              <Input
                id="username"
                name="username"
                autoComplete="email"
                autoFocus
                value={username}
                onChange={this.handleInputChange}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.handleInputChange}
              />
            </FormControl>
            <Button
              type="button"
              fullWidth
              variant="contained"
              color="primary"
              className={styles.submit}
              onClick={this.handleSubmit}
            >
              Sign in
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

const mapDispatchToProps = {
  logIn,
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Login));
