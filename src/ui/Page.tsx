export interface Block {
  label: string
  title: string
  body: string
  note?: string
}

export interface PageData {
  code: string
  eyebrow: string
  title: string
  jp: string
  lede: string
  classification: string
  blocks: Block[]
  index?: { k: string; v: string }[]
}

// Shared editorial shell for every division page. One system, distinct content.
// Scroll position on navigation is handled by <ScrollRestoration> in root.tsx.
export function Page({ data }: { data: PageData }) {
  return (
    <main className="page">
      <div className="page__bar wrap mono">
        <span>{data.code}</span>
        <span className="classif">{data.classification}</span>
        <span>アラサカ社 · Secure Division</span>
      </div>

      <header className="page__head wrap">
        <p className="eyebrow">{data.eyebrow}</p>
        <h1 className="page__title display">{data.title}</h1>
        <p className="page__jp jp">{data.jp}</p>
        <p className="lede page__lede">{data.lede}</p>
      </header>

      {data.index && (
        <section className="wrap page__index">
          {data.index.map((it) => (
            <div key={it.k} className="page__stat">
              <div className="page__stat-v display">{it.v}</div>
              <div className="mono">{it.k}</div>
            </div>
          ))}
        </section>
      )}

      <section className="wrap page__blocks">
        {data.blocks.map((b, i) => (
          <article key={i} className="block">
            <div className="block__meta">
              <span className="mono block__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="mono">{b.label}</span>
            </div>
            <div className="block__body">
              <h2 className="block__title display">{b.title}</h2>
              <p className="lede">{b.body}</p>
              {b.note && <p className="block__note mono">{b.note}</p>}
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
