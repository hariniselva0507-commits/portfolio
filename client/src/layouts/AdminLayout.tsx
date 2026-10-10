import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="d-flex flex-column min-vh-100 admin-layout-root bg-body-tertiary">
      <Navbar bg="body" className="border-bottom border-secondary-subtle px-3 py-2 sticky-top shadow-sm">
        <Container fluid>
          <Navbar.Brand as={Link} to="/admin" className="fw-bold d-flex align-items-center gap-2">
            <div className="brand-logo-badge admin-badge">
              <i className="bi bi-shield-lock-fill text-warning"></i>
            </div>
            <span>Portfolio<span className="text-primary">Admin</span></span>
          </Navbar.Brand>

          <Nav className="ms-auto d-flex align-items-center gap-2">
            <Link to="/" className="btn btn-sm btn-outline-secondary rounded-pill px-3 d-flex align-items-center gap-1" title="View Public Website">
              <i className="bi bi-box-arrow-up-right"></i>
              <span className="d-none d-sm-inline">Public Site</span>
            </Link>

            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
              className="rounded-circle p-2 icon-btn"
              title="Toggle theme"
            >
              {theme === 'dark' ? <i className="bi bi-sun-fill text-warning"></i> : <i className="bi bi-moon-stars-fill text-primary"></i>}
            </Button>

            <div className="vr mx-1 d-none d-sm-block"></div>

            <div className="d-none d-md-flex flex-column text-end small">
              <span className="fw-semibold text-body">{user?.name || 'Administrator'}</span>
              <span className="text-secondary small">{user?.email}</span>
            </div>

            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleLogout}
              className="rounded-pill px-3 d-flex align-items-center gap-1 ms-1"
            >
              <i className="bi bi-box-arrow-right"></i>
              <span className="d-none d-sm-inline">Sign Out</span>
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <div className="flex-grow-1 p-3 p-md-4">
        <Container fluid="lg">
          <Outlet />
        </Container>
      </div>
    </div>
  );
};
