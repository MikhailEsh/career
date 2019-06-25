import React, { PureComponent } from 'react';
import Header from '@career/components/AppLayout/Header';
import { logOut } from '@career/acs/auth';
import { withTranslation } from 'react-i18next';
import { connect } from 'react-redux';

class Layout extends PureComponent {

  render() {
    return (
      <div>
        <Header/>
      </div>
    );
  }
}

const mapDispatchToProps = {
  logOut,
};

export default connect(
    mapDispatchToProps
)(withTranslation()(Layout));