export default function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-left">          <div className="footer-logo-section">
            <a href="#" className="footer-logo">
              MAO<span>WA</span>.ME
            </a>
          </div>
          <div className="footer-left-bottom">
            <div className="footer-contact-column">
              <h3 className="footer-title">Contact Us</h3>
              <div className="footer-contact-info">
                <div className="footer-info-group">
                  <p className="footer-info-label">WhatsApp</p>
                  <a href="https://wa.me/01744641685" className="footer-info-value">01744641685</a>
                </div>
                <div className="footer-info-group">
                  <p className="footer-info-label">Email</p>
                  <a className="footer-info-value">jannatulmaowa.me@gmail.com</a>
                </div>
              </div>
            </div>
            <div className="footer-address-column">
              <div className="footer-info-group">
                <p className="footer-info-label">Address</p>
                <p className="footer-info-value">Dhaka, Bangladesh · Available Worldwide</p>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-right">
          <div className="footer-section">
            <p className="footer-section-title">Follow Us</p>
            <div className="footer-socials">
              <a href="https://www.youtube.com/@maowa2.0" className="footer-social">
                <img src="/youtube.png" alt="YouTube" />
              </a>
              <a href="https://www.instagram.com/meaw_maowa" className="footer-social">
                <img src="/instagram.png" alt="Instagram" />
              </a>
              <a href="https://www.facebook.com/jannatulmaowa.nila" className="footer-social">
                <img src="/facebook.png" alt="Facebook" />
              </a>
              <div className="footer-social">
                <img src="/linkedin.png" alt="LinkedIn" />
              </div>
            </div>
          </div>
          <p className="footer-copy">© 2026 MAOWA.Me · Jannatul Maowa Runa · All Rights Reserved</p>
        </div>
      </div>

      <div className="footer-bottom">
      </div>
    </footer>
  )
}
