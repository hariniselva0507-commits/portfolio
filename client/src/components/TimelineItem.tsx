import React from 'react';
import { Badge } from 'react-bootstrap';
import { IExperience } from '../types';

interface TimelineItemProps {
  experience: IExperience;
  isLast?: boolean;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({ experience, isLast = false }) => {
  return (
    <div className={`timeline-item position-relative ps-4 pb-4 ${isLast ? '' : 'border-start-line'}`}>
      {/* Timeline Node Bullet */}
      <div className="timeline-dot position-absolute top-0 start-0 translate-middle-x">
        <i className="bi bi-briefcase-fill text-primary"></i>
      </div>

      <div className="timeline-content p-4 rounded-3 shadow-sm border border-secondary-subtle">
        <div className="d-flex flex-wrap justify-content-between align-items-baseline gap-2 mb-2">
          <div>
            <h5 className="fw-bold mb-1 text-primary">{experience.title}</h5>
            <div className="d-flex align-items-center gap-2 text-body">
              <span className="fw-semibold">{experience.company}</span>
              {experience.companyUrl && (
                <a
                  href={experience.companyUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-secondary small"
                  title="Visit company website"
                >
                  <i className="bi bi-box-arrow-up-right"></i>
                </a>
              )}
            </div>
          </div>

          <div className="d-flex flex-wrap align-items-center gap-2">
            <Badge bg="secondary-subtle" className="text-body border border-secondary-subtle">
              {experience.locationType} &bull; {experience.location}
            </Badge>
            <Badge bg={experience.isCurrentRole ? 'primary' : 'secondary'} className="fw-semibold">
              {experience.startDate} — {experience.endDate || 'Present'}
            </Badge>
          </div>
        </div>

        <p className="text-secondary small mb-3">{experience.description}</p>

        {experience.achievements && experience.achievements.length > 0 && (
          <div className="mb-3">
            <h6 className="small fw-bold text-uppercase text-body-secondary mb-2">Key Contributions</h6>
            <ul className="mb-0 ps-3 small text-secondary">
              {experience.achievements.map((item, idx) => (
                <li key={idx} className="mb-1">{item}</li>
              ))}
            </ul>
          </div>
        )}

        {experience.technologies && experience.technologies.length > 0 && (
          <div className="d-flex flex-wrap gap-1 mt-3 pt-2 border-top border-secondary-subtle">
            {experience.technologies.map((tech, idx) => (
              <span key={idx} className="tech-badge">
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
