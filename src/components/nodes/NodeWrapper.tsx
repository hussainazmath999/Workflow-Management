import React from 'react'
import { Typography, Paper, IconButton, Tooltip, Box } from '@mui/material'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { toggleNodeCollapse } from '../../features/workflow/workflowSlice'
import { ExpandMore, ExpandLess } from '@mui/icons-material'

export interface NodeWrapperProps {
  label: string
  color: string
  children?: React.ReactNode
  id: string
}

const NodeWrapper: React.FC<NodeWrapperProps> = ({ label, color, children, id }) => {
  const dispatch = useAppDispatch()
  const isCollapsed = useAppSelector((state) =>
    state.workflow.nodes.find((n) => n.id === id)?.isCollapsed ?? false
  )

  return (
    <Paper
      elevation={3}
      data-id={id}
      sx={{
        padding: 0,
        borderRadius: '12px',
        border: `2px solid ${color}`,
        background: 'linear-gradient(145deg, #ffffff, #f5f5f5)',
        minWidth: 180,
        position: 'relative',
        textAlign: 'left',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)'
        }
      }}
    >
      <Box 
        sx={{ 
          background: `${color}22`,
          padding: '12px 16px',
          borderBottom: `1px solid ${color}44`,
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          borderTopLeftRadius: '10px',
          borderTopRightRadius: '10px'
        }}
      >
        <Typography 
          variant="subtitle1" 
          fontWeight={600} 
          sx={{ 
            color: color,
            fontSize: '0.9rem',
            letterSpacing: '0.3px'
          }}
        >
          {label}
        </Typography>
        <Tooltip title={isCollapsed ? 'Expand' : 'Collapse'}>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation()
              dispatch(toggleNodeCollapse(id))
            }}
            sx={{ 
              p: 0.5,
              color: `${color}dd`,
              '&:hover': {
                backgroundColor: `${color}22`
              }
            }}
          >
            {isCollapsed ? <ExpandMore fontSize="small" /> : <ExpandLess fontSize="small" />}
          </IconButton>
        </Tooltip>
      </Box>
      <Box sx={{ padding: '12px 16px' }}>
        {children}
      </Box>
    </Paper>
  )
}

export default NodeWrapper