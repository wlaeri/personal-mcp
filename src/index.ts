import { readFileSync, readdirSync } from "node:fs";
import { join, basename, extname } from "node:path";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const DATA_DIR = join(__dirname, "..", "data");

const TOOL_DESCRIPTIONS: Record<string, string> = {
  profile: "Get a high-level summary of Will Laeri: name, title, company, location, and bio.",
  experience: "Get Will Laeri's full work history with titles, companies, dates, and descriptions.",
  skills: "Get Will Laeri's technical skills organized by category.",
  preferences: "Get Will Laeri's coding style, API design, and tooling preferences.",
  education: "Get Will Laeri's educational background.",
};

function readMarkdownFile(filename: string): string {
  return readFileSync(join(DATA_DIR, filename), "utf-8");
}

function discoverDataFiles(): string[] {
  return readdirSync(DATA_DIR).filter((f) => extname(f) === ".md");
}

const server = new McpServer({
  name: "will-laeri-mcp",
  version: "1.0.0",
});

for (const file of discoverDataFiles()) {
  const name = basename(file, ".md");
  const toolName = `get_${name}`;
  const description = TOOL_DESCRIPTIONS[name] ?? `Get Will Laeri's ${name} information.`;

  server.tool(toolName, description, () => ({
    content: [{ type: "text", text: readMarkdownFile(file) }],
  }));
}

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server failed to start:", error);
  process.exit(1);
});
