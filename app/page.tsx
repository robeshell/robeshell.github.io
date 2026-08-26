const writings = [
  { type: '思考', date: '08.18', title: '我们为什么总想把生活整理成一个系统', excerpt: '秩序给人安全感，但真正重要的经历，往往发生在计划之外。' },
  { type: '笔记', date: '08.07', title: '关于个人知识系统的几条阶段性结论', excerpt: '记录不是收藏。一个系统的价值，在于它是否会重新进入生活。' },
  { type: '随笔', date: '07.29', title: '慢一点，也是一种具体的选择', excerpt: '最近开始重新理解“效率”这个词，以及那些无法被量化的时间。' },
];

const notes = [
  ['人工智能', 'Agent 的记忆与上下文', '12 条笔记'],
  ['产品设计', '界面如何表达结构', '8 条笔记'],
  ['阅读与写作', '如何形成自己的问题', '17 条笔记'],
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main-content">跳到主要内容</a>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="返回首页顶部">W.</a>
        <nav aria-label="主导航">
          <a href="#writing">写作</a><a href="#notes">笔记</a><a href="#journey">游历</a><a href="#images">影像</a><a href="#sound">声音</a>
        </nav>
        <a className="about-link" href="#about">关于</a>
      </header>

      <main id="main-content">

      <section className="hero page-shell" id="top">
        <p className="eyebrow">一处缓慢生长的私人角落</p>
        <h1>记录我正在关注、<br />经历与逐渐想明白的事。</h1>
        <div className="hero-foot">
          <p>写作、学习、旅行、照片和声音。<br />这里不追赶信息，只留下值得记住的部分。</p>
          <span>上海 · 2026 年夏</span>
        </div>
      </section>

      <section className="writing page-shell section-block" id="writing">
        <div className="section-heading">
          <p className="section-index">01</p>
          <div><p className="eyebrow">最近写下</p><h2>思考与文章</h2></div>
          <a className="section-link" href="#writing">全部写作 <span>↗</span></a>
        </div>
        <div className="writing-list">
          {writings.map((item) => (
            <article className="writing-item" key={item.title}>
              <div className="writing-meta"><span>{item.type}</span><time>{item.date}</time></div>
              <div><h3>{item.title}</h3><p>{item.excerpt}</p></div>
              <span className="arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>
      </section>

      <section className="journey-section" id="journey">
        <div className="journey-image" role="img" aria-label="福建泉州古城屋顶与远山的旅行影像">
          <div className="sun" /><div className="mountain mountain-back" /><div className="mountain mountain-front" />
          <div className="rooftop roof-one" /><div className="rooftop roof-two" />
          <div className="journey-caption">24°54′N · 118°35′E</div>
        </div>
        <div className="journey-copy">
          <p className="section-index">02 / 游历</p><p className="eyebrow">福建 · 泉州</p>
          <h2>在海风抵达之前，<br />先经过一座旧城。</h2>
          <p className="journey-text">清晨从西街出发，屋檐还留着昨夜的雨。这里的时间没有停下，只是走得比别处更像时间本身。</p>
          <a className="text-link" href="#journey">阅读这篇游记 <span>→</span></a>
        </div>
      </section>

      <section className="notes page-shell section-block" id="notes">
        <div className="section-heading compact">
          <p className="section-index">03</p><div><p className="eyebrow">正在学习</p><h2>持续整理的笔记</h2></div>
        </div>
        <div className="note-grid">
          {notes.map(([category, title, count], index) => (
            <article className="note-card" key={title}>
              <div className="note-number">0{index + 1}</div><p>{category}</p><h3>{title}</h3><span>{count} · 最近更新于 8 月</span>
            </article>
          ))}
        </div>
      </section>

      <section className="images page-shell section-block" id="images">
        <div className="section-heading compact">
          <p className="section-index">04</p><div><p className="eyebrow">一些近照</p><h2>光线经过的地方</h2></div>
        </div>
        <div className="photo-grid" aria-label="近期照片集">
          <figure className="photo photo-tall photo-red"><div className="photo-shape window" /><figcaption>泉州，雨后的窗</figcaption></figure>
          <figure className="photo photo-wide photo-blue"><div className="photo-shape horizon" /><figcaption>东山岛，18:42</figcaption></figure>
          <figure className="photo photo-square photo-green"><div className="photo-shape leaves" /><figcaption>夏天的第三场雨</figcaption></figure>
        </div>
      </section>

      <section className="sound-section" id="sound">
        <div className="sound-inner page-shell">
          <div className="record" aria-hidden="true"><div className="record-label">A</div></div>
          <div className="sound-copy">
            <p className="section-index">05 / 声音</p><p className="eyebrow">最近循环</p><h2>async</h2><p className="artist">坂本龙一 · 2017</p>
            <blockquote>“像在一间空房子里，听见时间移动家具的声音。”</blockquote>
            <p className="listening-note"><span aria-hidden="true">♪</span> 完整音乐页将在下一阶段接入</p>
          </div>
        </div>
      </section>

      <footer className="site-footer page-shell" id="about">
        <div><p className="eyebrow">关于这里</p><p className="footer-statement">保持好奇，认真生活，<br />偶尔把经过写下来。</p></div>
        <div className="footer-meta"><p>© 2026 W.</p><p>最后更新于 8 月 26 日</p></div>
      </footer>
      </main>
    </>
  );
}
