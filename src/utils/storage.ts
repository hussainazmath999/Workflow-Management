import type { WorkflowNodeData, WorkflowEdge } from '../features/workflow/types'

const STORAGE_KEY = 'workflow_state'

export function saveWorkflowToStorage(nodes: WorkflowNodeData[], edges: WorkflowEdge[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ nodes, edges }))
}

export function loadWorkflowFromStorage(): { nodes: WorkflowNodeData[]; edges: WorkflowEdge[] } | null {
  const data = localStorage.getItem(STORAGE_KEY)
  return data ? JSON.parse(data) : null
}

export function clearWorkflowStorage() {
  localStorage.removeItem(STORAGE_KEY)
}
