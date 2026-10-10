import React, { useEffect, useState, useMemo } from 'react';
import { Container, Row, Col, Nav, Form, InputGroup, Badge } from 'react-bootstrap';
import { skillService } from '../services/skillService';
import { SkillBadge } from '../components/SkillBadge';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ISkill } from '../types';

export const Skills: React.FC = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    'All',
    'Frontend',
    'Backend',
    'Database',
    'Programming Languages',
    'Developer Tools',
  ];

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        const res = await skillService.getSkills();
        setSkills(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Failed to load skills:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  const filteredSkills = useMemo(() => {
    return skills.filter((skill) => {
      const matchesCategory =
        activeCategory === 'All' || skill.category === activeCategory;
      const matchesSearch =
        searchQuery === '' ||
        skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        skill.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [skills, activeCategory, searchQuery]);

  if (loading) {
    return <LoadingSpinner message="Fetching skills matrix from database..." minHeight="70vh" />;
  }

  return (
    <div className="skills-page py-5">
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <Badge bg="primary-subtle" className="text-primary px-3 py-1 rounded-pill mb-2">
            Technical Competencies
          </Badge>
          <h1 className="display-5 fw-bold mb-3">Skills & Technologies</h1>
          <p className="lead text-secondary col-lg-8 mx-auto">
            A comprehensive breakdown of frameworks, programming languages, cloud systems, and databases I utilize to build production software.
          </p>
        </div>

        {/* Filters and Search Bar */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-4">
          {/* Category Tabs */}
          <Nav
            variant="pills"
            activeKey={activeCategory}
            onSelect={(k) => setActiveCategory(k || 'All')}
            className="category-pills flex-nowrap overflow-x-auto pb-2 pb-md-0 w-100 w-md-auto"
          >
            {categories.map((cat) => (
              <Nav.Item key={cat}>
                <Nav.Link eventKey={cat} className="rounded-pill px-3 py-2 text-nowrap">
                  {cat}
                </Nav.Link>
              </Nav.Item>
            ))}
          </Nav>

          {/* Search Box */}
          <div style={{ maxWidth: '300px', width: '100%' }}>
            <InputGroup>
              <InputGroup.Text className="bg-body border-secondary-subtle">
                <i className="bi bi-search text-secondary"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-secondary-subtle bg-body"
              />
              {searchQuery && (
                <button
                  type="button"
                  className="btn btn-outline-secondary border-secondary-subtle"
                  onClick={() => setSearchQuery('')}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </InputGroup>
          </div>
        </div>

        {/* Skills Grid */}
        {filteredSkills.length === 0 ? (
          <div className="text-center py-5 bg-body-tertiary rounded-4 my-4">
            <i className="bi bi-search fs-1 text-secondary mb-3 d-block"></i>
            <h5>No matching skills found</h5>
            <p className="text-secondary small">
              Try adjusting your search criteria or switching categories.
            </p>
          </div>
        ) : (
          <Row className="gy-3">
            {filteredSkills.map((skill) => (
              <Col key={skill._id} lg={4} md={6}>
                <SkillBadge skill={skill} />
              </Col>
            ))}
          </Row>
        )}

        {/* Legend / Info footer */}
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-4 mt-5 p-3 bg-body-tertiary rounded-3 text-secondary small">
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-primary px-2 py-1">90%+</span>
            <span>Production Mastery & Architecture</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-info px-2 py-1">80%–89%</span>
            <span>High Proficiency & Active Usage</span>
          </div>
          <div className="d-flex align-items-center gap-2">
            <span className="badge bg-secondary px-2 py-1">&lt;80%</span>
            <span>Competent & Rapidly Expanding</span>
          </div>
        </div>
      </Container>
    </div>
  );
};
