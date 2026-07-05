import { useEffect } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  useEffect(() => {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;

    const updateCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      cursor.style.left = `${mouseX}px`;
      cursor.style.top = `${mouseY}px`;
    };

    const updateFollower = () => {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      
      requestAnimationFrame(updateFollower);
    };

    const handleMouseEnter = () => {
      cursor.classList.add('hover');
      cursorFollower.classList.add('hover');
    };

    const handleMouseLeave = () => {
      cursor.classList.remove('hover');
      cursorFollower.classList.remove('hover');
    };

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .card, .box, .social-link');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
    });

    document.addEventListener('mousemove', updateCursor);
    updateFollower();

    return () => {
      document.removeEventListener('mousemove', updateCursor);
      interactiveElements.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter);
        el.removeEventListener('mouseleave', handleMouseLeave);
      });
      if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      if (cursorFollower.parentNode) cursorFollower.parentNode.removeChild(cursorFollower);
    };
  }, []);

  return null;
}

