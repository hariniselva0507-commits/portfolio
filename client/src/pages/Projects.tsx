import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Form, InputGroup, Nav, Pagination, Badge } from 'react-bootstrap';
import { projectService } from '../services/projectService';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { IProject, IPagination } from '../types';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('All');
  const [search, setSearch] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [pagination, setPagination] = useState<IPagination>({
    total: 0,
    page: 1,
    limit: 9,
    totalPages: 1,
  });

  const categories = ['All', 'Full Stack', 'Frontend', 'Backend', 'AI/ML', 'Cloud'];

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const res = await projectService.getProjects({
        category: category === 'All' ? undefined : category,
        search: search.trim() || undefined,
        page,
        limit: 9,
      });
      setProjects(res.data);
      setPagination(res.pagination);
    } catch (err) {
      console.error('Failed to fetch projects:', err);
    } finally {
      setLoading(false);
    }
  }, [category, search, page]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleCategorySelect = (selectedKey: string | null) => {
    setCategory(selectedKey || 'All');
    setPage(1);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <div className="projects-page py-5">
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <Badge bg="primary-subtle" className="text-primary px-3 py-1 rounded-pill mb-2">
            Portfolio Work
          </Badge>
          <h1 className="display-5 fw-bold mb-3">Featured Projects & Applications</h1>
          <p className="lead text-secondary col-lg-8 mx-auto">
            A curated collection of full-stack web applications, distributed APIs, AI tools, and production-grade architectures.
          </p>
        </div>

        {/* Search & Category Filter Controls */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center gap-3 mb-5">
          {/* Category Tabs */}
          <Nav
            variant="pills"
            activeKey={category}
            onSelect={handleCategorySelect}
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
          <div style={{ maxWidth: '320px', width: '100%' }}>
            <InputGroup>
              <InputGroup.Text className="bg-body border-secondary-subtle">
                <i className="bi bi-search text-secondary"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search projects or tech..."
                value={search}
                onChange={handleSearchChange}
                className="border-secondary-subtle bg-body"
              />
              {search && (
                <button
                  type="button"
                  className="btn btn-outline-secondary border-secondary-subtle"
                  onClick={() => {
                    setSearch('');
                    setPage(1);
                  }}
                >
                  <i className="bi bi-x"></i>
                </button>
              )}
            </InputGroup>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <LoadingSpinner message="Querying projects from database..." minHeight="400px" />
        ) : projects.length === 0 ? (
          <div className="text-center py-5 bg-body-tertiary rounded-4 my-4 shadow-sm border border-secondary-subtle">
            <i className="bi bi-folder2-open display-3 text-secondary mb-3 d-block"></i>
            <h4 className="fw-bold mb-2">No projects matched your filter</h4>
            <p className="text-secondary small col-md-6 mx-auto mb-3">
              We couldn't find any projects matching "{search}" in category "{category}".
            </p>
            <button
              className="btn btn-outline-primary rounded-pill px-4"
              onClick={() => {
                setCategory('All');
                setSearch('');
                setPage(1);
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <Row className="gy-4 mb-5">
              {projects.map((project) => (
                <Col key={project._id} lg={4} md={6}>
                  <ProjectCard project={project} />
                </Col>
              ))}
            </Row>

            {/* Pagination Controls */}
            {pagination.totalPages > 1 && (
              <div className="d-flex justify-content-center mt-4">
                <Pagination className="pagination-modern">
                  <Pagination.Prev
                    disabled={page === 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                  />
                  {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((p) => (
                    <Pagination.Item
                      key={p}
                      active={p === page}
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={page === pagination.totalPages}
                    onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                  />
                </Pagination>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
};
