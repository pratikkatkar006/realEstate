import React, { useEffect } from 'react';
import { FaUsers, FaLightbulb, FaRocket, FaHeart } from 'react-icons/fa';

const Aboutus = () => {
  useEffect(() => {
    // Animation effect when component mounts
    const elements = document.querySelectorAll('.fade-in');
    elements.forEach((el, index) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 * index);
    });
  }, []);

  const teamMembers = [
    { id: 1, name: 'Alex Johnson', role: 'CEO & Founder', bio: 'Visionary leader with 10+ years in the industry.' },
    { id: 2, name: 'Sarah Williams', role: 'CTO', bio: 'Tech enthusiast and innovation driver.' },
    { id: 3, name: 'Michael Chen', role: 'Lead Developer', bio: 'Problem solver and coding expert.' },
    { id: 4, name: 'Emily Davis', role: 'Design Director', bio: 'Creative mind behind our beautiful interfaces.' },
  ];

  return (
    <div style={{
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '20px',
      color: '#333',
      backgroundColor: '#f9f9f9',
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <div style={{
        textAlign: 'center',
        padding: '60px 20px',
        background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
        color: 'white',
        borderRadius: '10px',
        marginBottom: '40px',
        boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
      }} className="fade-in" >
        <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>About Our Company</h1>
        <p style={{ fontSize: '1.2rem', maxWidth: '800px', margin: '0 auto' }}>
          We're a passionate team dedicated to creating innovative solutions that make a difference.
        </p>
      </div>

      {/* Our Story */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '60px'
      }}>
        <div className="fade-in" style={{
          opacity: 0,
          transform: 'translateY(20px)',
          transition: 'all 0.6s ease',
          maxWidth: '800px',
          textAlign: 'center',
          marginBottom: '40px'
        }}>
          <h2 style={{ fontSize: '2rem', color: '#444', marginBottom: '20px', position: 'relative', display: 'inline-block' }}>
            Our Story
            <span style={{
              position: 'absolute',
              bottom: '-10px',
              left: '0',
              width: '50px',
              height: '3px',
              background: 'linear-gradient(90deg, #6e8efb, #a777e3)',
              borderRadius: '3px'
            }}></span>
          </h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.6', color: '#555' }}>
            Founded in 2015, we started as a small team with a big dream. Today, we've grown into a company serving clients worldwide,
            but we've never lost our passion for innovation and our commitment to excellence. Our journey has been marked by challenges
            that made us stronger and successes that motivated us to aim higher.
          </p>
        </div>

        {/* Stats Section */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          width: '100%',
          marginTop: '30px'
        }}>
          {[
            { icon: <FaUsers size={40} />, number: '200+', text: 'Happy Clients' },
            { icon: <FaLightbulb size={40} />, number: '50+', text: 'Projects' },
            { icon: <FaRocket size={40} />, text: 'Global', number: '10+', text: 'Countries' },
            { icon: <FaHeart size={40} />, number: '100%', text: 'Dedication' }
          ].map((item, index) => (
            <div key={index} className="fade-in" style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: `all 0.6s ease ${index * 0.1}s`,
              textAlign: 'center',
              padding: '20px',
              margin: '10px',
              flex: '1',
              minWidth: '150px',
              maxWidth: '200px',
              background: 'white',
              borderRadius: '10px',
              boxShadow: '0 5px 15px rgba(0,0,0,0.05)'
            }}>
              <div style={{ color: '#6e8efb', marginBottom: '15px' }}>{item.icon}</div>
              <h3 style={{ fontSize: '1.8rem', margin: '10px 0', color: '#333' }}>{item.number}</h3>
              <p style={{ color: '#666' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Team */}
      {/* <div style={{ marginBottom: '60px' }}>
        <h2 style={{
          fontSize: '2rem',
          textAlign: 'center',
          color: '#444',
          marginBottom: '40px',
          position: 'relative',
          display: 'inline-block',
          left: '50%',
          transform: 'translateX(-50%)'
        }}>
          Meet Our Team
          <span style={{
            position: 'absolute',
            bottom: '-10px',
            left: '0',
            width: '50px',
            height: '3px',
            background: 'linear-gradient(90deg, #6e8efb, #a777e3)',
            borderRadius: '3px'
          }}></span>
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          padding: '0 20px'
        }}>
          {teamMembers.map((member, index) => (
            <div key={member.id} className="fade-in" style={{
              opacity: 0,
              transform: 'translateY(20px)',
              transition: `all 0.6s ease ${index * 0.2}s`,
              background: 'white',
              borderRadius: '10px',
              overflow: 'hidden',
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              textAlign: 'center',
              transition: 'transform 0.3s ease',
              ':hover': {
                transform: 'translateY(-10px)'
              }
            }}>
              <div style={{
                height: '200px',
                background: `linear-gradient(45deg, ${index % 2 === 0 ? '#6e8efb' : '#a777e3'}, ${index % 2 === 0 ? '#a777e3' : '#6e8efb'})`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '4rem',
                fontWeight: 'bold'
              }}>
                {member.name.charAt(0)}
              </div>
              <div style={{ padding: '20px' }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '5px', color: '#333' }}>{member.name}</h3>
                <p style={{ color: '#6e8efb', marginBottom: '15px', fontWeight: '500' }}>{member.role}</p>
                <p style={{ color: '#666', lineHeight: '1.5' }}>{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      {/* Mission Section */}
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 5px 15px rgba(0,0,0,0.05)',
        marginBottom: '60px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }} className="fade-in" >
        <h2 style={{ fontSize: '2rem', color: '#444', marginBottom: '20px', textAlign: 'center' }}>
          Our Mission & Values
        </h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '30px',
          maxWidth: '1000px'
        }}>
          <div style={{
            flex: '1',
            minWidth: '250px',
            padding: '20px',
            background: '#f5f7ff',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#6e8efb', marginBottom: '15px' }}>Innovation</h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>
              We constantly push boundaries to deliver cutting-edge solutions that solve real problems.
            </p>
          </div>
          <div style={{
            flex: '1',
            minWidth: '250px',
            padding: '20px',
            background: '#f5f7ff',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#6e8efb', marginBottom: '15px' }}>Integrity</h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>
              We believe in transparency, honesty, and doing what's right - even when no one is watching.
            </p>
          </div>
          <div style={{
            flex: '1',
            minWidth: '250px',
            padding: '20px',
            background: '#f5f7ff',
            borderRadius: '8px'
          }}>
            <h3 style={{ color: '#6e8efb', marginBottom: '15px' }}>Excellence</h3>
            <p style={{ color: '#555', lineHeight: '1.6' }}>
              We're committed to delivering the highest quality in everything we do, from code to customer service.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div style={{
        textAlign: 'center',
        padding: '40px 20px',
        background: 'linear-gradient(135deg, #6e8efb, #a777e3)',
        color: 'white',
        borderRadius: '10px',
        marginBottom: '40px'
      }} className="fade-in">
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>Want to Join Our Journey?</h2>
        <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto 30px' }}>
          We're always looking for talented individuals to join our growing team.
        </p>
        <button style={{
          padding: '12px 30px',
          fontSize: '1rem',
          fontWeight: '600',
          color: '#6e8efb',
          background: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          ':hover': {
            transform: 'translateY(-3px)',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
          }
        }}>
          View Open Positions
        </button>
      </div>
    </div>
  );
};

export default Aboutus;