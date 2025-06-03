import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadWorkflow, toggleEditMode } from './features/workflow/workflowSlice'
import { sampleNodes, sampleEdges } from './features/workflow/sampleWorkflow'
import { loadWorkflowFromStorage } from './utils/storage'
import WorkflowCanvas from './components/WorkflowCanvas'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#ff9800',
    },
    background: {
      default: '#f5f7fa',
    },
  },
   typography: {
    fontFamily: [
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
          }
        },
        outlined: {
          borderWidth: '1.5px',
          '&:hover': {
            borderWidth: '1.5px',
          }
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        }
      }
    }
  }
})

const App: React.FC = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const stored = loadWorkflowFromStorage()
    if (stored) {
      dispatch(loadWorkflow(stored))
    } else {
      dispatch(loadWorkflow({ nodes: sampleNodes, edges: sampleEdges }))
    }

    dispatch(toggleEditMode(true))
  }, [dispatch])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WorkflowCanvas />
    </ThemeProvider>
  )
}

export default App