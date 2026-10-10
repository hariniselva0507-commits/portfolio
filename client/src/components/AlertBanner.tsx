import React from 'react';
import { Alert } from 'react-bootstrap';

interface AlertBannerProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  icon?: string;
}

export const AlertBanner: React.FC<AlertBannerProps> = ({
  variant = 'info',
  message,
  onClose,
  icon,
}) => {
  const defaultIcon =
    variant === 'success'
      ? 'bi-check-circle-fill'
      : variant === 'danger'
      ? 'bi-exclamation-triangle-fill'
      : variant === 'warning'
      ? 'bi-exclamation-circle-fill'
      : 'bi-info-circle-fill';

  return (
    <Alert
      variant={variant}
      dismissible={!!onClose}
      onClose={onClose}
      className="d-flex align-items-center shadow-sm border-0 alert-modern"
    >
      <i className={`bi ${icon || defaultIcon} fs-5 me-2`}></i>
      <div className="flex-grow-1">{message}</div>
    </Alert>
  );
};
