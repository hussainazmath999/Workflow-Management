// Final sampleWorkflow.ts with YES/NO labeled edges for decision branching

import type { WorkflowNodeData, WorkflowEdge } from './types'
export const sampleNodes: WorkflowNodeData[] = [
  {
    id: 'start',
    type: 'start',
    label: 'Application Submitted',
    position: { x: 100, y: 50 },
    config: { form: 'job_application_form' },
  },
  {
    id: 'sendEmail',
    type: 'action',
    label: 'Send Confirmation Email',
    position: { x: 100, y: 150 },
    config: { template: 'thanks_for_applying', service: 'SendGrid' },
  },
  {
    id: 'screening',
    type: 'action',
    label: 'Initial Screening',
    position: { x: 100, y: 250 },
    config: { screeningTool: 'ResumeScannerPro' },
  },
  {
    id: 'checkQualified',
    type: 'decision',
    label: 'Meets Job Criteria?',
    position: { x: 100, y: 350 },
    config: { condition: 'resumeScore >= 70' },
  },
  {
    id: 'scheduleInterview',
    type: 'action',
    label: 'Schedule Interview',
    // Move left and down
    position: { x: -100, y: 500 },  // Changed from { x: 0, y: 450 }
    config: { tool: 'Calendly', duration: '30min' },
  },
  {
    id: 'sendRejection',
    type: 'action',
    label: 'Send Rejection Email',
    // Move right and down
    position: { x: 300, y: 500 },  // Changed from { x: 200, y: 450 }
    config: { template: 'rejection_email', service: 'SendGrid' },
  },
  {
    id: 'end',
    type: 'terminal',
    label: 'Process Complete',
    // Move down further
    position: { x: 100, y: 700 },  // Changed from { x: 100, y: 600 }
    config: { status: 'done' },
  },
]

export const sampleEdges: WorkflowEdge[] = [
  { id: 'e1', source: 'start', target: 'sendEmail' },
  { id: 'e2', source: 'sendEmail', target: 'screening' },
  { id: 'e3', source: 'screening', target: 'checkQualified' },
  { id: 'e4', source: 'checkQualified', sourceHandle: 'yes', target: 'scheduleInterview', label: 'Yes' },
  { id: 'e5', source: 'checkQualified', sourceHandle: 'no', target: 'sendRejection', label: 'No' },
  { id: 'e6', source: 'scheduleInterview', target: 'end' },
  { id: 'e7', source: 'sendRejection', target: 'end' },
]