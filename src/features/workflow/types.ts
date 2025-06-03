export type NodeType = 'start' | 'action' | 'decision' | 'terminal'

export interface WorkflowNodeData {
  id: string
  label: string
  type: NodeType
  config: Record<string, any>
    position: { x: number; y: number } 
  isCollapsed?: boolean
  hidden?:boolean
}

export interface WorkflowEdge {
  id: string
  source: string
  target: string
  sourceHandle?: string
    label?: string;
}

export interface WorkflowState {
  nodes: WorkflowNodeData[]
  edges: WorkflowEdge[]
  selectedNodeId: string | null
  editMode: boolean
}
