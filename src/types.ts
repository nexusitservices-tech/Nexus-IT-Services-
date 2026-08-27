export type Role = 'PLATFORM_OWNER' | 'ORG_OWNER' | 'ADMIN' | 'SALES' | 'PROJECT_MANAGER' | 'IT_AGENT' | 'FINANCE' | 'CONSULTANT' | 'CREATIVE' | 'STAFF' | 'CLIENT_ADMIN' | 'CLIENT_USER';

export interface User {
  id: string;
  email: string;
  displayName: string;
  role: Role;
  organizationId: string;
  clientId?: string;
  avatarUrl?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  createdAt: string;
  // Other org settings
}

export type LeadStatus = 'New' | 'Contacted' | 'Qualified' | 'Nurturing' | 'Converted' | 'Lost';
export interface Lead {
  id: string;
  organizationId: string;
  clientId?: string;
  company: string;
  contactName: string;
  email: string;
  phone: string;
  source: string;
  serviceInterest: string;
  industry: string;
  location: string;
  estimatedValue: number;
  priority: 'Low' | 'Medium' | 'High';
  status: LeadStatus;
  ownerId: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export type OpportunityStage = 'Discovery' | 'Qualification' | 'Solution Design' | 'Proposal Sent' | 'Negotiation' | 'Won' | 'Lost';
export interface Opportunity {
  id: string;
  organizationId: string;
  clientId?: string;
  leadId?: string;
  name: string;
  stage: OpportunityStage;
  probability: number;
  expectedCloseDate: string;
  estimatedValue: number;
  servicePillar: string;
  ownerId: string;
  nextAction: string;
  createdAt: string;
  updatedAt: string;
}

export interface Client {
  id: string;
  organizationId: string;
  clientId?: string;
  name: string;
  industry: string;
  website: string;
  healthScore: number;
  createdAt: string;
  updatedAt: string;
}

export type ProjectStatus = 'Planning' | 'Active' | 'At Risk' | 'Blocked' | 'On Hold' | 'Completed' | 'Archived';
export interface Project {
  id: string;
  organizationId: string;
  clientId: string;
  name: string;
  description: string;
  status: ProjectStatus;
  pmId: string;
  startDate: string;
  targetEndDate: string;
  createdAt: string;
  updatedAt: string;
}

export type TicketStatus = 'New' | 'Open' | 'In Progress' | 'Waiting for Client' | 'Waiting for Vendor' | 'Resolved' | 'Closed';
export interface Ticket {
  id: string;
  organizationId: string;
  clientId: string;
  requesterId: string;
  ticketNumber: string;
  category: string;
  subject: string;
  description: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: TicketStatus;
  assignedAgentId?: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'Todo' | 'In Progress' | 'Review' | 'Done';
export interface Task {
  id: string;
  organizationId: string;
  clientId?: string;
  projectId: string;
  title: string;
  description: string;
  status: TaskStatus;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  organizationId: string;
  clientId?: string;
  actorId: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
  metadata?: any;
}

export type InvoiceStatus = 'Draft' | 'Sent' | 'Partially Paid' | 'Paid' | 'Overdue' | 'Void';
export interface Invoice {
  id: string;
  organizationId: string;
  clientId: string;
  invoiceNumber: string;
  projectId?: string;
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  dueDate: string;
  status: InvoiceStatus;
  createdAt: string;
}

export type ProposalStatus = 'Draft' | 'Internal Review' | 'Sent' | 'Viewed' | 'Approved' | 'Rejected' | 'Expired';
export interface Proposal {
  id: string;
  organizationId: string;
  clientId?: string;
  opportunityId?: string;
  title: string;
  value: number;
  status: ProposalStatus;
  validUntil: string;
  createdAt: string;
}
