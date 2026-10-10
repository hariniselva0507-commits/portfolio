import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ProjectCard } from '../components/ProjectCard';
import { SkillBadge } from '../components/SkillBadge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { profileService } from '../services/profileService';
import { projectService } from '../services/projectService';
import { skillService } from '../services/skillService';
import { settingsService } from '../services/settingsService';
import { IProfile, IProject, ISkill, IWebsiteSettings } from '../types';

export const Home: React.FC = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [featuredProjects, setFeaturedProjects] = useState<IProject[]>([]);
  const [featuredSkills, setFeaturedSkills] = useState<ISkill[]>([]);
  const [settings, setSettings] = useState<IWebsiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Animated title rotating text
  const titles = [
    'Senior Full-Stack Engineer',
    'Cloud Systems Architect',
    'React & TypeScript Specialist',
    'Distributed Backend Engineer',
  ];
  const [titleIndex, setTitleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [titles.length]);

  useEffect(() => {
    const loadHomeData = async () => {
      try {
        setLoading(true);
        const [profData, projRes, skillRes, settData] = await Promise.all([
          profileService.getProfile(),
          projectService.getProjects({ featured: true, limit: 3 }),
          skillService.getSkills({ featured: true }),
          settingsService.getSettings(),
        ]);

        setProfile(profData);
        setFeaturedProjects(projRes.data || []);
        setFeaturedSkills(Array.isArray(skillRes.data) ? skillRes.data.slice(0, 8) : []);
        setSettings(settData);
      } catch (err) {
        console.error('Failed to load home data from API:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHomeData();
  }, []);

  const handleResumeDownload = async () => {
    try {
      await settingsService.trackResumeDownload();
      if (profile?.resumeUrl) {
        window.open(profile.resumeUrl, '_blank');
      }
    } catch (err) {
      console.warn('Track download error:', err);
      if (profile?.resumeUrl) {
        window.open(profile.resumeUrl, '_blank');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Connecting to portfolio database..." minHeight="70vh" />;
  }

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section py-5 py-lg-6 position-relative overflow-hidden">
        <div className="hero-glow-blob position-absolute top-0 start-50 translate-middle-x"></div>

        <Container className="position-relative">
          <Row className="align-items-center gy-5">
            <Col lg={7} className="text-center text-lg-start">
              {settings?.isAvailableForHire && (
                <div className="d-inline-flex align-items-center gap-2 px-3 py-1 mb-3 rounded-pill bg-primary-subtle border border-primary-subtle text-primary small fw-semibold">
                  <span className="pulse-dot"></span>
                  {settings.hireNoticeText || 'Open to high-impact software engineering roles'}
                </div>
              )}

              <h1 className="hero-headline display-4 fw-black mb-3">
                Hi, I'm <span className="text-gradient">{profile?.fullName || 'Alex Rivera'}</span>
              </h1>

              <div className="animated-title-wrapper mb-3">
                <span className="fs-3 fw-bold text-secondary">
                  I build{' '}
                  <span className="typing-text text-primary">
                    {titles[titleIndex]}
                  </span>
                </span>
              </div>

              <p className="hero-description lead text-secondary mb-4 col-lg-11">
                {profile?.heroSubtitle || profile?.shortBio || profile?.tagline}
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3 mb-4">
                <Link
                  to={profile?.heroCtaLink || '/projects'}
                  className="btn btn-primary btn-lg rounded-pill px-4 shadow-sm d-flex align-items-center gap-2"
                >
                  <i className="bi bi-rocket-takeoff-fill"></i> {profile?.heroCtaText || 'View Projects'}
                </Link>

                <Link
                  to="/contact"
                  className="btn btn-outline-primary btn-lg rounded-pill px-4 d-flex align-items-center gap-2"
                >
                  <i className="bi bi-chat-dots-fill"></i> Contact Me
                </Link>

                <Button
                  variant="secondary"
                  size="lg"
                  onClick={handleResumeDownload}
                  className="rounded-pill px-4 btn-resume d-flex align-items-center gap-2"
                  title="Download / View Resume"
                >
                  <i className="bi bi-file-earmark-pdf-fill text-danger"></i> Resume
                </Button>
              </div>

              {/* Social Links */}
              <div className="d-flex align-items-center justify-content-center justify-content-lg-start gap-2 pt-2">
                <span className="text-body-secondary small fw-medium me-2">Connect:</span>
                {profile?.socials.github && (
                  <a href={profile.socials.github} target="_blank" rel="noreferrer" className="social-pill" title="GitHub">
                    <i className="bi bi-github"></i>
                  </a>
                )}
                {profile?.socials.linkedin && (
                  <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="social-pill" title="LinkedIn">
                    <i className="bi bi-linkedin"></i>
                  </a>
                )}
                {profile?.socials.twitter && (
                  <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="social-pill" title="Twitter / X">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                )}
                {profile?.socials.leetcode && (
                  <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" className="social-pill" title="LeetCode">
                    <i className="bi bi-code-square"></i>
                  </a>
                )}
                <a href={`mailto:${profile?.email}`} className="social-pill" title="Email Me">
                  <i className="bi bi-envelope-fill"></i>
                </a>
              </div>
            </Col>

            <Col lg={5} className="d-flex justify-content-center">
              <div className="hero-avatar-card position-relative">
                <div className="avatar-glow-ring position-absolute top-50 start-50 translate-middle"></div>
                <div className="avatar-frame rounded-4 overflow-hidden shadow-lg border border-2 border-primary-subtle position-relative">
                  <img
                    src={profile?.avatarUrl}
                    alt={profile?.fullName || 'Developer Portrait'}
                    className="img-fluid object-fit-cover w-100"
                    style={{ maxHeight: '420px', minHeight: '360px' }}
                  />
                  <div className="avatar-badge-float position-absolute bottom-0 start-0 end-0 p-3 bg-dark-glass text-light d-flex justify-content-around text-center">
                    <div>
                      <div className="fw-bold fs-5 text-primary">{profile?.yearsOfExperience || 6}+</div>
                      <div className="fs-8 text-secondary">Years Exp.</div>
                    </div>
                    <div className="vr bg-secondary"></div>
                    <div>
                      <div className="fw-bold fs-5 text-primary">{profile?.completedProjectsCount || 30}+</div>
                      <div className="fs-8 text-secondary">Shipped Apps</div>
                    </div>
                    <div className="vr bg-secondary"></div>
                    <div>
                      <div className="fw-bold fs-5 text-primary">100%</div>
                      <div className="fs-8 text-secondary">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects-section py-5 bg-body-tertiary">
        <Container>
          <div className="d-flex flex-wrap justify-content-between align-items-end mb-4">
            <div>
              <Badge bg="primary-subtle" className="text-primary mb-2 px-3 py-1 rounded-pill">
                Showcase
              </Badge>
              <h2 className="section-title fw-bold mb-0">Featured Projects</h2>
              <p className="text-secondary small mb-0 mt-1">
                Hand-picked high-impact applications deployed to production
              </p>
            </div>
            <Link
              to="/projects"
              className="btn btn-outline-primary rounded-pill mt-3 mt-sm-0 d-flex align-items-center gap-1"
            >
              All Projects <i className="bi bi-arrow-right"></i>
            </Link>
          </div>

          <Row className="gy-4">
            {featuredProjects.map((project) => (
              <Col key={project._id} lg={4} md={6}>
                <ProjectCard project={project} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Skills Preview Section */}
      <section className="skills-preview-section py-5">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary-subtle" className="text-primary mb-2 px-3 py-1 rounded-pill">
              Tech Stack
            </Badge>
            <h2 className="section-title fw-bold">Core Technical Expertise</h2>
            <p className="text-secondary col-md-8 mx-auto">
              Modern frontend frameworks, distributed backend engines, cloud platforms, and relational & document databases.
            </p>
          </div>

          <Row className="gy-3 mb-4">
            {featuredSkills.map((skill) => (
              <Col key={skill._id} lg={3} md={6}>
                <SkillBadge skill={skill} />
              </Col>
            ))}
          </Row>

          <div className="text-center">
            <Link
              to="/skills"
              className="btn btn-outline-primary rounded-pill px-4"
            >
              Explore Full Skills Matrix & Categorized Tools <i className="bi bi-chevron-right ms-1"></i>
            </Link>
          </div>
        </Container>
      </section>

      {/* Contact Call to Action Banner */}
      <section className="cta-banner-section py-5 bg-primary text-white position-relative overflow-hidden my-4 rounded-4 mx-3 mx-lg-5">
        <div className="cta-blob position-absolute end-0 top-0"></div>
        <Container className="position-relative text-center py-4">
          <h2 className="display-6 fw-bold mb-3">Have an exciting idea or an engineering challenge?</h2>
          <p className="lead mb-4 opacity-90 col-md-8 mx-auto">
            I am always eager to discuss challenging full-stack positions, architectural consultations, and innovative web apps.
          </p>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            <Link
              to="/contact"
              className="btn btn-light btn-lg rounded-pill px-4 text-primary fw-bold shadow"
            >
              Get In Touch <i className="bi bi-send-fill ms-2"></i>
            </Link>
            <a
              href={`mailto:${profile?.email || 'alex.rivera.dev@gmail.com'}`}
              className="btn btn-outline-light btn-lg rounded-pill px-4 fw-semibold"
            >
              Direct Email <i className="bi bi-envelope-at ms-1"></i>
            </a>
          </div>
        </Container>
      </section>
    </div>
  );
};
