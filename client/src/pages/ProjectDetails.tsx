import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Badge, Button, Card, Carousel } from 'react-bootstrap';
import { projectService } from '../services/projectService';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { IProject } from '../types';

export const ProjectDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      if (!id) return;
      try {
        setLoading(true);
        setError(null);
        const data = await projectService.getProjectById(id);
        setProject(data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Could not find the requested project.');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return <LoadingSpinner message="Loading project details from MongoDB..." minHeight="70vh" />;
  }

  if (error || !project) {
    return (
      <Container className="py-5 text-center">
        <div className="py-5 bg-body-tertiary rounded-4 my-5 border border-secondary-subtle">
          <i className="bi bi-exclamation-triangle display-3 text-warning mb-3 d-block"></i>
          <h3 className="fw-bold mb-2">Project Not Found</h3>
          <p className="text-secondary col-md-6 mx-auto mb-4">{error}</p>
          <Link to="/projects" className="btn btn-primary rounded-pill px-4">
            <i className="bi bi-arrow-left me-2"></i> Return to Projects
          </Link>
        </div>
      </Container>
    );
  }

  const allImages = [project.thumbnail, ...(project.screenshots || [])].filter(Boolean);

  return (
    <div className="project-details-page py-5">
      <Container>
        {/* Navigation Breadcrumb */}
        <div className="mb-4">
          <Link to="/projects" className="text-decoration-none text-secondary d-inline-flex align-items-center gap-1 hover-primary small fw-semibold">
            <i className="bi bi-arrow-left"></i> Back to all projects
          </Link>
        </div>

        {/* Title Header */}
        <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-3 mb-4">
          <div>
            <div className="d-flex align-items-center gap-2 mb-2">
              <Badge bg="primary" className="fw-semibold px-3 py-1 rounded-pill">
                {project.category}
              </Badge>
              {project.featured && (
                <Badge bg="warning" text="dark" className="fw-semibold px-2 py-1 rounded-pill">
                  <i className="bi bi-star-fill me-1"></i> Featured
                </Badge>
              )}
              <span className="text-secondary small">&bull; Completed {project.completionDate}</span>
            </div>
            <h1 className="display-6 fw-bold mb-0">{project.title}</h1>
          </div>

          {/* Action Links */}
          <div className="d-flex gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline-secondary rounded-pill px-3 d-flex align-items-center gap-2"
              >
                <i className="bi bi-github"></i> Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary rounded-pill px-4 d-flex align-items-center gap-2 shadow-sm"
              >
                <i className="bi bi-box-arrow-up-right"></i> Live Demo
              </a>
            )}
          </div>
        </div>

        {/* Media Carousel / Thumbnail */}
        <Card className="border-0 shadow-sm overflow-hidden rounded-4 mb-5 bg-body-tertiary">
          {allImages.length > 1 ? (
            <Carousel interval={null} className="project-detail-carousel">
              {allImages.map((img, idx) => (
                <Carousel.Item key={idx}>
                  <img
                    src={img}
                    alt={`${project.title} preview ${idx + 1}`}
                    className="d-block w-100 object-fit-cover"
                    style={{ maxHeight: '520px' }}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <img
              src={project.thumbnail}
              alt={project.title}
              className="d-block w-100 object-fit-cover"
              style={{ maxHeight: '520px' }}
            />
          )}
        </Card>

        {/* Project Content Breakdown */}
        <Row className="gy-4">
          <Col lg={8}>
            <div className="pe-lg-4">
              <h3 className="fw-bold mb-3">Project Overview</h3>
              <p className="text-body leading-relaxed mb-4" style={{ fontSize: '1.1rem', lineHeight: '1.8' }}>
                {project.description}
              </p>

              {project.keyFeatures && project.keyFeatures.length > 0 && (
                <div className="mt-4 pt-2">
                  <h4 className="fw-bold mb-3">Key Architectural Highlights</h4>
                  <ul className="list-unstyled">
                    {project.keyFeatures.map((feat, idx) => (
                      <li key={idx} className="d-flex align-items-start gap-2 mb-2 text-secondary">
                        <i className="bi bi-check2-circle text-primary fs-5 mt-n1"></i>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </Col>

          <Col lg={4}>
            <Card className="p-4 border border-secondary-subtle rounded-4 shadow-sm bg-body-tertiary sticky-top" style={{ top: '100px' }}>
              <h5 className="fw-bold mb-3">Technologies & Tools</h5>
              <div className="d-flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, idx) => (
                  <span key={idx} className="tech-badge">
                    {tech}
                  </span>
                ))}
              </div>

              <hr className="my-3 border-secondary-subtle" />

              <div className="small text-secondary mb-3">
                <div className="d-flex justify-content-between mb-2">
                  <span>Category:</span>
                  <span className="fw-semibold text-body">{project.category}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Completed:</span>
                  <span className="fw-semibold text-body">{project.completionDate}</span>
                </div>
                <div className="d-flex justify-content-between">
                  <span>Status:</span>
                  <span className="badge bg-success-subtle text-success">Deployed & Stable</span>
                </div>
              </div>

              <div className="d-grid gap-2 pt-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-primary rounded-pill py-2 fw-semibold"
                  >
                    Open Live Deployment
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-outline-secondary rounded-pill py-2"
                  >
                    View Source Code
                  </a>
                )}
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
