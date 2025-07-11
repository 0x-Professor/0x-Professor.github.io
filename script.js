// Global Variables
let scene, camera, renderer, raycaster, mouse;
let heroScene, heroCamera, heroRenderer;
let aboutScene, aboutCamera, aboutRenderer;
let skillsScene, skillsCamera, skillsRenderer;
let neuralNetwork, aiCore, rustGears, securityShield;
let particles = [];
let animationId;

// Initialize Everything
document.addEventListener('DOMContentLoaded', function() {
    // Show loading screen
    showLoadingScreen();
    
    // Initialize all components with error handling
    try {
        // Set a maximum loading time
        const maxLoadingTime = 5000; // 5 seconds max
        
        // Initialize components that don't depend on external libraries first
        initializeNavigation();
        initializeTypingEffect();
        initializeScrollEffects();
        initializeParticles();
        initializeContactForm();
        
        // Initialize 3D components with fallback
        setTimeout(() => {
            try {
                if (typeof THREE !== 'undefined') {
                    initializeHero();
                    initializeAbout3D();
                    initializeSkills3D();
                    console.log('✅ 3D components initialized successfully');
                } else {
                    console.warn('⚠️ Three.js not loaded, skipping 3D components');
                }
            } catch (error) {
                console.error('❌ Error initializing 3D components:', error);
            }
            
            try {
                if (typeof gsap !== 'undefined') {
                    initializeAnimations();
                    console.log('✅ GSAP animations initialized successfully');
                } else {
                    console.warn('⚠️ GSAP not loaded, using fallback animations');
                }
            } catch (error) {
                console.error('❌ Error initializing animations:', error);
            }
            
            hideLoadingScreen();
        }, 2000);
        
        // Failsafe: Hide loading screen after maximum time
        setTimeout(() => {
            hideLoadingScreen();
            console.log('⏰ Loading screen hidden after timeout');
        }, maxLoadingTime);
        
    } catch (error) {
        console.error('❌ Critical error during initialization:', error);
        hideLoadingScreen();
    }
});

// Loading Screen Functions
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const typingText = document.querySelector('.typing-text');
    const loadingProgress = document.querySelector('.loading-progress');
    
    // Simulate loading progress
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress > 100) {
            progress = 100;
            clearInterval(progressInterval);
        }
        loadingProgress.style.width = progress + '%';
    }, 200);
    
    // Typing effect for loading text
    const texts = [
        'Initializing AI Security Matrix...',
        'Loading Neural Networks...',
        'Configuring Rust Modules...',
        'Establishing Secure Connection...',
        'Ready for Cybersecurity!'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    
    function typeText() {
        if (textIndex < texts.length) {
            if (charIndex < texts[textIndex].length) {
                typingText.textContent = texts[textIndex].substring(0, charIndex + 1);
                charIndex++;
                setTimeout(typeText, 50);
            } else {
                setTimeout(() => {
                    textIndex++;
                    charIndex = 0;
                    typeText();
                }, 500);
            }
        }
    }
    
    typeText();
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
        console.log('🎉 Loading screen hidden successfully');
    }
}

// Navigation Functions
function initializeNavigation() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggle = document.querySelector('.theme-toggle');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Theme toggle (placeholder for future implementation)
    themeToggle.addEventListener('click', () => {
        // Theme switching logic can be added here
        console.log('Theme toggle clicked');
    });
}

// Hero Section 3D Initialization
function initializeHero() {
    const canvas = document.getElementById('hero-3d-canvas');
    if (!canvas) return;
    
    // Scene setup
    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    heroRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    heroRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    heroRenderer.setClearColor(0x000000, 0);
    
    // Create AI Brain Model
    createAIBrain();
    
    // Create Neural Network Background
    createNeuralNetworkBackground();
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    heroScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00ff88, 1);
    directionalLight.position.set(5, 5, 5);
    heroScene.add(directionalLight);
    
    // Camera position
    heroCamera.position.z = 5;
    
    // Start animation loop
    animateHero();
}

function createAIBrain() {
    // Create main brain structure
    const brainGeometry = new THREE.SphereGeometry(1, 32, 32);
    const brainMaterial = new THREE.MeshPhongMaterial({
        color: 0x00ff88,
        transparent: true,
        opacity: 0.7,
        wireframe: true
    });
    
    const brain = new THREE.Mesh(brainGeometry, brainMaterial);
    heroScene.add(brain);
    
    // Create neural connections
    const connectionGeometry = new THREE.BufferGeometry();
    const connectionMaterial = new THREE.LineBasicMaterial({ color: 0x0066ff });
    
    const points = [];
    for (let i = 0; i < 100; i++) {
        const radius = 1.2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;
        
        points.push(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.sin(phi) * Math.sin(theta),
            radius * Math.cos(phi)
        );
    }
    
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(points, 3));
    const connections = new THREE.Points(connectionGeometry, new THREE.PointsMaterial({ color: 0x00ff88, size: 0.05 }));
    heroScene.add(connections);
    
    // Store references for animation
    neuralNetwork = { brain, connections };
}

function createNeuralNetworkBackground() {
    // Create floating particles
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 1000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = (Math.random() - 0.5) * 20;
        positions[i + 1] = (Math.random() - 0.5) * 20;
        positions[i + 2] = (Math.random() - 0.5) * 20;
        
        colors[i] = 0;
        colors[i + 1] = 1;
        colors[i + 2] = 0.5;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    const particleMaterial = new THREE.PointsMaterial({
        size: 0.02,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    heroScene.add(particleSystem);
    
    particles.push(particleSystem);
}

function animateHero() {
    if (!heroRenderer) return;
    
    const time = Date.now() * 0.001;
    
    // Animate neural network
    if (neuralNetwork) {
        neuralNetwork.brain.rotation.x = time * 0.5;
        neuralNetwork.brain.rotation.y = time * 0.3;
        neuralNetwork.connections.rotation.x = time * -0.3;
        neuralNetwork.connections.rotation.y = time * 0.5;
    }
    
    // Animate particles
    particles.forEach(particle => {
        particle.rotation.x = time * 0.2;
        particle.rotation.y = time * 0.1;
    });
    
    heroRenderer.render(heroScene, heroCamera);
    requestAnimationFrame(animateHero);
}

// About Section 3D
function initializeAbout3D() {
    const canvas = document.getElementById('about-3d-canvas');
    if (!canvas) return;
    
    aboutScene = new THREE.Scene();
    aboutCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    aboutRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    aboutRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    aboutRenderer.setClearColor(0x000000, 0);
    
    // Create Security Shield
    createSecurityShield();
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    aboutScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0x00d4ff, 1);
    directionalLight.position.set(5, 5, 5);
    aboutScene.add(directionalLight);
    
    aboutCamera.position.z = 5;
    animateAbout();
}

function createSecurityShield() {
    // Main shield geometry
    const shieldGeometry = new THREE.CylinderGeometry(0, 1.5, 2, 6);
    const shieldMaterial = new THREE.MeshPhongMaterial({
        color: 0x00d4ff,
        transparent: true,
        opacity: 0.6,
        wireframe: true
    });
    
    const shield = new THREE.Mesh(shieldGeometry, shieldMaterial);
    aboutScene.add(shield);
    
    // Security layers
    for (let i = 0; i < 5; i++) {
        const layerGeometry = new THREE.RingGeometry(0.5 + i * 0.3, 0.7 + i * 0.3, 16);
        const layerMaterial = new THREE.MeshBasicMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.3 - i * 0.05,
            side: THREE.DoubleSide
        });
        
        const layer = new THREE.Mesh(layerGeometry, layerMaterial);
        layer.position.y = i * 0.1;
        aboutScene.add(layer);
    }
    
    securityShield = shield;
}

function animateAbout() {
    if (!aboutRenderer) return;
    
    const time = Date.now() * 0.001;
    
    if (securityShield) {
        securityShield.rotation.x = time * 0.3;
        securityShield.rotation.y = time * 0.5;
    }
    
    aboutRenderer.render(aboutScene, aboutCamera);
    requestAnimationFrame(animateAbout);
}

// Skills Section 3D
function initializeSkills3D() {
    const canvas = document.getElementById('skills-3d-canvas');
    if (!canvas) return;
    
    skillsScene = new THREE.Scene();
    skillsCamera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
    skillsRenderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });
    skillsRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    skillsRenderer.setClearColor(0x000000, 0);
    
    // Create Rust Gears
    createRustGears();
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    skillsScene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xce422b, 1);
    directionalLight.position.set(5, 5, 5);
    skillsScene.add(directionalLight);
    
    skillsCamera.position.z = 5;
    animateSkills();
}

function createRustGears() {
    const gears = [];
    
    // Create multiple gears
    for (let i = 0; i < 3; i++) {
        const gearGeometry = new THREE.CylinderGeometry(1 - i * 0.2, 1 - i * 0.2, 0.2, 12);
        const gearMaterial = new THREE.MeshPhongMaterial({
            color: 0xce422b,
            transparent: true,
            opacity: 0.8 - i * 0.1
        });
        
        const gear = new THREE.Mesh(gearGeometry, gearMaterial);
        gear.position.z = i * 0.3;
        skillsScene.add(gear);
        gears.push(gear);
    }
    
    // Create gear teeth
    gears.forEach((gear, index) => {
        for (let j = 0; j < 12; j++) {
            const toothGeometry = new THREE.BoxGeometry(0.1, 0.3, 0.1);
            const toothMaterial = new THREE.MeshPhongMaterial({ color: 0xff6b00 });
            const tooth = new THREE.Mesh(toothGeometry, toothMaterial);
            
            const angle = (j / 12) * Math.PI * 2;
            tooth.position.x = Math.cos(angle) * (1 - index * 0.2);
            tooth.position.y = Math.sin(angle) * (1 - index * 0.2);
            tooth.position.z = index * 0.3;
            
            skillsScene.add(tooth);
        }
    });
    
    rustGears = gears;
}

function animateSkills() {
    if (!skillsRenderer) return;
    
    const time = Date.now() * 0.001;
    
    if (rustGears) {
        rustGears.forEach((gear, index) => {
            gear.rotation.z = time * (0.5 + index * 0.2) * (index % 2 === 0 ? 1 : -1);
        });
    }
    
    skillsRenderer.render(skillsScene, skillsCamera);
    requestAnimationFrame(animateSkills);
}

// Typing Effect
function initializeTypingEffect() {
    const typingElement = document.querySelector('.typing-animation');
    if (!typingElement) return;
    
    const texts = [
        'Cybersecurity Artisan & AI Security Researcher',
        'Red Team Specialist & Penetration Tester',
        'AI-Powered Exploit Developer',
        'Rust & Blockchain Developer',
        'CTF Champion & Payload Innovator'
    ];
    
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Scroll Effects
function initializeScrollEffects() {
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.getAttribute('data-width');
                skillBar.style.width = width;
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
    
    // Animate sections on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Particles System
function initializeParticles() {
    const createParticle = () => {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'fixed';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = '#00ff88';
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '1';
        
        const startX = Math.random() * window.innerWidth;
        const startY = window.innerHeight;
        const endY = -10;
        const duration = Math.random() * 3 + 2;
        
        particle.style.left = startX + 'px';
        particle.style.top = startY + 'px';
        
        document.body.appendChild(particle);
        
        // Animate particle
        particle.animate([
            { transform: 'translateY(0px)', opacity: 0 },
            { transform: 'translateY(-20px)', opacity: 1 },
            { transform: `translateY(${endY - startY}px)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        }).addEventListener('finish', () => {
            particle.remove();
        });
    };
    
    // Create particles periodically
    setInterval(createParticle, 500);
}

// Animations
function initializeAnimations() {
    // GSAP animations for elements
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate project cards
    gsap.from('.project-card', {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.projects-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animate stats
    gsap.from('.stat', {
        duration: 1,
        scale: 0.8,
        opacity: 0,
        stagger: 0.1,
        scrollTrigger: {
            trigger: '.about-stats',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animate contact items
    gsap.from('.contact-item', {
        duration: 1,
        x: -50,
        opacity: 0,
        stagger: 0.2,
        scrollTrigger: {
            trigger: '.contact-info',
            start: 'top 80%',
            toggleActions: 'play none none reverse'
        }
    });
    
    // Animate hero elements
    gsap.from('.hero-title', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        delay: 0.5
    });
    
    gsap.from('.hero-subtitle', {
        duration: 1.5,
        y: 30,
        opacity: 0,
        delay: 0.8
    });
    
    gsap.from('.hero-tags .tag', {
        duration: 1,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        delay: 1.2
    });
    
    gsap.from('.hero-buttons .btn', {
        duration: 1,
        y: 20,
        opacity: 0,
        stagger: 0.2,
        delay: 1.5
    });
}

// Contact Form
function initializeContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Simulate form submission
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            submitButton.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitButton.style.background = 'linear-gradient(45deg, #2ed573, #00ff88)';
            
            // Reset form
            form.reset();
            
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.style.background = 'linear-gradient(45deg, var(--primary-color), var(--secondary-color))';
            }, 3000);
        }, 2000);
    });
}

// Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.getElementById('neural-network-bg');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const matrix = "01RUST∀∇∈∞αβγδεζηθικλμνξοπρστυφχψω";
    const characters = matrix.split("");
    
    const fontSize = 10;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#00ff88';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    
    setInterval(draw, 35);
}

// Resize handlers
function handleResize() {
    if (heroRenderer) {
        const canvas = document.getElementById('hero-3d-canvas');
        heroCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    
    if (aboutRenderer) {
        const canvas = document.getElementById('about-3d-canvas');
        aboutCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        aboutCamera.updateProjectionMatrix();
        aboutRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
    
    if (skillsRenderer) {
        const canvas = document.getElementById('skills-3d-canvas');
        skillsCamera.aspect = canvas.clientWidth / canvas.clientHeight;
        skillsCamera.updateProjectionMatrix();
        skillsRenderer.setSize(canvas.clientWidth, canvas.clientHeight);
    }
}

window.addEventListener('resize', handleResize);

// Initialize matrix rain when page loads
window.addEventListener('load', () => {
    createMatrixRain();
});

// Performance monitoring
function monitorPerformance() {
    const stats = {
        fps: 0,
        memory: 0,
        drawCalls: 0
    };
    
    let lastTime = performance.now();
    let frames = 0;
    
    function updateStats() {
        const now = performance.now();
        frames++;
        
        if (now >= lastTime + 1000) {
            stats.fps = Math.round((frames * 1000) / (now - lastTime));
            frames = 0;
            lastTime = now;
            
            // Log performance occasionally
            if (Math.random() < 0.1) {
                console.log('Performance Stats:', stats);
            }
        }
        
        requestAnimationFrame(updateStats);
    }
    
    updateStats();
}

// Initialize performance monitoring
monitorPerformance();

// Error handling
window.addEventListener('error', (event) => {
    console.error('Portfolio Error:', event.error);
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Cleanup Three.js resources
    if (heroRenderer) {
        heroRenderer.dispose();
    }
    if (aboutRenderer) {
        aboutRenderer.dispose();
    }
    if (skillsRenderer) {
        skillsRenderer.dispose();
    }
});

// Easter eggs and fun interactions
document.addEventListener('keydown', (e) => {
    // Konami Code: ↑↑↓↓←→←→BA
    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
    
    if (!window.konamiSequence) {
        window.konamiSequence = [];
    }
    
    window.konamiSequence.push(e.code);
    
    if (window.konamiSequence.length > konamiCode.length) {
        window.konamiSequence = window.konamiSequence.slice(-konamiCode.length);
    }
    
    if (window.konamiSequence.join('') === konamiCode.join('')) {
        // Activate matrix mode
        document.body.style.filter = 'hue-rotate(120deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 5000);
        
        console.log('🎉 Matrix mode activated! Welcome to the real world, Neo.');
        window.konamiSequence = [];
    }
});

// Console welcome message
console.log(`
%c██████╗ ██╗  ██╗      ██████╗ ██████╗  ██████╗ ███████╗███████╗███████╗███████╗ ██████╗ ██████╗ 
██╔═══██╗╚██╗██╔╝      ██╔══██╗██╔══██╗██╔═══██╗██╔════╝██╔════╝██╔════╝██╔════╝██╔═══██╗██╔══██╗
██║   ██║ ╚███╔╝       ██████╔╝██████╔╝██║   ██║█████╗  █████╗  ███████╗███████╗██║   ██║██████╔╝
██║   ██║ ██╔██╗       ██╔═══╝ ██╔══██╗██║   ██║██╔══╝  ██╔══╝  ╚════██║╚════██║██║   ██║██╔══██╗
╚██████╔╝██╔╝ ██╗      ██║     ██║  ██║╚██████╔╝██║     ███████╗███████║███████║╚██████╔╝██║  ██║
 ╚═════╝ ╚═╝  ╚═╝      ╚═╝     ╚═╝  ╚═╝ ╚═════╝ ╚═╝     ╚══════╝╚══════╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝
`, 'color: #00ff88; font-family: monospace; font-size: 10px;');

console.log('%cWelcome to the Matrix! 🔰', 'color: #00ff88; font-size: 18px; font-weight: bold;');
console.log('%cCybersecurity Artisan & AI Security Researcher', 'color: #00d4ff; font-size: 14px;');
console.log('%cInterested in collaboration? Contact me at: contact@0x-professor.me', 'color: #ff6b00; font-size: 12px;');
console.log('%cTry the Konami Code for a surprise! ↑↑↓↓←→←→BA', 'color: #8b5cf6; font-size: 10px;');