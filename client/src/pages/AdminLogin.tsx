import React, { useState } from 'react';
import { Container, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { getApiErrorMessage } from '../services/api';

export const AdminLogin: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@portfolio.dev');
    setPassword('Admin@12345');
    setError(null);
  };

  return (
    <div className="admin-login-page d-flex align-items-center justify-content-center min-vh-100 py-5 bg-body-tertiary">
      <Container style={{ maxWidth: '460px' }}>
        <div className="text-center mb-4">
          <div className="brand-logo-badge admin-badge mx-auto mb-3" style={{ width: '60px', height: '60px' }}>
            <i className="bi bi-shield-lock-fill text-warning fs-2"></i>
          </div>
          <h2 className="fw-bold mb-1">Portfolio Administration</h2>
          <p className="text-secondary small">
            Sign in with authorized credentials to manage portfolio content.
          </p>
        </div>

        <Card className="border border-secondary-subtle rounded-4 shadow-sm p-4 p-md-4 bg-body">
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)} className="small d-flex align-items-center">
              <i className="bi bi-exclamation-octagon-fill me-2 fs-5"></i>
              <div>{error}</div>
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="adminEmail">
              <Form.Label className="small fw-semibold">Email Address</Form.Label>
              <div className="input-group">
                <span className="input-group-text bg-body-tertiary border-secondary-subtle">
                  <i className="bi bi-envelope text-secondary"></i>
                </span>
                <Form.Control
                  type="email"
                  placeholder="admin@portfolio.dev"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-secondary-subtle"
                />
              </div>
            </Form.Group>

            <Form.Group className="mb-4" controlId="adminPassword">
              <Form.Label className="small fw-semibold">Password</Form.Label>
              <div className="input-group">
                <span className="input-group-text bg-body-tertiary border-secondary-subtle">
                  <i className="bi bi-key text-secondary"></i>
                </span>
                <Form.Control
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••••"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-secondary-subtle"
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary border-secondary-subtle"
                  onClick={() => setShowPassword(!showPassword)}
                  title="Toggle password visibility"
                >
                  <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                </button>
              </div>
            </Form.Group>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={loading}
              className="w-100 rounded-pill mb-3 fw-semibold shadow-sm d-flex align-items-center justify-content-center gap-2"
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right"></i>
                  <span>Enter Dashboard</span>
                </>
              )}
            </Button>
          </Form>

          {/* Quick Demo Credentials Helper */}
          <div className="p-3 bg-body-tertiary rounded-3 border border-secondary-subtle small mt-2">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <span className="fw-bold text-body">Default Admin Credentials</span>
              <button
                type="button"
                className="btn btn-link p-0 small text-decoration-none text-primary fw-semibold"
                onClick={handleFillDemo}
              >
                Auto-fill
              </button>
            </div>
            <div className="text-secondary font-monospace" style={{ fontSize: '0.82rem' }}>
              Email: <code>admin@portfolio.dev</code><br />
              Pass: <code>Admin@12345</code>
            </div>
          </div>

          <div className="text-center mt-4">
            <Link to="/" className="text-secondary small text-decoration-none hover-primary">
              <i className="bi bi-arrow-left me-1"></i> Back to Public Website
            </Link>
          </div>
        </Card>
      </Container>
    </div>
  );
};
