React Flow- Workflow Builder 

Flexible visual workflow editor UI built with React Flow, Redux Toolkit, and Material UI. 
Supports multiple node types, view node configs,edit config popovers, and real-time subtree collapsing.



![Main workflow](<Screenshot 2025-06-02 203537.png>)
![Workflow with view mode](<Screenshot 2025-06-02 203601.png>)
![workflow with edit mode](<Screenshot 2025-06-02 203623.png>)
![subtree collapse or expand](<Screenshot 2025-06-02 205537.png>)


Project Structure

```bash
src/
├── components/
│   ├── nodes/             # Custom nodes: start/action/decision/terminal
│   ├── ConfigDrawer.tsx
│   ├── NodePopover.tsx
│   └── WorkflowCanvas.tsx
├── features/workflow/     # Redux slice + types
└── utils/                 # Storage + helpers






Getting Started
npm install
npm run dev


Live URl:
Hosted on Netlify:
https://workflow-mange.netlify.app/