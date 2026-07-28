export function CodeBlock({ code, comment }: { code: string; comment?: string }) {
  return (
    <div className="rounded-md border border-line bg-code p-6 font-mono text-sm text-code-fg overflow-x-auto">
      {comment && <div className="text-code-muted mb-2">{comment}</div>}
      <pre className="whitespace-pre text-code-fg">{code}</pre>
    </div>
  );
}
