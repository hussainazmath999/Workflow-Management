import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit' // Add type-only import
import type { WorkflowState, WorkflowNodeData, WorkflowEdge } from './types'

function getDescendantIds(startId: string, edges: WorkflowEdge[]): Set<string> {
  const descendants = new Set<string>()
  const queue = [startId]

  while (queue.length > 0) {
    const current = queue.shift()
    if (!current) continue
    
    for (const edge of edges) {
      if (edge.source === current) {
        if (!descendants.has(edge.target)) {
          descendants.add(edge.target)
          queue.push(edge.target)
        }
      }
    }
  }

  return descendants
}

const initialState: WorkflowState = {
  nodes: [],
  edges: [],
  selectedNodeId: null,
  editMode: false,
}

const workflowSlice = createSlice({
  name: 'workflow',
  initialState,
  reducers: {
    loadWorkflow: (state, action: PayloadAction<{ nodes: WorkflowNodeData[]; edges: WorkflowEdge[] }>) => {
      state.nodes = action.payload.nodes.map(node => ({
        ...node,
        isCollapsed: node.isCollapsed || false,
        hidden: false
      }))
      state.edges = action.payload.edges
    },
    selectNode: (state, action: PayloadAction<string | null>) => {
      state.selectedNodeId = action.payload
    },
    toggleEditMode: (state, action: PayloadAction<boolean>) => {
      state.editMode = action.payload
    },
    updateNodeConfig: (state, action: PayloadAction<{ id: string; config: Record<string, any> }>) => {
      const node = state.nodes.find(n => n.id === action.payload.id)
      if (node) {
        node.config = { ...node.config, ...action.payload.config }
      }
    },
    toggleNodeCollapse: (state, action: PayloadAction<string>) => {
      const node = state.nodes.find((n) => n.id === action.payload)
      if (node) {
        const wasCollapsed = node.isCollapsed
        node.isCollapsed = !node.isCollapsed
        
        // Get all descendants
        const hiddenSet = getDescendantIds(node.id, state.edges)
        
        // Update visibility of descendants
        state.nodes.forEach(n => {
          if (hiddenSet.has(n.id)) {
            if (wasCollapsed) {
              // If node was previously collapsed, show descendants
              n.hidden = false
            } else {
              // If node is now collapsing, hide descendants
              n.hidden = true
            }
          }
        })
      }
    },
    addNode: (state, action: PayloadAction<WorkflowNodeData>) => {
      state.nodes.push({ ...action.payload, hidden: false })
    },
    addEdge: (state, action: PayloadAction<WorkflowEdge>) => {
      state.edges.push(action.payload)
    },
    deleteNode: (state, action: PayloadAction<string>) => {
      state.nodes = state.nodes.filter(n => n.id !== action.payload)
      state.edges = state.edges.filter(e => e.source !== action.payload && e.target !== action.payload)
    },
  },
})

export const {
  loadWorkflow,
  selectNode,
  toggleEditMode,
  updateNodeConfig,
  toggleNodeCollapse,
  addNode,
  addEdge,
  deleteNode,
} = workflowSlice.actions

export default workflowSlice.reducer