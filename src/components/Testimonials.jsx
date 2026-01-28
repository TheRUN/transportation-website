import { motion, useInView } from 'framer-motion';
import { useState, useRef } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      company: 'TechCorp Industries',
      role: 'Supply Chain Manager',
      rating: 5,
      text: 'TransGlobal has revolutionized our logistics operations. Their real-time tracking and reliable delivery have exceeded our expectations consistently.',
      avatar: '👩‍💼'
    },
    {
      id: 2,
      name: 'Michael Chen',
      company: 'Global Trade Co.',
      role: 'Operations Director',
      rating: 5,
      text: 'Outstanding service! The team handled our international shipments with utmost professionalism. The 24/7 support has been invaluable to our business.',
      avatar: '👨‍💼'
    },
    {
      id: 3,
      name: 'Emma Rodriguez',
      company: 'Fashion Forward',
      role: 'Logistics Coordinator',
      rating: 5,
      text: 'Their temperature-controlled shipping saved our seasonal collection. Fast, reliable, and incredibly professional. Highly recommend!',
      avatar: '👩‍💻'
    },
    {
      id: 4,
      name: 'David Park',
      company: 'MegaMart Retail',
      role: 'Distribution Manager',
      rating: 5,
      text: 'Working with TransGlobal has been a game-changer. Their fleet diversity and efficient routing have reduced our shipping costs by 30%.',
      avatar: '👨‍🔧'
    }
  ];

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="testimonials section">
      <div className="container">
        <motion.div 
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2>What Our Clients Say</h2>
          <p>Trusted by thousands of businesses worldwide</p>
        </motion.div>

        <div ref={ref} className="testimonials-carousel">
          <motion.button 
            className="carousel-btn prev-btn"
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
          >
            ‹
          </motion.button>

          <div className="testimonials-container">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`testimonial-card ${index === activeIndex ? 'active' : ''}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: index === activeIndex ? 1 : 0,
                  scale: index === activeIndex ? 1 : 0.8,
                  x: (index - activeIndex) * 100 + '%',
                }}
                transition={{ duration: 0.5 }}
                style={{
                  position: index === activeIndex ? 'relative' : 'absolute',
                  zIndex: index === activeIndex ? 10 : 0,
                }}
              >
                <div className="quote-icon">"</div>
                
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.span 
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      ⭐
                    </motion.span>
                  ))}
                </div>

                <p className="testimonial-text">{testimonial.text}</p>

                <div className="testimonial-author">
                  <motion.div 
                    className="author-avatar"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div className="author-info">
                    <h4>{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                    <p className="author-company">{testimonial.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.button 
            className="carousel-btn next-btn"
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
          >
            ›
          </motion.button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`dot ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
