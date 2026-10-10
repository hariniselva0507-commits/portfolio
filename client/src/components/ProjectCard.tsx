import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IProject } from '../types';

interface ProjectCardProps {
  project: IProject;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <Card className="project-card h-100 shadow-sm border-0 overflow-hidden">
      <div className="project-thumbnail-wrapper position-relative">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="project-thumbnail w-100 object-fit-cover"
          loading="lazy"
        />
        <div className="project-badges position-absolute top-0 start-0 p-3 d-flex gap-2">
          <Badge bg="primary" className="fw-semibold shadow-sm">
            {project.category}
          </Badge>
          {project.featured && (
            <Badge bg="warning" text="dark" className="fw-semibold shadow-sm d-flex align-items-center gap-1">
              <i className="bi bi-star-fill"></i> Featured
            </Badge>
          )}
        </div>
      </div>

      <Card.Body className="d-flex flex-column p-4">
        <div className="d-flex justify-content-between align-items-baseline mb-2">
          <h5 className="card-title fw-bold mb-0 text-truncate" title={project.title}>
            {project.title}
          </h5>
          <span className="small text-secondary">{project.completionDate}</span>
        </div>

        <p className="card-text text-secondary small flex-grow-1 line-clamp-3 mb-3">
          {project.shortDescription || project.description}
        </p>

        <div className="project-technologies d-flex flex-wrap gap-1 mb-4">
          {project.technologies.slice(0, 4).map((tech, idx) => (
            <span key={idx} className="tech-badge">
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="tech-badge tech-badge-more">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>

        <div className="d-flex align-items-center justify-content-between pt-2 border-top border-secondary-subtle gap-2">
          <Link
            to={`/projects/${project._id}`}
            className="btn btn-outline-primary btn-sm rounded-pill px-3 flex-grow-1 text-center"
          >
            Details <i className="bi bi-arrow-right ms-1"></i>
          </Link>

          <div className="d-flex gap-1">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-secondary rounded-circle icon-btn"
                title="View GitHub Repository"
              >
                <i className="bi bi-github"></i>
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-sm btn-outline-success rounded-circle icon-btn"
                title="Open Live Demonstration"
              >
                <i className="bi bi-box-arrow-up-right"></i>
              </a>
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
