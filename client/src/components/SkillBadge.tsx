import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { ISkill } from '../types';

interface SkillBadgeProps {
  skill: ISkill;
}

export const SkillBadge: React.FC<SkillBadgeProps> = ({ skill }) => {
  return (
    <div className="skill-card p-3 rounded-3 shadow-sm border border-secondary-subtle">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <div className="d-flex align-items-center gap-2">
          <div className="skill-icon-wrap">
            <i className={`bi ${skill.icon || 'bi-code-square'} text-primary fs-5`}></i>
          </div>
          <span className="fw-semibold text-body">{skill.name}</span>
        </div>
        <div className="d-flex align-items-center gap-2">
          <span className="badge bg-body-tertiary text-secondary border border-secondary-subtle small">
            {skill.yearsOfExperience}y exp
          </span>
          <span className="fw-bold text-primary small">{skill.proficiency}%</span>
        </div>
      </div>
      <ProgressBar
        now={skill.proficiency}
        variant="primary"
        className="skill-progress-bar"
        style={{ height: '6px' }}
      />
    </div>
  );
};
