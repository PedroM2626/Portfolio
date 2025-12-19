import { useEffect } from "react";
import { apiRequest } from "@/lib/utils";

declare global {
  interface Window {
    chatbase: any;
  }
}

export function Chatbot() {
  useEffect(() => {
    // 1. Initialize Chatbase Widget
    (function () {
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args: any[]) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };
        window.chatbase = new Proxy(window.chatbase, {
          get(target: any, prop: any) {
            if (prop === "q") {
              return target.q;
            }
            return (...args: any[]) => target(prop, ...args);
          },
        });
      }
      const onLoad = function () {
        const script = document.createElement("script");
        script.src = "https://www.chatbase.co/embed.min.js";
        script.id = "WH0VfK5LgzsChbTmxRrsz";
        // @ts-ignore
        script.domain = "www.chatbase.co";
        document.body.appendChild(script);
      };
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();

    // 2. Fetch Token and Identify
    const identifyUser = async () => {
      try {
        // Use full URL if apiRequest doesn't handle absolute paths well for local dev, 
        // but typically apiRequest handles it. 
        // Assuming apiRequest wraps fetch nicely. 
        // If not, I'll use standard fetch for simplicity here to be sure.
        const res = await fetch("/api/chatbase-token");
        if (!res.ok) throw new Error("Failed to fetch chatbase token");
        
        const data = await res.json();
        
        if (data.token) {
          if (window.chatbase) {
             window.chatbase('identify', { token: data.token });
          }
        }
      } catch (error) {
        console.error("Chatbase identification failed:", error);
      }
    };

    identifyUser();

  }, []);

  return null; // This component renders nothing visual, it just injects the script
}
