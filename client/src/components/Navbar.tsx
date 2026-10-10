import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { settingsService } from '../services/settingsService';
import { IWebsiteSettings } from '../types';

export const AppNavbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated } = useAuth();
  const [expanded, setExpanded] = useState<boolean>(false);
  const [settings, setSettings] = useState<IWebsiteSettings | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await settingsService.getSettings();
        setSettings(data);
      } catch (err) {
        console.warn('Could not fetch settings for navbar', err);
      }
    };
    fetchSettings();
  }, []);

  const closeMenu = () => setExpanded(false);

  // Dynamic navigation items from settings or defaults
  const navItems = settings?.navigationMenu && settings.navigationMenu.length > 0
    ? settings.navigationMenu.filter((item) => item.enabled).sort((a, b) => a.order - b.order)
    : [
        { label: 'Home', path: '/', icon: 'bi-house-door', enabled: true, order: 1 },
        { label: 'About', path: '/about', icon: 'bi-person', enabled: true, order: 2 },
        { label: 'Skills', path: '/skills', icon: 'bi-code-slash', enabled: true, order: 3 },
        { label: 'Projects', path: '/projects', icon: 'bi-grid-fill', enabled: true, order: 4 },
        { label: 'Experience', path: '/experience', icon: 'bi-briefcase', enabled: true, order: 5 },
        { label: 'Services', path: '/services', icon: 'bi-gear-wide-connected', enabled: true, order: 6 },
        { label: 'Blog', path: '/blog', icon: 'bi-journal-text', enabled: true, order: 7 },
        { label: 'Contact', path: '/contact', icon: 'bi-envelope', enabled: true, order: 8 },
      ];

  const logoText = settings?.logoText || 'Alex.dev';
  const logoIcon = settings?.logoIcon || 'bi-terminal-fill';

  return (
    <Navbar
      expand="lg"
      sticky="top"
      expanded={expanded}
      className="navbar-custom glass-header border-bottom border-secondary-subtle"
    >
      <Container>
        <Navbar.Brand as={Link} to="/" onClick={closeMenu} className="fw-bold d-flex align-items-center gap-2">
          <div className="brand-logo-badge">
            <i className={`bi ${logoIcon} text-primary`}></i>
          </div>
          <span className="brand-text">
            {logoText}
          </span>
          {settings?.isAvailableForHire && (
            <span
              className="badge rounded-pill bg-success-subtle text-success border border-success-subtle d-none d-md-inline-flex align-items-center gap-1 ms-2 fs-8"
              title={settings.hireNoticeText}
            >
              <span className="pulse-dot"></span> Available
            </span>
          )}
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="main-navbar-nav"
          onClick={() => setExpanded(!expanded)}
          className="border-0 shadow-none text-light"
        >
          <i className={`bi ${expanded ? 'bi-x-lg' : 'bi-list'} fs-3`}></i>
        </Navbar.Toggle>

        <Navbar.Collapse id="main-navbar-nav">
          <Nav className="mx-auto my-2 my-lg-0 gap-lg-1">
            {navItems.map((item, idx) => (
              <Nav.Link
                key={idx}
                as={NavLink}
                to={item.path}
                end={item.path === '/'}
                onClick={closeMenu}
                className="nav-item-custom"
              >
                {item.icon && <i className={`bi ${item.icon} me-1 d-lg-none`}></i>}
                {item.label}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-2 mt-3 mt-lg-0">
            {/* Theme Toggle Button */}
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={toggleTheme}
              className="theme-toggle-btn rounded-circle d-flex align-items-center justify-content-center p-2"
              aria-label="Toggle theme mode"
              title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            >
              {theme === 'dark' ? (
                <i className="bi bi-sun-fill text-warning fs-5"></i>
              ) : (
                <i className="bi bi-moon-stars-fill text-primary fs-5"></i>
              )}
            </Button>

            {/* Admin Portal Button */}
            {isAuthenticated ? (
              <Link
                to="/admin"
                onClick={closeMenu}
                className="btn btn-sm btn-primary d-flex align-items-center gap-1 rounded-pill px-3"
              >
                <i className="bi bi-speedometer2"></i>
                <span>Dashboard</span>
              </Link>
            ) : (
              <Link
                to="/admin/login"
                onClick={closeMenu}
                className="btn btn-sm btn-outline-primary d-flex align-items-center gap-1 rounded-pill px-3"
                title="Admin Management Portal"
              >
                <i className="bi bi-shield-lock"></i>
                <span className="d-none d-sm-inline">Admin</span>
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
