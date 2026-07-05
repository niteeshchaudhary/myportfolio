import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProjectGrid from './ProjectGrid';
import projectsData from '../../data/projects.json';
import { getDatabase, ref, child, get } from 'firebase/database';
import { app } from '../../config/firebase';
import './Portfolio.css';

const Portfolio = () => {
  const [projects, setProjects] = useState(projectsData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const dbRef = ref(getDatabase(app));
        const snapshot = await get(child(dbRef, 'projects'));
        
        if (snapshot.exists()) {
          const firebaseProjects = snapshot.val();
          // Merge Firebase data with local data
          setProjects(prevProjects => 
            prevProjects.map(localProj => {
              const firebaseProj = Object.values(firebaseProjects).find(
                fb => fb.slug === localProj.slug
              );
              return firebaseProj ? { ...localProj, ...firebaseProj } : localProj;
            })
          );
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching projects:', error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="portfolio-section">
      {/* Animated Background Particles */}
      <div className="portfolio-bg">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="portfolio-content">
        {/* Section Header */}
        <motion.div 
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading">
            <span className="gradient-text">Featured Projects</span>
          </h2>
          <p className="section-subtitle">
            Explore my collection of projects spanning AI/ML, Web Development, 
            DevOps, and more. Each project represents a unique challenge solved 
            with code and creativity.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <div className="loading-state">
            <div className="loader"></div>
            <p>Loading amazing projects...</p>
          </div>
        ) : (
          <ProjectGrid projects={projects} />
        )}
      </div>
    </section>
  );
};

export default Portfolio;