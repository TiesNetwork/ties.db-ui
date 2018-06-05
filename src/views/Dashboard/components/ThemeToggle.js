import classNames from 'classnames';
import { get } from 'lodash';
import React from 'react';
import { compose, lifecycle, withHandlers } from 'recompose';
import { connect } from 'react-redux';

/** Actions **/
import { setTheme } from 'services/env';

/** Types **/
import {
  DARK_THEME,
  LIGHT_THEME
} from 'services/env';

import styles from './ThemeToggle.scss';

const DashboardThemeToggle = ({ onClick, theme }) => {
  const className = classNames(styles.Root, {
    [styles.RootDark]: theme === DARK_THEME,
    [styles.RootLight]: theme === LIGHT_THEME,
  });

  const handleClick = () => onClick && onClick(
    theme === DARK_THEME
      ? LIGHT_THEME
      : DARK_THEME
  )

  return (
    <button
      className={className}
      onClick={handleClick}
    >
      <div className={styles.Selector} />
      <div className={styles.Current}>
        <div className={styles.Icon} />
      </div>
    </button>
  );
}

const mapStateToProps = ({ services }) => get(services, 'env', {})
const mapDispatchToProps = dispatch => ({
  onClick: theme => dispatch(setTheme(theme)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withHandlers({
    setTheme: ({ theme }) => () => {
      localStorage.setItem('theme', theme);
      document.body.setAttribute('theme', theme);
    },
  }),
  lifecycle({
    componentDidMount() {
      this.props.setTheme();
    },
    componentDidUpdate() {
      this.props.setTheme();
    },
  })
)(DashboardThemeToggle);
