import React, { useState, useEffect } from 'react'
import {
  Drawer,
  Box,
  Typography,
  Button,
  Divider,
  TextField,
  Tabs,
  Tab,
  Chip,
  CircularProgress
} from '@mui/material'
import { useAppDispatch, useAppSelector } from '../hooks'
import { updateNodeConfig, selectNode } from '../features/workflow/workflowSlice'
import { JsonView, allExpanded, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const ConfigDrawer: React.FC = () => {
  const dispatch = useAppDispatch()
  const { nodes, selectedNodeId, editMode } = useAppSelector((state) => state.workflow)
  const selectedNode = nodes.find((node) => node.id === selectedNodeId)

  
  const [localConfig, setLocalConfig] = useState<Record<string, any>>({})
  const [jsonValue, setJsonValue] = useState('')
  const [jsonError, setJsonError] = useState('')
  const [activeTab, setActiveTab] = useState(0)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    if (selectedNode) {
      setLocalConfig(selectedNode.config)
      setJsonValue(JSON.stringify(selectedNode.config, null, 2))
      setJsonError('')
      setActiveTab(0)
    }
  }, [selectedNode])

  const handleChange = (key: string, value: string) => {
    setLocalConfig((prev) => ({ ...prev, [key]: value }))
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      if (selectedNodeId) {
        dispatch(updateNodeConfig({ id: selectedNodeId, config: localConfig }))
      }
      dispatch(selectNode(null))
      setIsSaving(false)
    }, 300)
  }

  const handleJsonSave = () => {
    setIsSaving(true)
    try {
      const parsed = JSON.parse(jsonValue)
      setTimeout(() => {
        if (selectedNodeId) {
          dispatch(updateNodeConfig({ id: selectedNodeId, config: parsed }))
        }
        setJsonError('')
        dispatch(selectNode(null))
        setIsSaving(false)
      }, 300)
    } catch (e) {
      setJsonError('Invalid JSON format')
      setIsSaving(false)
    }
  }

  const handleClose = () => {
    dispatch(selectNode(null))
  }

  if (!editMode || !selectedNode) return null

  return (
    <Drawer 
      anchor="right" 
      open={!!selectedNode} 
      onClose={handleClose}
      PaperProps={{
        sx: {
          width: 400,
          background: '#f9fafb'
        }
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} gutterBottom>
          Configure Node
        </Typography>
        <Chip 
          label={selectedNode.type.toUpperCase()} 
          size="small" 
          sx={{ 
            mb: 2, 
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
        <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
          {selectedNode.label}
        </Typography>

        <Tabs 
          value={activeTab} 
          onChange={(_, newValue) => setActiveTab(newValue)}
          sx={{ mb: 2 }}
        >
          <Tab label="Form" />
          <Tab label="JSON" />
          <Tab label="Preview" />
        </Tabs>

        <Divider sx={{ mb: 3 }} />

        {activeTab === 0 && (
          <>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Edit node properties
            </Typography>
            {Object.entries(localConfig).map(([key, value]) => (
              <TextField
                key={key}
                fullWidth
                label={key.replace(/_/g, ' ')}
                margin="normal"
                value={value}
                onChange={(e) => handleChange(key, e.target.value)}
                variant="outlined"
                size="small"
              />
            ))}
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button 
                variant="contained" 
                onClick={handleSave}
                disabled={isSaving}
                sx={{ flex: 1 }}
              >
                {isSaving ? <CircularProgress size={20} /> : 'Save Changes'}
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleClose}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
            </Box>
          </>
        )}

        {activeTab === 1 && (
          <>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
              Edit raw JSON configuration
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={14}
              value={jsonValue}
              onChange={(e) => setJsonValue(e.target.value)}
              error={!!jsonError}
              helperText={jsonError || 'Use valid JSON format'}
              variant="outlined"
              size="small"
              sx={{
                fontFamily: 'monospace',
                fontSize: '0.85rem',
                mb: 2
              }}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button 
                variant="contained" 
                onClick={handleJsonSave}
                disabled={isSaving}
                sx={{ flex: 1 }}
              >
                {isSaving ? <CircularProgress size={20} /> : 'Save JSON'}
              </Button>
              <Button 
                variant="outlined" 
                onClick={handleClose}
                sx={{ flex: 1 }}
              >
                Cancel
              </Button>
            </Box>
          </>
        )}

        {activeTab === 2 && (
          <Box sx={{ 
            background: '#f8f9fa', 
            borderRadius: '8px', 
            p: 2,
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
              Configuration Preview
            </Typography>
            <JsonView 
              data={localConfig} 
              shouldExpandNode={allExpanded} 
              style={defaultStyles} 
            />
          </Box>
        )}
      </Box>
    </Drawer>
  )
}

export default ConfigDrawer