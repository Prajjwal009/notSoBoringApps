function LandingPage() {
  return (
    <div className="page">
      <main className="wrap">
        <section className="hero">
          <h1 className="title">PointBar</h1>
          <p className="tagline">
            A tiny points tracker that lives in your Mac's menu bar.
          </p>
          <div className="preview">
            <div className="menubar">
              <div className="menubar-left">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="menubar-right">
                <span className="bar-icon">★ 1,240</span>
                <span className="bar-time">9:41</span>
              </div>
            </div>
            <p className="preview-caption">↑ that little ★ 1,240 — that's PointBar.</p>
          </div>
        </section>

        <section className="block">
          <p className="hi">hey, i made something.</p>
          <p>
            i'm a solo developer who got tired of bloated habit apps and big
            dashboards. i wanted something that just sits there, quietly counting
            the things that matter to me. no signup. no streak shaming. no charts
            i never look at.
          </p>
          <p>so i built PointBar.</p>
        </section>

        <section className="block">
          <h2>what it does</h2>
          <ul className="features">
            <li>🎯 <b>Track points</b> for anything — workouts, focus sessions, glasses of water, kind things you did.</li>
            <li>⚡ <b>One-click logging</b> straight from the menu bar. No window. No friction.</li>
            <li>🔥 <b>Streaks &amp; daily goals</b> that don't yell at you when you miss a day.</li>
            <li>🎨 <b>Custom categories</b> with emojis, colors, and your own point values.</li>
            <li>⌨️ <b>Global hotkeys</b> so you can score a point without ever touching the mouse.</li>
            <li>📊 <b>A gentle history</b> — see your week at a glance, then close it and live your life.</li>
          </ul>
        </section>

        <section className="block">
          <h2>$10 feels fair</h2>
          <p>
            i spent a few months on this. it's a small app, but it does its one
            job well, and i'd like to keep working on it.
          </p>
          <p>
            no subscriptions. no accounts. no telemetry. just the app, on your
            Mac, forever. one-time payment, lifetime updates for v1.
          </p>
        </section>

        <section className="cta">
          <a href="/download/pointbar-1.0.0.dmg" className="buy" download>
            Download for $10
          </a>
          <p className="reqs">macOS 12+ required (Apple Silicon &amp; Intel)</p>
        </section>

        <section className="block signoff">
          <p className="caveat">made with care, in a small apartment.</p>
          <p>
            if PointBar makes you smile (or score a few extra points today), tell
            a friend. that's how tiny apps survive.
          </p>
          <p>— Prajjwal</p>
        </section>
      </main>

      <footer className="foot">
        <div className="foot-row">
          <a href="mailto:hello@pointbar.app">hello@pointbar.app</a>
          <span>·</span>
          <a href="#">Privacy</a>
          <span>·</span>
          <a href="#">Terms</a>
        </div>
        <p className="foot-credit">Made with care by Prajjwal.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
