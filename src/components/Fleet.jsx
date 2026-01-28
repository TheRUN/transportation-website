import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import './Fleet.css';

const Fleet = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const vehicles = [
    {
      id: 1,
      name: 'Heavy Duty Trucks',
      category: 'Long Distance',
      capacity: '40 tons',
      description: 'Perfect for long-distance heavy freight transportation',
      icon: '🚛',
      color: '#0066cc'
    },
    {
      id: 2,
      name: 'Refrigerated Vans',
      category: 'Temperature Controlled',
      capacity: '15 tons',
      description: 'Temperature-controlled transport for perishable goods',
      icon: '🧊',
      color: '#00d9a3'
    },
    {
      id: 3,
      name: 'Cargo Aircraft',
      category: 'Air Freight',
      capacity: '100 tons',
      description: 'Express air freight for time-sensitive shipments',
      icon: '✈️',
      color: '#ff6b35'
    },
    {
      id: 4,
      name: 'Container Ships',
      category: 'Ocean Freight',
      capacity: '5000 TEU',
      description: 'Large-scale ocean freight for international shipping',
      icon: '🚢',
      color: '#9b59b6'
    },
    {
      id: 5,
      name: 'Delivery Vans',
      category: 'Last Mile',
      capacity: '3 tons',
      description: 'Fast and efficient last-mile delivery solutions',
      icon: '🚐',
      color: '#ffd700'
    },
    {
      id: 6,
      name: 'Rail Transport',
      category: 'Bulk Cargo',
      capacity: '80 tons',
      description: 'Eco-friendly bulk cargo transport via rail',
      icon: '🚂',
      color: '#e74c3c'
    }
  ];

  return (
    <section id="fleet" className="fleet section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>Our Fleet</h2>
          <p>Modern, diverse fleet ready to handle any transportation need</p>
        </motion.div>

        <div ref={ref} className="fleet-grid">
          {vehicles.map((vehicle, index) => (
            <motion.div
              key={vehicle.id}
              className="fleet-card"
              initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
              animate={isInView ? { opacity: 1, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                rotateY: 10,
                z: 50,
              }}
              onClick={() => setSelectedVehicle(vehicle)}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <motion.div 
                className="fleet-icon-container"
                style={{ background: vehicle.color }}
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
              >
                <span className="fleet-icon">{vehicle.icon}</span>
              </motion.div>
              
              <div className="fleet-content">
                <h3>{vehicle.name}</h3>
                <div className="fleet-category">{vehicle.category}</div>
                <div className="fleet-capacity">
                  <span className="capacity-label">Capacity:</span>
                  <span className="capacity-value">{vehicle.capacity}</span>
                </div>
                <p>{vehicle.description}</p>
              </div>

              <motion.div 
                className="fleet-hover-overlay"
                whileHover={{ opacity: 1 }}
                initial={{ opacity: 0 }}
              >
                <span>View Details</span>
              </motion.div>

              <div 
                className="fleet-glow" 
                style={{ background: `radial-gradient(circle, ${vehicle.color}40 0%, transparent 70%)` }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal/Lightbox */}
      {selectedVehicle && (
        <motion.div 
          className="fleet-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedVehicle(null)}
        >
          <motion.div 
            className="modal-content"
            initial={{ scale: 0.8, y: 100 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 100 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              className="modal-close"
              onClick={() => setSelectedVehicle(null)}
            >
              ×
            </button>
            
            <div 
              className="modal-icon"
              style={{ background: selectedVehicle.color }}
            >
              <span>{selectedVehicle.icon}</span>
            </div>
            
            <h2>{selectedVehicle.name}</h2>
            <div className="modal-category">{selectedVehicle.category}</div>
            <div className="modal-capacity">
              Capacity: <strong>{selectedVehicle.capacity}</strong>
            </div>
            <p>{selectedVehicle.description}</p>
            
            <div className="modal-features">
              <div className="feature-badge">GPS Tracking</div>
              <div className="feature-badge">24/7 Support</div>
              <div className="feature-badge">Insured</div>
            </div>
            
            <motion.button 
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Request Quote
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Fleet;
