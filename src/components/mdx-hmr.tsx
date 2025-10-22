"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function MDXHotReload() {
  const router = useRouter();

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    let ws: WebSocket | null = null;
    let reconnectTimer: NodeJS.Timeout;

    function connect() {
      try {
        ws = new WebSocket("ws://localhost:3001");

        ws.onopen = () => {
          console.log("🔥 MDX Hot Reload connected");
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === "mdx-change") {
              console.log(`♻️  Reloading page due to change in: ${data.file}`);
              router.refresh();
            }
          } catch (err) {
            console.error("Failed to parse message:", err);
          }
        };

        ws.onclose = () => {
          console.log("🔌 MDX Hot Reload disconnected, reconnecting...");
          reconnectTimer = setTimeout(connect, 1000);
        };

        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          ws?.close();
        };
      } catch (err) {
        console.error("Failed to connect to MDX watcher:", err);
        reconnectTimer = setTimeout(connect, 1000);
      }
    }

    connect();

    return () => {
      clearTimeout(reconnectTimer);
      if (ws) {
        ws.close();
        ws = null;
      }
    };
  }, [router]);

  return null;
}
