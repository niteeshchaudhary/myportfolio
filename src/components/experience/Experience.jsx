import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDatabase, ref, child, get } from 'firebase/database';
import { app } from '../../config/firebase';
import experienceData from './MyExperience.json';
import './Experience.css';

const Experience = () => {
  const [experiences, setExperiences] = useState(experienceData);

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const dbRef = ref(getDatabase(app));
        const snapshot = await get(child(dbRef, 'experience'));
        
        if (snapshot.exists()) {
          const firebaseData = snapshot.val();
          if (Array.isArray(firebaseData)) {
            setExperiences(firebaseData);
          } else {
            setExperiences(Object.values(firebaseData));
          }
        }
      } catch (error) {
        console.error('Error fetching experience:', error);
      }
    };

    fetchExperience();
  }, []);

  return (
    <section id="experience" className="experience-section">
      <div className="experience-bg">
        <div className="gradient-orb exp-orb-1"></div>
        <div className="gradient-orb exp-orb-2"></div>
      </div>

      <div className="experience-container">
        <motion.div 
          className="experience-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading">Work Experience</h2>
          <p className="section-subtitle">
            My professional journey and career milestones
          </p>
        </motion.div>

        <div className="experience-timeline">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="timeline-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  {exp.image && (
                    <img 
                      src={exp.image} 
                      alt={exp.Company} 
                      className="company-logo"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/100x100/1a1a2e/7c3aed?text=Logo';
                      }}
                    />
                  )}
                  <div className="timeline-info">
                    <h3 className="role">{exp.role}</h3>
                    <h4 className="company">{exp.Company}</h4>
                    <span className="duration">{exp.time}</span>
                  </div>
                </div>
                <p className="description">{exp.Discription}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;