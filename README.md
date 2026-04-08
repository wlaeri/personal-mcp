# Personal MCP Server

An MCP server that exposes personal information as tools. Each `.md` file in the `data/` directory becomes a `get_<filename>` tool automatically.

## Setup

```bash
npm install
npm run build
npm start
```

## Adding a Topic

1. Create a new Markdown file in the `data/` directory (e.g., `data/hobbies.md`).
2. Rebuild and restart the server — a `get_hobbies` tool will be registered automatically.

To customize the tool description, add an entry to the `TOOL_DESCRIPTIONS` map in `src/index.ts`.
