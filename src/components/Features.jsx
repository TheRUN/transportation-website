import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import './Features.css';

const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const [counters, setCounters] = useState({
    clients: 0,
    deliveries: 0,
    countries: 0,
    satisfaction: 0
  });

  useEffect(() => {
    if (isInView) {
      const targets = {
        clients: 2500,
        deliveries: 50000,
        countries: 120,
        satisfaction: 99
      };

      const duration = 2000; // 2 seconds
      const steps = 60;
      const interval = duration / steps;

      let step = 0;
      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        
        setCounters({
          clients: Math.floor(targets.clients * progress),
          deliveries: Math.floor(targets.deliveries * progress),
          countries: Math.floor(targets.countries * progress),
          satisfaction: Math.floor(targets.satisfaction * progress)
        });

        if (step >= steps) {
          clearInterval(timer);
          setCounters(targets);
        }
      }, interval);

      return () => clearInterval(timer);
    }
  }, [isInView]);

  const features = [
    {
      icon: '⚡',
      title: 'Real-Time Tracking',
      description: 'Track your shipments in real-time with our advanced GPS and IoT technology.'
    },
    {
      icon: '🛡️',
      title: 'Secure & Insured',
      description: 'Full insurance coverage and secure handling for all your valuable shipments.'
    },
    {
      icon: '🌐',
      title: 'Global Network',
      description: 'Extensive network spanning across 120+ countries with local expertise.'
    },
    {
      icon: '⏰',
      title: '24/7 Support',
      description: 'Round-the-clock customer support to assist you whenever you need.'
    }
  ];

  return (
    <section id="features" className="features section">
      <div className="features-background">
        <motion.div 
          className="floating-shape shape-1"
          animate={{ 
            y: [0, -30, 0],
            rotate: [0, 360, 0]
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
        <motion.div 
          className="floating-shape shape-2"
          animate={{ 
            y: [0, 30, 0],
            rotate: [0, -360, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut" 
          }}
        />
      </div>

      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Why Choose Us</h2>
          <p>Leading the industry with innovation and excellence</p>
        </motion.div>

        <div ref={ref} className="stats-grid">
          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ scale: 1.05, rotateZ: 2 }}
          >
            <div className="stat-number">{counters.clients.toLocaleString()}+</div>
            <div className="stat-label">Happy Clients</div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            whileHover={{ scale: 1.05, rotateZ: -2 }}
          >
            <div className="stat-number">{counters.deliveries.toLocaleString()}+</div>
            <div className="stat-label">Successful Deliveries</div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            whileHover={{ scale: 1.05, rotateZ: 2 }}
          >
            <div className="stat-number">{counters.countries}+</div>
            <div className="stat-label">Countries Served</div>
          </motion.div>

          <motion.div 
            className="stat-card"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 }}
            whileHover={{ scale: 1.05, rotateZ: -2 }}
          >
            <div className="stat-number">{counters.satisfaction}%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </motion.div>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <motion.div 
                className="feature-icon"
                whileHover={{ rotate: 360, scale: 1.2 }}
                transition={{ duration: 0.5 }}
              >
                {feature.icon}
              </motion.div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
