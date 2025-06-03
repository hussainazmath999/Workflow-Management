// DecisionNode.tsx using split handles for Yes/No branching

import React from 'react'
import NodeWrapper from './NodeWrapper'
import { Handle, Position } from 'reactflow'
import { useAppDispatch } from '../../hooks'
import { toggleNodeCollapse } from '../../features/workflow/workflowSlice'

const DecisionNode: React.FC<any> = ({ data, id }) => {
  const dispatch = useAppDispatch()

  return (
    <NodeWrapper label={data.label} color="#ff9800" id={id}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Left} id="yes"  />
      <Handle type="source" position={Position.Right} id="no"  />
    </NodeWrapper>
  )
}

export default DecisionNode


