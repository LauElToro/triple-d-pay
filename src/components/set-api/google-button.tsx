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
    const current = window.location.origin;
    setOrigin(current);
    console.info(
      "[Set-Api] Google Sign-In: registrá este origen en Google Cloud → Credentials → Orígenes de JavaScript:",
      current,
    );
  }, []);

  if (!import.meta.env.DEV || !origin) return null;

  return (
    <div className="mt-3 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-left">
      <p className="text-[11px] font-medium text-amber-900">
        Si Google falla con &quot;no registered origin&quot;, agregá estos orígenes en Google Cloud:
      </p>
      <ul className="mt-1 space-y-0.5 text-[10px] font-mono text-amber-950">
        <li>
          <code>{origin}</code> ← origen actual
        </li>
        <li>
          <code>http://localhost:3000</code>
        </li>
        <li>
          <code>http://127.0.0.1:3000</code>
        </li>
      </ul>
    </div>
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
