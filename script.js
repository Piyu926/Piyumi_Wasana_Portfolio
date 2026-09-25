// 1. Constellation Particle Background
function initGlobalConstellation() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let particlesArray = [];

  function setDimensions() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  setDimensions();

  window.addEventListener("resize", () => {
    setDimensions();
    createParticles();
  });

  const mouse = {
    x: null,
    y: null,
    radius: 140
  };

  window.addEventListener("mousemove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener("mouseleave", () => {
    mouse.x = null;
    mouse.y = null;
  });

  class Particle {
    constructor() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 1;
      this.speedX = (Math.random() - 0.5) * 0.9;
      this.speedY = (Math.random() - 0.5) * 0.9;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

      if (mouse.x && mouse.y) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          this.x -= (dx / distance) * 1.5;
          this.y -= (dy / distance) * 1.5;
        }
      }
    }

    draw() {
      ctx.fillStyle = "#38bdf8";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function createParticles() {
    particlesArray = [];
    const count = Math.min(Math.floor((canvas.width * canvas.height) / 14000), 100);
    for (let i = 0; i < count; i++) {
      particlesArray.push(new Particle());
    }
  }
  createParticles();

  function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x;
        const dy = particlesArray[a].y - particlesArray[b].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 120) {
          const opacity = (1 - distance / 120) * 0.35;
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
      particlesArray[i].draw();
    }
    connect();
    requestAnimationFrame(animate);
  }

  animate();
}

// --- 2. Typewriter Animation for Hero Section ---
const roles = [
  "SOFTWARE QUALITY ASSURANCE ENGINEER",
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 90;
const erasingSpeed = 40;
const delayBetweenRoles = 1600;
const typewriterElement = document.getElementById("typewriter");

function typeEffect() {
  if (!typewriterElement) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  let currentSpeed = isDeleting ? erasingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentRole.length) {
    currentSpeed = delayBetweenRoles;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    currentSpeed = 400;
  }

  setTimeout(typeEffect, currentSpeed);
}

// --- 3. Interactive Card Glow & Touch Highlight ---
const interactiveCards = document.querySelectorAll(".interactive-card");

interactiveCards.forEach((card) => {
  card.addEventListener("touchstart", () => {
    card.style.borderColor = "var(--cyan-primary)";
    card.style.boxShadow = "0 0 25px rgba(56, 189, 248, 0.35)";
  }, { passive: true });

  card.addEventListener("touchend", () => {
    setTimeout(() => {
      card.style.borderColor = "";
      card.style.boxShadow = "";
    }, 400);
  }, { passive: true });
});

// --- 4. Copy Verification Code Utility ---
function copyCode(codeText) {
  navigator.clipboard.writeText(codeText).then(() => {
    alert(`Verification code "${codeText}" copied to clipboard!`);
  }).catch((err) => {
    console.error("Copy failed", err);
  });
}

// --- 5. Contact Form Handler (Mock Submission) ---
function handleFormSubmit(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const userEmail = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const myEmail = "piyumiwasana926@gmail.com";
  
  const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
  const body = encodeURIComponent(
    `Name: ${name}\n` +
    `Sender Email: ${userEmail}\n\n` +
    `Message:\n${message}`
  );

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${myEmail}&su=${subject}&body=${body}`;
  window.open(gmailUrl, "_blank");

  alert("Opening Gmail to send your message...");
  document.getElementById("contactForm").reset();
}

// --- 6. Mobile Navigation Toggle (Single & Clean) ---
function setupMobileNav() {
  const mobileToggle = document.getElementById("mobileToggle");
  const navLinks = document.getElementById("navLinks");

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navLinks.classList.toggle("active");
      const icon = mobileToggle.querySelector("i");
      
      if (icon) {
        if (isOpen) {
          icon.className = "fas fa-times";
        } else {
          icon.className = "fas fa-bars";
        }
      }
    });

    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
        const icon = mobileToggle.querySelector("i");
        if (icon) {
          icon.className = "fas fa-bars";
        }
      });
    });
  }
}

// ==========================================
// Initialize on DOM Ready
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initGlobalConstellation();
  typeEffect();
  setupMobileNav();
});
