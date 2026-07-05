import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaServer, FaCloud, FaGitAlt, FaReact, FaNodeJs, FaPython, FaJava, FaPhp, FaHtml5, FaCss3Alt, FaJs, FaAndroid, FaLinux, FaUnity, FaMicrosoft, FaFire, FaDocker, FaAws } from 'react-icons/fa';
import { SiDjango, SiFlask, SiFastapi, SiSpringboot, SiKubernetes, SiGooglecloud } from 'react-icons/si';
import './Skills.css';

const skillCategories = [
  {
    name: 'Languages',
    skills: [
      { name: 'C', icon: FaCode, color: '#5699d0' },
      { name: 'C++', icon: FaCode, color: '#00599c' },
      { name: 'C#', icon: FaMicrosoft, color: '#9b4993' },
      { name: 'Java', icon: FaJava, color: '#e76f00' },
      { name: 'Python', icon: FaPython, color: '#3776ab' },
      { name: 'PHP', icon: FaPhp, color: '#777bb4' },
      { name: 'JavaScript', icon: FaJs, color: '#f7df1e' },
    ],
  },
  {
    name: 'Frontend',
    skills: [
      { name: 'HTML5', icon: FaHtml5, color: '#e34f26' },
      { name: 'CSS3', icon: FaCss3Alt, color: '#1572b6' },
      { name: 'React', icon: FaReact, color: '#61dafb' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Express', icon: FaServer, color: '#808080' },
      { name: 'Django', icon: SiDjango, color: '#44B784' },
      { name: 'Flask', icon: SiFlask, color: '#FFFFFF' },
      { name: 'FastAPI', icon: SiFastapi, color: '#009688' },
      { name: 'Spring Boot', icon: SiSpringboot, color: '#6db33f' },
      { name: 'MySQL', icon: FaDatabase, color: '#4479a1' },
    ],
  },
  {
    name: 'Tools & Platforms',
    skills: [
      { name: 'Git', icon: FaGitAlt, color: '#f05032' },
      { name: 'Firebase', icon: FaFire, color: '#ffca28' },
      { name: 'Cloud', icon: FaCloud, color: '#0078d7' },
      { name: 'Linux', icon: FaLinux, color: '#fcc624' },
      { name: 'Android', icon: FaAndroid, color: '#3ddc84' },
    ],
  },
  {
    name: 'IDEs & Frameworks',
    skills: [
      { name: 'VS Code', icon: FaMicrosoft, color: '#007acc' },
      { name: 'VS Studio', icon: FaMicrosoft, color: '#5c2d91' },
      { name: 'Unity', icon: FaUnity, color: '#808080' },
    ],
  },
  {
    name: 'DevOps & Cloud',
    skills: [
      { name: 'Docker', icon: FaDocker, color: '#2496ED' },
      { name: 'Kubernetes', icon: SiKubernetes, color: '#326CE5' },
      { name: 'AWS', icon: FaAws, color: '#FF9900' },
      { name: 'GCP', icon: SiGooglecloud, color: '#4285F4' },
      { name: 'Azure', icon: FaMicrosoft, color: '#0078D4' },
    ],
  },
];

const Skills = () => {
  return (
    <section id="skills" className="skills-section">
      <div className="skills-bg">
        <div className="gradient-orb skill-orb-1"></div>
        <div className="gradient-orb skill-orb-2"></div>
      </div>

      <div className="skills-container">
        <motion.div 
          className="skills-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="heading">Technical Skills</h2>
          <p className="section-subtitle">
            Technologies and tools I work with to bring ideas to life
          </p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((category, catIndex) => (
            <motion.div
              key={category.name}
              className="skill-category"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <h3 className="category-title">{category.name}</h3>
              <div className="skill-items">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skill.name}
                    className="skill-item"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                  >
                    <div 
                      className="skill-icon"
                      style={{ 
                        background: `linear-gradient(135deg, ${skill.color}20, ${skill.color}10)`,
                        borderColor: skill.color,
                      }}
                    >
                      <skill.icon style={{ color: skill.color, fontSize: '2rem' }} />
                    </div>
                    <span className="skill-name">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;