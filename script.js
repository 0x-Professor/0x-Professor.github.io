/**
 * ULTRA-PREMIUM AI SECURITY PORTFOLIO
 * World-Class Interactive Experience
 * 3D Neural Networks + Real-time GitHub Integration + AI Console
 */

// ========================================
// GLOBAL CONFIGURATION & STATE
// ========================================

const CONFIG = {
    github: {
        username: '0x-Professor',
        apiBase: 'https://api.github.com',
        repos: [
            'XSS-ML-Generator',
            'Secure-GDrive-v2', 
            'transpiler',
            'CTF-AI-Solver',
            'Graph-Traversal-Visualizer',
            'DApp-BuyMeACoffee'
        ]
    },
    animations: {
        enableParticles: true,
        enable3D: true,
        enableGitHubUpdates: true,
        terminalSpeed: 50
    },
    theme: {
        colors: {
            primary: '#00ff88',
            secondary: '#0066ff',
            accent: '#ff0080',
            neural: '#ff1493',
            cyber: '#00d4ff'
        }
    }
};

// Global state management
const STATE = {
    isLoading: true,
    currentSection: 'hero',
    githubData: {},
    animations: {
        neural: null,
        particles: null,
        ambient: null
    },
    mouse: { x: 0, y: 0 },
    scrollY: 0,
    performance: {
        fps: 60,
        lastFrame: 0
    }
};

// ========================================
// UTILITY FUNCTIONS
// ========================================

const utils = {
    // Smooth scroll to section
    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
    },

    // Debounce function for performance
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    // Throttle function for scroll events
    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    // Random number generator
    random(min, max) {
        return Math.random() * (max - min) + min;
    },

    // Clamp function
    clamp(value, min, max) {
        return Math.min(Math.max(value, min), max);
    },

    // Linear interpolation
    lerp(start, end, factor) {
        return start + (end - start) * factor;
    },

    // Format number with animation
    animateNumber(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const startTime = performance.now();
        
        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            const easedProgress = this.easeOutCubic(progress);
            const currentValue = Math.floor(start + (target - start) * easedProgress);
            
            element.textContent = currentValue;
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        
        requestAnimationFrame(animate);
    },

    // Easing functions
    easeOutCubic(t) {
        return 1 - Math.pow(1 - t, 3);
    },

    easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
};

// ========================================
// TERMINAL LOADING SYSTEM
// ========================================

const TerminalLoader = {
    commands: [
        'Initializing AI Security Matrix...',
        'Loading Neural Network Models...',
        'Configuring Rust WASM Modules...',
        'Establishing GitHub API Connection...',
        'Optimizing WebGL Shaders...',
        'Activating Holographic Display...',
        'Synchronizing Quantum Processors...',
        'Calibrating Cybersecurity Protocols...',
        'Deploying Advanced Threat Detection...',
        'AI Security Portfolio Ready!'
    ],

    init() {
        this.terminal = document.getElementById('terminal-loader');
        this.output = document.getElementById('terminal-output');
        this.currentCommand = 0;
        this.startTime = Date.now();
        
        this.typeCommands();
    },

    typeCommands() {
        if (this.currentCommand < this.commands.length) {
            this.typeCommand(this.commands[this.currentCommand], () => {
                this.currentCommand++;
                setTimeout(() => this.typeCommands(), 300);
            });
        } else {
            setTimeout(() => this.hide(), 1000);
        }
    },

    typeCommand(command, callback) {
        const line = document.createElement('div');
        line.className = 'terminal-line';
        line.innerHTML = `<span class="terminal-prompt">root@0x-professor:~$ </span>`;
        
        const textSpan = document.createElement('span');
        textSpan.className = 'terminal-text';
        line.appendChild(textSpan);
        
        this.output.appendChild(line);
        
        let index = 0;
        const typeChar = () => {
            if (index < command.length) {
                textSpan.textContent += command[index];
                index++;
                setTimeout(typeChar, CONFIG.animations.terminalSpeed);
            } else {
                this.output.scrollTop = this.output.scrollHeight;
                setTimeout(callback, 200);
            }
        };
        
        typeChar();
    },

    hide() {
        this.terminal.style.opacity = '0';
        setTimeout(() => {
            this.terminal.style.display = 'none';
            STATE.isLoading = false;
            this.onLoadComplete();
        }, 500);
    },

    onLoadComplete() {
        // Initialize main application
        App.init();
        
        // Start performance monitoring
        PerformanceMonitor.start();
        
        // Load GitHub data
        GitHubAPI.loadData();
        
        // Initialize AI console
        AIConsole.init();
        
        console.log('%c🚀 AI Security Portfolio Loaded Successfully!', 'color: #00ff88; font-size: 18px; font-weight: bold;');
    }
};

// ========================================
// CUSTOM CURSOR SYSTEM
// ========================================

const CustomCursor = {
    init() {
        this.cursor = document.querySelector('.cyber-cursor');
        this.core = document.querySelector('.cursor-core');
        this.particles = document.querySelector('.cursor-particles');
        
        this.mouse = { x: 0, y: 0 };
        this.cursorPos = { x: 0, y: 0 };
        
        this.bindEvents();
        this.animate();
    },

    bindEvents() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            this.cursor.style.opacity = '0';
        });

        document.addEventListener('mouseenter', () => {
            this.cursor.style.opacity = '1';
        });

        // Cursor interactions
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-item');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
            });
            
            element.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
            });
        });
    },

    animate() {
        // Smooth cursor following
        this.cursorPos.x = utils.lerp(this.cursorPos.x, this.mouse.x, 0.1);
        this.cursorPos.y = utils.lerp(this.cursorPos.y, this.mouse.y, 0.1);
        
        this.cursor.style.left = this.cursorPos.x + 'px';
        this.cursor.style.top = this.cursorPos.y + 'px';
        
        requestAnimationFrame(() => this.animate());
    }
};

// ========================================
// AMBIENT BACKGROUND SYSTEM
// ========================================

const AmbientBackground = {
    init() {
        this.canvas = document.getElementById('ambient-canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouseInfluence = { x: 0, y: 0 };
        
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    createParticles() {
        const count = Math.floor((this.canvas.width * this.canvas.height) / 8000);
        
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: utils.random(-0.5, 0.5),
                vy: utils.random(-0.5, 0.5),
                size: utils.random(0.5, 2),
                opacity: utils.random(0.1, 0.6),
                color: this.getRandomColor(),
                connectionDistance: utils.random(80, 150)
            });
        }
    },

    getRandomColor() {
        const colors = ['#00ff88', '#0066ff', '#ff0080', '#8b5cf6', '#00d4ff'];
        return colors[Math.floor(Math.random() * colors.length)];
    },

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        
        document.addEventListener('mousemove', (e) => {
            this.mouseInfluence.x = e.clientX;
            this.mouseInfluence.y = e.clientY;
        });
    },

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update particles
        this.particles.forEach(particle => {
            // Mouse influence
            const dx = this.mouseInfluence.x - particle.x;
            const dy = this.mouseInfluence.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += (dx / distance) * force * 0.01;
                particle.vy += (dy / distance) * force * 0.01;
            }
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Boundary check
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Damping
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            this.ctx.restore();
        });
        
        // Draw connections
        this.drawConnections();
        
        STATE.animations.ambient = requestAnimationFrame(() => this.animate());
    },

    drawConnections() {
        this.particles.forEach((particle, i) => {
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < particle.connectionDistance) {
                    const opacity = (particle.connectionDistance - distance) / particle.connectionDistance;
                    
                    this.ctx.save();
                    this.ctx.globalAlpha = opacity * 0.3;
                    this.ctx.strokeStyle = particle.color;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                    this.ctx.restore();
                }
            }
        });
    }
};

// ========================================
// NEURAL NETWORK 3D VISUALIZATION
// ========================================

const NeuralNetwork3D = {
    init() {
        this.canvas = document.getElementById('neural-brain-canvas');
        if (!this.canvas) return;
        
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.canvas.clientWidth / this.canvas.clientHeight, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ 
            canvas: this.canvas, 
            alpha: true, 
            antialias: true 
        });
        
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        this.renderer.setClearColor(0x000000, 0);
        
        this.createNeuralBrain();
        this.setupLighting();
        this.bindEvents();
        this.animate();
    },

    createNeuralBrain() {
        // Main brain structure
        const brainGeometry = new THREE.IcosahedronGeometry(1.5, 2);
        const brainMaterial = new THREE.MeshPhongMaterial({
            color: 0x00ff88,
            transparent: true,
            opacity: 0.6,
            wireframe: true
        });
        
        this.brain = new THREE.Mesh(brainGeometry, brainMaterial);
        this.scene.add(this.brain);
        
        // Neural connections
        this.connections = new THREE.Group();
        this.createConnections();
        this.scene.add(this.connections);
        
        // Floating neurons
        this.neurons = new THREE.Group();
        this.createNeurons();
        this.scene.add(this.neurons);
        
        // Holographic rings
        this.rings = new THREE.Group();
        this.createHolographicRings();
        this.scene.add(this.rings);
    },

    createConnections() {
        const connectionCount = 100;
        const positions = new Float32Array(connectionCount * 6);
        const colors = new Float32Array(connectionCount * 6);
        
        for (let i = 0; i < connectionCount; i++) {
            // Random points on sphere surface
            const radius = 1.8;
            const theta1 = Math.random() * Math.PI * 2;
            const phi1 = Math.random() * Math.PI;
            const theta2 = Math.random() * Math.PI * 2;
            const phi2 = Math.random() * Math.PI;
            
            const x1 = radius * Math.sin(phi1) * Math.cos(theta1);
            const y1 = radius * Math.sin(phi1) * Math.sin(theta1);
            const z1 = radius * Math.cos(phi1);
            
            const x2 = radius * Math.sin(phi2) * Math.cos(theta2);
            const y2 = radius * Math.sin(phi2) * Math.sin(theta2);
            const z2 = radius * Math.cos(phi2);
            
            positions[i * 6] = x1;
            positions[i * 6 + 1] = y1;
            positions[i * 6 + 2] = z1;
            positions[i * 6 + 3] = x2;
            positions[i * 6 + 4] = y2;
            positions[i * 6 + 5] = z2;
            
            // Random colors
            const color = new THREE.Color().setHSL(0.3 + Math.random() * 0.3, 0.8, 0.6);
            colors[i * 6] = color.r;
            colors[i * 6 + 1] = color.g;
            colors[i * 6 + 2] = color.b;
            colors[i * 6 + 3] = color.r;
            colors[i * 6 + 4] = color.g;
            colors[i * 6 + 5] = color.b;
        }
        
        const connectionGeometry = new THREE.BufferGeometry();
        connectionGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        connectionGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        
        const connectionMaterial = new THREE.LineBasicMaterial({ 
            vertexColors: true, 
            transparent: true, 
            opacity: 0.6 
        });
        
        const connectionLines = new THREE.LineSegments(connectionGeometry, connectionMaterial);
        this.connections.add(connectionLines);
    },

    createNeurons() {
        const neuronCount = 50;
        const neuronGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const neuronMaterial = new THREE.MeshPhongMaterial({
            color: 0x00d4ff,
            transparent: true,
            opacity: 0.8
        });
        
        for (let i = 0; i < neuronCount; i++) {
            const neuron = new THREE.Mesh(neuronGeometry, neuronMaterial);
            
            // Position neurons randomly in space
            const radius = utils.random(2, 3);
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;
            
            neuron.position.set(
                radius * Math.sin(phi) * Math.cos(theta),
                radius * Math.sin(phi) * Math.sin(theta),
                radius * Math.cos(phi)
            );
            
            neuron.userData = {
                originalPosition: neuron.position.clone(),
                speed: utils.random(0.5, 1.5),
                radius: utils.random(0.5, 1.5)
            };
            
            this.neurons.add(neuron);
        }
    },

    createHolographicRings() {
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.RingGeometry(2 + i * 0.5, 2.1 + i * 0.5, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0x00ff88,
                transparent: true,
                opacity: 0.2 - i * 0.05,
                side: THREE.DoubleSide
            });
            
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.rotation.x = Math.PI / 2;
            ring.position.y = (i - 1) * 0.3;
            
            this.rings.add(ring);
        }
    },

    setupLighting() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
        this.scene.add(ambientLight);
        
        // Directional light
        const directionalLight = new THREE.DirectionalLight(0x00ff88, 1);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);
        
        // Point lights for dynamic lighting
        const pointLight1 = new THREE.PointLight(0x0066ff, 0.8, 10);
        pointLight1.position.set(-3, 2, 3);
        this.scene.add(pointLight1);
        
        const pointLight2 = new THREE.PointLight(0xff0080, 0.6, 8);
        pointLight2.position.set(3, -2, -3);
        this.scene.add(pointLight2);
    },

    bindEvents() {
        window.addEventListener('resize', () => {
            this.camera.aspect = this.canvas.clientWidth / this.canvas.clientHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
        });
        
        // Mouse interaction
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const mouseX = (e.clientX - rect.left) / rect.width * 2 - 1;
            const mouseY = -(e.clientY - rect.top) / rect.height * 2 + 1;
            
            this.brain.rotation.y = mouseX * 0.5;
            this.brain.rotation.x = mouseY * 0.3;
        });
    },

    animate() {
        const time = Date.now() * 0.001;
        
        // Rotate main brain
        this.brain.rotation.x += 0.005;
        this.brain.rotation.y += 0.003;
        
        // Animate connections
        this.connections.rotation.x = time * 0.1;
        this.connections.rotation.y = time * 0.15;
        
        // Animate neurons
        this.neurons.children.forEach((neuron, index) => {
            const userData = neuron.userData;
            const offset = time * userData.speed + index * 0.5;
            
            neuron.position.x = userData.originalPosition.x + Math.sin(offset) * userData.radius;
            neuron.position.y = userData.originalPosition.y + Math.cos(offset * 0.8) * userData.radius;
            neuron.position.z = userData.originalPosition.z + Math.sin(offset * 1.2) * userData.radius;
        });
        
        // Animate rings
        this.rings.children.forEach((ring, index) => {
            ring.rotation.z = time * (0.2 + index * 0.1);
        });
        
        // Camera position
        this.camera.position.z = 5;
        this.camera.lookAt(0, 0, 0);
        
        this.renderer.render(this.scene, this.camera);
        STATE.animations.neural = requestAnimationFrame(() => this.animate());
    }
};

// ========================================
// GITHUB API INTEGRATION
// ========================================

const GitHubAPI = {
    async loadData() {
        try {
            const promises = CONFIG.github.repos.map(repo => this.fetchRepoData(repo));
            const results = await Promise.all(promises);
            
            results.forEach((data, index) => {
                if (data) {
                    STATE.githubData[CONFIG.github.repos[index]] = data;
                }
            });
            
            this.updateUI();
        } catch (error) {
            console.error('GitHub API Error:', error);
        }
    },

    async fetchRepoData(repo) {
        try {
            const response = await fetch(`${CONFIG.github.apiBase}/repos/${CONFIG.github.username}/${repo}`);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            
            const data = await response.json();
            return {
                name: data.name,
                description: data.description,
                stars: data.stargazers_count,
                forks: data.forks_count,
                language: data.language,
                updated: data.updated_at,
                url: data.html_url
            };
        } catch (error) {
            console.error(`Error fetching ${repo}:`, error);
            return null;
        }
    },

    updateUI() {
        // Update project metrics
        document.querySelectorAll('[data-github="stars"]').forEach(element => {
            const repoName = element.closest('.project-card').dataset.project;
            const mapping = this.getRepoMapping(repoName);
            
            if (mapping && STATE.githubData[mapping]) {
                const stars = STATE.githubData[mapping].stars;
                utils.animateNumber(element, stars);
            }
        });
        
        document.querySelectorAll('[data-github="forks"]').forEach(element => {
            const repoName = element.closest('.project-card').dataset.project;
            const mapping = this.getRepoMapping(repoName);
            
            if (mapping && STATE.githubData[mapping]) {
                const forks = STATE.githubData[mapping].forks;
                utils.animateNumber(element, forks);
            }
        });
        
        console.log('GitHub data updated:', STATE.githubData);
    },

    getRepoMapping(projectId) {
        const mapping = {
            'xss-ml': 'XSS-ML-Generator',
            'secure-gdrive': 'Secure-GDrive-v2',
            'evm-transpiler': 'transpiler',
            'ctf-solver': 'CTF-AI-Solver',
            'graph-visualizer': 'Graph-Traversal-Visualizer',
            'buymecoffee-dapp': 'DApp-BuyMeACoffee'
        };
        
        return mapping[projectId];
    }
};

// ========================================
// AI CONSOLE SYSTEM
// ========================================

const AIConsole = {
    commands: {
        help: 'Show available commands',
        about: 'Display information about 0x-Professor',
        projects: 'List all projects',
        skills: 'Show technical skills',
        github: 'Display GitHub statistics',
        matrix: 'Enter the Matrix (Easter egg)',
        hack: 'Initiate security scan',
        neural: 'Activate neural network analysis',
        rust: 'Show Rust project information',
        ai: 'AI security insights',
        clear: 'Clear console output',
        exit: 'Close AI console'
    },

    init() {
        this.modal = document.getElementById('ai-console');
        this.output = document.getElementById('console-output');
        this.input = document.getElementById('console-input');
        this.isActive = false;
        this.commandHistory = [];
        this.historyIndex = -1;
        
        this.bindEvents();
        this.displayWelcome();
    },

    bindEvents() {
        // Toggle console
        document.getElementById('ai-console-toggle').addEventListener('click', () => {
            this.toggle();
        });
        
        // Input handling
        this.input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.executeCommand(this.input.value.trim());
                this.input.value = '';
            } else if (e.key === 'ArrowUp') {
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                this.navigateHistory('down');
            }
        });
        
        // Close button
        document.querySelector('.console-close').addEventListener('click', () => {
            this.close();
        });
        
        // Click outside to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    },

    toggle() {
        if (this.isActive) {
            this.close();
        } else {
            this.open();
        }
    },

    open() {
        this.modal.classList.add('active');
        this.isActive = true;
        setTimeout(() => {
            this.input.focus();
        }, 100);
    },

    close() {
        this.modal.classList.remove('active');
        this.isActive = false;
    },

    displayWelcome() {
        const welcome = `
╔══════════════════════════════════════════════════════════════╗
║                    AI SECURITY CONSOLE                      ║
║                    0x-Professor v2.0                        ║
╚══════════════════════════════════════════════════════════════╝

Welcome to the AI Security Console!
Type 'help' for available commands.

> System Status: OPERATIONAL
> Security Level: MAXIMUM
> AI Modules: ACTIVE
        `;
        
        this.addOutput(welcome, 'system');
    },

    executeCommand(command) {
        if (!command) return;
        
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
        
        this.addOutput(`> ${command}`, 'user');
        
        const [cmd, ...args] = command.toLowerCase().split(' ');
        
        switch (cmd) {
            case 'help':
                this.showHelp();
                break;
            case 'about':
                this.showAbout();
                break;
            case 'projects':
                this.showProjects();
                break;
            case 'skills':
                this.showSkills();
                break;
            case 'github':
                this.showGitHub();
                break;
            case 'matrix':
                this.enterMatrix();
                break;
            case 'hack':
                this.initiateHack();
                break;
            case 'neural':
                this.activateNeural();
                break;
            case 'rust':
                this.showRust();
                break;
            case 'ai':
                this.showAI();
                break;
            case 'clear':
                this.clearOutput();
                break;
            case 'exit':
                this.close();
                break;
            default:
                this.addOutput(`Command not found: ${cmd}. Type 'help' for available commands.`, 'error');
        }
    },

    showHelp() {
        let helpText = 'Available Commands:\n\n';
        Object.entries(this.commands).forEach(([cmd, desc]) => {
            helpText += `${cmd.padEnd(12)} - ${desc}\n`;
        });
        this.addOutput(helpText, 'system');
    },

    showAbout() {
        const about = `
Muhammad Mazhar Saeed (0x-Professor)
=====================================

🔐 AI Security Researcher & Cybersecurity Artisan
🌍 Location: Islamabad, Pakistan
🎯 Specialization: AI-assisted exploit techniques
⚡ Skills: Machine Learning, Rust, Blockchain, Red Team Operations
🏆 CTF Enthusiast & Payload Innovator

"Pioneering the intersection of AI and Cybersecurity"
        `;
        this.addOutput(about, 'info');
    },

    showProjects() {
        const projects = `
Featured Projects:
=================

🧠 XSS-ML-Generator      - AI-powered XSS payload generator
🔒 Secure-GDrive-v2      - IPFS + Ethereum + AES encryption
⚙️  EVM-to-RISC-V        - Blockchain bytecode transpiler
🏆 AI-Powered CTF Solver - Intelligent CTF automation
📊 Graph Visualizer Qt   - Algorithm visualization tool
☕ DApp-BuyMeACoffee     - Ethereum smart contract DApp
        `;
        this.addOutput(projects, 'info');
    },

    showSkills() {
        const skills = `
Technical Arsenal:
=================

🤖 AI & Machine Learning
   • Machine Learning      95%
   • Neural Networks       90%
   • AI Security          92%

🛡️  Cybersecurity
   • Penetration Testing  96%
   • Red Team Operations  94%
   • Web App Security     98%

💻 Programming Languages
   • Python               95%
   • Rust                 88%
   • C++                  90%
   • TypeScript           85%
   • Solidity             82%

🔗 Blockchain & DApps
   • Ethereum Development 87%
   • Smart Contracts      85%
   • Web3 Integration     83%
        `;
        this.addOutput(skills, 'info');
    },

    showGitHub() {
        const github = `
GitHub Statistics:
=================

📊 Repository Data:
${Object.entries(STATE.githubData).map(([repo, data]) => 
    `   ${repo}: ⭐ ${data.stars} stars, 🍴 ${data.forks} forks`
).join('\n')}

📈 Total Impact:
   • Active Projects: ${Object.keys(STATE.githubData).length}
   • Community Reach: Growing
   • Open Source Contributions: Active
        `;
        this.addOutput(github, 'success');
    },

    enterMatrix() {
        this.addOutput('Entering the Matrix...', 'system');
        
        setTimeout(() => {
            document.body.style.filter = 'hue-rotate(120deg) invert(1)';
            this.addOutput('Welcome to the real world, Neo.', 'matrix');
            
            setTimeout(() => {
                document.body.style.filter = 'none';
                this.addOutput('Exiting Matrix... Reality restored.', 'system');
            }, 3000);
        }, 1000);
    },

    initiateHack() {
        const hackSequence = [
            'Initializing security scan...',
            'Probing target systems...',
            'Analyzing vulnerabilities...',
            'Bypassing security measures...',
            'Access granted: Welcome, 0x-Professor',
            'Remember: Use your powers responsibly! 🛡️'
        ];
        
        this.addOutput('🚨 SECURITY SCAN INITIATED 🚨', 'warning');
        
        hackSequence.forEach((msg, index) => {
            setTimeout(() => {
                this.addOutput(msg, index === hackSequence.length - 1 ? 'success' : 'system');
            }, (index + 1) * 800);
        });
    },

    activateNeural() {
        this.addOutput('🧠 Activating Neural Network Analysis...', 'system');
        
        setTimeout(() => {
            const analysis = `
Neural Network Status:
=====================

🔄 Processing Patterns: ACTIVE
🎯 Pattern Recognition: 98.5% accuracy
🧬 AI Model Training: IN PROGRESS
⚡ Neural Pathways: 1,247,891 connections
🔮 Predictive Analysis: OPERATIONAL

Current Focus: Advanced threat detection and AI-assisted exploit generation
            `;
            this.addOutput(analysis, 'neural');
        }, 1500);
    },

    showRust() {
        const rust = `
🦀 Rust Development Portfolio:
=============================

⚡ Performance Focus:
   • EVM-to-RISC-V Transpiler - Ultra-fast bytecode conversion
   • Memory Safety Guaranteed - Zero-cost abstractions
   • System Programming - Low-level optimization

🔧 Technical Skills:
   • Rust Proficiency: 88%
   • WebAssembly Integration: Advanced
   • Performance Optimization: Expert
   • Concurrency & Safety: Mastery

🎯 Current Projects:
   • Blockchain analysis tools
   • High-performance security utilities
   • WebAssembly modules for browser demos
        `;
        this.addOutput(rust, 'rust');
    },

    showAI() {
        const ai = `
🤖 AI Security Insights:
=======================

🎯 Current Research:
   • AI-assisted exploit generation
   • Neural network vulnerability analysis
   • Machine learning for threat detection
   • Automated security testing

💡 Key Innovations:
   • XSS-ML-Generator: 95% bypass success rate
   • Pattern recognition for zero-day discovery
   • AI-powered CTF solving algorithms
   • Intelligent payload optimization

🔮 Future Vision:
   • Autonomous security systems
   • AI-driven red team operations
   • Next-gen threat prediction models
        `;
        this.addOutput(ai, 'ai');
    },

    clearOutput() {
        this.output.innerHTML = '';
        this.displayWelcome();
    },

    addOutput(text, type = 'default') {
        const div = document.createElement('div');
        div.className = `console-line console-${type}`;
        div.textContent = text;
        this.output.appendChild(div);
        this.output.scrollTop = this.output.scrollHeight;
    },

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.input.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.input.value = this.commandHistory[this.historyIndex];
        }
    }
};

// ========================================
// NAVIGATION SYSTEM
// ========================================

const Navigation = {
    init() {
        this.nav = document.getElementById('main-nav');
        this.links = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        this.activeSection = 'hero';
        
        this.bindEvents();
        this.updateActiveSection();
    },

    bindEvents() {
        // Navigation links
        this.links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                utils.scrollToSection(targetId);
            });
        });
        
        // Scroll spy
        window.addEventListener('scroll', utils.throttle(() => {
            this.updateActiveSection();
            this.updateNavbarStyle();
        }, 100));
        
        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });
    },

    updateActiveSection() {
        const scrollPos = window.scrollY + 100;
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.setActiveSection(sectionId);
            }
        });
    },

    setActiveSection(sectionId) {
        if (this.activeSection === sectionId) return;
        
        this.activeSection = sectionId;
        
        this.links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
                link.classList.add('active');
            }
        });
        
        STATE.currentSection = sectionId;
    },

    updateNavbarStyle() {
        if (window.scrollY > 50) {
            this.nav.classList.add('scrolled');
        } else {
            this.nav.classList.remove('scrolled');
        }
    },

    toggleTheme() {
        document.body.classList.toggle('light-theme');
        const themeToggle = document.getElementById('theme-toggle');
        const isDark = !document.body.classList.contains('light-theme');
        
        themeToggle.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        // Store preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
};

// ========================================
// TYPING ANIMATION SYSTEM
// ========================================

const TypingAnimation = {
    init() {
        this.roleElement = document.getElementById('role-text');
        this.roles = [
            'AI Security Researcher',
            'Cybersecurity Artisan',
            'Red Team Specialist',
            'Machine Learning Engineer',
            'Blockchain Developer',
            'Rust Systems Programmer',
            'CTF Champion',
            'Payload Innovator'
        ];
        
        this.currentRole = 0;
        this.isDeleting = false;
        this.currentText = '';
        this.typeSpeed = 100;
        
        this.startTyping();
    },

    startTyping() {
        const fullText = this.roles[this.currentRole];
        
        if (this.isDeleting) {
            this.currentText = fullText.substring(0, this.currentText.length - 1);
        } else {
            this.currentText = fullText.substring(0, this.currentText.length + 1);
        }
        
        this.roleElement.textContent = this.currentText;
        
        let speed = this.typeSpeed;
        
        if (this.isDeleting) {
            speed /= 2;
        }
        
        if (!this.isDeleting && this.currentText === fullText) {
            speed = 2000; // Pause at end
            this.isDeleting = true;
        } else if (this.isDeleting && this.currentText === '') {
            this.isDeleting = false;
            this.currentRole = (this.currentRole + 1) % this.roles.length;
            speed = 500;
        }
        
        setTimeout(() => this.startTyping(), speed);
    }
};

// ========================================
// SCROLL ANIMATIONS
// ========================================

const ScrollAnimations = {
    init() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    
                    // Trigger specific animations
                    if (entry.target.classList.contains('skill-bar')) {
                        this.animateSkillBar(entry.target);
                    }
                    
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateStatNumber(entry.target);
                    }
                }
            });
        }, this.observerOptions);
        
        this.observeElements();
    },

    observeElements() {
        // Observe sections
        document.querySelectorAll('section').forEach(section => {
            this.observer.observe(section);
        });
        
        // Observe cards
        document.querySelectorAll('.project-card, .skill-category, .contact-card').forEach(card => {
            this.observer.observe(card);
        });
        
        // Observe skill bars
        document.querySelectorAll('.skill-bar').forEach(bar => {
            this.observer.observe(bar);
        });
        
        // Observe stat numbers
        document.querySelectorAll('.stat-number').forEach(stat => {
            this.observer.observe(stat);
        });
    },

    animateSkillBar(bar) {
        const skillLevel = bar.getAttribute('data-skill');
        setTimeout(() => {
            bar.style.width = `${skillLevel}%`;
        }, 300);
    },

    animateStatNumber(element) {
        const target = parseInt(element.getAttribute('data-count'));
        if (target) {
            utils.animateNumber(element, target);
        }
    }
};

// ========================================
// PROJECT DEMOS
// ========================================

const ProjectDemos = {
    init() {
        this.modal = document.getElementById('project-demo-modal');
        this.content = document.getElementById('demo-content');
        this.bindEvents();
    },

    bindEvents() {
        // Close modal
        document.querySelector('.demo-close').addEventListener('click', () => {
            this.close();
        });
        
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    },

    open(projectId) {
        this.modal.classList.add('active');
        this.loadDemo(projectId);
    },

    close() {
        this.modal.classList.remove('active');
        this.content.innerHTML = '';
    },

    loadDemo(projectId) {
        const demos = {
            'xss-ml': this.createXSSDemo(),
            'secure-gdrive': this.createSecureGDriveDemo(),
            'evm-transpiler': this.createEVMDemo(),
            'ctf-solver': this.createCTFDemo(),
            'graph-visualizer': this.createGraphDemo(),
            'buymecoffee-dapp': this.createDAppDemo()
        };
        
        this.content.innerHTML = demos[projectId] || this.createComingSoonDemo();
    },

    createXSSDemo() {
        return `
            <div class="demo-container">
                <h3>🧠 XSS-ML-Generator Demo</h3>
                <p>AI-powered XSS payload generation using neural networks</p>
                
                <div class="demo-interface">
                    <div class="demo-input">
                        <label>Target Context:</label>
                        <select id="xss-context">
                            <option>HTML Attribute</option>
                            <option>JavaScript String</option>
                            <option>URL Parameter</option>
                            <option>HTML Tag</option>
                        </select>
                    </div>
                    
                    <div class="demo-input">
                        <label>Filter Bypass:</label>
                        <input type="text" placeholder="Enter filters to bypass...">
                    </div>
                    
                    <button class="btn btn-primary" onclick="ProjectDemos.generateXSSPayload()">
                        Generate AI Payload
                    </button>
                    
                    <div class="demo-output" id="xss-output">
                        <div class="placeholder">Click "Generate AI Payload" to see results</div>
                    </div>
                </div>
            </div>
        `;
    },

    createSecureGDriveDemo() {
        return `
            <div class="demo-container">
                <h3>🔒 Secure-GDrive-v2 Demo</h3>
                <p>Decentralized file sharing with IPFS + Ethereum + AES</p>
                
                <div class="demo-interface">
                    <div class="demo-section">
                        <h4>🔐 Security Features</h4>
                        <ul>
                            <li>✅ AES-256 Encryption</li>
                            <li>✅ IPFS Distributed Storage</li>
                            <li>✅ Ethereum Smart Contract</li>
                            <li>✅ Zero-Knowledge Proof</li>
                        </ul>
                    </div>
                    
                    <div class="demo-section">
                        <h4>🌐 Network Status</h4>
                        <div class="status-grid">
                            <div class="status-item">
                                <span class="status-label">IPFS:</span>
                                <span class="status-value online">ONLINE</span>
                            </div>
                            <div class="status-item">
                                <span class="status-label">Ethereum:</span>
                                <span class="status-value online">CONNECTED</span>
                            </div>
                            <div class="status-item">
                                <span class="status-label">Encryption:</span>
                                <span class="status-value online">ACTIVE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    createEVMDemo() {
        return `
            <div class="demo-container">
                <h3>⚙️ EVM-to-RISC-V Transpiler Demo</h3>
                <p>High-performance bytecode transpilation with Rust</p>
                
                <div class="demo-interface">
                    <div class="demo-input">
                        <label>EVM Bytecode:</label>
                        <textarea placeholder="Enter EVM bytecode..." rows="5">608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610221806100606000396000f3fe</textarea>
                    </div>
                    
                    <button class="btn btn-primary" onclick="ProjectDemos.transpileEVM()">
                        🦀 Transpile to RISC-V
                    </button>
                    
                    <div class="demo-output" id="evm-output">
                        <div class="placeholder">RISC-V assembly will appear here</div>
                    </div>
                    
                    <div class="demo-stats">
                        <div class="stat">
                            <span class="stat-label">Performance:</span>
                            <span class="stat-value">🚀 15x faster</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Memory:</span>
                            <span class="stat-value">💾 80% reduction</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    createCTFDemo() {
        return `
            <div class="demo-container">
                <h3>🏆 AI-Powered CTF Solver Demo</h3>
                <p>Intelligent challenge solving with ML algorithms</p>
                
                <div class="demo-interface">
                    <div class="demo-section">
                        <h4>🎯 Challenge Analysis</h4>
                        <div class="challenge-input">
                            <textarea placeholder="Paste CTF challenge here..." rows="6">
The flag is hidden in this encoded message: 
V2VsY29tZSB0byB0aGUgQUkgU2VjdXJpdHkgQ29uc29sZSE=
Hint: It's not what it seems...
                            </textarea>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="ProjectDemos.solveCTF()">
                        🧠 Analyze with AI
                    </button>
                    
                    <div class="demo-output" id="ctf-output">
                        <div class="placeholder">AI analysis will appear here</div>
                    </div>
                </div>
            </div>
        `;
    },

    createGraphDemo() {
        return `
            <div class="demo-container">
                <h3>📊 Graph Visualizer Qt Demo</h3>
                <p>Interactive algorithm visualization with C++ and Qt</p>
                
                <div class="demo-interface">
                    <div class="demo-controls">
                        <button class="btn btn-secondary" onclick="ProjectDemos.runBFS()">Run BFS</button>
                        <button class="btn btn-secondary" onclick="ProjectDemos.runDFS()">Run DFS</button>
                        <button class="btn btn-secondary" onclick="ProjectDemos.runDijkstra()">Run Dijkstra</button>
                    </div>
                    
                    <div class="demo-canvas">
                        <canvas id="graph-canvas" width="500" height="300"></canvas>
                    </div>
                    
                    <div class="demo-stats">
                        <div class="stat">
                            <span class="stat-label">Nodes:</span>
                            <span class="stat-value">8</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Edges:</span>
                            <span class="stat-value">12</span>
                        </div>
                        <div class="stat">
                            <span class="stat-label">Algorithm:</span>
                            <span class="stat-value">None</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    createDAppDemo() {
        return `
            <div class="demo-container">
                <h3>☕ DApp-BuyMeACoffee Demo</h3>
                <p>Ethereum smart contract for coffee donations</p>
                
                <div class="demo-interface">
                    <div class="demo-section">
                        <h4>☕ Buy Me A Coffee</h4>
                        <div class="coffee-form">
                            <input type="text" placeholder="Your name" class="demo-input">
                            <textarea placeholder="Leave a message..." rows="3" class="demo-input"></textarea>
                            <div class="coffee-amount">
                                <label>Amount (ETH):</label>
                                <input type="number" step="0.001" placeholder="0.001" class="demo-input">
                            </div>
                        </div>
                    </div>
                    
                    <button class="btn btn-primary" onclick="ProjectDemos.buyMeACoffee()">
                        ☕ Buy Coffee (Demo)
                    </button>
                    
                    <div class="demo-section">
                        <h4>📊 Coffee Statistics</h4>
                        <div class="stats-grid">
                            <div class="stat-card">
                                <div class="stat-number">42</div>
                                <div class="stat-label">Total Coffees</div>
                            </div>
                            <div class="stat-card">
                                <div class="stat-number">1.25</div>
                                <div class="stat-label">ETH Donated</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    },

    createComingSoonDemo() {
        return `
            <div class="demo-container">
                <h3>🚀 Demo Coming Soon</h3>
                <p>Interactive demo is being prepared...</p>
                <div class="demo-placeholder">
                    <div class="loading-spinner"></div>
                    <p>Stay tuned for the interactive experience!</p>
                </div>
            </div>
        `;
    },

    // Demo functions
    generateXSSPayload() {
        const output = document.getElementById('xss-output');
        const payloads = [
            '<script>alert("XSS by 0x-Professor")</script>',
            '"><svg/onload=alert(1)>',
            'javascript:alert("AI-Generated")',
            '"><img src=x onerror=alert(1)>',
            '"><script>eval(atob("YWxlcnQoMSk="))</script>'
        ];
        
        output.innerHTML = `
            <div class="ai-analysis">
                <h4>🧠 AI Analysis Complete</h4>
                <p>Neural network identified optimal bypass strategy</p>
                
                <div class="payload-result">
                    <strong>Generated Payload:</strong>
                    <code>${payloads[Math.floor(Math.random() * payloads.length)]}</code>
                </div>
                
                <div class="confidence">
                    <strong>Confidence:</strong> 94.7%
                </div>
            </div>
        `;
    },

    transpileEVM() {
        const output = document.getElementById('evm-output');
        setTimeout(() => {
            output.innerHTML = `
                <div class="risc-v-output">
                    <h4>🦀 RISC-V Assembly Output</h4>
                    <pre>
addi    sp, sp, -64
sw      ra, 60(sp)
sw      s0, 56(sp)
addi    s0, sp, 64
li      a0, 0x608060405234801561001057600080fd5b50336000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550610221806100606000396000f3fe
call    execute_constructor
li      a0, 0
lw      ra, 60(sp)
lw      s0, 56(sp)
addi    sp, sp, 64
ret
                    </pre>
                    
                    <div class="performance-metrics">
                        <div class="metric">
                            <span class="metric-label">Execution Time:</span>
                            <span class="metric-value">0.003ms</span>
                        </div>
                        <div class="metric">
                            <span class="metric-label">Memory Usage:</span>
                            <span class="metric-value">2.1KB</span>
                        </div>
                    </div>
                </div>
            `;
        }, 1500);
    },

    solveCTF() {
        const output = document.getElementById('ctf-output');
        setTimeout(() => {
            output.innerHTML = `
                <div class="ai-analysis">
                    <h4>🧠 AI Analysis Results</h4>
                    
                    <div class="analysis-step">
                        <strong>Step 1:</strong> Detected Base64 encoding
                    </div>
                    
                    <div class="analysis-step">
                        <strong>Step 2:</strong> Decoding... "Welcome to the AI Security Console!"
                    </div>
                    
                    <div class="analysis-step">
                        <strong>Step 3:</strong> Analyzing hint... "not what it seems"
                    </div>
                    
                    <div class="analysis-step">
                        <strong>Step 4:</strong> Checking for hidden patterns...
                    </div>
                    
                    <div class="flag-result">
                        <strong>🏁 FLAG FOUND:</strong> <code>flag{AI_SEC_CONSOLE_2024}</code>
                    </div>
                    
                    <div class="confidence">
                        <strong>Confidence:</strong> 98.2%
                    </div>
                </div>
            `;
        }, 2000);
    },

    runBFS() {
        console.log('Running BFS algorithm visualization...');
        // Implementation would go here
    },

    runDFS() {
        console.log('Running DFS algorithm visualization...');
        // Implementation would go here
    },

    runDijkstra() {
        console.log('Running Dijkstra algorithm visualization...');
        // Implementation would go here
    },

    buyMeACoffee() {
        console.log('Processing coffee donation...');
        alert('Thank you for the coffee! ☕\n(This is a demo - no actual transaction)');
    }
};

// ========================================
// PERFORMANCE MONITOR
// ========================================

const PerformanceMonitor = {
    start() {
        this.startTime = performance.now();
        this.frameCount = 0;
        this.lastFpsUpdate = this.startTime;
        
        this.monitor();
    },

    monitor() {
        const now = performance.now();
        this.frameCount++;
        
        if (now - this.lastFpsUpdate >= 1000) {
            STATE.performance.fps = Math.round(this.frameCount * 1000 / (now - this.lastFpsUpdate));
            this.frameCount = 0;
            this.lastFpsUpdate = now;
            
            // Log performance occasionally
            if (Math.random() < 0.01) {
                console.log(`FPS: ${STATE.performance.fps}, Memory: ${this.getMemoryUsage()}`);
            }
        }
        
        requestAnimationFrame(() => this.monitor());
    },

    getMemoryUsage() {
        if (performance.memory) {
            return `${Math.round(performance.memory.usedJSHeapSize / 1024 / 1024)}MB`;
        }
        return 'N/A';
    }
};

// ========================================
// MAIN APPLICATION
// ========================================

const App = {
    init() {
        console.log('🚀 Initializing AI Security Portfolio...');
        
        // Initialize all systems
        this.initializeCustomCursor();
        this.initializeAmbientBackground();
        this.initializeNeuralNetwork();
        this.initializeNavigation();
        this.initializeTypingAnimation();
        this.initializeScrollAnimations();
        this.initializeProjectDemos();
        this.initializeEventListeners();
        this.loadSavedPreferences();
        
        // Easter eggs
        this.initializeEasterEggs();
        
        console.log('✅ AI Security Portfolio Initialized Successfully!');
    },

    initializeCustomCursor() {
        if (window.innerWidth > 768) {
            CustomCursor.init();
        }
    },

    initializeAmbientBackground() {
        if (CONFIG.animations.enableParticles) {
            AmbientBackground.init();
        }
    },

    initializeNeuralNetwork() {
        if (CONFIG.animations.enable3D && typeof THREE !== 'undefined') {
            NeuralNetwork3D.init();
        }
    },

    initializeNavigation() {
        Navigation.init();
    },

    initializeTypingAnimation() {
        TypingAnimation.init();
    },

    initializeScrollAnimations() {
        ScrollAnimations.init();
    },

    initializeProjectDemos() {
        ProjectDemos.init();
    },

    initializeEventListeners() {
        // Global event listeners
        window.addEventListener('resize', utils.debounce(() => {
            this.handleResize();
        }, 250));
        
        window.addEventListener('scroll', utils.throttle(() => {
            STATE.scrollY = window.scrollY;
        }, 16));
        
        // Konami code
        this.konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
        this.konamiSequence = [];
        
        document.addEventListener('keydown', (e) => {
            this.konamiSequence.push(e.code);
            if (this.konamiSequence.length > this.konamiCode.length) {
                this.konamiSequence = this.konamiSequence.slice(-this.konamiCode.length);
            }
            
            if (this.konamiSequence.join('') === this.konamiCode.join('')) {
                this.activateKonamiCode();
            }
        });
    },

    handleResize() {
        // Handle responsive behavior
        if (window.innerWidth <= 768) {
            // Mobile optimizations
            document.body.classList.add('mobile');
        } else {
            document.body.classList.remove('mobile');
        }
    },

    loadSavedPreferences() {
        // Load theme preference
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.getElementById('theme-toggle').innerHTML = '<i class="fas fa-moon"></i>';
        }
    },

    initializeEasterEggs() {
        // Console welcome message
        console.log(`
%c╔══════════════════════════════════════════════════════════════╗
║                    AI SECURITY PORTFOLIO                     ║
║                  Muhammad Mazhar Saeed                       ║
║                     0x-Professor                             ║
╚══════════════════════════════════════════════════════════════╝
        `, 'color: #00ff88; font-family: monospace;');
        
        console.log('%cWelcome to the Matrix! 🔰', 'color: #00ff88; font-size: 18px; font-weight: bold;');
        console.log('%cTry the Konami Code for a surprise! ↑↑↓↓←→←→BA', 'color: #8b5cf6; font-size: 12px;');
    },

    activateKonamiCode() {
        document.body.style.filter = 'hue-rotate(120deg) saturate(1.5)';
        document.body.style.animation = 'rainbow 2s infinite';
        
        // Add rainbow keyframes
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg) saturate(1.5); }
                25% { filter: hue-rotate(90deg) saturate(1.5); }
                50% { filter: hue-rotate(180deg) saturate(1.5); }
                75% { filter: hue-rotate(270deg) saturate(1.5); }
                100% { filter: hue-rotate(360deg) saturate(1.5); }
            }
        `;
        document.head.appendChild(style);
        
        console.log('🎉 Konami Code activated! Welcome to the rainbow dimension!');
        
        setTimeout(() => {
            document.body.style.filter = 'none';
            document.body.style.animation = 'none';
            style.remove();
        }, 5000);
        
        this.konamiSequence = [];
    }
};

// ========================================
// GLOBAL FUNCTIONS
// ========================================

// Functions called from HTML
function scrollToSection(sectionId) {
    utils.scrollToSection(sectionId);
}

function openAIConsole() {
    AIConsole.open();
}

function closeAIConsole() {
    AIConsole.close();
}

function openProjectDemo(projectId) {
    ProjectDemos.open(projectId);
}

function closeDemoModal() {
    ProjectDemos.close();
}

function downloadResume() {
    console.log('Downloading resume...');
    // Implementation would generate/download PDF resume
    alert('Resume download feature coming soon!');
}

// ========================================
// INITIALIZATION
// ========================================

// Start the application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize terminal loader
    TerminalLoader.init();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Pause animations when page is hidden
        if (STATE.animations.neural) {
            cancelAnimationFrame(STATE.animations.neural);
        }
        if (STATE.animations.ambient) {
            cancelAnimationFrame(STATE.animations.ambient);
        }
    } else {
        // Resume animations when page is visible
        if (CONFIG.animations.enable3D && NeuralNetwork3D.animate) {
            NeuralNetwork3D.animate();
        }
        if (CONFIG.animations.enableParticles && AmbientBackground.animate) {
            AmbientBackground.animate();
        }
    }
});

// Error handling
window.addEventListener('error', (event) => {
    console.error('Portfolio Error:', event.error);
    // Could send to analytics service in production
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    // Cancel all animation frames
    if (STATE.animations.neural) {
        cancelAnimationFrame(STATE.animations.neural);
    }
    if (STATE.animations.ambient) {
        cancelAnimationFrame(STATE.animations.ambient);
    }
    if (STATE.animations.particles) {
        cancelAnimationFrame(STATE.animations.particles);
    }
});

// ========================================
// EXPORT FOR DEBUGGING
// ========================================

// Make key objects available for debugging
window.PortfolioDebug = {
    STATE,
    CONFIG,
    utils,
    App,
    AIConsole,
    GitHubAPI,
    NeuralNetwork3D,
    AmbientBackground
};