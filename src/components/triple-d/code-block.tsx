export function CodeBlock({ code, comment }: { code: string; comment?: string }) {
  return (
    <div className="bg-ink text-paper rounded-md p-6 font-mono text-sm overflow-x-auto">
      {comment && <div className="text-slate mb-2">{comment}</div>}
      <pre className="whitespace-pre">{code}</pre>
    </div>
  );
}
