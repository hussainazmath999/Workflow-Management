React Flow- Workflow Builder Usecase for Job Application Process

Flexible visual workflow editor UI built with React Flow, Redux Toolkit, and Material UI. 

Features  
**Start Node** – Accepts external triggers (e.g., webhooks)  
**Action Nodes** – Perform operations with configurable inputs  
**Decision Nodes** – Handle if/else branching logic  
**Terminal Nodes** – Represent workflow completion  

 ->Edit Mode – Full node configuration via right drawer  
 ->View Mode – Quick config preview via popover  
 ->Collapse/Expand subtrees to reduce visual clutter  
 ->Save, load, and reset workflows from localStorage  
 ->Clean, modern UI using Material UI  

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