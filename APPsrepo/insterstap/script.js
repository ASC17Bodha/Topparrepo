document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    
    // Add starry background
    for (let i = 0; i < 150; i++) {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 3 + 1}s`;
      container.appendChild(star);
    }
  
    // Reset Cooper's fall for continuous replay
    const cooper = document.querySelector('.cooper');
    cooper.addEventListener('animationend', () => {
      cooper.style.top = '10%';
      cooper.style.opacity = '1';
      cooper.style.transform = 'translateX(-50%) scale(1) rotate(0deg)';
      cooper.style.animation = 'none';
      setTimeout(() => {
        cooper.style.animation = 'fallIntoBlackHole 7s linear forwards';
      }, 100);
    });
  });
  
  // Dynamic star styles
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    .star {
      position: absolute;
      width: 2px;
      height: 2px;
      background: #fff;
      animation: twinkle linear infinite;
      z-index: 0;
    }
  
    @keyframes twinkle {
      0%, 100% { opacity: 0.3; }
      50% { opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);