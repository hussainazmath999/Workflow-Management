import React from 'react'
import NodeWrapper from './NodeWrapper'
import { Handle, Position } from 'reactflow'

const ActionNode: React.FC<any> = ({ id, data }) => (
  <div data-id={id}>
    <NodeWrapper label={data.label} color="#2196f3" id={id}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </NodeWrapper>
  </div>
)

export default ActionNode
