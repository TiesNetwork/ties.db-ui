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
    const { incorrectNetwork, notAuthorized } = this.props;

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
            [styles.RoadmapPointCompleted]: incorrectNetwork || notAuthorized,
          })}>
            1. Install the <a className={styles.Link} href="https://metamask.io" rel="noopener noreferrer" target="_blank">Metamask</a> browser extension
          </div>

          <div className={classNames(styles.RoadmapPoint, {
            [styles.RoadmapPointCompleted]: !notAuthorized && incorrectNetwork,
            [styles.RoadmapPointDisabled]: !notAuthorized && !incorrectNetwork,
          })}>
            2. Log in to the extension
          </div>

          <div className={classNames(styles.RoadmapPoint, {
            [styles.RoadmapPointDisabled]: notAuthorized || !incorrectNetwork,
          })}>
            3. { (process.env.CONTRACT_NETWORK !== 4 && 'Choose the «Localhost:8545 network»') || 'Choose the «Rinkeby Test network»'}
          </div>

          <div className={classNames(styles.RoadmapPoint, styles.RoadmapPointDisabled)}>
            4. Enjoy!
          </div>
        </div>
      </div>
    );
  }
}

export default Metamask;
