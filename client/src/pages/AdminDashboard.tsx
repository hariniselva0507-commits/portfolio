import React, { useEffect, useState, useCallback } from 'react';
import {
  Row,
  Col,
  Card,
  Tab,
  Nav,
  Button,
  Table,
  Badge,
  Modal,
  Form,
  Alert,
  Spinner,
  InputGroup,
} from 'react-bootstrap';
import { settingsService } from '../services/settingsService';
import { projectService } from '../services/projectService';
import { skillService } from '../services/skillService';
import { experienceService } from '../services/experienceService';
import { educationService } from '../services/educationService';
import { certificationService } from '../services/certificationService';
import { profileService } from '../services/profileService';
import { contactService } from '../services/contactService';
import { getApiErrorMessage } from '../services/api';
import {
  IDashboardStats,
  IProject,
  ISkill,
  IExperience,
  IEducation,
  ICertification,
  IProfile,
  IWebsiteSettings,
  IContactMessage,
} from '../types';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [stats, setStats] = useState<IDashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [alertInfo, setAlertInfo] = useState<{ variant: string; message: string } | null>(null);

  // Data sets
  const [projects, setProjects] = useState<IProject[]>([]);
  const [skills, setSkills] = useState<ISkill[]>([]);
  const [experiences, setExperiences] = useState<IExperience[]>([]);
  const [education, setEducation] = useState<IEducation[]>([]);
  const [certifications, setCertifications] = useState<ICertification[]>([]);
  const [profile, setProfile] = useState<IProfile | null>(null);
  const [settings, setSettings] = useState<IWebsiteSettings | null>(null);
  const [messages, setMessages] = useState<IContactMessage[]>([]);

  // Modal states
  const [showProjectModal, setShowProjectModal] = useState<boolean>(false);
  const [editingProject, setEditingProject] = useState<Partial<IProject> | null>(null);

  const [showSkillModal, setShowSkillModal] = useState<boolean>(false);
  const [editingSkill, setEditingSkill] = useState<Partial<ISkill> | null>(null);

  const [showExpModal, setShowExpModal] = useState<boolean>(false);
  const [editingExp, setEditingExp] = useState<Partial<IExperience> | null>(null);

  const [showEduModal, setShowEduModal] = useState<boolean>(false);
  const [editingEdu, setEditingEdu] = useState<Partial<IEducation> | null>(null);

  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [editingCert, setEditingCert] = useState<Partial<ICertification> | null>(null);

  const [showMessageModal, setShowMessageModal] = useState<boolean>(false);
  const [viewingMessage, setViewingMessage] = useState<IContactMessage | null>(null);

  const [deleteConfirm, setDeleteConfirm] = useState<{
    type: string;
    id: string;
    name: string;
  } | null>(null);

  const showAlert = (message: string, variant: string = 'success') => {
    setAlertInfo({ message, variant });
    setTimeout(() => setAlertInfo(null), 5000);
  };

  const loadAllData = useCallback(async () => {
    try {
      setLoading(true);
      const [
        statsRes,
        projRes,
        skillsRes,
        expRes,
        eduRes,
        certRes,
        profRes,
        settRes,
        msgRes,
      ] = await Promise.all([
        settingsService.getStats(),
        projectService.getProjects({ all: true, limit: 100 }),
        skillService.getSkills(),
        experienceService.getExperiences(),
        educationService.getEducation(),
        certificationService.getCertifications(),
        profileService.getProfile(),
        settingsService.getSettings(),
        contactService.getMessages(),
      ]);

      setStats(statsRes);
      setProjects(projRes.data);
      setSkills(Array.isArray(skillsRes.data) ? skillsRes.data : []);
      setExperiences(expRes);
      setEducation(eduRes);
      setCertifications(certRes);
      setProfile(profRes);
      setSettings(settRes);
      setMessages(msgRes.data);
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Project Handlers
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    try {
      setActionLoading(true);
      if (editingProject._id) {
        await projectService.updateProject(editingProject._id, editingProject);
        showAlert('Project updated successfully.');
      } else {
        await projectService.createProject(editingProject);
        showAlert('New project created successfully.');
      }
      setShowProjectModal(false);
      loadAllData();
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      await projectService.toggleFeatured(id);
      loadAllData();
      showAlert('Project featured status updated.');
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    }
  };

  // Skill Handlers
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    try {
      setActionLoading(true);
      if (editingSkill._id) {
        await skillService.updateSkill(editingSkill._id, editingSkill);
        showAlert('Skill updated successfully.');
      } else {
        await skillService.createSkill(editingSkill);
        showAlert('Skill created successfully.');
      }
      setShowSkillModal(false);
      loadAllData();
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  // Experience Handlers
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    try {
      setActionLoading(true);
      if (editingExp._id) {
        await experienceService.updateExperience(editingExp._id, editingExp);
        showAlert('Experience updated successfully.');
      } else {
        await experienceService.createExperience(editingExp);
        showAlert('Experience created successfully.');
      }
      setShowExpModal(false);
      loadAllData();
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  // Education Handlers
  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;
    try {
      setActionLoading(true);
      if (editingEdu._id) {
        await educationService.updateEducation(editingEdu._id, editingEdu);
        showAlert('Education updated successfully.');
      } else {
        await educationService.createEducation(editingEdu);
        showAlert('Education created successfully.');
      }
      setShowEduModal(false);
      loadAllData();
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  // Certification Handlers
  const handleSaveCert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    try {
      setActionLoading(true);
      if (editingCert._id) {
        await certificationService.updateCertification(editingCert._id, editingCert);
        showAlert('Certification updated successfully.');
      } else {
        await certificationService.createCertification(editingCert);
        showAlert('Certification created successfully.');
      }
      setShowCertModal(false);
      loadAllData();
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    try {
      setActionLoading(true);
      await profileService.updateProfile(profile);
      showAlert('Profile and bio updated successfully.');
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  // Settings Save
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;
    try {
      setActionLoading(true);
      await settingsService.updateSettings(settings);
      showAlert('Website settings updated successfully.');
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Confirm
  const executeDelete = async () => {
    if (!deleteConfirm) return;
    const { type, id } = deleteConfirm;
    try {
      setActionLoading(true);
      if (type === 'project') await projectService.deleteProject(id);
      if (type === 'skill') await skillService.deleteSkill(id);
      if (type === 'experience') await experienceService.deleteExperience(id);
      if (type === 'education') await educationService.deleteEducation(id);
      if (type === 'certification') await certificationService.deleteCertification(id);
      if (type === 'message') await contactService.deleteMessage(id);

      showAlert(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully.`);
      setDeleteConfirm(null);
      loadAllData();
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    } finally {
      setActionLoading(false);
    }
  };

  // Message Read Toggle
  const handleToggleRead = async (msg: IContactMessage) => {
    try {
      await contactService.markAsRead(msg._id, !msg.isRead);
      loadAllData();
    } catch (err) {
      showAlert(getApiErrorMessage(err), 'danger');
    }
  };

  return (
    <div className="admin-dashboard-page pb-5">
      {/* Alert notification banner */}
      {alertInfo && (
        <Alert
          variant={alertInfo.variant}
          dismissible
          onClose={() => setAlertInfo(null)}
          className="mb-4 shadow-sm"
        >
          {alertInfo.message}
        </Alert>
      )}

      {/* Main Tab Navigation */}
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'overview')}>
        <div className="bg-body rounded-4 p-2 shadow-sm border border-secondary-subtle mb-4 overflow-x-auto">
          <Nav variant="pills" className="flex-nowrap gap-1">
            <Nav.Item>
              <Nav.Link eventKey="overview" className="rounded-pill px-3 py-2 text-nowrap">
                <i className="bi bi-speedometer2 me-1"></i> Overview
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="projects" className="rounded-pill px-3 py-2 text-nowrap">
                <i className="bi bi-grid-fill me-1"></i> Projects ({projects.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="skills" className="rounded-pill px-3 py-2 text-nowrap">
                <i className="bi bi-code-slash me-1"></i> Skills ({skills.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="experience" className="rounded-pill px-3 py-2 text-nowrap">
                <i className="bi bi-briefcase me-1"></i> Experience ({experiences.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="education" className="rounded-pill px-3 py-2 text-nowrap">
                <i className="bi bi-mortarboard me-1"></i> Education ({education.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="certifications" className="rounded-pill px-3 py-2 text-nowrap">
                <i className="bi bi-patch-check me-1"></i> Certifications ({certifications.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="profile" className="rounded-pill px-3 py-2 text-nowrap">
                <i className="bi bi-person me-1"></i> Profile & Bio
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="messages" className="rounded-pill px-3 py-2 text-nowrap">
                <i className="bi bi-envelope me-1"></i> Inbox{' '}
                {stats && stats.unreadMessages > 0 && (
                  <Badge bg="danger" pill className="ms-1">
                    {stats.unreadMessages}
                  </Badge>
                )}
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="settings" className="rounded-pill px-3 py-2 text-nowrap">
                <i className="bi bi-gear me-1"></i> Settings
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <div className="mt-2 text-secondary">Loading dashboard data...</div>
          </div>
        ) : (
          <Tab.Content>
            {/* OVERVIEW TAB */}
            <Tab.Pane eventKey="overview">
              <Row className="g-3 mb-4">
                <Col xl={3} md={6}>
                  <Card className="border-0 shadow-sm p-3 rounded-4 bg-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-secondary small fw-medium">Total Projects</div>
                        <h2 className="fw-bold mb-0 text-primary">{stats?.totalProjects || 0}</h2>
                        <div className="small text-secondary">{stats?.featuredProjects || 0} featured</div>
                      </div>
                      <div className="p-3 rounded-circle bg-primary-subtle text-primary">
                        <i className="bi bi-grid-fill fs-3"></i>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xl={3} md={6}>
                  <Card className="border-0 shadow-sm p-3 rounded-4 bg-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-secondary small fw-medium">Skills Registered</div>
                        <h2 className="fw-bold mb-0 text-info">{stats?.totalSkills || 0}</h2>
                        <div className="small text-secondary">Across 5 categories</div>
                      </div>
                      <div className="p-3 rounded-circle bg-info-subtle text-info">
                        <i className="bi bi-code-slash fs-3"></i>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xl={3} md={6}>
                  <Card className="border-0 shadow-sm p-3 rounded-4 bg-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-secondary small fw-medium">Inbox Messages</div>
                        <h2 className="fw-bold mb-0 text-warning">{stats?.totalMessages || 0}</h2>
                        <div className="small text-danger fw-semibold">
                          {stats?.unreadMessages || 0} unread
                        </div>
                      </div>
                      <div className="p-3 rounded-circle bg-warning-subtle text-warning">
                        <i className="bi bi-envelope-fill fs-3"></i>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col xl={3} md={6}>
                  <Card className="border-0 shadow-sm p-3 rounded-4 bg-body">
                    <div className="d-flex align-items-center justify-content-between">
                      <div>
                        <div className="text-secondary small fw-medium">Resume Downloads</div>
                        <h2 className="fw-bold mb-0 text-success">{stats?.resumeDownloads || 0}</h2>
                        <div className="small text-secondary">Live visitor requests</div>
                      </div>
                      <div className="p-3 rounded-circle bg-success-subtle text-success">
                        <i className="bi bi-download fs-3"></i>
                      </div>
                    </div>
                  </Card>
                </Col>
              </Row>

              {/* Quick Actions & Recent Messages */}
              <Row className="gy-4">
                <Col lg={7}>
                  <Card className="border-0 shadow-sm p-4 rounded-4 bg-body h-100">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h5 className="fw-bold mb-0">Recent Contact Messages</h5>
                      <Button
                        variant="link"
                        size="sm"
                        onClick={() => setActiveTab('messages')}
                        className="text-decoration-none"
                      >
                        View All
                      </Button>
                    </div>

                    {stats?.recentMessages && stats.recentMessages.length > 0 ? (
                      <div className="list-group list-group-flush">
                        {stats.recentMessages.map((msg) => (
                          <div
                            key={msg._id}
                            className={`list-group-item px-0 py-3 ${!msg.isRead ? 'fw-semibold' : 'text-secondary'}`}
                          >
                            <div className="d-flex justify-content-between align-items-baseline mb-1">
                              <span className="text-body">{msg.name}</span>
                              <span className="small text-secondary">
                                {new Date(msg.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="small text-truncate text-secondary mb-1">
                              {msg.subject}
                            </div>
                            <div className="small text-truncate text-body-secondary">
                              "{msg.message}"
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-secondary small my-4 text-center">No contact inquiries yet.</p>
                    )}
                  </Card>
                </Col>

                <Col lg={5}>
                  <Card className="border-0 shadow-sm p-4 rounded-4 bg-body h-100">
                    <h5 className="fw-bold mb-3">Quick Management</h5>
                    <div className="d-grid gap-2">
                      <Button
                        variant="primary"
                        onClick={() => {
                          setEditingProject({
                            title: '',
                            category: 'Full Stack',
                            shortDescription: '',
                            description: '',
                            thumbnail: '',
                            completionDate: new Date().getFullYear().toString(),
                            technologies: [],
                            featured: false,
                            published: true,
                          });
                          setShowProjectModal(true);
                        }}
                        className="rounded-pill text-start py-2 px-3 d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-plus-circle-fill"></i> Add New Project
                      </Button>

                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setEditingSkill({
                            name: '',
                            category: 'Frontend',
                            proficiency: 85,
                            yearsOfExperience: 2,
                            icon: 'bi-code-slash',
                            featured: false,
                          });
                          setShowSkillModal(true);
                        }}
                        className="rounded-pill text-start py-2 px-3 d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-plus-circle"></i> Add New Skill
                      </Button>

                      <Button
                        variant="outline-primary"
                        onClick={() => {
                          setEditingExp({
                            title: '',
                            company: '',
                            location: 'Remote',
                            locationType: 'Remote',
                            employmentType: 'Full-time',
                            startDate: '',
                            isCurrentRole: true,
                            description: '',
                            achievements: [],
                            technologies: [],
                          });
                          setShowExpModal(true);
                        }}
                        className="rounded-pill text-start py-2 px-3 d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-briefcase"></i> Add Experience / Role
                      </Button>

                      <Button
                        variant="outline-secondary"
                        onClick={() => setActiveTab('profile')}
                        className="rounded-pill text-start py-2 px-3 d-flex align-items-center gap-2"
                      >
                        <i className="bi bi-pencil-square"></i> Edit Biography & Socials
                      </Button>
                    </div>

                    <hr className="my-4 border-secondary-subtle" />

                    <div className="p-3 bg-body-tertiary rounded-3 border border-secondary-subtle">
                      <div className="d-flex justify-content-between align-items-center mb-1">
                        <span className="small fw-bold">Live Status Badge</span>
                        <Badge bg={settings?.isAvailableForHire ? 'success' : 'secondary'}>
                          {settings?.isAvailableForHire ? 'Open for Hire' : 'Busy'}
                        </Badge>
                      </div>
                      <p className="text-secondary small mb-0">
                        {settings?.hireNoticeText}
                      </p>
                    </div>
                  </Card>
                </Col>
              </Row>
            </Tab.Pane>

            {/* PROJECTS TAB */}
            <Tab.Pane eventKey="projects">
              <Card className="border-0 shadow-sm p-4 rounded-4 bg-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                  <h4 className="fw-bold mb-0">Projects Directory</h4>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setEditingProject({
                        title: '',
                        category: 'Full Stack',
                        shortDescription: '',
                        description: '',
                        thumbnail: '',
                        completionDate: new Date().getFullYear().toString(),
                        technologies: [],
                        featured: false,
                        published: true,
                      });
                      setShowProjectModal(true);
                    }}
                    className="rounded-pill px-3 d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-plus-lg"></i> Add Project
                  </Button>
                </div>

                <div className="table-responsive">
                  <Table hover className="border border-secondary-subtle rounded-3 align-middle">
                    <thead className="table-body-tertiary">
                      <tr>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Date</th>
                        <th>Featured</th>
                        <th>Published</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {projects.map((proj) => (
                        <tr key={proj._id}>
                          <td style={{ width: '60px' }}>
                            <img
                              src={proj.thumbnail}
                              alt={proj.title}
                              className="rounded-2 object-fit-cover"
                              style={{ width: '48px', height: '36px' }}
                            />
                          </td>
                          <td className="fw-semibold">{proj.title}</td>
                          <td>
                            <Badge bg="secondary-subtle" className="text-body border">
                              {proj.category}
                            </Badge>
                          </td>
                          <td className="small text-secondary">{proj.completionDate}</td>
                          <td>
                            <button
                              type="button"
                              className={`btn btn-sm ${proj.featured ? 'text-warning' : 'text-secondary'} border-0 p-0`}
                              onClick={() => handleToggleFeatured(proj._id)}
                              title="Toggle featured status"
                            >
                              <i className={`bi ${proj.featured ? 'bi-star-fill' : 'bi-star'} fs-5`}></i>
                            </button>
                          </td>
                          <td>
                            <Badge bg={proj.published ? 'success' : 'secondary'}>
                              {proj.published ? 'Live' : 'Draft'}
                            </Badge>
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setEditingProject(proj);
                                  setShowProjectModal(true);
                                }}
                                className="rounded-circle icon-btn"
                                title="Edit Project"
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: 'project',
                                    id: proj._id,
                                    name: proj.title,
                                  })
                                }
                                className="rounded-circle icon-btn"
                                title="Delete Project"
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Tab.Pane>

            {/* SKILLS TAB */}
            <Tab.Pane eventKey="skills">
              <Card className="border-0 shadow-sm p-4 rounded-4 bg-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                  <h4 className="fw-bold mb-0">Technical Skills</h4>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setEditingSkill({
                        name: '',
                        category: 'Frontend',
                        proficiency: 85,
                        yearsOfExperience: 2,
                        icon: 'bi-code-slash',
                        featured: false,
                      });
                      setShowSkillModal(true);
                    }}
                    className="rounded-pill px-3 d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-plus-lg"></i> Add Skill
                  </Button>
                </div>

                <div className="table-responsive">
                  <Table hover className="border border-secondary-subtle rounded-3 align-middle">
                    <thead className="table-body-tertiary">
                      <tr>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Proficiency</th>
                        <th>Experience</th>
                        <th>Featured</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {skills.map((s) => (
                        <tr key={s._id}>
                          <td style={{ width: '50px' }}>
                            <i className={`bi ${s.icon} fs-4 text-primary`}></i>
                          </td>
                          <td className="fw-semibold">{s.name}</td>
                          <td>
                            <Badge bg="secondary-subtle" className="text-body border">
                              {s.category}
                            </Badge>
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2" style={{ maxWidth: '120px' }}>
                              <span className="small fw-bold text-primary">{s.proficiency}%</span>
                            </div>
                          </td>
                          <td className="small text-secondary">{s.yearsOfExperience} years</td>
                          <td>
                            {s.featured ? (
                              <Badge bg="warning" text="dark">Featured</Badge>
                            ) : (
                              <span className="text-secondary small">&mdash;</span>
                            )}
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setEditingSkill(s);
                                  setShowSkillModal(true);
                                }}
                                className="rounded-circle icon-btn"
                                title="Edit Skill"
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: 'skill',
                                    id: s._id,
                                    name: s.name,
                                  })
                                }
                                className="rounded-circle icon-btn"
                                title="Delete Skill"
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Tab.Pane>

            {/* EXPERIENCE TAB */}
            <Tab.Pane eventKey="experience">
              <Card className="border-0 shadow-sm p-4 rounded-4 bg-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                  <h4 className="fw-bold mb-0">Professional Experience & Internships</h4>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setEditingExp({
                        title: '',
                        company: '',
                        location: 'Remote',
                        locationType: 'Remote',
                        employmentType: 'Full-time',
                        startDate: '',
                        isCurrentRole: false,
                        description: '',
                        achievements: [],
                        technologies: [],
                      });
                      setShowExpModal(true);
                    }}
                    className="rounded-pill px-3 d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-plus-lg"></i> Add Experience
                  </Button>
                </div>

                <div className="table-responsive">
                  <Table hover className="border border-secondary-subtle rounded-3 align-middle">
                    <thead className="table-body-tertiary">
                      <tr>
                        <th>Role Title</th>
                        <th>Company</th>
                        <th>Type</th>
                        <th>Dates</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {experiences.map((exp) => (
                        <tr key={exp._id}>
                          <td className="fw-semibold text-primary">{exp.title}</td>
                          <td>{exp.company}</td>
                          <td>
                            <Badge bg="secondary-subtle" className="text-body border">
                              {exp.employmentType} ({exp.locationType})
                            </Badge>
                          </td>
                          <td className="small text-secondary">
                            {exp.startDate} &mdash; {exp.endDate || 'Present'}
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setEditingExp(exp);
                                  setShowExpModal(true);
                                }}
                                className="rounded-circle icon-btn"
                                title="Edit Experience"
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: 'experience',
                                    id: exp._id,
                                    name: `${exp.title} at ${exp.company}`,
                                  })
                                }
                                className="rounded-circle icon-btn"
                                title="Delete Experience"
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Tab.Pane>

            {/* EDUCATION TAB */}
            <Tab.Pane eventKey="education">
              <Card className="border-0 shadow-sm p-4 rounded-4 bg-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                  <h4 className="fw-bold mb-0">Education & Degrees</h4>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setEditingEdu({
                        institution: '',
                        degree: '',
                        fieldOfStudy: '',
                        startDate: '',
                        endDate: '',
                        grade: '',
                        description: '',
                        achievements: [],
                      });
                      setShowEduModal(true);
                    }}
                    className="rounded-pill px-3 d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-plus-lg"></i> Add Degree
                  </Button>
                </div>

                <div className="table-responsive">
                  <Table hover className="border border-secondary-subtle rounded-3 align-middle">
                    <thead className="table-body-tertiary">
                      <tr>
                        <th>Institution</th>
                        <th>Degree & Major</th>
                        <th>Dates</th>
                        <th>Honors/GPA</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {education.map((edu) => (
                        <tr key={edu._id}>
                          <td className="fw-semibold text-primary">{edu.institution}</td>
                          <td>{edu.degree} in {edu.fieldOfStudy}</td>
                          <td className="small text-secondary">{edu.startDate} &mdash; {edu.endDate || 'Present'}</td>
                          <td className="small text-success fw-medium">{edu.grade || '&mdash;'}</td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setEditingEdu(edu);
                                  setShowEduModal(true);
                                }}
                                className="rounded-circle icon-btn"
                                title="Edit Education"
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: 'education',
                                    id: edu._id,
                                    name: edu.institution,
                                  })
                                }
                                className="rounded-circle icon-btn"
                                title="Delete Education"
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Tab.Pane>

            {/* CERTIFICATIONS TAB */}
            <Tab.Pane eventKey="certifications">
              <Card className="border-0 shadow-sm p-4 rounded-4 bg-body">
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-4">
                  <h4 className="fw-bold mb-0">Certifications & Credentials</h4>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setEditingCert({
                        name: '',
                        issuingOrganization: '',
                        issueDate: '',
                        credentialId: '',
                        credentialUrl: '',
                      });
                      setShowCertModal(true);
                    }}
                    className="rounded-pill px-3 d-flex align-items-center gap-1"
                  >
                    <i className="bi bi-plus-lg"></i> Add Certification
                  </Button>
                </div>

                <div className="table-responsive">
                  <Table hover className="border border-secondary-subtle rounded-3 align-middle">
                    <thead className="table-body-tertiary">
                      <tr>
                        <th>Credential Name</th>
                        <th>Issuer</th>
                        <th>Issue Date</th>
                        <th>Credential ID</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {certifications.map((cert) => (
                        <tr key={cert._id}>
                          <td className="fw-semibold text-body">{cert.name}</td>
                          <td>{cert.issuingOrganization}</td>
                          <td className="small text-secondary">{cert.issueDate}</td>
                          <td>
                            <code className="text-primary">{cert.credentialId || 'N/A'}</code>
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setEditingCert(cert);
                                  setShowCertModal(true);
                                }}
                                className="rounded-circle icon-btn"
                                title="Edit Certification"
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: 'certification',
                                    id: cert._id,
                                    name: cert.name,
                                  })
                                }
                                className="rounded-circle icon-btn"
                                title="Delete Certification"
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Tab.Pane>

            {/* PROFILE & BIO TAB */}
            <Tab.Pane eventKey="profile">
              <Card className="border-0 shadow-sm p-4 rounded-4 bg-body">
                <h4 className="fw-bold mb-4">Profile & Professional Biography</h4>
                {profile && (
                  <Form onSubmit={handleSaveProfile}>
                    <Row className="gy-3 mb-3">
                      <Col md={6}>
                        <Form.Group controlId="profFullName">
                          <Form.Label className="small fw-semibold">Full Name</Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.fullName}
                            onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={6}>
                        <Form.Group controlId="profTitle">
                          <Form.Label className="small fw-semibold">Professional Title</Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.title}
                            onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Form.Group className="mb-3" controlId="profTagline">
                      <Form.Label className="small fw-semibold">Hero Tagline</Form.Label>
                      <Form.Control
                        type="text"
                        value={profile.tagline}
                        onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="profShortBio">
                      <Form.Label className="small fw-semibold">Short Bio (Hero Intro)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={profile.shortBio}
                        onChange={(e) => setProfile({ ...profile, shortBio: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="profBio">
                      <Form.Label className="small fw-semibold">Detailed Biography (About Page)</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        value={profile.bio}
                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="profCareerGoals">
                      <Form.Label className="small fw-semibold">Career Goals</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={profile.careerGoals}
                        onChange={(e) => setProfile({ ...profile, careerGoals: e.target.value })}
                      />
                    </Form.Group>

                    <Row className="gy-3 mb-3">
                      <Col md={4}>
                        <Form.Group controlId="profAvatarUrl">
                          <Form.Label className="small fw-semibold">Avatar Image URL</Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.avatarUrl}
                            onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group controlId="profEmail">
                          <Form.Label className="small fw-semibold">Primary Contact Email</Form.Label>
                          <Form.Control
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                            required
                          />
                        </Form.Group>
                      </Col>

                      <Col md={4}>
                        <Form.Group controlId="profResumeUrl">
                          <Form.Label className="small fw-semibold">Resume Document URL</Form.Label>
                          <Form.Control
                            type="text"
                            value={profile.resumeUrl}
                            onChange={(e) => setProfile({ ...profile, resumeUrl: e.target.value })}
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row className="gy-3 mb-4">
                      <Col sm={4}>
                        <Form.Group controlId="profYearsExp">
                          <Form.Label className="small fw-semibold">Years of Experience</Form.Label>
                          <Form.Control
                            type="number"
                            value={profile.yearsOfExperience}
                            onChange={(e) =>
                              setProfile({ ...profile, yearsOfExperience: Number(e.target.value) })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={4}>
                        <Form.Group controlId="profProjectsCount">
                          <Form.Label className="small fw-semibold">Projects Completed</Form.Label>
                          <Form.Control
                            type="number"
                            value={profile.completedProjectsCount}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                completedProjectsCount: Number(e.target.value),
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                      <Col sm={4}>
                        <Form.Group controlId="profClientsCount">
                          <Form.Label className="small fw-semibold">Satisfied Clients</Form.Label>
                          <Form.Control
                            type="number"
                            value={profile.satisfiedClientsCount}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                satisfiedClientsCount: Number(e.target.value),
                              })
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="fw-bold mb-3">Social Profiles & Portals</h5>
                    <Row className="gy-3 mb-4">
                      <Col md={6}>
                        <InputGroup>
                          <InputGroup.Text><i className="bi bi-github"></i></InputGroup.Text>
                          <Form.Control
                            placeholder="GitHub Profile URL"
                            value={profile.socials.github || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                socials: { ...profile.socials, github: e.target.value },
                              })
                            }
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <InputGroup>
                          <InputGroup.Text><i className="bi bi-linkedin"></i></InputGroup.Text>
                          <Form.Control
                            placeholder="LinkedIn Profile URL"
                            value={profile.socials.linkedin || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                socials: { ...profile.socials, linkedin: e.target.value },
                              })
                            }
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <InputGroup>
                          <InputGroup.Text><i className="bi bi-twitter-x"></i></InputGroup.Text>
                          <Form.Control
                            placeholder="Twitter / X Profile URL"
                            value={profile.socials.twitter || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                socials: { ...profile.socials, twitter: e.target.value },
                              })
                            }
                          />
                        </InputGroup>
                      </Col>

                      <Col md={6}>
                        <InputGroup>
                          <InputGroup.Text><i className="bi bi-code-square"></i></InputGroup.Text>
                          <Form.Control
                            placeholder="LeetCode Profile URL"
                            value={profile.socials.leetcode || ''}
                            onChange={(e) =>
                              setProfile({
                                ...profile,
                                socials: { ...profile.socials, leetcode: e.target.value },
                              })
                            }
                          />
                        </InputGroup>
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={actionLoading}
                      className="rounded-pill px-4 fw-semibold"
                    >
                      {actionLoading ? 'Saving Profile...' : 'Save Profile Changes'}
                    </Button>
                  </Form>
                )}
              </Card>
            </Tab.Pane>

            {/* INBOX MESSAGES TAB */}
            <Tab.Pane eventKey="messages">
              <Card className="border-0 shadow-sm p-4 rounded-4 bg-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">Contact Messages Inbox</h4>
                  <Badge bg="primary-subtle" className="text-primary px-3 py-2 rounded-pill">
                    {messages.length} Total &bull; {messages.filter((m) => !m.isRead).length} Unread
                  </Badge>
                </div>

                <div className="table-responsive">
                  <Table hover className="border border-secondary-subtle rounded-3 align-middle">
                    <thead className="table-body-tertiary">
                      <tr>
                        <th>Status</th>
                        <th>Sender</th>
                        <th>Email</th>
                        <th>Subject</th>
                        <th>Date</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {messages.map((m) => (
                        <tr key={m._id} className={!m.isRead ? 'table-active fw-semibold' : ''}>
                          <td>
                            <button
                              type="button"
                              className="btn btn-link p-0 text-decoration-none"
                              onClick={() => handleToggleRead(m)}
                              title={m.isRead ? 'Mark as Unread' : 'Mark as Read'}
                            >
                              <i
                                className={`bi ${m.isRead ? 'bi-envelope-open text-secondary' : 'bi-envelope-fill text-primary'} fs-5`}
                              ></i>
                            </button>
                          </td>
                          <td>{m.name}</td>
                          <td>
                            <a href={`mailto:${m.email}`} className="text-decoration-none text-body">
                              {m.email}
                            </a>
                          </td>
                          <td className="text-truncate" style={{ maxWidth: '240px' }}>
                            {m.subject}
                          </td>
                          <td className="small text-secondary">
                            {new Date(m.createdAt).toLocaleDateString()}
                          </td>
                          <td className="text-end">
                            <div className="d-inline-flex gap-1">
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => {
                                  setViewingMessage(m);
                                  setShowMessageModal(true);
                                  if (!m.isRead) handleToggleRead(m);
                                }}
                                className="rounded-circle icon-btn"
                                title="View Message"
                              >
                                <i className="bi bi-eye"></i>
                              </Button>
                              <a
                                href={`mailto:${m.email}?subject=Re: ${encodeURIComponent(m.subject)}`}
                                className="btn btn-sm btn-outline-success rounded-circle icon-btn"
                                title="Reply via Email"
                              >
                                <i className="bi bi-reply"></i>
                              </a>
                              <Button
                                variant="outline-danger"
                                size="sm"
                                onClick={() =>
                                  setDeleteConfirm({
                                    type: 'message',
                                    id: m._id,
                                    name: `Message from ${m.name}`,
                                  })
                                }
                                className="rounded-circle icon-btn"
                                title="Delete Message"
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Tab.Pane>

            {/* SETTINGS TAB */}
            <Tab.Pane eventKey="settings">
              <Card className="border-0 shadow-sm p-4 rounded-4 bg-body">
                <h4 className="fw-bold mb-4">Website & Runtime Configuration</h4>
                {settings && (
                  <Form onSubmit={handleSaveSettings}>
                    <Form.Group className="mb-3" controlId="setSiteTitle">
                      <Form.Label className="small fw-semibold">Website Title</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.siteTitle}
                        onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
                        required
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="setMetaDescription">
                      <Form.Label className="small fw-semibold">SEO Meta Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        value={settings.metaDescription}
                        onChange={(e) =>
                          setSettings({ ...settings, metaDescription: e.target.value })
                        }
                      />
                    </Form.Group>

                    <div className="p-3 bg-body-tertiary rounded-3 border border-secondary-subtle mb-3">
                      <Form.Check
                        type="switch"
                        id="hireStatusSwitch"
                        label="Available for Hire / Open to Work"
                        checked={settings.isAvailableForHire}
                        onChange={(e) =>
                          setSettings({ ...settings, isAvailableForHire: e.target.checked })
                        }
                        className="fw-semibold mb-2"
                      />
                      <Form.Group controlId="setHireNotice">
                        <Form.Label className="small text-secondary">
                          Hire Notice Text (Displayed in Navbar badge & Hero)
                        </Form.Label>
                        <Form.Control
                          type="text"
                          value={settings.hireNoticeText}
                          onChange={(e) =>
                            setSettings({ ...settings, hireNoticeText: e.target.value })
                          }
                        />
                      </Form.Group>
                    </div>

                    <Form.Group className="mb-3" controlId="setFooterText">
                      <Form.Label className="small fw-semibold">Footer Tagline</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.footerText}
                        onChange={(e) => setSettings({ ...settings, footerText: e.target.value })}
                      />
                    </Form.Group>

                    <Form.Group className="mb-4" controlId="setCopyright">
                      <Form.Label className="small fw-semibold">Copyright Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={settings.copyrightName}
                        onChange={(e) =>
                          setSettings({ ...settings, copyrightName: e.target.value })
                        }
                      />
                    </Form.Group>

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={actionLoading}
                      className="rounded-pill px-4 fw-semibold"
                    >
                      {actionLoading ? 'Saving Settings...' : 'Save Settings'}
                    </Button>
                  </Form>
                )}
              </Card>
            </Tab.Pane>
          </Tab.Content>
        )}
      </Tab.Container>

      {/* PROJECT ADD / EDIT MODAL */}
      <Modal show={showProjectModal} onHide={() => setShowProjectModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editingProject?._id ? 'Edit Project' : 'Add New Project'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveProject}>
          <Modal.Body>
            <Row className="gy-3 mb-3">
              <Col md={8}>
                <Form.Group controlId="modalProjTitle">
                  <Form.Label className="small fw-semibold">Project Title *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={editingProject?.title || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, title: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="modalProjCategory">
                  <Form.Label className="small fw-semibold">Category *</Form.Label>
                  <Form.Select
                    value={editingProject?.category || 'Full Stack'}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, category: e.target.value as any })
                    }
                  >
                    <option value="Full Stack">Full Stack</option>
                    <option value="Frontend">Frontend</option>
                    <option value="Backend">Backend</option>
                    <option value="AI/ML">AI/ML</option>
                    <option value="Cloud">Cloud</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="modalProjThumbnail">
              <Form.Label className="small fw-semibold">Thumbnail Image URL *</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="https://images.unsplash.com/..."
                value={editingProject?.thumbnail || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, thumbnail: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalProjShortDesc">
              <Form.Label className="small fw-semibold">Short Summary (Card preview) *</Form.Label>
              <Form.Control
                type="text"
                required
                value={editingProject?.shortDescription || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, shortDescription: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalProjDesc">
              <Form.Label className="small fw-semibold">Detailed Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={editingProject?.description || ''}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, description: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalProjTech">
              <Form.Label className="small fw-semibold">Technologies (Comma separated) *</Form.Label>
              <Form.Control
                type="text"
                placeholder="React, TypeScript, Node.js, Express, MongoDB"
                value={
                  Array.isArray(editingProject?.technologies)
                    ? editingProject?.technologies.join(', ')
                    : editingProject?.technologies || ''
                }
                onChange={(e) =>
                  setEditingProject({
                    ...editingProject,
                    technologies: e.target.value.split(',').map((s) => s.trim()),
                  })
                }
              />
            </Form.Group>

            <Row className="gy-3 mb-3">
              <Col md={6}>
                <Form.Group controlId="modalProjGithub">
                  <Form.Label className="small fw-semibold">GitHub Repository URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingProject?.githubUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, githubUrl: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="modalProjLive">
                  <Form.Label className="small fw-semibold">Live Demo URL</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingProject?.liveUrl || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, liveUrl: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="gy-3 mb-3">
              <Col md={4}>
                <Form.Group controlId="modalProjDate">
                  <Form.Label className="small fw-semibold">Completion Date</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingProject?.completionDate || ''}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, completionDate: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-center pt-3">
                <Form.Check
                  type="checkbox"
                  id="modalProjFeatured"
                  label="Feature on Home Page"
                  checked={editingProject?.featured || false}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, featured: e.target.checked })
                  }
                />
              </Col>
              <Col md={4} className="d-flex align-items-center pt-3">
                <Form.Check
                  type="checkbox"
                  id="modalProjPublished"
                  label="Publish to Public Site"
                  checked={editingProject?.published !== false}
                  onChange={(e) =>
                    setEditingProject({ ...editingProject, published: e.target.checked })
                  }
                />
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowProjectModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save Project'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* SKILL ADD / EDIT MODAL */}
      <Modal show={showSkillModal} onHide={() => setShowSkillModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editingSkill?._id ? 'Edit Skill' : 'Add New Skill'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveSkill}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="modalSkillName">
              <Form.Label className="small fw-semibold">Skill Name *</Form.Label>
              <Form.Control
                type="text"
                required
                value={editingSkill?.name || ''}
                onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalSkillCategory">
              <Form.Label className="small fw-semibold">Category *</Form.Label>
              <Form.Select
                value={editingSkill?.category || 'Frontend'}
                onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value as any })}
              >
                <option value="Frontend">Frontend</option>
                <option value="Backend">Backend</option>
                <option value="Database">Database</option>
                <option value="Programming Languages">Programming Languages</option>
                <option value="Developer Tools">Developer Tools</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalSkillProf">
              <Form.Label className="small fw-semibold">
                Proficiency Percentage: {editingSkill?.proficiency || 80}%
              </Form.Label>
              <Form.Range
                min={10}
                max={100}
                step={5}
                value={editingSkill?.proficiency || 80}
                onChange={(e) =>
                  setEditingSkill({ ...editingSkill, proficiency: Number(e.target.value) })
                }
              />
            </Form.Group>

            <Row className="gy-3 mb-3">
              <Col md={6}>
                <Form.Group controlId="modalSkillIcon">
                  <Form.Label className="small fw-semibold">Bootstrap Icon Class</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="bi-code-slash"
                    value={editingSkill?.icon || ''}
                    onChange={(e) => setEditingSkill({ ...editingSkill, icon: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="modalSkillYears">
                  <Form.Label className="small fw-semibold">Years of Experience</Form.Label>
                  <Form.Control
                    type="number"
                    value={editingSkill?.yearsOfExperience || 1}
                    onChange={(e) =>
                      setEditingSkill({ ...editingSkill, yearsOfExperience: Number(e.target.value) })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Check
              type="checkbox"
              id="modalSkillFeatured"
              label="Feature in Home Top Skills"
              checked={editingSkill?.featured || false}
              onChange={(e) => setEditingSkill({ ...editingSkill, featured: e.target.checked })}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowSkillModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save Skill'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* EXPERIENCE ADD / EDIT MODAL */}
      <Modal show={showExpModal} onHide={() => setShowExpModal(false)} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editingExp?._id ? 'Edit Experience' : 'Add Experience / Role'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveExp}>
          <Modal.Body>
            <Row className="gy-3 mb-3">
              <Col md={6}>
                <Form.Group controlId="modalExpTitle">
                  <Form.Label className="small fw-semibold">Role Title *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={editingExp?.title || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, title: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="modalExpCompany">
                  <Form.Label className="small fw-semibold">Company / Organization *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={editingExp?.company || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="gy-3 mb-3">
              <Col md={4}>
                <Form.Group controlId="modalExpEmpType">
                  <Form.Label className="small fw-semibold">Employment Type</Form.Label>
                  <Form.Select
                    value={editingExp?.employmentType || 'Full-time'}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, employmentType: e.target.value as any })
                    }
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="modalExpLocType">
                  <Form.Label className="small fw-semibold">Workplace Mode</Form.Label>
                  <Form.Select
                    value={editingExp?.locationType || 'Remote'}
                    onChange={(e) =>
                      setEditingExp({ ...editingExp, locationType: e.target.value as any })
                    }
                  >
                    <option value="Remote">Remote</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="On-site">On-site</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="modalExpLoc">
                  <Form.Label className="small fw-semibold">Location</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingExp?.location || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="gy-3 mb-3">
              <Col md={4}>
                <Form.Group controlId="modalExpStart">
                  <Form.Label className="small fw-semibold">Start Date *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Jan 2023"
                    required
                    value={editingExp?.startDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, startDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group controlId="modalExpEnd">
                  <Form.Label className="small fw-semibold">End Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="e.g. Present"
                    value={editingExp?.endDate || ''}
                    onChange={(e) => setEditingExp({ ...editingExp, endDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4} className="d-flex align-items-center pt-3">
                <Form.Check
                  type="checkbox"
                  id="modalExpCurrent"
                  label="Currently in this role"
                  checked={editingExp?.isCurrentRole || false}
                  onChange={(e) =>
                    setEditingExp({
                      ...editingExp,
                      isCurrentRole: e.target.checked,
                      endDate: e.target.checked ? 'Present' : editingExp?.endDate,
                    })
                  }
                />
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="modalExpDesc">
              <Form.Label className="small fw-semibold">Description *</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                required
                value={editingExp?.description || ''}
                onChange={(e) => setEditingExp({ ...editingExp, description: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalExpAch">
              <Form.Label className="small fw-semibold">Key Achievements (One per line)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={
                  Array.isArray(editingExp?.achievements)
                    ? editingExp?.achievements.join('\n')
                    : editingExp?.achievements || ''
                }
                onChange={(e) =>
                  setEditingExp({
                    ...editingExp,
                    achievements: e.target.value.split('\n'),
                  })
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowExpModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save Experience'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* EDUCATION ADD / EDIT MODAL */}
      <Modal show={showEduModal} onHide={() => setShowEduModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editingEdu?._id ? 'Edit Education' : 'Add Degree'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveEdu}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="modalEduInst">
              <Form.Label className="small fw-semibold">Institution *</Form.Label>
              <Form.Control
                type="text"
                required
                value={editingEdu?.institution || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, institution: e.target.value })}
              />
            </Form.Group>

            <Row className="gy-3 mb-3">
              <Col md={6}>
                <Form.Group controlId="modalEduDegree">
                  <Form.Label className="small fw-semibold">Degree *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={editingEdu?.degree || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, degree: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="modalEduMajor">
                  <Form.Label className="small fw-semibold">Field of Study *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={editingEdu?.fieldOfStudy || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, fieldOfStudy: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="gy-3 mb-3">
              <Col md={6}>
                <Form.Group controlId="modalEduStart">
                  <Form.Label className="small fw-semibold">Start Date *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={editingEdu?.startDate || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, startDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="modalEduEnd">
                  <Form.Label className="small fw-semibold">End Date</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingEdu?.endDate || ''}
                    onChange={(e) => setEditingEdu({ ...editingEdu, endDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="modalEduGrade">
              <Form.Label className="small fw-semibold">GPA / Cumulative Honors</Form.Label>
              <Form.Control
                type="text"
                value={editingEdu?.grade || ''}
                onChange={(e) => setEditingEdu({ ...editingEdu, grade: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEduModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save Education'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* CERTIFICATION ADD / EDIT MODAL */}
      <Modal show={showCertModal} onHide={() => setShowCertModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">
            {editingCert?._id ? 'Edit Certification' : 'Add Certification'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSaveCert}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="modalCertName">
              <Form.Label className="small fw-semibold">Certification Name *</Form.Label>
              <Form.Control
                type="text"
                required
                value={editingCert?.name || ''}
                onChange={(e) => setEditingCert({ ...editingCert, name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalCertIssuer">
              <Form.Label className="small fw-semibold">Issuing Organization *</Form.Label>
              <Form.Control
                type="text"
                required
                value={editingCert?.issuingOrganization || ''}
                onChange={(e) =>
                  setEditingCert({ ...editingCert, issuingOrganization: e.target.value })
                }
              />
            </Form.Group>

            <Row className="gy-3 mb-3">
              <Col md={6}>
                <Form.Group controlId="modalCertDate">
                  <Form.Label className="small fw-semibold">Issue Date *</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={editingCert?.issueDate || ''}
                    onChange={(e) => setEditingCert({ ...editingCert, issueDate: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="modalCertExp">
                  <Form.Label className="small fw-semibold">Expiration Date</Form.Label>
                  <Form.Control
                    type="text"
                    value={editingCert?.expirationDate || ''}
                    onChange={(e) =>
                      setEditingCert({ ...editingCert, expirationDate: e.target.value })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3" controlId="modalCertId">
              <Form.Label className="small fw-semibold">Credential ID</Form.Label>
              <Form.Control
                type="text"
                value={editingCert?.credentialId || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credentialId: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="modalCertUrl">
              <Form.Label className="small fw-semibold">Verification URL</Form.Label>
              <Form.Control
                type="text"
                value={editingCert?.credentialUrl || ''}
                onChange={(e) => setEditingCert({ ...editingCert, credentialUrl: e.target.value })}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowCertModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={actionLoading}>
              {actionLoading ? 'Saving...' : 'Save Certification'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* VIEW MESSAGE MODAL */}
      <Modal show={showMessageModal} onHide={() => setShowMessageModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold">Contact Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingMessage && (
            <div>
              <div className="mb-2">
                <span className="small text-secondary">From:</span>{' '}
                <strong className="text-body">{viewingMessage.name}</strong> ({viewingMessage.email})
              </div>
              <div className="mb-2">
                <span className="small text-secondary">Received:</span>{' '}
                <span className="small">{new Date(viewingMessage.createdAt).toLocaleString()}</span>
              </div>
              <div className="mb-3">
                <span className="small text-secondary">Subject:</span>{' '}
                <span className="fw-semibold text-primary">{viewingMessage.subject}</span>
              </div>
              <hr />
              <div className="p-3 bg-body-tertiary rounded-3 text-body" style={{ whiteSpace: 'pre-wrap' }}>
                {viewingMessage.message}
              </div>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          {viewingMessage && (
            <a
              href={`mailto:${viewingMessage.email}?subject=Re: ${encodeURIComponent(viewingMessage.subject)}`}
              className="btn btn-primary rounded-pill px-4"
            >
              <i className="bi bi-reply-fill me-1"></i> Reply via Email
            </a>
          )}
          <Button variant="secondary" onClick={() => setShowMessageModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* DELETE CONFIRMATION MODAL */}
      <Modal show={!!deleteConfirm} onHide={() => setDeleteConfirm(null)} centered>
        <Modal.Header closeButton>
          <Modal.Title className="fw-bold text-danger">
            <i className="bi bi-exclamation-triangle-fill me-2"></i> Confirm Deletion
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to permanently delete <strong>{deleteConfirm?.name}</strong>?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteConfirm(null)}>
            Cancel
          </Button>
          <Button variant="danger" disabled={actionLoading} onClick={executeDelete}>
            {actionLoading ? 'Deleting...' : 'Delete Permanently'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
