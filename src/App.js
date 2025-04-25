// App.js
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [activeProject, setActiveProject] = useState(null);
  const [isLightMode, setIsLightMode] = useState(true);
  const [filteredTechs, setFilteredTechs] = useState([]);
  const timelineRef = useRef(null);
  
  // Project data from your portfolio
  const projects = [
    {
      id: 1,
      title: "AR Street Portal Renderer",
      date: "2023",
      description: "An augmented reality application that renders and captures a single 2D plane for base display, then overlays a 3D environment with selective visibility through visual scripting.",
      technologies: ["Unity", "ARCore", "Visual Scripting", "C#"],
      imageUrl: "/images/ARPortal.jpg",
      videoUrl: "https://drive.google.com/file/d/1TemrcPM3lLEVLrBbdoNzRamAcXrExQn4/preview",
      driveId: "1TemrcPM3lLEVLrBbdoNzRamAcXrExQn4",
      link: "https://drive.google.com/file/d/1TemrcPM3lLEVLrBbdoNzRamAcXrExQn4/view?usp=drive_link",
      color: "#FF6B6B"
    },
    {
      id: 2,
      title: "Nebula Niagara System",
      date: "2024",
      description: "A particle system created in Unreal Engine that simulates cosmic nebula effects with dynamic lighting and physics-based interactions.",
      technologies: ["Unreal Engine", "Blueprint", "Niagara", "VFX"],
      imageUrl: "/images/Nebula.jpg",
      videoUrl: "https://drive.google.com/file/d/1R6kpQqGXWaoBTbN6D0kPWkeF2fPKkXnk/preview",
      driveId: "1R6kpQqGXWaoBTbN6D0kPWkeF2fPKkXnk",
      link: "https://drive.google.com/file/d/1R6kpQqGXWaoBTbN6D0kPWkeF2fPKkXnk/view?usp=drive_link",
      color: "#4ECDC4"
    },
    {
      id: 3,
      title: "EzySlice Tutorial",
      date: "2023",
      description: "A comprehensive tutorial and implementation of the EzySlice system for real-time mesh slicing in Unity 3D environments.",
      technologies: ["Unity", "C#", "Mesh Manipulation", "Git"],
      imageUrl: "/images/EzySlice.jpg",
      link: "https://github.com/LUCIIFEERR/ezy-slice",
      color: "#FFD166"
    },
    {
      id: 4,
      title: "Gravity Gun",
      date: "2022",
      description: "A physics-based interaction tool inspired by Half-Life 2, allowing users to manipulate objects in VR environments with intuitive controls.",
      technologies: ["Unity", "C#", "VR", "Physics"],
      imageUrl: "/images/GravityGun.jpg",
      videoUrl: "https://drive.google.com/file/d/11JZP1drN94xGIkPVOqfsonmnie5nQoSY/preview",
      driveId: "11JZP1drN94xGIkPVOqfsonmnie5nQoSY",
      link: "https://drive.google.com/file/d/11JZP1drN94xGIkPVOqfsonmnie5nQoSY/view?usp=sharing",
      color: "#06D6A0"
    },
    {
      id: 5,
      title: "Chess",
      date: "2022",
      description: "A fully functional chess game with customizable rules and an integrated AI opponent using minimax algorithm with alpha-beta pruning.",
      technologies: ["C++", "AI", "Game Development", "Git"],
      imageUrl: "/images/Chess.jpg",
      link: "https://github.com/LUCIIFEERR/Chess/tree/main",
      color: "#118AB2"
    }
  ];
  
  // Experience data
  const experiences = [
    {
      id: 1,
      title: "Immersive Development Intern",
      organization: "VR Development Studio",
      date: "July 2024 - Oct 2024",
      description: "Integrated Naked Temple model from Maya into Unreal Engine 5.3. Rendered environmental meshes and character animations using Blueprints. Optimized performance for a smooth user experience in VR. Ensured seamless interaction design for immersive virtual environments.",
      technologies: ["Unreal Engine", "Maya", "Blueprint", "VR"],
      color: "#8338EC"
    },
    {
      id: 2,
      title: "DRDO Project Intern",
      organization: "Defense Research and Development Organization",
      date: "April 2023 - Sept 2023",
      description: "Analyzed and captured live IMU data of the Microsoft Hololens 2 through expertise in MRTK libraries. Modified and published the data on a dedicated ROS server made with Python. Subscribed to the server through Jaguar 4x4 robot. Controlled Jaguar Movements according to the data received. Tested and validated the Jaguar movements through precise path following algorithm.",
      technologies: ["MRTK", "HoloLens", "ROS", "Python", "Robotics"],
      color: "#FB5607"
    }
  ];

  // Get all unique technologies from projects and experiences
  const allTechnologies = [...new Set([
    ...projects.flatMap(project => project.technologies),
    ...experiences.flatMap(exp => exp.technologies)
  ])];
  
  // Filter projects and experiences based on selected technologies
  const filteredProjects = filteredTechs.length > 0 
    ? projects.filter(project => 
        project.technologies.some(tech => filteredTechs.includes(tech)))
    : projects;
    
  const filteredExperiences = filteredTechs.length > 0 
    ? experiences.filter(exp => 
        exp.technologies.some(tech => filteredTechs.includes(tech)))
    : experiences;

  // Handle theme toggle
  const toggleTheme = () => {
    setIsLightMode(!isLightMode);
  };

  // Toggle technology filter
  const toggleTechFilter = (tech) => {
    if (filteredTechs.includes(tech)) {
      setFilteredTechs(filteredTechs.filter(t => t !== tech));
    } else {
      setFilteredTechs([...filteredTechs, tech]);
    }
  };

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const timelineElements = timelineRef.current.querySelectorAll('.timeline-node');
        
        timelineElements.forEach((element) => {
          const rect = element.getBoundingClientRect();
          const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;
          
          if (isVisible) {
            element.classList.add('active');
            
            // Parallax effect calculation
            const parallaxOffset = (rect.top - window.innerHeight / 2) * 0.1;
            element.style.transform = `translateY(${parallaxOffset}px)`;
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [filteredProjects, filteredExperiences]);

  return (
    <div className={`app ${isLightMode ? 'light-mode' : 'dark-mode'}`}>
      <header className="header">
        <div className="container header-content">
          <h1>Eshaan Akware</h1>
          
          <div className="header-controls">
            <button 
              onClick={toggleTheme} 
              className={`theme-toggle ${isLightMode ? 'light' : 'dark'}`}
              aria-label="Toggle theme"
            >
              {isLightMode ? '🌙' : '☀️'}
            </button>
            
            <nav>
              <ul className="nav-links">
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      <main className="container main-content">
        <section id="about" className="intro">
          <div className="profile-section">
            <div className="profile-content">
              <h2>Eshaan Akware</h2>
              <div className="contact-info">
                <p>8975978869 | eshaanakware@gmail.com | <a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
              </div>
              <p className="summary">
                Computer Science graduate focused on Augmented and Virtual Reality. Skilled in C++, C#, Python, Unity, and Unreal Engine, I have hands-on experience in XR development and ROS.
              </p>
              
              <div className="skills-section">
                <div className="skill-category">
                  <h3>Development</h3>
                  <p>C++, C#, Python, Java, Visual Scripting, Blueprint</p>
                </div>
                <div className="skill-category">
                  <h3>Platform</h3>
                  <p>Unity, Unreal Engine, Blender</p>
                </div>
                <div className="skill-category">
                  <h3>Plugins</h3>
                  <p>ARCore, ARKit, Vuforia, MRTK</p>
                </div>
              </div>
              
              <div className="education-section">
                <h3>Education</h3>
                <div className="education-item">
                  <h4>Modern Education Society's College of Engineering, Pune</h4>
                  <p>Bachelor's Degree in Computer Engineering</p>
                  <p>2020 – 2024 | CGPA: 8.03</p>
                </div>
              </div>
              
              <div className="certifications-section">
                <h3>Certifications</h3>
                <ul>
                  <li>Hackerrank certified C#</li>
                  <li>Hackerrank certified problem solving</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        
        {/* Technology Filter */}
        <section className="tech-filter">
          <h3>Filter by Technology:</h3>
          <div className="filter-buttons">
            {allTechnologies.map(tech => (
              <button
                key={tech}
                onClick={() => toggleTechFilter(tech)}
                className={`filter-btn ${filteredTechs.includes(tech) ? 'active' : ''}`}
              >
                {tech}
              </button>
            ))}
            {filteredTechs.length > 0 && (
              <button
                onClick={() => setFilteredTechs([])}
                className="filter-btn clear"
              >
                Clear Filters
              </button>
            )}
          </div>
        </section>

        {/* Experience Timeline */}
        <section id="experience" className="section-title">
          <h2>Professional Experience</h2>
        </section>
        
        <section 
          ref={timelineRef}
          className="timeline"
        >
          {/* Timeline Line */}
          <div className="timeline-line"></div>
          
          {/* Experience Nodes */}
          {filteredExperiences.map((experience, index) => (
            <div 
              key={experience.id}
              className={`timeline-node ${index % 2 === 0 ? 'even' : 'odd'}`}
              style={{
                transitionDelay: `${index * 200}ms`
              }}
            >
              {/* Content Card */}
              <div className={`project-card-container ${index % 2 === 0 ? 'right' : 'left'}`}>
                <div 
                  className="project-card"
                  style={{
                    borderLeft: `5px solid ${experience.color}`
                  }}
                  onMouseEnter={() => setActiveProject(`exp-${experience.id}`)}
                  onMouseLeave={() => setActiveProject(null)}
                >
                  <h3>{experience.title}</h3>
                  <p className="experience-organization">{experience.organization}</p>
                  <p className="project-date">{experience.date}</p>
                  
                  <div className={`project-details ${activeProject === `exp-${experience.id}` ? 'expanded' : ''}`}>
                    <p className="project-description">{experience.description}</p>
                    <div className="tech-tags">
                      {experience.technologies.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  {activeProject !== `exp-${experience.id}` && (
                    <p className="hover-hint">Hover for details</p>
                  )}
                </div>
              </div>
              
              {/* Timeline Node */}
              <div className="node-container">
                <div 
                  className="timeline-node-dot"
                  style={{ 
                    backgroundColor: experience.color,
                    transform: activeProject === `exp-${experience.id}` ? 'scale(1.5)' : 'scale(1)'
                  }}
                ></div>
              </div>
              
              {/* Empty space */}
              <div className={`project-image-container ${index % 2 === 0 ? 'left' : 'right'}`}></div>
            </div>
          ))}
        </section>

        {/* Projects Timeline */}
        <section id="projects" className="section-title">
          <h2>Portfolio Projects</h2>
        </section>
        
        <section className="timeline projects-timeline">
          {/* Timeline Line */}
          <div className="timeline-line"></div>
          
          {/* Projects */}
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <div 
                key={project.id}
                className={`timeline-node ${index % 2 === 0 ? 'even' : 'odd'}`}
                style={{
                  transitionDelay: `${index * 200}ms`,
                  display: 'flex', // Ensure flex display
                  opacity: 1,      // Ensure visibility
                  visibility: 'visible' // Explicitly set visibility
                }}
              >
                {/* Content Card */}
                <div className={`project-card-container ${index % 2 === 0 ? 'right' : 'left'}`}>
                  <div 
                    className="project-card"
                    style={{
                      borderLeft: `5px solid ${project.color}`
                    }}
                    onMouseEnter={() => setActiveProject(project.id)}
                    onMouseLeave={() => setActiveProject(null)}
                  >
                    <h3>{project.title}</h3>
                    <p className="project-date">{project.date}</p>
                    
                    {/* Always show project details */}
                    <div className="project-details expanded">
                      <p className="project-description">{project.description}</p>
                      <div className="tech-tags">
                        {project.technologies.map(tech => (
                          <span key={tech} className="tech-tag">{tech}</span>
                        ))}
                      </div>
                      <a 
                        href={project.link}
                        className="view-button"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project
                      </a>
                    </div>
                  </div>
                </div>
                
                {/* Timeline Node */}
                <div className="node-container">
                  <div 
                    className="timeline-node-dot"
                    style={{ 
                      backgroundColor: project.color,
                      transform: activeProject === project.id ? 'scale(1.5)' : 'scale(1)'
                    }}
                  ></div>
                </div>
                
                {/* Project Media */}
                <div className={`project-image-container ${index % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="project-image">
                    {project.videoUrl ? (
                      <div className="video-container">
                        <iframe
                          src={project.videoUrl}
                          title={project.title}
                          width="100%"
                          height="315"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        ></iframe>
                      </div>
                    ) : (
                      <div className="image-placeholder">
                        <p>{project.title}</p>
                        <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-link-overlay">
                          View Project
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-projects-message">
              <p>No projects match the selected filters. Please try different filters.</p>
            </div>
          )}
        </section>
      </main>

      <footer id="contact" className="footer">
        <div className="container">
          <div className="contact-section">
            <h3>Contact</h3>
            <p>Email: eshaanakware@gmail.com</p>
            <p>Phone: 8975978869</p>
            <p><a href="https://linkedin.com/in/username" target="_blank" rel="noopener noreferrer">LinkedIn</a></p>
          </div>
          <p className="copyright">&copy; 2025 Eshaan Akware. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;