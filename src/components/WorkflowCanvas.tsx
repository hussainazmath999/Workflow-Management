import React, { useEffect, useRef } from "react";
import ReactFlow, {
  Background,
  MiniMap,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  Panel,
  useReactFlow,
} from "reactflow";
import type { Node, Edge } from "reactflow";
import "reactflow/dist/style.css";
import { useAppSelector, useAppDispatch } from "../hooks";
import {
  selectNode,
  addEdge,
  toggleEditMode,
  resetToInitial,
  resetToSaved,
} from "../features/workflow/workflowSlice";
import { saveWorkflowToStorage, clearWorkflowStorage } from "../utils/storage";
import StartNode from "./nodes/StartNode";
import ActionNode from "./nodes/ActionNode";
import DecisionNode from "./nodes/DecisionNode";
import TerminalNode from "./nodes/TerminalNode";
import ConfigDrawer from "./ConfigDrawer";
import NodePopover from "./NodePopover";
import {
  Box,
  Button,
  FormControlLabel,
  Switch,
  Chip,
  Typography,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Save, Replay, Delete, FitScreen } from "@mui/icons-material";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import type { NodeMouseHandler } from "reactflow";

const nodeTypes = {
  start: StartNode,
  action: ActionNode,
  decision: DecisionNode,
  terminal: TerminalNode,
};

const nodeColor = (node: Node) => {
  switch (node.type) {
    case "start":
      return "#4caf50";
    case "action":
      return "#2196f3";
    case "decision":
      return "#ff9800";
    case "terminal":
      return "#f44336";
    default:
      return "#999";
  }
};

const WorkflowCanvasInternal: React.FC = () => {
  const dispatch = useAppDispatch();
  const workflow = useAppSelector((state) => state.workflow);
  const { zoomIn, zoomOut, fitView } = useReactFlow();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const selectedNodeRef = useRef<string | null>(null);

  const onNodeClick: NodeMouseHandler = (_, node: Node) => {
    dispatch(selectNode(node.id));
    selectedNodeRef.current = node.id;
  };

  useEffect(() => {
    const mappedNodes: Node[] = workflow.nodes
      .filter((node) => !node.hidden)
      .map((node) => ({
        id: node.id,
        type: node.type,
        data: {
          label: node.label,
          config: node.config,
          isCollapsed: node.isCollapsed ?? false,
        },
        position: node.position,
        style: {
          borderRadius: "12px",
          border: "none",
          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        },
      }));

    const mappedEdges: Edge[] = workflow.edges
      .filter((edge) => {
        const sourceNode = workflow.nodes.find((n) => n.id === edge.source);
        const targetNode = workflow.nodes.find((n) => n.id === edge.target);
        return !sourceNode?.hidden && !targetNode?.hidden;
      })
      .map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        sourceHandle: edge.sourceHandle,
        label: edge.label ?? "",
        labelStyle: {
          fontSize: "0.75rem",
          fontWeight: 600,
          fill: "#555",
        },
        animated: true,
        style: {
          strokeWidth: 2,
          stroke: "#90caf9",
        },
        type: "smoothstep",
      }));

    setNodes(mappedNodes);
    setEdges(mappedEdges);
  }, [workflow.nodes, workflow.edges, setNodes, setEdges]);

  const handleToggleMode = () => {
    dispatch(toggleEditMode(!workflow.editMode));
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* App Bar */}
      <AppBar
        position="static"
        elevation={0}
        sx={{
          background: "white",
          borderBottom: "1px solid #e0e0e0",
          color: "#333",
          py: 1,
        }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{ flexGrow: 1, color: "#1976d2" }}
          >
            <span style={{ fontWeight: 800 }}>Workflow</span> Management System
          </Typography>

          <Chip
            label={workflow.editMode ? "EDIT MODE" : "VIEW MODE"}
            color={workflow.editMode ? "primary" : "default"}
            size="small"
            sx={{ fontWeight: 600, mr: 2 }}
          />

          <FormControlLabel
            control={
              <Switch
                checked={workflow.editMode}
                onChange={handleToggleMode}
                color="primary"
              />
            }
            label={workflow.editMode ? "Editing" : "Viewing"}
          />

          <Button
            variant="contained"
            color="primary"
            startIcon={<Save />}
            onClick={() =>
              saveWorkflowToStorage(workflow.nodes, workflow.edges)
            }
            sx={{ borderRadius: "50px", px: 3, ml: 2 }}
          >
            Save Workflow
          </Button>
        </Toolbar>
      </AppBar>

      {/* Flow Canvas */}
      <div style={{ flexGrow: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={onNodeClick}
          onConnect={(connection) => {
            dispatch(
              addEdge({
                id: `e-${connection.source}-${connection.target}`,
                source: connection.source!,
                target: connection.target!,
              })
            );
          }}
          fitView
          nodeTypes={nodeTypes}
          zoomOnScroll
          zoomOnPinch
          panOnScroll
          nodesDraggable
          panOnDrag
          defaultEdgeOptions={{
            type: "smoothstep",
            style: { strokeWidth: 2, stroke: "#90caf9" },
            animated: true,
          }}
        >
          <Background
            color="#e0e0e0"
            gap={20}
            style={{ background: "#f5f7fa" }}
          />
          <MiniMap
            nodeColor={nodeColor}
            position="bottom-right"
            style={{
              backgroundColor: "rgba(255,255,255,0.8)",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            }}
          />

          {/* Zoom Panel */}
          <Panel position="bottom-left">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                background: "white",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                p: 1,
              }}
            >
              <Button
                onClick={() => zoomIn()}
                variant="outlined"
                startIcon={<ZoomInIcon />}
                size="small"
              >
                Zoom In
              </Button>

              <Button
                onClick={() => zoomOut()}
                variant="outlined"
                startIcon={<ZoomOutIcon />}
                size="small"
              >
                Zoom Out
              </Button>

              <Button
                onClick={() => fitView()}
                variant="outlined"
                startIcon={<FitScreen />}
                size="small"
              >
                Fit View
              </Button>
            </Box>
          </Panel>

          {/* Reload / Reset Panel */}
          <Panel position="top-right">
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
                background: "rgba(255,255,255,0.95)",
                borderRadius: "12px",
                padding: "12px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
              }}
            >
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<Replay />}
                onClick={() => dispatch(resetToSaved())}
                sx={{ borderRadius: "50px" }}
              >
                Reload Workflow
              </Button>

              <Button
                variant="outlined"
                color="error"
                startIcon={<Delete />}
                onClick={() => {
                  clearWorkflowStorage();
                  dispatch(resetToInitial());
                }}
                sx={{ borderRadius: "50px" }}
              >
                Reset All
              </Button>
            </Box>
          </Panel>
        </ReactFlow>

        <ConfigDrawer />
        <NodePopover />
      </div>

      {/* Footer */}
      <Box
        sx={{
          background: "#f5f7fa",
          borderTop: "1px solid #e0e0e0",
          px: 3,
          py: 1,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="body2" color="textSecondary">
          Workflow Status:{" "}
          <span style={{ color: "#4caf50", fontWeight: 600 }}>Active</span>
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Nodes: {workflow.nodes.length} | Edges: {workflow.edges.length}
        </Typography>
      </Box>
    </div>
  );
};

const WorkflowCanvas: React.FC = () => (
  <ReactFlowProvider>
    <WorkflowCanvasInternal />
  </ReactFlowProvider>
);

export default WorkflowCanvas;
