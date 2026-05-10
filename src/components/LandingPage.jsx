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
          <div className="hero-badges">
            <span className="badge-beta">Beta</span>
          </div>
          <h1 className="title">Drawr</h1>
          <p className="tagline">
            Your MacBook Notch, Supercharged.
          </p>

          {/* Notch preview */}
          <div className="notch-preview">
            <div className="notch-pill-wrap">
              <div className="notch-pill-shape"></div>
              <div className="notch-glow"></div>
            </div>
            <div className="notch-panel">
              <div className="nrow">
                <span className="nrow-icon">💬</span>
                <span className="nrow-label">Slack</span>
                <span className="nrow-value accent">🎧 In a meeting</span>
              </div>
              <div className="ndivider"></div>
              <div className="nrow">
                <span className="nrow-icon">📅</span>
                <span className="nrow-label">Next meeting</span>
                <span className="nrow-value">Design Review <span className="nrow-join">Join →</span></span>
              </div>
              <div className="ndivider"></div>
              <div className="nrow">
                <span className="nrow-icon">📈</span>
                <span className="nrow-label">AAPL</span>
                <span className="nrow-value">$213.40 <span className="nrow-up">+1.2%</span></span>
              </div>
              <div className="ndivider"></div>
              <div className="nrow">
                <span className="nrow-icon">🏏</span>
                <span className="nrow-label">IND vs AUS</span>
                <span className="nrow-value muted">287 / 4 · 42.3 ov</span>
              </div>
            </div>
          </div>
          <p className="preview-caption">↑ one hover. everything's already there.</p>
        </section>

        <section className="block">
          <p className="hi">one hover. everything you need.</p>
          <p>
            Drawr lives exactly where the notch is. One hover — or a single keystroke — and your command centre drops down: Slack status, today's meetings, live sports scores, your stock watchlist. When you're done, it vanishes just as fast.
          </p>
        </section>

        <section className="block">
          <h2>What's inside</h2>
          <ul className="features">
            <li>💬 <b>Slack Status</b> — set your status from saved presets or type a custom one. Toggle Do Not Disturb instantly. Everything syncs the moment you tap.</li>
            <li>📅 <b>Meetings & Google Calendar</b> — see upcoming events with one-tap Join buttons for Google Meet. Get a notification before it starts so you're never late.</li>
            <li>🏏 <b>Live Sports Scores</b> — cricket and football, live. Get notified on wickets, boundaries, and goals. Pin the match you care about most.</li>
            <li>📈 <b>Stock Watchlist</b> — track any stock globally with live price, day change, currency symbol, and an intraday sparkline. Tap to open the full chart.</li>
            <li>🔔 <b>Notch Notifications</b> — Slack messages, stock moves, match events. They slide out of the notch as elegant cards — no notification centre clutter.</li>
            <li>⌨️ <b>Global Shortcut</b> — open Drawr from anywhere with ⌘⇧R (fully customisable). Works system-wide, even when another app is in focus.</li>
          </ul>
        </section>

        <section className="block">
          <h2>Setup in seconds</h2>
          <ol className="steps">
            <li><b>Download & open Drawr</b> — a guided onboarding walks you through everything from the notch itself. No config screens.</li>
            <li><b>Connect Slack & Google Calendar</b> — standard OAuth, one click each. Both are optional; use only what you need.</li>
            <li><b>Hover the notch.</b> Your command centre is ready. Everything else — scores, stocks, shortcuts — is one settings tap away.</li>
          </ol>
        </section>

        <section className="cta">
          <a href="/download/dmg" className="buy">
            Download Drawr
          </a>
          <p className="download-count">⬇ 7 downloads so far</p>
          <p className="reqs">macOS 13+ · MacBook Pro 2021 or later · MacBook Air M2 or later</p>
        </section>

        <section className="newsletter">
          <p className="news-kicker">stay in the loop</p>
          <h2>Get notified about updates</h2>
          <p className="news-sub">
            No spam, ever. Just new features and the occasional release note.
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
          <p className="caveat">made with care by developers who actually use what they build.</p>
          <p>— the Drawr team</p>
        </section>
      </main>

      <footer className="foot">
        <div className="foot-row">
          <a href="mailto:hello@drawr.com">hello@drawr.com</a>
          <span>·</span>
          <a href="/privacy">Privacy</a>
          <span>·</span>
          <a href="/terms">Terms</a>
        </div>
        <p className="foot-credit">Built by devs who hate bad tools.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
