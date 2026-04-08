import { useState } from 'react';

function LandingPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    setErrorMsg('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

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

        <section className="newsletter">
          <p className="news-kicker">stay in the loop</p>
          <h2>Get notified about updates</h2>
          <p className="news-sub">
            Rare but never boring emails — new features, tiny apps, and the
            occasional behind-the-scenes note. No spam, ever.
          </p>

          {status === 'success' ? (
            <div className="news-success">
              <div className="check">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 12.5L10.5 16L17 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="news-success-title">you're in!</p>
              <p className="news-success-sub">check your inbox to confirm.</p>
            </div>
          ) : (
            <form className="news-form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === 'loading'}
                required
              />
              <button type="submit" disabled={status === 'loading'} className={status === 'error' ? 'err' : ''}>
                {status === 'loading' && <span className="spinner"></span>}
                {status === 'idle' && 'Subscribe'}
                {status === 'loading' && 'Joining...'}
                {status === 'error' && 'Try again'}
              </button>
            </form>
          )}
          {status === 'error' && <p className="news-error">{errorMsg}</p>}
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
