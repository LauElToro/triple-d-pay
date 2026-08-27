import type { LegalDoc } from "@/content/legal";

export function LegalDocument({ doc }: { doc: LegalDoc }) {
  return (
    <article className="mx-auto max-w-3xl px-6 py-16 space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-display font-bold">{doc.title}</h1>
        <p className="text-sm font-mono text-slate">{doc.updated}</p>
        <p className="text-slate leading-relaxed pt-2">{doc.intro}</p>
      </header>
      {doc.sections.map((section) => (
        <section key={section.heading} className="space-y-3">
          <h2 className="text-xl font-display font-semibold">{section.heading}</h2>
          {section.paragraphs?.map((p, i) => (
            <p key={`${section.heading}-p-${i}`} className="text-sm text-slate leading-relaxed">
              {p}
            </p>
          ))}
          {section.bullets && section.bullets.length > 0 && (
            <ul className="list-disc pl-5 space-y-2 text-sm text-slate leading-relaxed">
              {section.bullets.map((b, i) => (
                <li key={`${section.heading}-b-${i}`}>{b}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </article>
  );
}
