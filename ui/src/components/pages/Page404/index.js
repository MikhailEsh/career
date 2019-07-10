import React, { Component } from 'react';
import styles from './index.module.css';

class Page404 extends Component {
  render() {
    return (
      <div className={styles.root}>
        <div className={styles.bg}></div>
        <div className={styles.text}>
          <h1 style={{'font-size': '144px'}}>404</h1>
          <h1>Not found</h1>
        </div>
      </div>
    );
  }
}

export default Page404;
