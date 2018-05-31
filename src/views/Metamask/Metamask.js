import  classNames from 'classnames';
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
    const { incorrectNetwork } = this.props;

    return (
      <div className={styles.Root}>
        <div className={styles.Title}>
          The application requires the Metamask
        </div>

        <div
          className={styles.Logo}
          ref={c => { this.logo = c; }}
        />

        <div className={styles.Roadmap}>
          <div className={classNames(styles.RoadmapPoint, {
            [styles.RoadmapPointCompleted]: incorrectNetwork,
          })}>
            1. Install the <a className={styles.Link} href="https://metamask.io" rel="noopener noreferrer" target="_blank">Metamask</a> browser extension
          </div>

          <div className={classNames(styles.RoadmapPoint, {
            [styles.RoadmapPointDisabled]: !incorrectNetwork,
          })}>
            2. Choose the «Rinkeby Test network»
          </div>

          <div className={classNames(styles.RoadmapPoint, styles.RoadmapPointDisabled)}>
            3. Enjoy!
          </div>
        </div>
      </div>
    );
  }
}

export default Metamask;
