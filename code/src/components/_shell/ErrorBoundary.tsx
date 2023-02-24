import React, { Component } from 'react';
import { getErrorLogger } from '../../util/ErrorLogger/getErrorLogger';
import { ErrorMessage } from '../ErrorMessage';

class ErrorBoundary extends Component<any> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any) {
    getErrorLogger().log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ marginTop: '3rem' }}>
          <ErrorMessage />
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
