import { useState } from 'react';

function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle, loading, success, error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setStatus('loading');

    // Simulate subscription (replace with actual API call)
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <div className="newsletter-icon">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
            </svg>
          </div>
          <h3 className="newsletter-title">Stay in the Loop</h3>
          <p className="newsletter-description">
            Get notified when we release new apps and updates. No spam, just the good stuff.
          </p>
        </div>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'loading' || status === 'success'}
              required
            />
            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className={status === 'success' ? 'success' : ''}
            >
              {status === 'loading' && (
                <span className="spinner"></span>
              )}
              {status === 'success' && (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="currentColor"/>
                </svg>
              )}
              {status === 'idle' && 'Subscribe'}
              {status === 'loading' && 'Subscribing...'}
              {status === 'success' && 'Subscribed!'}
            </button>
          </div>
          {status === 'success' && (
            <p className="success-message">Thanks for subscribing! Check your inbox soon.</p>
          )}
        </form>
      </div>

      <div className="newsletter-decoration">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>
    </section>
  );
}

export default Newsletter;
