import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { profileService } from '../services/profileService';
import { experienceService } from '../services/experienceService';
import { educationService } from '../services/educationService';
import { settingsService } from '../services/settingsService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { IProfile, IExperience, IEducation, IWebsiteSettings } from '../types';

export const About: React.FC = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [education, setEducation] = useState<IEducation[]>([]);
  const [settings, setSettings] = useState<IWebsiteSettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [profData, expData, eduData, settData] = await Promise.all([
          profileService.getProfile(),
          experienceService.getExperiences(),
          educationService.getEducation(),
          settingsService.getSettings(),
        ]);
        setProfile(profData);
        setExperiences(expData);
        setEducation(eduData);
        setSettings(settData);
      } catch (err) {
        console.error('Error fetching about page data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDownload = async () => {
    try {
      await settingsService.trackResumeDownload();
      if (profile?.resumeUrl) {
        window.open(profile.resumeUrl, '_blank');
      }
    } catch {
      if (profile?.resumeUrl) {
        window.open(profile.resumeUrl, '_blank');
      }
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading biography and profile..." minHeight="70vh" />;
  }

  return (
    <div className="about-page py-5">
      <Container>
        {/* Page Header */}
        <div className="text-center mb-5">
          <Badge bg="primary-subtle" className="text-primary px-3 py-1 rounded-pill mb-2">
            Background & Philosophy
          </Badge>
          <h1 className="display-5 fw-bold mb-3">About Me</h1>
          <p className="lead text-secondary col-lg-8 mx-auto">
            {profile?.tagline || 'Passionate engineer crafting resilient web software with precision and purpose.'}
          </p>
        </div>

        {/* Bio & Stats Row */}
        <Row className="gy-4 align-items-center mb-5">
          <Col lg={5} className="text-center">
            <div className="about-image-wrapper p-3 position-relative d-inline-block">
              <div className="about-glow position-absolute top-50 start-50 translate-middle"></div>
              <img
                src={profile?.avatarUrl}
                alt={profile?.fullName}
                className="rounded-4 img-fluid shadow-lg border border-2 border-primary-subtle position-relative"
                style={{ maxHeight: '440px', objectFit: 'cover' }}
              />
            </div>
          </Col>

          <Col lg={7}>
            <div className="ps-lg-3">
              <h3 className="fw-bold mb-3">
                {profile?.fullName} &mdash; <span className="text-primary">{profile?.title}</span>
              </h3>
              
              <p className="text-body leading-relaxed mb-4" style={{ fontSize: '1.05rem', lineHeight: '1.8' }}>
                {profile?.bio}
              </p>

              {/* Stats Counters */}
              <Row className="g-3 mb-4 text-center">
                <Col sm={4}>
                  <Card className="border-0 shadow-sm bg-body-tertiary p-3 rounded-3">
                    <h3 className="fw-black text-primary mb-1">{profile?.yearsOfExperience}+</h3>
                    <span className="small text-secondary">Years of Experience</span>
                  </Card>
                </Col>
                <Col sm={4}>
                  <Card className="border-0 shadow-sm bg-body-tertiary p-3 rounded-3">
                    <h3 className="fw-black text-primary mb-1">{profile?.completedProjectsCount}+</h3>
                    <span className="small text-secondary">Projects Completed</span>
                  </Card>
                </Col>
                <Col sm={4}>
                  <Card className="border-0 shadow-sm bg-body-tertiary p-3 rounded-3">
                    <h3 className="fw-black text-primary mb-1">{profile?.satisfiedClientsCount}+</h3>
                    <span className="small text-secondary">Satisfied Clients</span>
                  </Card>
                </Col>
              </Row>

              <div className="d-flex flex-wrap gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleDownload}
                  className="rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm"
                >
                  <i className="bi bi-file-earmark-pdf-fill"></i> Download Full Resume
                </Button>
                <Link
                  to="/contact"
                  className="btn btn-outline-primary btn-lg rounded-pill px-4"
                >
                  Let's Connect
                </Link>
              </div>
            </div>
          </Col>
        </Row>

        {/* Career Goals & Work Ethic */}
        <Row className="gy-4 mb-5">
          <Col lg={6}>
            <Card className="h-100 p-4 border-0 shadow-sm bg-body-tertiary rounded-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="icon-box-primary rounded-3 p-2 bg-primary-subtle text-primary">
                  <i className="bi bi-compass-fill fs-4"></i>
                </div>
                <h4 className="fw-bold mb-0">Career Aspirations</h4>
              </div>
              <p className="text-secondary leading-relaxed mb-0">
                {profile?.careerGoals || 'Dedicated to advancing software reliability, mentoring upcoming talent, and pushing the boundaries of web capabilities.'}
              </p>
            </Card>
          </Col>

          <Col lg={6}>
            <Card className="h-100 p-4 border-0 shadow-sm bg-body-tertiary rounded-4">
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="icon-box-primary rounded-3 p-2 bg-primary-subtle text-primary">
                  <i className="bi bi-lightbulb-fill fs-4"></i>
                </div>
                <h4 className="fw-bold mb-0">Engineering Philosophy</h4>
              </div>
              <p className="text-secondary leading-relaxed mb-0">
                I prioritize clean architecture, automated testing, maintainable type safety, and user empathy. Writing code that is resilient under load, accessible to all, and enjoyable for teams to iterate upon.
              </p>
            </Card>
          </Col>
        </Row>

        {/* Education & Experience Highlights */}
        <div className="mt-5 pt-3">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="fw-bold mb-0">Education & Academic Background</h3>
            <Link to="/experience" className="btn btn-sm btn-outline-primary rounded-pill px-3">
              View Full Timeline <i className="bi bi-arrow-right ms-1"></i>
            </Link>
          </div>

          <Row className="gy-3">
            {education.map((edu) => (
              <Col key={edu._id} md={6}>
                <Card className="p-4 border border-secondary-subtle rounded-3 shadow-sm h-100">
                  <div className="d-flex justify-content-between align-items-baseline mb-2">
                    <h5 className="fw-bold text-primary mb-0">{edu.institution}</h5>
                    <Badge bg="secondary-subtle" className="text-body border border-secondary-subtle">
                      {edu.startDate} &mdash; {edu.endDate || 'Present'}
                    </Badge>
                  </div>
                  <h6 className="fw-semibold text-body mb-2">
                    {edu.degree} in {edu.fieldOfStudy}
                  </h6>
                  {edu.grade && <div className="text-success small fw-medium mb-2">{edu.grade}</div>}
                  <p className="text-secondary small mb-3">{edu.description}</p>
                  {edu.achievements && edu.achievements.length > 0 && (
                    <ul className="mb-0 ps-3 small text-secondary">
                      {edu.achievements.map((ach, idx) => (
                        <li key={idx} className="mb-1">{ach}</li>
                      ))}
                    </ul>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </div>
  );
};
