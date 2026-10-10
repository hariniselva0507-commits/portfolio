import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { profileService } from '../services/profileService';
import { settingsService } from '../services/settingsService';
import { IProfile, IWebsiteSettings } from '../types';

export const AppFooter: React.FC = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [settings, setSettings] = useState<IWebsiteSettings | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prof, sett] = await Promise.all([
          profileService.getProfile(),
          settingsService.getSettings(),
        ]);
        setProfile(prof);
        setSettings(sett);
      } catch (err) {
        console.warn('Footer data fetch failed:', err);
      }
    };
    fetchData();
  }, []);

  const currentYear = new Date().getFullYear();

  const navItems = settings?.navigationMenu && settings.navigationMenu.length > 0
    ? settings.navigationMenu.filter((i) => i.enabled).sort((a, b) => a.order - b.order)
    : [
        { label: 'About', path: '/about' },
        { label: 'Skills', path: '/skills' },
        { label: 'Projects', path: '/projects' },
        { label: 'Experience', path: '/experience' },
        { label: 'Services', path: '/services' },
        { label: 'Blog', path: '/blog' },
        { label: 'Contact', path: '/contact' },
      ];

  return (
    <footer className="footer-custom border-top border-secondary-subtle py-5 mt-auto">
      <Container>
        <Row className="gy-4 align-items-center">
          <Col lg={5} md={6}>
            <div className="d-flex align-items-center gap-2 mb-2">
              <div className="brand-logo-badge small">
                <i className={`bi ${settings?.logoIcon || 'bi-terminal-fill'} text-primary`}></i>
              </div>
              <h5 className="mb-0 fw-bold">
                {settings?.logoText || (profile?.fullName ? `${profile.fullName}.dev` : 'Alex.dev')}
              </h5>
            </div>
            <p className="text-secondary small mb-3">
              {settings?.footerTagline || profile?.tagline || 'Crafting scalable web systems, intuitive interfaces, and robust cloud architectures.'}
            </p>
            <div className="d-flex flex-wrap gap-2 text-muted small">
              <span className="badge bg-body-tertiary text-body border border-secondary-subtle">React 19</span>
              <span className="badge bg-body-tertiary text-body border border-secondary-subtle">TypeScript</span>
              <span className="badge bg-body-tertiary text-body border border-secondary-subtle">Bootstrap 5</span>
              <span className="badge bg-body-tertiary text-body border border-secondary-subtle">Node.js & Express</span>
              <span className="badge bg-body-tertiary text-body border border-secondary-subtle">MongoDB</span>
            </div>
          </Col>

          <Col lg={4} md={6} className="text-md-center">
            <h6 className="fw-semibold mb-3">Quick Navigation</h6>
            <div className="d-flex flex-wrap justify-content-md-center gap-3 small">
              {navItems.map((item, idx) => (
                <Link key={idx} to={item.path} className="text-secondary text-decoration-none hover-primary">
                  {item.label}
                </Link>
              ))}
              <Link to="/admin" className="text-secondary text-decoration-none hover-primary">Admin</Link>
            </div>
          </Col>

          <Col lg={3} className="text-lg-end">
            <h6 className="fw-semibold mb-3">Connect Online</h6>
            <div className="d-flex justify-content-lg-end gap-2">
              {profile?.socials.github && (
                <a
                  href={profile.socials.github}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  title="GitHub Profile"
                >
                  <i className="bi bi-github"></i>
                </a>
              )}
              {profile?.socials.linkedin && (
                <a
                  href={profile.socials.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  title="LinkedIn Profile"
                >
                  <i className="bi bi-linkedin"></i>
                </a>
              )}
              {profile?.socials.twitter && (
                <a
                  href={profile.socials.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  title="Twitter / X Profile"
                >
                  <i className="bi bi-twitter-x"></i>
                </a>
              )}
              {profile?.socials.leetcode && (
                <a
                  href={profile.socials.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="social-btn"
                  title="LeetCode Profile"
                >
                  <i className="bi bi-code-square"></i>
                </a>
              )}
              <a
                href={`mailto:${profile?.email || 'alex.rivera.dev@gmail.com'}`}
                className="social-btn"
                title="Send Email"
              >
                <i className="bi bi-envelope-fill"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-secondary-subtle" />

        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center small text-secondary">
          <div>
            &copy; {currentYear} {settings?.copyrightName || 'Alex Rivera'}. All rights reserved.
          </div>
          <div className="mt-2 mt-sm-0">
            {settings?.footerText || 'Engineered with clean code, modern aesthetics, and database persistence.'}
          </div>
        </div>
      </Container>
    </footer>
  );
};
