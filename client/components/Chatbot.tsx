import { useEffect } from "react";

declare global {
  interface Window {
    chatbase: any;
  }
}

export function Chatbot() {
  useEffect(() => {
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
        Object.assign(script as unknown as Record<string, unknown>, {
          domain: "www.chatbase.co",
        });
        document.body.appendChild(script);
      };
      if (document.readyState === "complete") {
        onLoad();
      } else {
        window.addEventListener("load", onLoad);
      }
    })();

    const identifyUser = async () => {
      try {
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

  return null;
}
