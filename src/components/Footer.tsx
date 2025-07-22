import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const ctaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const observerCallback = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    };
cd
    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    });

    const { current: currentCta } = ctaRef;
    const { current: currentContent } = contentRef;

    if (currentCta) {
      observer.observe(currentCta);
    }
    if (currentContent) {
      observer.observe(currentContent);
    }

    return () => {
      if (currentCta) {
        observer.unobserve(currentCta);
      }
      if (currentContent) {
        observer.unobserve(currentContent);
      }
    };
  }, []);

  return (
    <footer id="main-footer">
      {/* Call-to-Action Strip */}
      <div className="footer-cta-strip" ref={ctaRef}>
        <h2>Ready to Begin Your Journey to Well-being?</h2>
        <p>Schedule a session with our experienced counselor and take the first step towards a healthier, happier you.</p>
        <Link to="/booking" className="btn btn-primary">Book Your Session Now</Link>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content" ref={contentRef}>
        <div className="footer-content-columns">
          {/* Column 1: About */}
          <div className="footer-col footer-col-about">
            <div className="logo-text">Intell Counselling</div>
            <p>Extending a compassionate hand to guide you through life's journey, offering a spectrum of transformative services.</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <Facebook size={28} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <Youtube size={28} />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col footer-col-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/booking">Book a Session</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col footer-col-contact">
            <h3>Contact Information</h3>
            <ul>
              <li>Phone: +91 9488991905</li>
              <li>Email: intellcounselling@gmail.com</li>
              <li>Location: Plot No. 9, Omshakthi Street, Srinivasanagar, Ayappakkam, Chennai-600077</li>
            </ul>
          </div>
          
          {/* Column 4: Office Hours (Example - content not specified but included for structure) */}
          <div className="footer-col footer-col-hours">
              <h3>Availability</h3>
              <ul>
                  <li>Online Sessions: Monday to Friday : 10 AM – 4 PM</li>
                  <li>In-Person Sessions: Monday to Saturday : 5 PM – 8 PM</li>
                  <li>Sunday: <span style={{ color: '#ef4444', fontWeight: 'bold' }}>Closed</span></li>
              </ul>
          </div>

        </div>
      </div>

      {/* Bottom Copyright Bar */}
      <div className="footer-bottom-bar">
        <p>© 2025 Intell Counselling. All Rights Reserved.</p>
        <div className="legal-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
