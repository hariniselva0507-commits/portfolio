import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Tab, Tabs } from 'react-bootstrap';
import { experienceService } from '../services/experienceService';
import { educationService } from '../services/educationService';
import { certificationService } from '../services/certificationService';
import { TimelineItem } from '../components/TimelineItem';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { IExperience, IEducation, ICertification } from '../types';

export const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [education, setEducation] = useState<IEducation[]>([]);
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [expData, eduData, certData] = await Promise.all([
          experienceService.getExperiences(),
          educationService.getEducation(),
          certificationService.getCertifications(),
        ]);
        setExperiences(expData);
        setEducation(eduData);
        setCertifications(certData);
      } catch (err) {
        console.error('Failed to load career history:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <LoadingSpinner message="Loading career timeline and education..." minHeight="70vh" />;
  }

  const internships = experiences.filter((e) => e.employmentType === 'Internship');
  const fullTimeRoles = experiences.filter((e) => e.employmentType !== 'Internship');

  return (
    <div className="experience-page py-5">
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <Badge bg="primary-subtle" className="text-primary px-3 py-1 rounded-pill mb-2">
            Career & Qualifications
          </Badge>
          <h1 className="display-5 fw-bold mb-3">Experience & Education</h1>
          <p className="lead text-secondary col-lg-8 mx-auto">
            A comprehensive journey through my software engineering tenures, high-impact internships, academic credentials, and industry certifications.
          </p>
        </div>

        <Tabs defaultActiveKey="experience" id="experience-tabs" className="mb-5 justify-content-center border-bottom-0 custom-tabs">
          {/* Work Experience Tab */}
          <Tab eventKey="experience" title="Work Experience & Roles">
            <div className="max-w-800 mx-auto pt-3">
              <h4 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
                <i className="bi bi-briefcase-fill"></i> Professional Roles
              </h4>

              <div className="timeline-container">
                {fullTimeRoles.map((exp, idx) => (
                  <TimelineItem
                    key={exp._id}
                    experience={exp}
                    isLast={idx === fullTimeRoles.length - 1}
                  />
                ))}
              </div>

              {internships.length > 0 && (
                <div className="mt-5">
                  <h4 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
                    <i className="bi bi-mortarboard-fill"></i> Software Engineering Internships
                  </h4>
                  <div className="timeline-container">
                    {internships.map((intern, idx) => (
                      <TimelineItem
                        key={intern._id}
                        experience={intern}
                        isLast={idx === internships.length - 1}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Tab>

          {/* Education Tab */}
          <Tab eventKey="education" title="Academic Background">
            <div className="max-w-800 mx-auto pt-3">
              <h4 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
                <i className="bi bi-book-half"></i> Degrees & Universities
              </h4>

              <Row className="gy-4">
                {education.map((edu) => (
                  <Col key={edu._id} xs={12}>
                    <Card className="p-4 border border-secondary-subtle rounded-4 shadow-sm bg-body-tertiary">
                      <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-2">
                        <div>
                          <h4 className="fw-bold text-primary mb-1">{edu.institution}</h4>
                          <h5 className="fw-semibold text-body mb-0">
                            {edu.degree} in {edu.fieldOfStudy}
                          </h5>
                        </div>
                        <Badge bg="primary-subtle" className="text-primary px-3 py-2 rounded-pill fs-7">
                          {edu.startDate} &mdash; {edu.endDate || 'Present'}
                        </Badge>
                      </div>

                      {edu.grade && (
                        <div className="text-success small fw-semibold my-2">
                          <i className="bi bi-award-fill me-1"></i> Cumulative Honors: {edu.grade}
                        </div>
                      )}

                      {edu.description && (
                        <p className="text-secondary small mt-2 mb-3">{edu.description}</p>
                      )}

                      {edu.achievements && edu.achievements.length > 0 && (
                        <div className="mt-2 pt-2 border-top border-secondary-subtle">
                          <h6 className="small fw-bold text-uppercase text-body-secondary mb-2">Highlights & Honors</h6>
                          <ul className="mb-0 ps-3 small text-secondary">
                            {edu.achievements.map((ach, idx) => (
                              <li key={idx} className="mb-1">{ach}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Tab>

          {/* Certifications Tab */}
          <Tab eventKey="certifications" title="Industry Certifications">
            <div className="max-w-800 mx-auto pt-3">
              <h4 className="fw-bold mb-4 text-primary d-flex align-items-center gap-2">
                <i className="bi bi-patch-check-fill"></i> Verified Professional Certifications
              </h4>

              <Row className="gy-4">
                {certifications.map((cert) => (
                  <Col key={cert._id} md={6}>
                    <Card className="p-4 border border-secondary-subtle rounded-4 shadow-sm bg-body-tertiary h-100">
                      <div className="d-flex align-items-start gap-3">
                        <div className="cert-icon-badge rounded-circle p-3 bg-primary-subtle text-primary">
                          <i className="bi bi-shield-check fs-3"></i>
                        </div>
                        <div className="flex-grow-1">
                          <h5 className="fw-bold text-body mb-1">{cert.name}</h5>
                          <h6 className="text-secondary small fw-medium mb-2">{cert.issuingOrganization}</h6>
                          <div className="small text-secondary mb-3">
                            <div>Issued: <span className="text-body fw-medium">{cert.issueDate}</span></div>
                            {cert.expirationDate && (
                              <div>Expires: <span className="text-body fw-medium">{cert.expirationDate}</span></div>
                            )}
                            {cert.credentialId && (
                              <div className="text-truncate">
                                ID: <code className="text-primary">{cert.credentialId}</code>
                              </div>
                            )}
                          </div>
                          {cert.credentialUrl && (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-outline-primary rounded-pill px-3 d-inline-flex align-items-center gap-1"
                            >
                              Verify Credential <i className="bi bi-box-arrow-up-right small"></i>
                            </a>
                          )}
                        </div>
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};
