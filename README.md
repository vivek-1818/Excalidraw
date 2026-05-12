# Exciledraw

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
| Monorepo | Turborepo + pnpm workspaces |
| Deployment | Vercel |

---

## 📁 Monorepo Structure

```
exciledraw/
├── apps/
│   └── exciledraw-fe/        # Next.js frontend (deployed to Vercel)
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
git clone https://github.com/vivekbiradar/exciledraw.git
cd exciledraw

# Install
pnpm install

# Dev
pnpm dev
```

Frontend runs at [http://localhost:3001](http://localhost:3001)

### Build

```bash
pnpm build
```

Turborepo handles dependency-aware builds across all apps and packages.

---

## ☁️ Deployment

Deployed on **Vercel** as a monorepo. Key settings:

| Setting | Value |
|---|---|
| Root Directory | `apps/exciledraw-fe` |
| Output Directory | `.next` |
| Build Command | `cd ../.. && npx turbo run build --filter=exciledraw-fe` |

`turbo.json` is configured with correct outputs for Vercel's remote cache:

```json
"outputs": ["dist/**", ".next/**", "!.next/cache/**"]
```

---

## 📄 License

MIT © Vivek Biradar
