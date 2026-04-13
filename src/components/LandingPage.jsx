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
          <h1 className="title">Point Bar</h1>
          <p className="tagline">
            Your Slack status, on autopilot.
          </p>
          <div className="preview">
            <div className="menubar">
              <div className="menubar-left">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="menubar-right">
                <span className="bar-icon">🎧 In a meeting</span>
                <span className="bar-time">9:41</span>
              </div>
            </div>
            <p className="preview-caption">↑ that's Point Bar, quietly doing its job.</p>
          </div>
        </section>

        <section className="block">
          <p className="hi">A tiny macOS menu bar app that keeps your Slack presence honest.</p>
          <p>
            Set your Slack status in one click, get notified about meetings, and join Google Meet calls — all without leaving what you're doing.
          </p>
        </section>

        <section className="block">
          <h2>What it does</h2>
          <ul className="features">
            <li>⚡ <b>One-click status presets</b> — set "In a meeting", "Focus mode", "Lunch break", or your own custom status from the menu bar.</li>
            <li>🔕 <b>Do Not Disturb</b> — toggle Slack DND instantly without opening Slack.</li>
            <li>📅 <b>Meeting notifications</b> — get notified before meetings start, with a one-click "Join" that opens Google Meet and updates your status automatically.</li>
            <li>📞 <b>Start a Meet</b> — launch a fresh Google Meet from the menu bar; your status updates the moment you do.</li>
            <li>🔒 <b>Privacy first</b> — talks directly to Slack and Google APIs from your Mac. No server, no telemetry.</li>
          </ul>
        </section>

        <section className="block">
          <h2>How it works</h2>
          <ol className="steps">
            <li><b>Sign in to Slack</b> — standard OAuth, one click.</li>
            <li><b>Connect Google Calendar</b> (optional) — for meeting notifications and Meet links.</li>
            <li><b>Use it.</b> Click the menu bar icon to set your status, toggle DND, or join a meeting.</li>
          </ol>
        </section>

        <section className="cta">
          <a href="/download/dmg" className="buy">
            Download Point Bar
          </a>
          <p className="reqs">macOS 14+ required · Apple Silicon &amp; Intel</p>
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
          <p className="caveat">made with care, by a small team that ships small things.</p>
          <p>— the notSoBoringApps team</p>
        </section>
      </main>

      <footer className="foot">
        <div className="foot-row">
          <a href="mailto:hello@notsoboringapps.com">hello@notsoboringapps.com</a>
          <span>·</span>
          <a href="#">Privacy</a>
          <span>·</span>
          <a href="#">Terms</a>
        </div>
        <p className="foot-credit">Made by us at notSoBoringApps.</p>
      </footer>
    </div>
  );
}

export default LandingPage;
