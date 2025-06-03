import React from 'react'
import NodeWrapper from './NodeWrapper'
import { Handle, Position } from 'reactflow'


export const StartNode: React.FC<any> = ({ id, data }) => (
  <div data-id={id}>
    <NodeWrapper label={data.label} color="#4caf50" id={id}>
      <Handle type="source" position={Position.Bottom} />
    </NodeWrapper>
  </div>
)

export default StartNode
