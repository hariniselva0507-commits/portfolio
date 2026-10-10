import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Badge, Spinner } from 'react-bootstrap';
import { serviceService } from '../services/serviceService';
import { IService } from '../types';

export const Services: React.FC = () => {
  const [services, setServices] = useState<IService[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const res = await serviceService.getServices();
        setServices(res.data);
      } catch (err) {
        console.error('Failed to load services:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="services-page py-5">
      <Container>
        <div className="text-center mb-5">
          <Badge bg="primary-subtle" className="text-primary px-3 py-1 rounded-pill mb-2">
            What I Offer
          </Badge>
          <h1 className="display-5 fw-bold mb-3">Professional Services & Solutions</h1>
          <p className="lead text-secondary col-lg-8 mx-auto">
            Comprehensive full-stack engineering, cloud architecture consulting, and modern UI/UX design capabilities tailored to scale your software products.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <div className="mt-2 text-secondary">Loading services...</div>
          </div>
        ) : (
          <Row className="g-4">
            {services.map((service) => (
              <Col key={service._id} lg={6}>
                <Card className="h-100 border border-secondary-subtle rounded-4 p-4 shadow-sm bg-body hover-card">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <div className="p-3 rounded-3 bg-primary-subtle text-primary fs-3">
                      <i className={`bi ${service.icon || 'bi-gear-wide-connected'}`}></i>
                    </div>
                    <div>
                      <h4 className="fw-bold mb-1">{service.title}</h4>
                      <div className="text-secondary small">{service.shortDescription}</div>
                    </div>
                  </div>

                  {service.description && (
                    <p className="text-secondary mb-4">{service.description}</p>
                  )}

                  {service.features && service.features.length > 0 && (
                    <div className="mt-auto">
                      <h6 className="fw-semibold small text-uppercase text-secondary mb-2">Key Deliverables</h6>
                      <ul className="list-unstyled mb-0 d-flex flex-column gap-2 small">
                        {service.features.map((feat, idx) => (
                          <li key={idx} className="d-flex align-items-center gap-2">
                            <i className="bi bi-check2-circle text-primary"></i>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
};
