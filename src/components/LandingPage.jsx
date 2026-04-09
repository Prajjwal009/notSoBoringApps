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
          <h1 className="title">SlackStatus</h1>
          <p className="tagline">
            Your meetings deserve a status. Your status deserves to be automatic.
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
            <p className="preview-caption">↑ that's SlackStatus, quietly doing its job.</p>
          </div>
        </section>

        <section className="block">
          <p className="hi">hey, we made something.</p>
          <p>
            SlackStatus is a lightweight macOS menu bar app that keeps your Slack
            presence honest — without you having to think about it. It connects
            your calendar, your meetings, and your Slack profile so your teammates
            always know when you're heads-down, in a call, or back at your desk.
          </p>
          <p>
            No more switching tabs, opening Slack, clicking your avatar, hunting
            for the status menu, picking an emoji, typing a message, setting a
            timer, and getting back to work. One click. Done.
          </p>
        </section>

        <section className="block">
          <h2>What it does</h2>
          <ul className="features">
            <li>⚡ <b>One-click status presets</b> — "In a meeting", "Lunch break", "Focus mode", "Working remotely", and your own custom presets, all reachable from the menu bar.</li>
            <li>✏️ <b>Custom status editor</b> — pick any emoji, write any message, set an auto-clear timer, push it live in seconds.</li>
            <li>🔕 <b>Do Not Disturb toggle</b> — flip Slack DND on or off without leaving what you're doing.</li>
            <li>📅 <b>Calendar-aware meetings</b> — connect Google Calendar or macOS Calendar and SlackStatus surfaces every upcoming meeting with a Google Meet link.</li>
            <li>🎯 <b>One-click join</b> — every meeting has a "Join" button that opens Meet and sets your status to "In a meeting" automatically, with the timer matched to the meeting's end.</li>
            <li>📞 <b>Instant Meet</b> — start a fresh Google Meet call from the menu bar; your Slack status updates the moment you do.</li>
            <li>🌙 <b>Notch-aware notifications</b> — on MacBooks with the camera notch, alerts drop down from behind it with a beautifully animated card that matches the hardware curve.</li>
            <li>🎛️ <b>Quick action menu</b> — a second menu bar item opens a notch-style dropdown with your most-used presets and meeting controls in one glanceable surface.</li>
          </ul>
        </section>

        <section className="block">
          <h2>Who it's for</h2>
          <p>
            SlackStatus is built for the people whose calendars and Slack are
            constantly out of sync — and the teammates who suffer for it.
          </p>
          <ul className="features">
            <li>👩‍💻 <b>Engineers and designers</b> in deep-focus work who need to signal "don't ping me" without breaking flow.</li>
            <li>📊 <b>Managers</b> bouncing between back-to-back meetings who can't keep updating their status manually.</li>
            <li>🌍 <b>Remote workers</b> whose teams rely on Slack presence as the primary signal of availability.</li>
            <li>💬 Anyone who has ever had a colleague Slack them mid-call asking "are you free?" because their status said they were.</li>
          </ul>
        </section>

        <section className="block">
          <h2>How it helps</h2>
          <p>
            <b>It removes friction.</b> Updating your Slack status is the kind of
            small task that's easy enough to do but annoying enough to skip.
            SlackStatus collapses six clicks into one — and most of the time,
            zero, because it does it for you when a meeting starts.
          </p>
          <p>
            <b>It keeps your team in sync.</b> When your status reflects reality,
            your teammates stop interrupting you during deep work, stop pinging
            you during meetings, and stop wondering whether you saw their message.
            Better signals mean fewer wasted messages.
          </p>
          <p>
            <b>It respects your focus.</b> Everything happens from the menu bar.
            No tab-switching, no context loss, no Slack web client open in the
            background eating RAM. The app stays out of your way until you need it.
          </p>
          <p>
            <b>It's calendar-native.</b> SlackStatus pulls upcoming meetings from
            both Google Calendar and macOS Calendar, deduplicates them, and
            surfaces only the ones with actual Meet links — so what you see is
            what you'll actually join.
          </p>
        </section>

        <section className="block">
          <h2>What makes it different</h2>
          <p>
            Most "Slack status" tools are either browser extensions that break
            every Chrome update, or heavyweight automation platforms that need a
            Zap, a webhook, and a prayer to fire correctly. SlackStatus is a
            native macOS app:
          </p>
          <ul className="features">
            <li>🍎 <b>Native menu bar integration</b> — instant launch, low memory footprint, no Electron.</li>
            <li>⚙️ <b>Designed for Apple Silicon</b> — built for macOS 14+ with SwiftUI.</li>
            <li>🌗 <b>Notch-matching UI</b> — drop-down notifications and menus that visually emerge from the MacBook notch with proper concave curves, not floating rectangles slapped on top of your screen.</li>
            <li>🔒 <b>Privacy first</b> — the app talks directly to Slack and Google APIs from your Mac. No middleman server, no analytics, no telemetry, no account required beyond the OAuth handshakes you already trust.</li>
            <li>💾 <b>Local-first storage</b> — your presets and tokens live on your machine, not in someone's database.</li>
          </ul>
        </section>

        <section className="block">
          <h2>How it works</h2>
          <ol className="steps">
            <li><b>Sign in to Slack</b> with one click — standard OAuth, the same flow you use for any Slack integration.</li>
            <li><b>Connect Google Calendar</b> (optional) for richer meeting data, or just let macOS Calendar do the work.</li>
            <li><b>Use it.</b> The menu bar icon shows your current status. Click it to change it, set DND, see upcoming meetings, or start a new Meet. Or do nothing — when a calendar meeting starts, SlackStatus is ready with a one-tap "Join" that updates everything.</li>
          </ol>
        </section>

        <section className="cta">
          <a href="/download/dmg" className="buy">
            Download SlackStatus
          </a>
          <p className="reqs">macOS 14+ required · Apple Silicon &amp; Intel</p>
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
          <p className="caveat">made with care, by a small team that ships small things.</p>
          <p>
            if SlackStatus saves you from one mid-meeting "you free?" ping, tell
            a teammate. that's how tiny apps survive.
          </p>
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
