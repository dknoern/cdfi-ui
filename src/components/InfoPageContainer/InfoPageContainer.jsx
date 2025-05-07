import React from 'react';
import PropTypes from 'prop-types';
import logo from '../../assets/images/aeris-cloud-logo.svg';
import styles from './InfoPageContainer.module.scss';

export const InfoPageContainer = ({ children }) => (
  <div className="R container-fluid login-page">
    <div className="row">
      <div className="col">
        <div className="row p0">
          <div className="col-sm-1 col-lg-2 col-xl-3" />

          <div className="col">
            <div className="row">
              <div className="col p64 center-this">
                <img src={logo} height="32" alt="" className={styles.logo} />
              </div>
            </div>

            <div className="row">{children}</div>

            <div className="row">
              <div className="RL col p0 below-login-box-left">
                &copy; {new Date().getFullYear()} Aeris Insight. &nbsp;All
                Rights Reserved
              </div>
            </div>
          </div>

          <div className="col-sm-1 col-lg-2 col-xl-3" />
        </div>
      </div>
    </div>
  </div>
);
InfoPageContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
    PropTypes.element,
    PropTypes.string,
  ]).isRequired,
};
