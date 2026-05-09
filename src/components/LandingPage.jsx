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
          <h1 className="title">Drawr</h1>
          <p className="tagline">
            Your MacBook Notch, Supercharged.
          </p>

          {/* Notch preview */}
          <div className="notch-preview">
            {/* MacBook top bar with notch */}
            <div className="mac-topbar">
              <div className="mac-topbar-left">
                <span className="mac-apple">⊹</span>
                <span className="mac-menu-item">Finder</span>
                <span className="mac-menu-item">File</span>
                <span className="mac-menu-item">Edit</span>
              </div>
              <div className="mac-notch">
                <div className="mac-notch-inner"></div>
              </div>
              <div className="mac-topbar-right">
                <span className="mac-status-item">🎧 In a meeting</span>
                <span className="mac-status-item muted">9:41 AM</span>
              </div>
            </div>
            {/* Drawr panel dropping from notch */}
            <div className="notch-panel">
              <div className="notch-tabs">
                <span className="ntab active">💬 Slack</span>
                <span className="ntab">📅 Calendar</span>
                <span className="ntab">🏏 Scores</span>
                <span className="ntab">📈 Stocks</span>
              </div>
              <div className="notch-cards">
                <div className="ncard status-card">
                  <span className="ncard-label">Current status</span>
                  <span className="ncard-value">🎧 In a meeting</span>
                  <div className="ncard-actions">
                    <span className="nbadge">Focus mode</span>
                    <span className="nbadge">Lunch break</span>
                    <span className="nbadge dnd">DND</span>
                  </div>
                </div>
                <div className="ncard meet-card">
                  <span className="ncard-label">Next · in 4 min</span>
                  <span className="ncard-value small">Design Review</span>
                  <span className="njoin">Join Meet →</span>
                </div>
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
          <a href="#">Privacy</a>
          <span>·</span>
          <a href="#">Terms</a>
        </div>
        <p className="foot-credit">Built by devs who hate bad tools.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
