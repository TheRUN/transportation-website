import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import './Services.css';

const Services = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: '📦',
      title: 'Freight Services',
      description: 'Comprehensive freight solutions for land, sea, and air transportation with real-time tracking.',
      gradient: 'linear-gradient(135deg, #0066cc, #4da6ff)'
    },
    {
      icon: '🚛',
      title: 'Logistics Management',
      description: 'End-to-end logistics solutions with warehouse management and supply chain optimization.',
      gradient: 'linear-gradient(135deg, #ff6b35, #ff8c5a)'
    },
    {
      icon: '✈️',
      title: 'Express Delivery',
      description: 'Fast and reliable express delivery services with guaranteed on-time arrival.',
      gradient: 'linear-gradient(135deg, #00d9a3, #00ffb3)'
    },
    {
      icon: '🌍',
      title: 'International Shipping',
      description: 'Global shipping solutions with customs clearance and international compliance.',
      gradient: 'linear-gradient(135deg, #9b59b6, #c084fc)'
    },
    {
      icon: '📊',
      title: 'Supply Chain Analytics',
      description: 'Advanced analytics and reporting for complete supply chain visibility and optimization.',
      gradient: 'linear-gradient(135deg, #ffd700, #ffed4e)'
    },
    {
      icon: '🔒',
      title: 'Secure Transport',
      description: 'High-security transport for valuable goods with GPS tracking and insurance coverage.',
      gradient: 'linear-gradient(135deg, #e74c3c, #ff6b6b)'
    }
  ];

  return (
    <section id="services" className="services section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Services</h2>
          <p>Comprehensive transportation solutions tailored to your needs</p>
        </motion.div>

        <div ref={ref} className="services-grid">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                z: 50,
              }}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              <div className="card-inner">
                <motion.div 
                  className="service-icon"
                  style={{ background: service.gradient }}
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <span>{service.icon}</span>
                </motion.div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <motion.button 
                  className="service-btn"
                  whileHover={{ scale: 1.1, x: 10 }}
                >
                  Learn More →
                </motion.button>
              </div>
              <div className="card-glow" style={{ background: service.gradient }}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
