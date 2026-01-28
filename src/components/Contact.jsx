import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import './Contact.css';

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      service: '',
      message: ''
    });
  };

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Get In Touch</h2>
          <p>Ready to transform your logistics? Contact us today</p>
        </motion.div>

        <div ref={ref} className="contact-content">
          <motion.div 
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h3>Contact Information</h3>
            <p className="info-description">
              Get in touch with our team for any inquiries or to request a quote.
            </p>

            <div className="info-items">
              <motion.div 
                className="info-item"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <div className="info-icon">📧</div>
                <div className="info-content">
                  <h4>Email</h4>
                  <p>info@transglobal.com</p>
                  <p>support@transglobal.com</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-item"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <div className="info-icon">📞</div>
                <div className="info-content">
                  <h4>Phone</h4>
                  <p>+1 (555) 123-4567</p>
                  <p>+1 (555) 987-6543</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-item"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <div className="info-icon">📍</div>
                <div className="info-content">
                  <h4>Address</h4>
                  <p>123 Logistics Avenue</p>
                  <p>New York, NY 10001</p>
                </div>
              </motion.div>

              <motion.div 
                className="info-item"
                whileHover={{ scale: 1.05, x: 10 }}
              >
                <div className="info-icon">⏰</div>
                <div className="info-content">
                  <h4>Business Hours</h4>
                  <p>Mon - Fri: 8:00 AM - 6:00 PM</p>
                  <p>24/7 Emergency Support</p>
                </div>
              </motion.div>
            </div>

            <div className="social-links">
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                📘
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                🐦
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                💼
              </motion.a>
              <motion.a 
                href="#" 
                className="social-link"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                📷
              </motion.a>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="form-group">
              <motion.input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => setFocusedField('name')}
                onBlur={() => setFocusedField(null)}
                required
                className={focusedField === 'name' ? 'focused' : ''}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div className="form-group">
              <motion.input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                required
                className={focusedField === 'email' ? 'focused' : ''}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div className="form-group">
              <motion.input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                onFocus={() => setFocusedField('phone')}
                onBlur={() => setFocusedField(null)}
                className={focusedField === 'phone' ? 'focused' : ''}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <div className="form-group">
              <motion.select
                name="service"
                value={formData.service}
                onChange={handleChange}
                onFocus={() => setFocusedField('service')}
                onBlur={() => setFocusedField(null)}
                required
                className={focusedField === 'service' ? 'focused' : ''}
                whileFocus={{ scale: 1.02 }}
              >
                <option value="">Select Service</option>
                <option value="freight">Freight Services</option>
                <option value="logistics">Logistics Management</option>
                <option value="express">Express Delivery</option>
                <option value="international">International Shipping</option>
                <option value="analytics">Supply Chain Analytics</option>
                <option value="secure">Secure Transport</option>
              </motion.select>
            </div>

            <div className="form-group">
              <motion.textarea
                name="message"
                placeholder="Your Message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField(null)}
                required
                className={focusedField === 'message' ? 'focused' : ''}
                whileFocus={{ scale: 1.02 }}
              />
            </div>

            <motion.button 
              type="submit"
              className="btn btn-primary submit-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Send Message
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
