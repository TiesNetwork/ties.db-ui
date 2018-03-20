import MetamaskLogo from 'metamask-logo';
import React, { Component } from 'react';

import styles from './Metamask.scss';

class Metamask extends Component {
  componentDidMount() {
    const viewer = MetamaskLogo({
      followMouse: true,
      height: 500,
      pxNotRatio: true,
      slowDrift: false,
      width: 500,
    });

    this.logo.appendChild(viewer.container);
  }

  render() {
    return (
      <div className={styles.Root}>
        <div className={styles.Title}>
          The application requires the Metamask
        </div>

        <div
          className={styles.Logo}
          ref={c => { this.logo = c; }}
        />

        <a
          className={styles.Link}
          href="https://metamask.io/"
          target="_blank"
        >
          Get extension
        </a>
      </div>
    );
  }
}

export default Metamask;
