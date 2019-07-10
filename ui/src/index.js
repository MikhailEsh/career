import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ApolloProvider } from 'react-apollo';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import { ToastContainer, Flip } from 'react-toastify';
import { graphql } from '@career/services/api';
import 'flag-icon-css/css/flag-icon.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'simple-line-icons/css/simple-line-icons.css';
import history from './history';
import App from './App';
import store from './store';
import 'react-toastify/dist/ReactToastify.min.css';
import 'typeface-roboto';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#395a75' },
    secondary: { main: '#4c7c70' },
  },
  typography: {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <ToastContainer autoClose={8000} transition={Flip} hideProgressBar />
        <ApolloProvider client={graphql}>
          <App />
        </ApolloProvider>
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
