import React from 'react'
import NodeWrapper from './NodeWrapper'
import { Handle, Position } from 'reactflow'



const DecisionNode: React.FC<any> = ({ data, id }) => {
  

  return (
    <NodeWrapper label={data.label} color="#ff9800" id={id}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Left} id="yes"  />
      <Handle type="source" position={Position.Right} id="no"  />
    </NodeWrapper>
  )
}

export default DecisionNode


