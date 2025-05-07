import React from 'react';
import PropTypes from 'prop-types';
import { Log } from 'tools';
import { InfoPageContainer } from './InfoPageContainer/InfoPageContainer';
import styles from './ErrorBoundary.module.scss';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMessage: '' };
  }

  static getDerivedStateFromError(error) {
    return { errorMessage: error.toString() };
  }

  componentDidCatch(error, errorInfo) {
    Log.error(error, errorInfo);
  }

  render() {
    const { errorMessage } = this.state;
    const { children } = this.props;

    if (errorMessage) {
      return (
        <InfoPageContainer>
          <div className={styles.container}>
            <h1 className={styles.errorTitle}>Processing your request.</h1>
          </div>
        </InfoPageContainer>
      );
    }

    return children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
