import { useState } from 'react';

const BUTTONDOWN_USERNAME = 'prajjwal';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');
    setErrorMsg('');

    try {
      const response = await fetch(
        `https://buttondown.email/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({ email }).toString(),
        }
      );

      if (response.ok) {
        setStatus('success');
        setEmail('');
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        const data = await response.json().catch(() => ({}));
        setStatus('error');
        setErrorMsg(data.detail || 'Something went wrong. Please try again.');
        setTimeout(() => setStatus('idle'), 4000);
      }
    } catch (error) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
      setTimeout(() => setStatus('idle'), 4000);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="newsletter-title">Get notified</h3>
          <p className="newsletter-description">
            Rare but never boring updates about new apps & features.
          </p>
        </div>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              required
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={status === 'success' ? 'success' : status === 'error' ? 'error' : ''}
            >
              {status === 'loading' && <span className="spinner"></span>}
              {status === 'idle' && 'Subscribe'}
              {status === 'loading' && 'Joining...'}
              {status === 'success' && "You're in!"}
              {status === 'error' && 'Try again'}
            </button>
          </div>
          {status === 'success' && (
            <p className="success-message">Smart move. Check your inbox to confirm.</p>
          )}
          {status === 'error' && (
            <p className="error-message">{errorMsg}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default Newsletter;
