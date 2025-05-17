import React, { useState, useEffect } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const RealEstateFooter = () => {
  // Animation state for the newsletter input
  const [inputFocus, setInputFocus] = useState(false);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Animation for the "Back to Top" button
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Main container styles
  const footerStyle = {
    backgroundColor: '#0a2540',
    color: '#ffffff',
    padding: '60px 20px 30px',
    fontFamily: "'Poppins', sans-serif",
    position: 'relative',
    overflow: 'hidden'
  };

  // Gradient overlay for visual appeal
  const gradientOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(135deg, rgba(10,37,64,0.8) 0%, rgba(32,101,135,0.6) 100%)',
    zIndex: 0
  };

  // Content container
  const containerStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '40px'
  };

  // Top section with columns
  const topSectionStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: '40px'
  };

  // Column styles
  const columnStyle = {
    flex: '1',
    minWidth: '250px'
  };

  // Logo and description
  const logoStyle = {
    fontSize: '28px',
    fontWeight: '700',
    color: '#00d4ff',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center'
  };

  const logoAccentStyle = {
    color: '#ffffff'
  };

  const descriptionStyle = {
    color: 'rgba(255,255,255,0.7)',
    lineHeight: '1.6',
    marginBottom: '20px'
  };

  // Section headings
  const headingStyle = {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '25px',
    position: 'relative',
    paddingBottom: '10px'
  };

  const headingAfterStyle = {
    content: '""',
    position: 'absolute',
    left: '0',
    bottom: '0',
    width: '50px',
    height: '3px',
    background: 'linear-gradient(90deg, #00d4ff, #0077ff)',
    borderRadius: '3px'
  };

  // Contact info items
  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px',
    color: 'rgba(255,255,255,0.7)',
    transition: 'all 0.3s ease'
  };

  const contactIconStyle = {
    marginRight: '15px',
    color: '#00d4ff',
    fontSize: '16px'
  };

  // Links
  const linkStyle = {
    display: 'block',
    color: 'rgba(255,255,255,0.7)',
    marginBottom: '12px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    padding: '5px 0',
    position: 'relative'
  };

  const linkHoverStyle = {
    color: '#00d4ff',
    transform: 'translateX(5px)'
  };

  // Social icons
  const socialIconsStyle = {
    display: 'flex',
    gap: '15px',
    marginTop: '25px'
  };

  const socialIconStyle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255,255,255,0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '16px',
    transition: 'all 0.3s ease',
    ':hover': {
      backgroundColor: '#00d4ff',
      transform: 'translateY(-3px)'
    }
  };

  // Newsletter
  const newsletterStyle = {
    marginTop: '20px'
  };

  const inputContainerStyle = {
    position: 'relative',
    marginBottom: '20px'
  };

  const inputStyle = {
    width: '90%',
    padding: '15px 20px',
    backgroundColor: 'rgba(255,255,255,0.1)',
    border: '1px solid rgba(255,255,255,0.2)',
    borderRadius: '5px',
    color: '#ffffff',
    fontSize: '14px',
    transition: 'all 0.3s ease',
    outline: 'none'
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#00d4ff',
    boxShadow: '0 0 0 2px rgba(0, 212, 255, 0.2)'
  };

  const buttonStyle = {
    padding: '15px 30px',
    backgroundColor: '#00d4ff',
    color: '#0a2540',
    border: 'none',
    borderRadius: '5px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    ':hover': {
      backgroundColor: '#0077ff',
      transform: 'translateY(-3px)',
      boxShadow: '0 10px 20px rgba(0, 119, 255, 0.2)'
    }
  };

  // Bottom section
  const bottomSectionStyle = {
    borderTop: '1px solid rgba(255,255,255,0.1)',
    paddingTop: '30px',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center'
  };

  const copyrightStyle = {
    color: 'rgba(255,255,255,0.5)',
    fontSize: '14px'
  };

  const legalLinksStyle = {
    display: 'flex',
    gap: '20px'
  };

  const legalLinkStyle = {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '14px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
    ':hover': {
      color: '#00d4ff'
    }
  };

  // Back to top button
  const backToTopStyle = {
    position: 'fixed',
    bottom: '30px',
    right: '30px',
    width: '50px',
    height: '50px',
    backgroundColor: '#00d4ff',
    color: '#0a2540',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    opacity: showBackToTop ? '1' : '0',
    visibility: showBackToTop ? 'visible' : 'hidden',
    transform: showBackToTop ? 'translateY(0)' : 'translateY(20px)',
    zIndex: '1000',
    boxShadow: '0 5px 15px rgba(0, 212, 255, 0.3)',
    ':hover': {
      backgroundColor: '#0077ff',
      transform: 'translateY(-5px)'
    }
  };

  return (
    <>
      <footer style={footerStyle}>
        <div style={gradientOverlayStyle}></div>
        <div style={containerStyle}>
          <div style={topSectionStyle}>
            {/* Column 1 - Logo and About */}
            <div style={columnStyle}>
              <div style={logoStyle}>
                <span style={{ color: '#00d4ff' }}>Prime</span>
                <span style={logoAccentStyle}>Estate</span>
              </div>
              <p style={descriptionStyle}>
                We are dedicated to helping you find your dream property. With over 15 years of experience, our team provides exceptional service in the real estate market.
              </p>
              <div style={socialIconsStyle}>
                <a href="#" style={socialIconStyle} onMouseEnter={e => e.target.style.backgroundColor = '#00d4ff'} onMouseLeave={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                  <FaFacebookF />
                </a>
                <a href="#" style={socialIconStyle} onMouseEnter={e => e.target.style.backgroundColor = '#00d4ff'} onMouseLeave={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                  <FaTwitter />
                </a>
                <a href="#" style={socialIconStyle} onMouseEnter={e => e.target.style.backgroundColor = '#00d4ff'} onMouseLeave={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                  <FaInstagram />
                </a>
                <a href="#" style={socialIconStyle} onMouseEnter={e => e.target.style.backgroundColor = '#00d4ff'} onMouseLeave={e => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}>
                  <FaLinkedinIn />
                </a>
              </div>
            </div>

            {/* Column 2 - Quick Links */}
            <div style={columnStyle}>
              <h3 style={headingStyle}>Quick Links<span style={headingAfterStyle}></span></h3>
              <a 
                href="#" 
                style={linkStyle} 
                onMouseEnter={e => {
                  e.target.style.color = linkHoverStyle.color;
                  e.target.style.transform = linkHoverStyle.transform;
                }} 
                onMouseLeave={e => {
                  e.target.style.color = linkStyle.color;
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                Home
              </a>
              <a 
                href="#" 
                style={linkStyle} 
                onMouseEnter={e => {
                  e.target.style.color = linkHoverStyle.color;
                  e.target.style.transform = linkHoverStyle.transform;
                }} 
                onMouseLeave={e => {
                  e.target.style.color = linkStyle.color;
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                Properties
              </a>
              <a 
                href="#" 
                style={linkStyle} 
                onMouseEnter={e => {
                  e.target.style.color = linkHoverStyle.color;
                  e.target.style.transform = linkHoverStyle.transform;
                }} 
                onMouseLeave={e => {
                  e.target.style.color = linkStyle.color;
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                Agents
              </a>
              <a 
                href="#" 
                style={linkStyle} 
                onMouseEnter={e => {
                  e.target.style.color = linkHoverStyle.color;
                  e.target.style.transform = linkHoverStyle.transform;
                }} 
                onMouseLeave={e => {
                  e.target.style.color = linkStyle.color;
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                About Us
              </a>
              <a 
                href="#" 
                style={linkStyle} 
                onMouseEnter={e => {
                  e.target.style.color = linkHoverStyle.color;
                  e.target.style.transform = linkHoverStyle.transform;
                }} 
                onMouseLeave={e => {
                  e.target.style.color = linkStyle.color;
                  e.target.style.transform = 'translateX(0)';
                }}
              >
                Contact
              </a>
            </div>

            {/* Column 3 - Contact Info */}
            <div style={columnStyle}>
              <h3 style={headingStyle}>Contact Us<span style={headingAfterStyle}></span></h3>
              <div style={contactItemStyle}>
                <FaMapMarkerAlt style={contactIconStyle} />
                <span>123 Estate Avenue, New York, NY 10001</span>
              </div>
              <div style={contactItemStyle}>
                <FaPhone style={contactIconStyle} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div style={contactItemStyle}>
                <FaEnvelope style={contactIconStyle} />
                <span>info@primeestate.com</span>
              </div>
            </div>

            {/* Column 4 - Newsletter */}
            <div style={columnStyle}>
              <h3 style={headingStyle}>Newsletter<span style={headingAfterStyle}></span></h3>
              <p style={descriptionStyle}>
                Subscribe to our newsletter to get the latest property listings and market updates.
              </p>
              <div style={newsletterStyle}>
                <div style={inputContainerStyle}>
                  <input 
                    type="email" 
                    placeholder="Your email address" 
                    style={inputFocus ? inputFocusStyle : inputStyle}
                    onFocus={() => setInputFocus(true)}
                    onBlur={() => setInputFocus(false)}
                  />
                </div>
                <button 
                  style={buttonStyle}
                  onMouseEnter={e => {
                    e.target.style.backgroundColor = '#0077ff';
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 10px 20px rgba(0, 119, 255, 0.2)';
                  }}
                  onMouseLeave={e => {
                    e.target.style.backgroundColor = '#00d4ff';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom section */}
          <div style={bottomSectionStyle}>
            <p style={copyrightStyle}>&copy; {currentYear} PrimeEstate. All rights reserved.</p>
            <div style={legalLinksStyle}>
              <a 
                href="#" 
                style={legalLinkStyle}
                onMouseEnter={e => e.target.style.color = '#00d4ff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              >
                Privacy Policy
              </a>
              <a 
                href="#" 
                style={legalLinkStyle}
                onMouseEnter={e => e.target.style.color = '#00d4ff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              >
                Terms of Service
              </a>
              <a 
                href="#" 
                style={legalLinkStyle}
                onMouseEnter={e => e.target.style.color = '#00d4ff'}
                onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.7)'}
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <div 
        style={backToTopStyle}
        onClick={scrollToTop}
        onMouseEnter={e => {
          e.target.style.backgroundColor = '#0077ff';
          e.target.style.transform = 'translateY(-5px)';
        }}
        onMouseLeave={e => {
          e.target.style.backgroundColor = '#00d4ff';
          e.target.style.transform = showBackToTop ? 'translateY(0)' : 'translateY(20px)';
        }}
      >
        ↑
      </div>
    </>
  );
};

export default RealEstateFooter;