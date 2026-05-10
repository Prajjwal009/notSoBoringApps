function Terms() {
  return (
    <div className="page">
      <main className="wrap policy-wrap">
        <a href="/" className="policy-back">← Back</a>
        <h1 className="policy-title">Terms of Use</h1>
        <p className="policy-date">Last updated: May 2026</p>

        <section className="policy-section">
          <p>
            Drawr is a macOS app. By downloading and using it, you agree to these terms. They're short — we're developers, not lawyers.
          </p>
        </section>

        <section className="policy-section">
          <h2>Use it for what it's for</h2>
          <p>
            Drawr is for personal use on your Mac. Don't reverse-engineer it, redistribute it, or do anything that would make a reasonable person raise an eyebrow.
          </p>
        </section>

        <section className="policy-section">
          <h2>Updates</h2>
          <p>
            We ship updates when things break or when we build something worth shipping. There's no guarantee of a specific update schedule, but we use Drawr ourselves every day — so broken things get fixed fast.
          </p>
        </section>

        <section className="policy-section">
          <h2>Third-party services</h2>
          <p>
            Drawr connects to Slack, Google Calendar, and data APIs on your behalf. Their availability and terms are outside our control. If Slack is down, Drawr's Slack features are down. That's just the internet.
          </p>
        </section>

        <section className="policy-section">
          <h2>Contact</h2>
          <p>Something not right? <a href="mailto:hello@drawr.com">hello@drawr.com</a></p>
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

export default Terms;
