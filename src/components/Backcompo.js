import React from "react";
import "./back.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TweenLite from "gsap";
import { useEffect, useRef } from "react";
import Transnav from "./Transnav";
import Perinfo from "./personalinfo/Perinfo";
import ETimeline from "./personalinfo/ETimeline";
import Experience from "./personalinfo/Experience";
import Skills from "./personalinfo/Skills";
import Portfolio from "./personalinfo/Portfolio";
import Contact from "./Contact";
import ThreeGalaxy from "./ThreeGalaxy";
import ScrollToTop from "./ScrollToTop";
import FloatingParticles from "./FloatingParticles";
import CustomCursor from "./CustomCursor";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);
export default function BackCompo() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    // Setup GSAP ScrollTrigger animations for sections
    const setupScrollAnimations = () => {
      const scrollContainer = document.querySelector('.innercontainer');
      if (!scrollContainer) return;

      try {
        // Try to use ScrollTrigger if available
        if (ScrollTrigger) {
          // Enhanced section animations
          const sections = [
            { selector: '#home', delay: 0 },
            { selector: '#experience', delay: 0.1 },
            { selector: '#skills', delay: 0.2 },
            { selector: '#projects', delay: 0.1 },
            { selector: '.portfolio', delay: 0.1 },
            { selector: '#contact', delay: 0.1 },
          ];

          sections.forEach(({ selector, delay }) => {
            const element = document.querySelector(selector);
            if (element) {
              // Main section animation
              gsap.fromTo(
                element,
                {
                  opacity: 0,
                  y: 80,
                  scale: 0.95,
                },
                {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  duration: 1.2,
                  ease: "power3.out",
                  delay: delay,
                  scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    end: "top 30%",
                    scroller: scrollContainer,
                    toggleActions: "play none none reverse",
                  },
                }
              );

              // Animate headings within sections
              const headings = element.querySelectorAll('h1, h2, .heading, .title');
              if (headings.length > 0) {
                gsap.fromTo(
                  headings,
                  {
                    opacity: 0,
                    y: 50,
                    rotationX: -15,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    duration: 1,
                    ease: "power3.out",
                    stagger: 0.1,
                    delay: delay + 0.2,
                    scrollTrigger: {
                      trigger: element,
                      start: "top 85%",
                      scroller: scrollContainer,
                      toggleActions: "play none none reverse",
                    },
                  }
                );
              }

              // Animate images
              const images = element.querySelectorAll('img');
              if (images.length > 0) {
                gsap.fromTo(
                  images,
                  {
                    opacity: 0,
                    scale: 0.8,
                    rotation: -5,
                  },
                  {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 1,
                    ease: "back.out(1.7)",
                    stagger: 0.15,
                    delay: delay + 0.3,
                    scrollTrigger: {
                      trigger: element,
                      start: "top 85%",
                      scroller: scrollContainer,
                      toggleActions: "play none none reverse",
                    },
                  }
                );
              }

              // Animate cards/boxes
              const cards = element.querySelectorAll('.box, .card, .vtimeline-point, .vtimeline-block');
              if (cards.length > 0) {
                gsap.fromTo(
                  cards,
                  {
                    opacity: 0,
                    y: 60,
                    scale: 0.9,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.1,
                    delay: delay + 0.4,
                    scrollTrigger: {
                      trigger: element,
                      start: "top 85%",
                      scroller: scrollContainer,
                      toggleActions: "play none none reverse",
                    },
                  }
                );
              }

              // Animate skill icons
              const skillIcons = element.querySelectorAll('.skills-container code');
              if (skillIcons.length > 0) {
                gsap.fromTo(
                  skillIcons,
                  {
                    opacity: 0,
                    scale: 0,
                    rotation: -180,
                  },
                  {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    duration: 0.6,
                    ease: "back.out(1.5)",
                    stagger: 0.05,
                    delay: delay + 0.5,
                    scrollTrigger: {
                      trigger: element,
                      start: "top 85%",
                      scroller: scrollContainer,
                      toggleActions: "play none none reverse",
                    },
                  }
                );
              }

              // Animate form fields
              const formFields = element.querySelectorAll('.form-field, .input-text, .input-area');
              if (formFields.length > 0) {
                gsap.fromTo(
                  formFields,
                  {
                    opacity: 0,
                    x: -30,
                  },
                  {
                    opacity: 1,
                    x: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.1,
                    delay: delay + 0.3,
                    scrollTrigger: {
                      trigger: element,
                      start: "top 85%",
                      scroller: scrollContainer,
                      toggleActions: "play none none reverse",
                    },
                  }
                );
              }

              // Animate paragraphs and text
              const paragraphs = element.querySelectorAll('p');
              if (paragraphs.length > 0) {
                gsap.fromTo(
                  paragraphs,
                  {
                    opacity: 0,
                    y: 30,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.1,
                    delay: delay + 0.2,
                    scrollTrigger: {
                      trigger: element,
                      start: "top 85%",
                      scroller: scrollContainer,
                      toggleActions: "play none none reverse",
                    },
                  }
                );
              }
            }
          });

          // Video background should stay fixed - no parallax
          const video = document.getElementById("myVideo");
          if (video) {
            // Ensure video stays fixed in place
            gsap.set(video, { y: 0, x: 0 });
          }

          // Parallax effect for canvas
          if (canvasRef.current) {
            gsap.to(canvasRef.current, {
              y: -50,
              opacity: 0.7,
              scrollTrigger: {
                trigger: scrollContainer,
                start: "top top",
                end: "bottom top",
                scroller: scrollContainer,
                scrub: 1,
              },
            });
          }

          // Animate navigation on scroll
          const nav = document.querySelector('.navbar');
          if (nav) {
            // Initial fade in animation (only plays once)
            gsap.fromTo(
              nav,
              {
                y: -50,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.5,
              }
            );

            // Change nav background on scroll (but keep it visible)
            gsap.to(nav, {
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(10px)",
              boxShadow: "0 4px 30px rgba(102, 126, 234, 0.2)",
              scrollTrigger: {
                trigger: scrollContainer,
                start: "top -50",
                end: "top top",
                scroller: scrollContainer,
                toggleActions: "play none none none",
                onEnter: () => {
                  // Ensure navbar is visible when scrolling
                  gsap.set(nav, { opacity: 1, y: 0 });
                },
                onLeave: () => {
                  // Keep navbar visible when scrolling down
                  gsap.set(nav, { opacity: 1, y: 0 });
                },
                onEnterBack: () => {
                  // Keep navbar visible when scrolling back to top
                  gsap.set(nav, { opacity: 1, y: 0 });
                },
                onLeaveBack: () => {
                  // Keep navbar visible at top
                  gsap.set(nav, { opacity: 1, y: 0 });
                },
              },
            });
          }

          // Animate navigation links on initial load
          const navLinks = document.querySelectorAll('.navbar a');
          navLinks.forEach((link, index) => {
            gsap.fromTo(
              link,
              {
                opacity: 0,
                y: -20,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.5,
                delay: 0.5 + (index * 0.1),
                ease: "power2.out",
              }
            );
          });

          // Add CSS fallback animations using Intersection Observer
          const setupCSSAnimations = () => {
            const observerOptions = {
              root: scrollContainer,
              rootMargin: '0px',
              threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
              entries.forEach(entry => {
                if (entry.isIntersecting) {
                  entry.target.classList.add('animate');
                  // Observe once
                  observer.unobserve(entry.target);
                }
              });
            }, observerOptions);

            // Observe elements with scroll-animate class
            document.querySelectorAll('.scroll-animate').forEach(el => {
              observer.observe(el);
            });
          };

          setupCSSAnimations();
        }
      } catch (error) {
        console.log("ScrollTrigger not available, using fallback animations");
        // Fallback: Use Intersection Observer for scroll animations
        const observerOptions = {
          root: scrollContainer,
          rootMargin: '0px',
          threshold: 0.15
        };

        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
              // Animate main section
              gsap.fromTo(
                entry.target,
                { opacity: 0, y: 80, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 1.2, ease: "power3.out", delay: index * 0.1 }
              );

              // Animate headings
              const headings = entry.target.querySelectorAll('h1, h2, .heading, .title');
              if (headings.length > 0) {
                gsap.fromTo(
                  headings,
                  { opacity: 0, y: 50 },
                  { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.1, delay: 0.2 }
                );
              }

              // Animate images
              const images = entry.target.querySelectorAll('img');
              if (images.length > 0) {
                gsap.fromTo(
                  images,
                  { opacity: 0, scale: 0.8, rotation: -5 },
                  { opacity: 1, scale: 1, rotation: 0, duration: 1, ease: "back.out(1.7)", stagger: 0.15, delay: 0.3 }
                );
              }

              // Animate cards
              const cards = entry.target.querySelectorAll('.box, .card, .vtimeline-point, .vtimeline-block');
              if (cards.length > 0) {
                gsap.fromTo(
                  cards,
                  { opacity: 0, y: 60, scale: 0.9 },
                  { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.out", stagger: 0.1, delay: 0.4 }
                );
              }

              // Animate skill icons
              const skillIcons = entry.target.querySelectorAll('.skills-container code');
              if (skillIcons.length > 0) {
                gsap.fromTo(
                  skillIcons,
                  { opacity: 0, scale: 0, rotation: -180 },
                  { opacity: 1, scale: 1, rotation: 0, duration: 0.6, ease: "back.out(1.5)", stagger: 0.05, delay: 0.5 }
                );
              }

              // Animate form fields
              const formFields = entry.target.querySelectorAll('.form-field, .input-text, .input-area');
              if (formFields.length > 0) {
                gsap.fromTo(
                  formFields,
                  { opacity: 0, x: -30 },
                  { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", stagger: 0.1, delay: 0.3 }
                );
              }

              // Animate paragraphs
              const paragraphs = entry.target.querySelectorAll('p');
              if (paragraphs.length > 0) {
                gsap.fromTo(
                  paragraphs,
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", stagger: 0.1, delay: 0.2 }
                );
              }

              // CSS fallback animations
              entry.target.classList.add('animate');
              
              // Observe once
              observer.unobserve(entry.target);
            }
          });
        }, observerOptions);

        // Observe all sections
        ['#home', '#experience', '#skills', '#projects', '.portfolio', '#contact'].forEach(selector => {
          const element = document.querySelector(selector);
          if (element) observer.observe(element);
        });

        // Setup CSS animations
        const setupCSSAnimations = () => {
          const cssObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                cssObserver.unobserve(entry.target);
              }
            });
          }, observerOptions);

          document.querySelectorAll('.scroll-animate').forEach(el => {
            cssObserver.observe(el);
          });
        };

        setupCSSAnimations();

        // Parallax effect using scroll event (only for canvas, not video)
        const handleParallax = () => {
          const scrollTop = scrollContainer.scrollTop;
          const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
          const scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

          // Video stays fixed - no parallax
          const video = document.getElementById("myVideo");
          if (video) {
            gsap.set(video, { y: 0, x: 0 });
          }

          if (canvasRef.current) {
            gsap.to(canvasRef.current, { 
              y: -scrollProgress * 50, 
              opacity: 0.7 + scrollProgress * 0.3,
              duration: 0.1 
            });
          }
        };

        scrollContainer.addEventListener('scroll', handleParallax);
        
        return () => {
          scrollContainer.removeEventListener('scroll', handleParallax);
          observer.disconnect();
        };
      }
    };

    // Additional scroll animations for timeline and special elements
    const setupAdvancedAnimations = () => {
      const scrollContainer = document.querySelector('.innercontainer');
      if (!scrollContainer) return;

      try {
        if (ScrollTrigger) {
          // Animate timeline items with stagger
          const timelineItems = document.querySelectorAll('.vtimeline-point, .container');
          if (timelineItems.length > 0) {
            gsap.fromTo(
              timelineItems,
              {
                opacity: 0,
                x: (index) => index % 2 === 0 ? -100 : 100,
                scale: 0.8,
              },
              {
                opacity: 1,
                x: 0,
                scale: 1,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.15,
                scrollTrigger: {
                  trigger: '#experience, .expblock',
                  start: "top 80%",
                  scroller: scrollContainer,
                  toggleActions: "play none none reverse",
                },
              }
            );
          }

          // Animate portfolio cards with 3D effect
          const portfolioCards = document.querySelectorAll('.box');
          if (portfolioCards.length > 0) {
            portfolioCards.forEach((card, index) => {
              gsap.fromTo(
                card,
                {
                  opacity: 0,
                  y: 100,
                  rotationY: -30,
                  z: -100,
                },
                {
                  opacity: 1,
                  y: 0,
                  rotationY: 0,
                  z: 0,
                  duration: 1,
                  ease: "power3.out",
                  delay: index * 0.1,
                  scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    scroller: scrollContainer,
                    toggleActions: "play none none reverse",
                  },
                }
              );
            });
          }

          // Ensure navbar is always visible (no fade out on scroll to top)
          const nav = document.querySelector('.navbar');
          if (nav) {
            // Set initial state to visible
            gsap.set(nav, { opacity: 1, y: 0 });
            
            // Fade in animation on initial load only
            gsap.fromTo(
              nav,
              { opacity: 0, y: -50 },
              { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.5 }
            );
          }
        }
      } catch (error) {
        console.log("Advanced animations not available");
      }
    };

    // Scroll progress indicator
    const setupScrollProgress = () => {
      const scrollContainer = document.querySelector('.innercontainer');
      if (!scrollContainer) return;

      const updateProgress = () => {
        const scrollTop = scrollContainer.scrollTop;
        const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
        const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        
        // Update progress bar via style tag
        let styleEl = document.getElementById('scroll-progress-style');
        if (!styleEl) {
          styleEl = document.createElement('style');
          styleEl.id = 'scroll-progress-style';
          document.head.appendChild(styleEl);
        }
        styleEl.textContent = `
          .innercontainer::before {
            width: ${progress}% !important;
          }
        `;
      };

      scrollContainer.addEventListener('scroll', updateProgress);
      updateProgress(); // Initial update
    };

    // Wait for DOM to be ready
    setTimeout(() => {
      setupScrollAnimations();
      setTimeout(() => {
        setupAdvancedAnimations();
        setupScrollProgress();
      }, 200);
    }, 100);

    (function () {
      var width,
        height,
        largeHeader,
        canvas,
        ctx,
        points,
        target,
        animateHeader = true;

      // Main
      initHeader();
      initAnimation();
      addListeners();

      function initHeader() {
        width = window.innerWidth;
        height = window.innerHeight;
        target = { x: width / 2, y: height / 2 };

        largeHeader = document.getElementById("large-header");
        largeHeader.style.height = height + "px";

        canvas = document.getElementById("demo-canvas");
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext("2d");

        // create points
        points = [];
        for (var x = 0; x < width; x = x + width / 20) {
          for (var y = 0; y < height; y = y + height / 20) {
            var px = x + (Math.random() * width) / 20;
            var py = y + (Math.random() * height) / 20;
            var p = { x: px, originX: px, y: py, originY: py };
            points.push(p);
          }
        }

        // for each point find the 5 closest points
        for (var i = 0; i < points.length; i++) {
          var closest = [];
          var p1 = points[i];
          for (var j = 0; j < points.length; j++) {
            var p2 = points[j];
            if (!(p1 == p2)) {
              var placed = false;
              for (var k = 0; k < 5; k++) {
                if (!placed) {
                  if (closest[k] == undefined) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }

              for (var k = 0; k < 5; k++) {
                if (!placed) {
                  if (getDistance(p1, p2) < getDistance(p1, closest[k])) {
                    closest[k] = p2;
                    placed = true;
                  }
                }
              }
            }
          }
          p1.closest = closest;
        }

        // assign a circle to each point
        for (var i in points) {
          var c = new Circle(
            points[i],
            2 + Math.random() * 2,
            "rgba(255,255,255,0.3)"
          );
          points[i].circle = c;
        }
      }

      // Event handling
      function addListeners() {
        if (!("ontouchstart" in window)) {
          window.addEventListener("mousemove", mouseMove);
        }
        window.addEventListener("scroll", scrollCheck);
        window.addEventListener("resize", resize);
      }

      function mouseMove(e) {
        var posx = 0,
          posy = 0;
        if (e.pageX || e.pageY) {
          posx = e.pageX;
          posy = e.pageY;
        } else if (e.clientX || e.clientY) {
          posx =
            e.clientX +
            document.body.scrollLeft +
            document.documentElement.scrollLeft;
          posy =
            e.clientY +
            document.body.scrollTop +
            document.documentElement.scrollTop;
        }
        target.x = posx;
        target.y = posy;
      }

      function scrollCheck() {
        const scrollContainer = document.querySelector('.innercontainer');
        if (scrollContainer) {
          const scrollTop = scrollContainer.scrollTop;
          if (scrollTop > height) {
            animateHeader = false;
            // Reduce particle intensity on scroll
            if (canvas) {
              canvas.style.opacity = "0.3";
            }
          } else {
            animateHeader = true;
            if (canvas) {
              canvas.style.opacity = "1";
            }
          }
        }
      }

      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        largeHeader.style.height = height + "px";
        canvas.width = width;
        canvas.height = height;
      }

      // animation
      function initAnimation() {
        animate();
        for (var i in points) {
          shiftPoint(points[i]);
        }
      }

      function animate() {
        if (animateHeader) {
          ctx.clearRect(0, 0, width, height);
          
          // Get scroll progress for dynamic effects
          const scrollContainer = document.querySelector('.innercontainer');
          let scrollProgress = 0;
          if (scrollContainer) {
            const scrollTop = scrollContainer.scrollTop;
            const scrollHeight = scrollContainer.scrollHeight - scrollContainer.clientHeight;
            scrollProgress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;
          }
          
          // Adjust particle intensity based on scroll
          const baseIntensity = 1 - scrollProgress * 0.5;
          
          for (var i in points) {
            // detect points in range with scroll-based intensity
            const distance = Math.abs(getDistance(target, points[i]));
            if (distance < 4000) {
              points[i].active = 0.3 * baseIntensity;
              points[i].circle.active = 0.6 * baseIntensity;
            } else if (distance < 20000) {
              points[i].active = 0.1 * baseIntensity;
              points[i].circle.active = 0.3 * baseIntensity;
            } else if (distance < 40000) {
              points[i].active = 0.02 * baseIntensity;
              points[i].circle.active = 0.1 * baseIntensity;
            } else {
              points[i].active = 0;
              points[i].circle.active = 0;
            }

            drawLines(points[i]);
            points[i].circle.draw();
          }
        }
        requestAnimationFrame(animate);
      }

      function shiftPoint(p) {
        TweenLite.to(p, 1 + 1 * Math.random(), {
          x: p.originX - 50 + Math.random() * 100,
          y: p.originY - 50 + Math.random() * 100,
          ease: gsap.effects.easeInOut,
          onComplete: function () {
            shiftPoint(p);
          },
        });
      }

      // Canvas manipulation
      function drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.closest[i].x, p.closest[i].y);
          ctx.strokeStyle = "rgba(156,217,249," + p.active + ")";
          ctx.stroke();
        }
      }

      function Circle(pos, rad, color) {
        var _this = this;

        // constructor
        (function () {
          _this.pos = pos || null;
          _this.radius = rad || null;
          _this.color = color || null;
        })();

        this.draw = function () {
          if (!_this.active) return;
          ctx.beginPath();
          ctx.arc(
            _this.pos.x,
            _this.pos.y,
            _this.radius,
            0,
            2 * Math.PI,
            false
          );
          ctx.fillStyle = "rgba(156,217,249," + _this.active + ")";
          ctx.fill();
        };
      }

      // Util
      function getDistance(p1, p2) {
        return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2);
      }
    })();

    // Cleanup ScrollTrigger on unmount
    return () => {
      try {
        if (ScrollTrigger && ScrollTrigger.getAll) {
          ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        }
      } catch (error) {
        // ScrollTrigger not available, cleanup handled in fallback
      }
    };
  }, []);

  return (
    <div >
       <video autoPlay muted loop id="myVideo" className="myVideo">
        <source
          src="https://firebasestorage.googleapis.com/v0/b/portfolio-5712a.appspot.com/o/space2.mp4?alt=media&token=57c1bfb8-d3b3-4786-ae81-227633125736"
          type="video/mp4"
          style={{ width: "100%" }}
        />
      </video>

      {/* Floating Particles */}
      <FloatingParticles />

      {/* Custom Cursor */}
      <CustomCursor />

      {/* Three.js 3D Galaxy Background */}
      <ThreeGalaxy />

      <div id="large-header" className="large-header" ref={containerRef}>
        
          <canvas id="demo-canvas" ref={canvasRef}></canvas>
        
        <div className="content-overlay" style={{position:"fixed",left:0,top:0,width:"100%",height:"100vh",overflow:"hidden",zIndex:2}}>
        <div className="innercontainer" style={{display:"flex",flexDirection:"column",overflowY:"scroll",overflowX:"hidden",height:"100vh"}}>
          <Transnav />
          <div className="section-wrapper">
            <Perinfo />
          </div>
          <div className="section-wrapper">
            <Experience />
          </div>
          <div className="section-wrapper">
            <Skills />
          </div>
          <div className="section-wrapper">
            <Portfolio />
          </div>
          <div className="section-wrapper">
            <Contact/>
          </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  );
}
