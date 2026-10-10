import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner, Badge } from 'react-bootstrap';
import { contactService } from '../services/contactService';
import { profileService } from '../services/profileService';
import { settingsService } from '../services/settingsService';
import { getApiErrorMessage } from '../services/api';
import { IProfile, IWebsiteSettings } from '../types';

export const Contact: React.FC = () => {
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [settings, setSettings] = useState<IWebsiteSettings | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [websiteHp, setWebsiteHp] = useState(''); // Anti-bot honeypot

  // Status State
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const [prof, sett] = await Promise.all([
          profileService.getProfile(),
          settingsService.getSettings(),
        ]);
        setProfile(prof);
        setSettings(sett);
      } catch (err) {
        console.warn('Could not load profile for contact page', err);
      }
    };
    fetchInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setSubmitting(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await contactService.sendMessage({
        name,
        email,
        subject,
        message,
        website_hp: websiteHp,
      });

      setSuccessMsg(res.message || 'Your message was sent successfully!');
      // Reset form fields
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setWebsiteHp('');
      setValidated(false);
    } catch (err) {
      setErrorMsg(getApiErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="contact-page py-5">
      <Container>
        {/* Header */}
        <div className="text-center mb-5">
          <Badge bg="primary-subtle" className="text-primary px-3 py-1 rounded-pill mb-2">
            Get In Touch
          </Badge>
          <h1 className="display-5 fw-bold mb-3">Let's Build Something Exceptional</h1>
          <p className="lead text-secondary col-lg-8 mx-auto">
            Whether you have a technical question, a job opening, an engineering collaboration, or just want to connect — my inbox is always open.
          </p>
        </div>

        <Row className="gy-5">
          {/* Contact Details & Info Cards */}
          <Col lg={5}>
            <div className="pe-lg-3">
              <h3 className="fw-bold mb-4">Contact Information</h3>
              <p className="text-secondary leading-relaxed mb-4">
                Feel free to reach out directly through the form or via my social profiles. I typically reply within 24 hours.
              </p>

              <div className="d-flex flex-column gap-3 mb-4">
                <Card className="p-3 border border-secondary-subtle rounded-3 shadow-sm bg-body-tertiary">
                  <div className="d-flex align-items-center gap-3">
                    <div className="contact-icon-box rounded-circle p-2 bg-primary-subtle text-primary">
                      <i className="bi bi-envelope-at-fill fs-4"></i>
                    </div>
                    <div>
                      <div className="small text-secondary">Direct Email</div>
                      <a href={`mailto:${profile?.email}`} className="fw-semibold text-body text-decoration-none hover-primary">
                        {profile?.email || 'alex.rivera.dev@gmail.com'}
                      </a>
                    </div>
                  </div>
                </Card>

                {profile?.phone && (
                  <Card className="p-3 border border-secondary-subtle rounded-3 shadow-sm bg-body-tertiary">
                    <div className="d-flex align-items-center gap-3">
                      <div className="contact-icon-box rounded-circle p-2 bg-primary-subtle text-primary">
                        <i className="bi bi-telephone-fill fs-4"></i>
                      </div>
                      <div>
                        <div className="small text-secondary">Phone / WhatsApp</div>
                        <span className="fw-semibold text-body">{profile.phone}</span>
                      </div>
                    </div>
                  </Card>
                )}

                <Card className="p-3 border border-secondary-subtle rounded-3 shadow-sm bg-body-tertiary">
                  <div className="d-flex align-items-center gap-3">
                    <div className="contact-icon-box rounded-circle p-2 bg-primary-subtle text-primary">
                      <i className="bi bi-geo-alt-fill fs-4"></i>
                    </div>
                    <div>
                      <div className="small text-secondary">Location</div>
                      <span className="fw-semibold text-body">{profile?.location || 'San Francisco, CA'}</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-3 border border-secondary-subtle rounded-3 shadow-sm bg-body-tertiary">
                  <div className="d-flex align-items-center gap-3">
                    <div className="contact-icon-box rounded-circle p-2 bg-success-subtle text-success">
                      <i className="bi bi-person-check-fill fs-4"></i>
                    </div>
                    <div>
                      <div className="small text-secondary">Current Status</div>
                      <span className="fw-semibold text-success">
                        {settings?.isAvailableForHire ? 'Available for new opportunities' : 'Currently engaged'}
                      </span>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Social Channels */}
              <h5 className="fw-semibold mb-3">Connect On Socials</h5>
              <div className="d-flex gap-2">
                {profile?.socials.github && (
                  <a href={profile.socials.github} target="_blank" rel="noreferrer" className="social-btn" title="GitHub">
                    <i className="bi bi-github"></i>
                  </a>
                )}
                {profile?.socials.linkedin && (
                  <a href={profile.socials.linkedin} target="_blank" rel="noreferrer" className="social-btn" title="LinkedIn">
                    <i className="bi bi-linkedin"></i>
                  </a>
                )}
                {profile?.socials.twitter && (
                  <a href={profile.socials.twitter} target="_blank" rel="noreferrer" className="social-btn" title="Twitter / X">
                    <i className="bi bi-twitter-x"></i>
                  </a>
                )}
                {profile?.socials.leetcode && (
                  <a href={profile.socials.leetcode} target="_blank" rel="noreferrer" className="social-btn" title="LeetCode">
                    <i className="bi bi-code-square"></i>
                  </a>
                )}
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col lg={7}>
            <Card className="p-4 p-md-5 border border-secondary-subtle rounded-4 shadow-sm bg-body-tertiary">
              <h3 className="fw-bold mb-2">Send a Direct Message</h3>
              <p className="text-secondary small mb-4">
                All inquiries are stored directly in MongoDB and forwarded to my priority notification inbox.
              </p>

              {successMsg && (
                <Alert variant="success" dismissible onClose={() => setSuccessMsg(null)} className="d-flex align-items-center">
                  <i className="bi bi-check-circle-fill fs-5 me-2"></i>
                  <div>{successMsg}</div>
                </Alert>
              )}

              {errorMsg && (
                <Alert variant="danger" dismissible onClose={() => setErrorMsg(null)} className="d-flex align-items-center">
                  <i className="bi bi-exclamation-triangle-fill fs-5 me-2"></i>
                  <div>{errorMsg}</div>
                </Alert>
              )}

              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {/* Honeypot hidden input for anti-bot spam defense */}
                <div style={{ display: 'none' }}>
                  <input
                    type="text"
                    name="website_hp"
                    tabIndex={-1}
                    autoComplete="off"
                    value={websiteHp}
                    onChange={(e) => setWebsiteHp(e.target.value)}
                  />
                </div>

                <Row className="gy-3 mb-3">
                  <Col md={6}>
                    <Form.Group controlId="contactName">
                      <Form.Label className="fw-semibold small">Full Name <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="e.g. Jane Doe"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="py-2"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide your name.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group controlId="contactEmail">
                      <Form.Label className="fw-semibold small">Email Address <span className="text-danger">*</span></Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="e.g. jane@company.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="py-2"
                      />
                      <Form.Control.Feedback type="invalid">
                        Please provide a valid email address.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="contactSubject" className="mb-3">
                  <Form.Label className="fw-semibold small">Subject <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Project Inquiry / Full-Stack Position"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="py-2"
                  />
                  <Form.Control.Feedback type="invalid">
                    Please provide a subject.
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="contactMessage" className="mb-4">
                  <Form.Label className="fw-semibold small">Message Content <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    placeholder="Write your message here (min. 10 characters)..."
                    required
                    minLength={10}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Message must be at least 10 characters.
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  disabled={submitting}
                  className="rounded-pill px-5 w-100 w-md-auto d-inline-flex align-items-center justify-content-center gap-2 shadow-sm"
                >
                  {submitting ? (
                    <>
                      <Spinner animation="border" size="sm" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill"></i>
                      <span>Send Message</span>
                    </>
                  )}
                </Button>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
