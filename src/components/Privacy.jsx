function Privacy() {
  return (
    <div className="page">
      <main className="wrap policy-wrap">
        <a href="/" className="policy-back">← Back</a>
        <h1 className="policy-title">Privacy Policy</h1>
        <p className="policy-date">Last updated: May 2026</p>

        <section className="policy-section">
          <p>
            Drawr is built on a simple principle: your data stays on your Mac. We don't run servers that collect, store, or process anything about you.
          </p>
        </section>

        <section className="policy-section">
          <h2>What we collect</h2>
          <p>Nothing. Drawr doesn't phone home. There are no analytics, no crash reporters, no telemetry, no usage tracking. We genuinely have no idea how often you use Drawr, and that's exactly how we want it.</p>
        </section>

        <section className="policy-section">
          <h2>Slack & Google Calendar</h2>
          <p>
            When you connect Slack or Google Calendar, Drawr talks directly to their APIs from your Mac using standard OAuth. Your tokens are stored locally in the macOS Keychain — not on our servers, because we don't have any. We never see your Slack messages, calendar events, or credentials.
          </p>
          <p>
            What you share with Slack and Google is governed by their own privacy policies. We're just the messenger.
          </p>
        </section>

        <section className="policy-section">
          <h2>Sports & Stocks</h2>
          <p>
            Live scores and stock data are fetched directly from public market and sports data APIs. No personal information is sent with those requests — it's the same as opening a website in your browser.
          </p>
        </section>

        <section className="policy-section">
          <h2>Local storage</h2>
          <p>
            Your presets, watchlists, pinned matches, and settings live on your device. Uninstalling Drawr removes all of it. We have no backup of your data because we never had it.
          </p>
        </section>

        <section className="policy-section">
          <h2>Contact</h2>
          <p>Questions? <a href="mailto:hello@drawr.com">hello@drawr.com</a></p>
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

export default Privacy;
