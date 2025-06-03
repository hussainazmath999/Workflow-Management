import React from 'react'
import NodeWrapper from './NodeWrapper'
import { Handle, Position } from 'reactflow'

export const TerminalNode: React.FC<any> = ({ id, data }) => (
  <div data-id={id}>
    <NodeWrapper label={data.label} color="#f44336" id={id}>
      <Handle type="target" position={Position.Top} />
    </NodeWrapper>
  </div>
)

export default TerminalNode
