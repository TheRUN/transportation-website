import { motion } from 'framer-motion';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Freight Services', href: '#services' },
      { name: 'Logistics Management', href: '#services' },
      { name: 'Express Delivery', href: '#services' },
      { name: 'International Shipping', href: '#services' }
    ],
    company: [
      { name: 'About Us', href: '#features' },
      { name: 'Our Fleet', href: '#fleet' },
      { name: 'Testimonials', href: '#testimonials' },
      { name: 'Contact', href: '#contact' }
    ],
    resources: [
      { name: 'Track Shipment', href: '#' },
      { name: 'Get Quote', href: '#contact' },
      { name: 'FAQs', href: '#' },
      { name: 'Support', href: '#contact' }
    ]
  };

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-grid">
          <motion.div 
            className="footer-brand"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="logo">
              <span className="logo-icon">🚚</span>
              <span className="logo-text">TransGlobal</span>
            </div>
            <p className="footer-description">
              Leading the transportation industry with cutting-edge solutions, 
              reliable service, and global reach.
            </p>
            <div className="footer-social">
              <motion.a 
                href="#" 
                className="footer-social-link"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                📘
              </motion.a>
              <motion.a 
                href="#" 
                className="footer-social-link"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                🐦
              </motion.a>
              <motion.a 
                href="#" 
                className="footer-social-link"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                💼
              </motion.a>
              <motion.a 
                href="#" 
                className="footer-social-link"
                whileHover={{ scale: 1.2, rotate: 360 }}
                whileTap={{ scale: 0.9 }}
              >
                📷
              </motion.a>
            </div>
          </motion.div>

          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4>Services</h4>
            <ul>
              {footerLinks.services.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a href={link.href}>{link.name}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4>Company</h4>
            <ul>
              {footerLinks.company.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a href={link.href}>{link.name}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            className="footer-links"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4>Resources</h4>
            <ul>
              {footerLinks.resources.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                >
                  <a href={link.href}>{link.name}</a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} TransGlobal. All rights reserved.</p>
          <div className="footer-bottom-links">
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
            >
              Privacy Policy
            </motion.a>
            <span>•</span>
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
            >
              Terms of Service
            </motion.a>
            <span>•</span>
            <motion.a 
              href="#"
              whileHover={{ scale: 1.05 }}
            >
              Cookie Policy
            </motion.a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
