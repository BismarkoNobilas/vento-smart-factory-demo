"use client";
import { useEffect, useState } from "react";

export default function useLiveState() {
  const [live, setLive] = useState(null);

  useEffect(() => {
    const sse = new EventSource("/api/stream");

    sse.onmessage = (e) => {
      try {
        setLive(JSON.parse(e.data));
      } catch {}
    };

    return () => sse.close();
  }, []);

  return live;
}
