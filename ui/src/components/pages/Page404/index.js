import React, { Component } from 'react';
import styles from './index.module.css';
import classNames from "classnames";

class Page404 extends Component {
  render() {
    return (
        <div className={styles.block404}>
            <div className={styles.container}>
                <div className={styles.block404Img}><img src="./img/404.png"/></div>
                <div className={styles.block404Text}>
                    <div className={styles.title}>Извините!</div>
                    <div className={styles.text}>Такой страницы не существует. Возможно страница была удалена или опечатка в
                        строке адерса
                    </div>
                    <button className={classNames(styles.btn, styles.btnGreen)}>Перейти на главную</button>
                </div>
            </div>
        </div>
    );
  }
}

export default Page404;
