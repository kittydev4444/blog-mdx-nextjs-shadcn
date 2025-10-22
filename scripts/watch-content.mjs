import { watch } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { WebSocketServer } from "ws";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contentDir = join(__dirname, "..", "content");

console.log("👀 Starting MDX content watcher...");
console.log(`📁 Watching: ${contentDir}`);

// Create WebSocket server for HMR
const wss = new WebSocketServer({ port: 3001 });
const clients = new Set();

wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("🔌 Browser connected to content watcher");

  ws.on("close", () => {
    clients.delete(ws);
  });
});

// Debounce function to avoid multiple rapid reloads
let debounceTimer;
function triggerReload(filename) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log(`♻️  Reloading browsers for change in: ${filename}`);
    clients.forEach((client) => {
      if (client.readyState === 1) {
        client.send(JSON.stringify({ type: "mdx-change", file: filename }));
      }
    });
  }, 100);
}

// Watch the content directory recursively
const watcher = watch(
  contentDir,
  { recursive: true },
  (eventType, filename) => {
    if (filename && filename.endsWith(".mdx")) {
      console.log(`🔄 Detected ${eventType} in ${filename}`);
      triggerReload(filename);
    }
  },
);

console.log("✅ Content watcher ready on ws://localhost:3001");

// Handle cleanup
process.on("SIGINT", () => {
  console.log("\n👋 Stopping content watcher...");
  watcher.close();
  wss.close();
  process.exit(0);
});

process.on("SIGTERM", () => {
  watcher.close();
  wss.close();
  process.exit(0);
});
