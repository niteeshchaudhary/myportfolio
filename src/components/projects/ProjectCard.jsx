import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch } from 'react-icons/fa';
import './ProjectCard.css';

const ProjectCard = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const categoryColors = {
    ai: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    web: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    games: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    devops: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
    desktop: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    network: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
  };

  return (
    <motion.div
      className="project-card-wrapper"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      style={{
        transform: isHovered
          ? `perspective(1000px) rotateX(${mousePosition.y * -10}deg) rotateY(${mousePosition.x * 10}deg) translateZ(10px)`
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-card">
        {/* Glow Effect */}
        <div 
          className="card-glow" 
          style={{
            background: categoryColors[project.category] || categoryColors.web,
            opacity: isHovered ? 0.3 : 0,
          }}
        />

        {/* Thumbnail */}
        <div className="card-image-container">
          <motion.img
            src={project.thumb}
            alt={project.name}
            className="card-image"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="featured-badge">
              <span>⭐ Featured</span>
            </div>
          )}

          {/* Category Tag */}
          <div 
            className="category-tag"
            style={{ background: categoryColors[project.category] || categoryColors.web }}
          >
            {project.category}
          </div>
        </div>

        {/* Content */}
        <div className="card-content">
          <h3 className="card-title">{project.name}</h3>
          <p className="card-description">{project.description}</p>

          {/* Tech Stack */}
          <div className="tech-stack">
            {project.tech.slice(0, 4).map((tech, idx) => (
              <span key={idx} className="tech-badge">
                {tech}
              </span>
            ))}
            {project.tech.length > 4 && (
              <span className="tech-badge more">+{project.tech.length - 4}</span>
            )}
          </div>

          {/* GitHub Stats */}
          <div className="github-stats">
            <div className="stat">
              <FaStar className="icon" />
              <span>{project.stars || 'N/A'}</span>
            </div>
            <div className="stat">
              <FaCodeBranch className="icon" />
              <span>{project.forks || 'N/A'}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="card-actions">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="action-btn primary"
            >
              <FaGithub />
              <span>View Code</span>
            </a>
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn secondary"
              >
                <FaExternalLinkAlt />
                <span>Live Demo</span>
              </a>
            )}
          </div>
        </div>

        {/* Border Gradient */}
        <div 
          className="card-border"
          style={{
            background: categoryColors[project.category] || categoryColors.web,
            opacity: isHovered ? 1 : 0,
          }}
        />
      </div>
    </motion.div>
  );
};

export default ProjectCard;