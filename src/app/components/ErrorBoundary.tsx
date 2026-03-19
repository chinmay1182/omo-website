"use client"
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import styles from './ErrorBoundary.module.css';

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service
    console.error('Error Boundary caught an error:', error, errorInfo);

    // You can integrate with error reporting services here
    // Example: Sentry, LogRocket, etc.
    if (typeof window !== 'undefined') {
      // Report to analytics
      if (window.gtag) {
        window.gtag('event', 'exception', {
          description: error.toString(),
          fatal: false
        });
      }
    }
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  override render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className={styles.errorContainer}>
          <div className={styles.errorContent}>
            <div className={styles.errorIcon}>
              <AlertTriangle size={64} />
            </div>

            <h1 className={styles.errorTitle}>Oops! Something went wrong</h1>

            <p className={styles.errorMessage}>
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
            </p>

            <div className={styles.errorActions}>
              <button
                onClick={this.handleReload}
                className={styles.primaryButton}
              >
                <RotateCcw size={16} />
                Try Again
              </button>

              <button
                onClick={this.handleGoHome}
                className={styles.secondaryButton}
              >
                <Home size={16} />
                Go Home
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className={styles.errorDetails}>
                <summary>Error Details (Development Only)</summary>
                <pre className={styles.errorStack}>
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
