import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter, FaInstagram } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      await emailjs.sendForm(
        'service_j9ovyx9',
        'template_jlm3o95',
        e.target,
        'qzrCzPgtdSbiIJl6v'
      );

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => setSubmitStatus(null), 3000);
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
      
      setTimeout(() => setSubmitStatus(null), 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    { 
      name: 'GitHub', 
      icon: FaGithub, 
      url: 'https://github.com/niteeshchaudhary',
      color: '#6e5494'
    },
    { 
      name: 'LinkedIn', 
      icon: FaLinkedin, 
      url: 'https://linkedin.com/in/niteesh-kamal-chaudhary/',
      color: '#0077b5'
    },
    { 
      name: 'Twitter', 
      icon: FaTwitter, 
      url: 'https://twitter.com/Niteesh12857418',
      color: '#1DA1F2'
    },
    { 
      name: 'Instagram', 
      icon: FaInstagram, 
      url: 'https://instagram.com',
      color: '#E4405F'
    },
    { 
      name: 'Email', 
      icon: FaEnvelope, 
      url: 'mailto:nkchaudhary00@gmail.com',
      color: '#EA4335'
    },
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-bg">
        <div className="gradient-orb contact-orb-1"></div>
        <div className="gradient-orb contact-orb-2"></div>
      </div>

      <div className="contact-container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading">Get In Touch</h2>
          <p className="section-subtitle">
            Have a question or want to work together? I'd love to hear from you!
          </p>
        </motion.div>

        <div className="contact-content">
          {/* Contact Form */}
          <motion.div 
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <form className="contact-form" onSubmit={sendEmail}>
              <div className="form-group">
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder=" "
                />
                <label htmlFor="name" className="form-label">Your Name</label>
              </div>

              <div className="form-group">
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-input"
                  placeholder=" "
                />
                <label htmlFor="email" className="form-label">Your Email</label>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="form-textarea"
                  placeholder=" "
                  rows="5"
                />
                <label htmlFor="message" className="form-label">Your Message</label>
              </div>

              <motion.button
                type="submit"
                className={`submit-btn ${submitStatus === 'success' ? 'success' : ''} ${submitStatus === 'error' ? 'error' : ''}`}
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                {isSubmitting ? (
                  <span className="loading-spinner"></span>
                ) : submitStatus === 'success' ? (
                  '✓ Message Sent!'
                ) : submitStatus === 'error' ? (
                  '✗ Try Again'
                ) : (
                  'Send Message'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            className="social-section"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="social-title">Connect With Me</h3>
            <p className="social-description">
              Feel free to reach out through any of these platforms
            </p>
            
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  style={{ 
                    '--social-color': social.color,
                    '--social-bg': `${social.color}15`,
                  }}
                >
                  <social.icon className="social-icon" />
                  <span className="social-name">{social.name}</span>
                </motion.a>
              ))}
            </div>

            <div className="contact-info">
              <p className="info-label">Direct Email:</p>
              <a href="mailto:nkchaudhary00@gmail.com" className="info-email">
                nkchaudhary00@gmail.com
              </a>
            </div>
          </motion.div>
        </div>

        {/* Additional Contact Info */}
        <motion.div 
          className="contact-extra"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="extra-content">
            <h3>Let's Work Together</h3>
            <p>
              I'm always open to discussing new projects, creative ideas, or 
              opportunities to be part of your visions. Whether you have a 
              question, a project proposal, or just want to say hi, feel free 
              to reach out!
            </p>
            <div className="availability-badge">
              <span className="status-dot"></span>
              <span>Available for opportunities</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;