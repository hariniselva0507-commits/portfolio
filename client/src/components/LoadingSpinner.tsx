import React from 'react';
import { Spinner } from 'react-bootstrap';

interface LoadingSpinnerProps {
  message?: string;
  minHeight?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Loading portfolio data...',
  minHeight = '300px',
}) => {
  return (
    <div
      className="d-flex flex-column align-items-center justify-content-center text-center p-5"
      style={{ minHeight }}
    >
      <div className="spinner-glow mb-3">
        <Spinner animation="border" variant="primary" style={{ width: '3rem', height: '3rem' }} />
      </div>
      <p className="text-secondary fw-medium mb-0">{message}</p>
    </div>
  );
};
