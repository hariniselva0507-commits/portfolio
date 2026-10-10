import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner, Form, InputGroup } from 'react-bootstrap';
import { blogService } from '../services/blogService';
import { IBlogPost } from '../types';

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<IBlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await blogService.getPosts({
          category: selectedCategory === 'All' ? undefined : selectedCategory,
          search: search.trim() || undefined,
        });
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to load blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [selectedCategory, search]);

  const categories = ['All', 'Architecture', 'Frontend', 'Database', 'Cloud'];

  return (
    <div className="blog-page py-5">
      <Container>
        {selectedPost ? (
          <div>
            <button
              type="button"
              className="btn btn-outline-secondary rounded-pill px-4 mb-4 d-inline-flex align-items-center gap-2"
              onClick={() => setSelectedPost(null)}
            >
              <i className="bi bi-arrow-left"></i> Back to all articles
            </button>

            <div className="bg-body border border-secondary-subtle rounded-4 p-4 p-md-5 shadow-sm">
              <Badge bg="primary-subtle" className="text-primary px-3 py-1 rounded-pill mb-3">
                {selectedPost.category}
              </Badge>
              <h1 className="display-5 fw-bold mb-3">{selectedPost.title}</h1>
              <div className="d-flex align-items-center gap-3 text-secondary small mb-4">
                <span>
                  <i className="bi bi-calendar3 me-1"></i>
                  {selectedPost.publishedAt
                    ? new Date(selectedPost.publishedAt).toLocaleDateString()
                    : new Date(selectedPost.createdAt).toLocaleDateString()}
                </span>
                <span>&bull;</span>
                <span>
                  <i className="bi bi-clock me-1"></i>
                  {selectedPost.readTimeMinutes} min read
                </span>
              </div>

              {selectedPost.coverImage && (
                <div className="rounded-4 overflow-hidden mb-4" style={{ maxHeight: '450px' }}>
                  <img
                    src={selectedPost.coverImage}
                    alt={selectedPost.title}
                    className="w-100 object-fit-cover"
                  />
                </div>
              )}

              <div
                className="lead text-secondary mb-4 p-3 bg-body-tertiary rounded-3 border-start border-4 border-primary"
              >
                {selectedPost.excerpt}
              </div>

              <div
                className="article-body fs-6 lh-lg"
                style={{ whiteSpace: 'pre-wrap' }}
              >
                {selectedPost.content}
              </div>

              {selectedPost.tags && selectedPost.tags.length > 0 && (
                <div className="d-flex flex-wrap gap-2 mt-5 pt-4 border-top border-secondary-subtle">
                  {selectedPost.tags.map((tag, idx) => (
                    <Badge key={idx} bg="secondary-subtle" className="text-secondary rounded-pill px-3 py-2">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <div className="text-center mb-5">
              <Badge bg="primary-subtle" className="text-primary px-3 py-1 rounded-pill mb-2">
                Tech Insights & Writing
              </Badge>
              <h1 className="display-5 fw-bold mb-3">Engineering Articles & Thoughts</h1>
              <p className="lead text-secondary col-lg-8 mx-auto">
                Articles on distributed software design, modern web architecture, cloud resilience, and engineering best practices.
              </p>
            </div>

            {/* Search and Category Filters */}
            <Row className="g-3 justify-content-between align-items-center mb-5">
              <Col md={6}>
                <div className="d-flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`btn btn-sm rounded-pill px-3 ${selectedCategory === cat ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Col>
              <Col md={5}>
                <InputGroup>
                  <InputGroup.Text className="bg-body border-secondary-subtle">
                    <i className="bi bi-search"></i>
                  </InputGroup.Text>
                  <Form.Control
                    placeholder="Search articles by title, tag..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="border-secondary-subtle"
                  />
                </InputGroup>
              </Col>
            </Row>

            {loading ? (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" />
                <div className="mt-2 text-secondary">Loading articles...</div>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-5 text-secondary">
                <i className="bi bi-journal-x fs-1 mb-3 d-block"></i>
                <h5>No articles found</h5>
                <p>Try searching for something else or check back soon.</p>
              </div>
            ) : (
              <Row className="g-4">
                {posts.map((post) => (
                  <Col key={post._id} lg={4} md={6}>
                    <Card
                      className="h-100 border border-secondary-subtle rounded-4 overflow-hidden shadow-sm bg-body hover-card cursor-pointer"
                      onClick={() => setSelectedPost(post)}
                      style={{ cursor: 'pointer' }}
                    >
                      {post.coverImage && (
                        <div style={{ height: '200px', overflow: 'hidden' }}>
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-100 h-100 object-fit-cover transition-transform"
                          />
                        </div>
                      )}
                      <Card.Body className="d-flex flex-column p-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <Badge bg="primary-subtle" className="text-primary rounded-pill">
                            {post.category}
                          </Badge>
                          <span className="small text-secondary">
                            {post.readTimeMinutes} min read
                          </span>
                        </div>

                        <h5 className="fw-bold mb-2">{post.title}</h5>
                        <p className="text-secondary small line-clamp-3 mb-4 flex-grow-1">
                          {post.excerpt}
                        </p>

                        <div className="d-flex justify-content-between align-items-center pt-3 border-top border-secondary-subtle text-secondary small">
                          <span>
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString()
                              : new Date(post.createdAt).toLocaleDateString()}
                          </span>
                          <span className="text-primary fw-semibold d-inline-flex align-items-center gap-1">
                            Read Article <i className="bi bi-arrow-right"></i>
                          </span>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            )}
          </div>
        )}
      </Container>
    </div>
  );
};
