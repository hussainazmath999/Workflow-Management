import React, { useState, useEffect } from 'react'
import {
  Popover,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Paper
} from '@mui/material'
import { useAppSelector } from '../hooks'

const NodePopover: React.FC = () => {
  const { nodes, selectedNodeId, editMode } = useAppSelector((state) => state.workflow)
  const selectedNode = nodes.find((n) => n.id === selectedNodeId)
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (selectedNode && !editMode) {
      const el = document.querySelector(`[data-id="${selectedNode.id}"]`)
      if (el) setAnchorEl(el as HTMLElement)
    } else {
      setAnchorEl(null)
    }
  }, [selectedNodeId, editMode, nodes])

  if (!selectedNode || editMode || !anchorEl) return null

  return (
    <Popover
      open={!!anchorEl}
      anchorEl={anchorEl}
      onClose={() => setAnchorEl(null)}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          minWidth: 280,
          overflow: 'hidden'
        }
      }}
    >
      <Paper elevation={0}>
        <Box sx={{ p: 2, background: '#f9fafb' }}>
          <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 0.5 }}>
            {selectedNode.label}
          </Typography>
          <Chip 
            label={selectedNode.type.toUpperCase()} 
            size="small" 
            sx={{ 
              background: selectedNode.type === 'start' ? '#4caf5022' : 
                        selectedNode.type === 'action' ? '#2196f322' :
                        selectedNode.type === 'decision' ? '#ff980022' : 
                        '#f4433622',
              color: selectedNode.type === 'start' ? '#4caf50' : 
                    selectedNode.type === 'action' ? '#2196f3' :
                    selectedNode.type === 'decision' ? '#ff9800' : 
                    '#f44336',
              fontWeight: 600
            }} 
          />
        </Box>
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            Configuration:
          </Typography>
          <List dense sx={{ maxHeight: 200, overflowY: 'auto' }}>
            {Object.entries(selectedNode.config).map(([key, val]) => (
              <ListItem key={key} sx={{ py: 0.5 }}>
                <ListItemText 
                  primary={<Typography variant="body2" fontWeight={500}>{key.replace(/_/g, ' ')}</Typography>} 
                  secondary={String(val)} 
                  secondaryTypographyProps={{ variant: 'body2' }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Paper>
    </Popover>
  )
}

export default NodePopover