import React, {PureComponent} from "react";
import styles from './index.module.css';
import logo2 from "@career/assets/img/system/logo2.svg";

export default class Footer extends PureComponent {

    render() {
        var logoLocal = logo2;
        return (
            <footer>
                <div className={styles.container}>
                    <div className="logo"><a href="#"><img src={logoLocal}/></a></div>
                    <div className={styles.copyright}>
                        <p>© 2020. ScanJob. Все права защищены.</p>
                    </div>
                </div>
            </footer>
        );
    }
}
