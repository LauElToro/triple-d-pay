import { useEffect, useRef, useState } from "react";

const CLIENT_ID = (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined)?.trim() || "";

/** True when Google Sign-In is configured (optional feature). */
export function isGoogleSignInEnabled(): boolean {
  return CLIENT_ID.length > 0;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: {
            client_id: string;
            callback: (res: { credential: string }) => void;
          }) => void;
          renderButton: (el: HTMLElement, opts: Record<string, unknown>) => void;
        };
      };
    };
  }
}

function GoogleOriginHint() {
  const [origin, setOrigin] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  if (!import.meta.env.DEV || !origin) return null;

  return (
    <p className="mt-2 text-center text-[10px] leading-relaxed text-slate font-mono px-2">
      Google Cloud → Credentials → OAuth client →{" "}
      <span className="text-ink">Orígenes de JavaScript</span>:{" "}
      <code className="text-signal">{origin}</code>
    </p>
  );
}

/**
 * Google Identity Services button. Renders nothing when VITE_GOOGLE_CLIENT_ID is unset
 * so email/password auth works without extra setup.
 */
export function GoogleButton({ onCredential }: { onCredential: (credential: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isGoogleSignInEnabled()) return;

    const scriptId = "google-gsi";
    const init = () => {
      if (!window.google || !ref.current) return;
      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (res) => onCredential(res.credential),
      });
      window.google.accounts.id.renderButton(ref.current, {
        theme: "outline",
        size: "large",
        width: 360,
        text: "continue_with",
        locale: "es",
      });
    };

    if (document.getElementById(scriptId)) {
      init();
      return;
    }
    const script = document.createElement("script");
    script.id = scriptId;
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.onload = init;
    document.body.appendChild(script);
  }, [onCredential]);

  if (!isGoogleSignInEnabled()) return null;

  return (
    <div>
      <div ref={ref} className="flex justify-center" />
      <GoogleOriginHint />
    </div>
  );
}
