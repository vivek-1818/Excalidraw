# Excalidraw

A fast collaborative canvas for ideas that need a room. Built on top of Excalidraw with real-time collaboration, password-protected rooms, and persistent sessions.

---

## ✨ Features

- 🎨 Real-time collaborative whiteboard
- 🔒 Password-protected private rooms
- 🏠 Persistent rooms across sessions
- 👥 Invite teammates via room name + password
- ⚡ Polished UI with public & private room modes

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, TypeScript, Tailwind CSS |
| Canvas | Excalidraw |
| HTTP Backend | Node.js (http-backend) |
| WebSocket Backend | Node.js (ws-backend) |
| Monorepo | Turborepo + pnpm workspaces |
| Deployment | Vercel (frontend) |

---

## 📁 Monorepo Structure

```
Excalidraw/
├── apps/
│   ├── exciledraw-fe/        # Next.js frontend (deployed to Vercel)
│   ├── http-backend/         # REST API server
│   └── ws-backend/           # WebSocket server for real-time sync
├── packages/
│   └── backend-common/       # Shared backend utilities
├── turbo.json
└── pnpm-workspace.yaml
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- pnpm >= 8 → `npm install -g pnpm`

### Install & Run

```bash
# Clone
git clone https://github.com/vivek-1818/Excalidraw.git
cd Excalidraw

# Install all dependencies
pnpm install

# Run all apps in dev mode
pnpm dev
```

| App | URL |
|---|---|
| Frontend | http://localhost:3000 |
| HTTP Backend | http://localhost:3001 |
| WebSocket Backend | ws://localhost:8080 |

> Ports may vary based on your `.env` config.

### Build

```bash
pnpm build
```

Turborepo builds all apps in the correct dependency order.

---

## 📄 License

MIT © [vivek-1818](https://github.com/vivek-1818)
