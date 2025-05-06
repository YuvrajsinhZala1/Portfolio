/**
 * Scroll Effects
 * Handles scroll-based animations and effects to create the mountain journey experience
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        initScrollEffects();
        logger.log('info', 'Scroll effects initialized');
    } catch (error) {
        logger.log('error', 'Error initializing scroll effects: ' + error.message);
        console.error('Error initializing scroll effects:', error);
    }
});

/**
 * Initialize all scroll-based effects
 */
function initScrollEffects() {
    logger.log('debug', 'Setting up scroll effects');
    
    try {
        // Setup journey sections parallax effect
        setupJourneySections();
        
        // Setup reveal on scroll
        setupRevealOnScroll();
        
        // Setup mountain parallax effect
        setupMountainParallax();
        
        // Setup particles effect
        setupParticlesEffect();
        
        logger.log('info', 'All scroll effects setup completed');
    } catch (error) {
        logger.log('error', 'Error setting up scroll effects: ' + error.message);
        console.error('Error setting up scroll effects:', error);
    }
}

/**
 * Setup journey sections with parallax effect
 * This creates the feeling of climbing a mountain as user scrolls
 */
function setupJourneySections() {
    logger.log('debug', 'Setting up journey sections');
    
    try {
        const journeySections = document.querySelectorAll('.journey-section');
        
        if (!journeySections.length) {
            logger.log('warn', 'Journey sections not found');
            return;
        }
        
        // Add custom attributes for tracking position
        journeySections.forEach((section, index) => {
            section.setAttribute('data-journey-index', index);
            section.style.position = 'relative';
            section.style.zIndex = 10 - index; // Higher sections have higher z-index
            
            // Add a subtle gradient background to each section
            const gradient = document.createElement('div');
            gradient.className = 'section-gradient';
            gradient.style.position = 'absolute';
            gradient.style.top = '0';
            gradient.style.left = '0';
            gradient.style.width = '100%';
            gradient.style.height = '100%';
            gradient.style.opacity = '0.05';
            gradient.style.zIndex = '-1';
            gradient.style.background = `radial-gradient(circle at ${index % 2 ? '30%' : '70%'} 50%, rgba(45, 70, 185, 0.2), transparent 70%)`;
            
            section.prepend(gradient);
        });
        
        // Setup scroll event to update positions
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            journeySections.forEach((section) => {
                const rect = section.getBoundingClientRect();
                const index = parseInt(section.getAttribute('data-journey-index'));
                
                // Check if section is in view
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    // Calculate progress through this section (0 to 1)
                    const progress = 1 - (rect.top / window.innerHeight);
                    const clampedProgress = Math.max(0, Math.min(1, progress));
                    
                    // Apply a subtle parallax effect to section content
                    const content = section.querySelector('.container');
                    if (content) {
                        content.style.transform = `translateY(${clampedProgress * -20}px)`;
                        content.style.opacity = 0.5 + (clampedProgress * 0.5);
                    }
                    
                    // Adjust background gradient
                    const gradient = section.querySelector('.section-gradient');
                    if (gradient) {
                        gradient.style.opacity = 0.05 + (clampedProgress * 0.05);
                    }
                    
                    // Add an active class when section is prominently visible
                    if (clampedProgress > 0.3 && rect.top < window.innerHeight * 0.7) {
                        section.classList.add('section-active');
                    } else {
                        section.classList.remove('section-active');
                    }
                    
                    logger.log('debug', `Journey section ${index} progress: ${clampedProgress.toFixed(2)}`);
                }
            });
        });
        
        logger.log('info', 'Journey sections setup completed');
    } catch (error) {
        logger.log('error', 'Error setting up journey sections: ' + error.message);
        console.error('Error setting up journey sections:', error);
    }
}

/**
 * Setup reveal animations for elements as they scroll into view
 */
function setupRevealOnScroll() {
    logger.log('debug', 'Setting up reveal on scroll');
    
    try {
        // Add reveal class to elements we want to animate
        const revealElements = [
            ...document.querySelectorAll('.section-header'),
            ...document.querySelectorAll('.skill-item'),
            ...document.querySelectorAll('.project-card'),
            ...document.querySelectorAll('.timeline-milestone'),
            ...document.querySelectorAll('.trait'),
            ...document.querySelectorAll('.contact-method')
        ];
        
        if (!revealElements.length) {
            logger.log('warn', 'No reveal elements found');
            return;
        }
        
        // Add initial styles to elements
        revealElements.forEach((el, index) => {
            el.classList.add('reveal');
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            // Stagger the transition delays slightly
            const delay = 0.1 + (index % 5) * 0.1; // 0.1s to 0.5s delay
            el.style.transition = `opacity 0.8s ease ${delay}s, transform 0.8s ease ${delay}s`;
        });
        
        // Function to check if element is in viewport and reveal it
        function revealIfInViewport() {
            revealElements.forEach(el => {
                if (el.style.opacity === '1') return; // Skip already revealed elements
                
                const rect = el.getBoundingClientRect();
                const isInViewport = (
                    rect.top <= window.innerHeight * 0.85 && 
                    rect.bottom >= 0
                );
                
                if (isInViewport) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                    el.classList.add('revealed');
                    logger.log('debug', 'Revealed element on scroll');
                }
            });
        }
        
        // Initial check
        revealIfInViewport();
        
        // Add scroll event listener
        window.addEventListener('scroll', revealIfInViewport);
        
        logger.log('info', 'Reveal on scroll setup completed');
    } catch (error) {
        logger.log('error', 'Error setting up reveal on scroll: ' + error.message);
        console.error('Error setting up reveal on scroll:', error);
    }
}

/**
 * Setup mountain parallax effect with Northern Lights
 */
function setupMountainParallax() {
    logger.log('debug', 'Setting up mountain parallax and northern lights effect');
    
    try {
        const mountainContainer = document.querySelector('.mountain-background');
        const mountainSvg = document.querySelector('.mountain-background svg');
        
        if (!mountainSvg) {
            logger.log('warn', 'Mountain SVG not found');
            return;
        }
        
        // Get mountain paths
        const mountainPaths = mountainSvg.querySelectorAll('path');
        
        if (!mountainPaths.length) {
            logger.log('warn', 'Mountain paths not found');
            return;
        }
        
        // Update mountain colors to match new theme
        mountainPaths.forEach((path, index) => {
            const colors = [
                'rgba(45, 70, 185, 0.2)', // Blue
                'rgba(0, 184, 169, 0.2)',  // Teal
                'rgba(106, 76, 147, 0.2)'  // Purple
            ];
            path.setAttribute('fill', colors[index % 3]);
        });
        
        // Create Northern Lights effect
        createNorthernLights(mountainContainer);
        
        // Setup scroll event to move mountains at different rates
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollFactor = scrollTop / 1000; // Adjust for desired effect
            
            mountainPaths.forEach((path, index) => {
                // Make mountains more visible by increasing opacity
                path.style.opacity = 0.2 + (index * 0.05);
                
                // Move each mountain layer at a different rate
                const translateY = scrollFactor * (10 * (index + 1));
                const scaleX = 1 + (scrollFactor * 0.05);
                
                path.style.transform = `translateY(${translateY}px) scaleX(${scaleX})`;
            });
            
            // Update northern lights position on scroll
            const northernLights = document.querySelector('.northern-lights');
            if (northernLights) {
                northernLights.style.transform = `translateY(${-scrollFactor * 20}px)`;
            }
        });
        
        logger.log('info', 'Mountain parallax and northern lights setup completed');
    } catch (error) {
        logger.log('error', 'Error setting up mountain effects: ' + error.message);
        console.error('Error setting up mountain effects:', error);
    }
}

/**
 * Create Northern Lights effect
 * @param {HTMLElement} container - Container to append the northern lights
 */
function createNorthernLights(container) {
    try {
        // Create northern lights container
        const northernLights = document.createElement('div');
        northernLights.classList.add('northern-lights');
        northernLights.style.position = 'absolute';
        northernLights.style.top = '0';
        northernLights.style.left = '0';
        northernLights.style.width = '100%';
        northernLights.style.height = '50%';
        northernLights.style.pointerEvents = 'none';
        northernLights.style.zIndex = '-1';
        northernLights.style.opacity = '0';
        northernLights.style.transition = 'opacity 1s ease';
        
        // Create SVG for northern lights
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('viewBox', '0 0 1200 400');
        
        // Create defs for gradients
        const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
        
        // Create linear gradient for light mode
        const lightGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        lightGradient.setAttribute('id', 'northernLightGradient');
        lightGradient.setAttribute('x1', '0%');
        lightGradient.setAttribute('y1', '0%');
        lightGradient.setAttribute('x2', '100%');
        lightGradient.setAttribute('y2', '100%');
        
        const lightStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        lightStop1.setAttribute('offset', '0%');
        lightStop1.setAttribute('stop-color', '#2D46B9');
        lightStop1.setAttribute('stop-opacity', '0.6');
        
        const lightStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        lightStop2.setAttribute('offset', '50%');
        lightStop2.setAttribute('stop-color', '#00B8A9');
        lightStop2.setAttribute('stop-opacity', '0.4');
        
        const lightStop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        lightStop3.setAttribute('offset', '100%');
        lightStop3.setAttribute('stop-color', '#6A4C93');
        lightStop3.setAttribute('stop-opacity', '0.6');
        
        lightGradient.appendChild(lightStop1);
        lightGradient.appendChild(lightStop2);
        lightGradient.appendChild(lightStop3);
        
        // Create linear gradient for dark mode
        const darkGradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
        darkGradient.setAttribute('id', 'northernLightDarkGradient');
        darkGradient.setAttribute('x1', '0%');
        darkGradient.setAttribute('y1', '0%');
        darkGradient.setAttribute('x2', '100%');
        darkGradient.setAttribute('y2', '100%');
        
        const darkStop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        darkStop1.setAttribute('offset', '0%');
        darkStop1.setAttribute('stop-color', '#00B8A9');
        darkStop1.setAttribute('stop-opacity', '0.5');
        
        const darkStop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        darkStop2.setAttribute('offset', '50%');
        darkStop2.setAttribute('stop-color', '#F73D93');
        darkStop2.setAttribute('stop-opacity', '0.3');
        
        const darkStop3 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
        darkStop3.setAttribute('offset', '100%');
        darkStop3.setAttribute('stop-color', '#FFD166');
        darkStop3.setAttribute('stop-opacity', '0.5');
        
        darkGradient.appendChild(darkStop1);
        darkGradient.appendChild(darkStop2);
        darkGradient.appendChild(darkStop3);
        
        defs.appendChild(lightGradient);
        defs.appendChild(darkGradient);
        svg.appendChild(defs);
        
        // Create path elements for northern lights
        for (let i = 0; i < 5; i++) {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            const offsetY = i * 50;
            
            // Create wavy path
            const d = `M0,${150 + offsetY} Q300,${100 + offsetY} 600,${180 + offsetY} T1200,${120 + offsetY}`;
            path.setAttribute('d', d);
            path.setAttribute('fill', 'none');
            path.setAttribute('stroke', 'url(#northernLightGradient)');
            path.setAttribute('stroke-width', '8');
            path.setAttribute('stroke-opacity', '0.6');
            path.setAttribute('class', 'aurora-wave');
            
            // Add animation
            const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animate');
            animate.setAttribute('attributeName', 'd');
            animate.setAttribute('dur', `${7 + i * 2}s`);
            animate.setAttribute('repeatCount', 'indefinite');
            
            const newD = `M0,${130 + offsetY} Q300,${180 + offsetY} 600,${120 + offsetY} T1200,${170 + offsetY}`;
            animate.setAttribute('values', `${d};${newD};${d}`);
            animate.setAttribute('calcMode', 'spline');
            animate.setAttribute('keySplines', '0.5 0 0.5 1; 0.5 0 0.5 1');
            
            path.appendChild(animate);
            svg.appendChild(path);
        }
        
        northernLights.appendChild(svg);
        container.appendChild(northernLights);
        
        // Toggle northern lights visibility based on dark mode
        const darkModeToggle = document.getElementById('darkModeToggle');
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', function() {
                toggleNorthernLights(this.checked);
            });
            
            // Initial state
            if (document.body.classList.contains('dark-mode')) {
                toggleNorthernLights(true);
            }
        }
        
        logger.log('info', 'Northern lights effect created');
    } catch (error) {
        logger.log('error', 'Error creating northern lights: ' + error.message);
        console.error('Error creating northern lights:', error);
    }
}

/**
 * Toggle Northern Lights visibility and style
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function toggleNorthernLights(isDarkMode) {
    const northernLights = document.querySelector('.northern-lights');
    if (!northernLights) return;
    
    if (isDarkMode) {
        // Dark mode: make northern lights more visible and use dark gradient
        northernLights.style.opacity = '0.8';
        
        // Switch to dark mode gradient
        const waves = northernLights.querySelectorAll('.aurora-wave');
        waves.forEach(wave => {
            wave.setAttribute('stroke', 'url(#northernLightDarkGradient)');
            wave.setAttribute('stroke-width', '12');
            wave.setAttribute('filter', 'blur(5px)');
        });
    } else {
        // Light mode: make northern lights subtle
        northernLights.style.opacity = '0.3';
        
        // Switch to light mode gradient
        const waves = northernLights.querySelectorAll('.aurora-wave');
        waves.forEach(wave => {
            wave.setAttribute('stroke', 'url(#northernLightGradient)');
            wave.setAttribute('stroke-width', '8');
            wave.setAttribute('filter', 'blur(2px)');
        });
    }
}

/**
 * Setup particles effect
 */
function setupParticlesEffect() {
    logger.log('debug', 'Setting up particles effect');
    
    try {
        // Create particles container
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles-container';
        particlesContainer.style.position = 'fixed';
        particlesContainer.style.top = '0';
        particlesContainer.style.left = '0';
        particlesContainer.style.width = '100%';
        particlesContainer.style.height = '100%';
        particlesContainer.style.pointerEvents = 'none';
        particlesContainer.style.zIndex = '-1';
        particlesContainer.style.opacity = '0.3';
        
        document.body.appendChild(particlesContainer);
        
        // Create particles
        const particleCount = window.innerWidth < 768 ? 15 : 30; // Fewer particles on mobile
        for (let i = 0; i < particleCount; i++) {
            createParticle(particlesContainer);
        }
        
        logger.log('info', 'Particles effect setup completed');
    } catch (error) {
        logger.log('error', 'Error setting up particles effect: ' + error.message);
        console.error('Error setting up particles effect:', error);
    }
}

/**
 * Create a floating particle
 * @param {HTMLElement} container - Container to append the particle
 */
function createParticle(container) {
    try {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random size (small)
        const size = Math.random() * 6 + 2;
        
        // Random position
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        
        // Random opacity
        const opacity = Math.random() * 0.5 + 0.1;
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        
        // Random delay
        const delay = Math.random() * 10;
        
        // Styling
        particle.style.position = 'absolute';
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = isDarkMode() ? getRandomDarkModeColor() : getRandomLightModeColor();
        particle.style.opacity = opacity.toString();
        particle.style.boxShadow = '0 0 5px rgba(255, 255, 255, 0.3)';
        
        // Animation
        particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
        
        // Add to container
        container.appendChild(particle);
        
        // Add keyframes if not already added
        if (!document.querySelector('#particles-animation')) {
            const style = document.createElement('style');
            style.id = 'particles-animation';
            style.textContent = `
                @keyframes floatParticle {
                    0%, 100% {
                        transform: translate(0, 0) rotate(0deg);
                    }
                    25% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 90}deg);
                    }
                    50% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 180}deg);
                    }
                    75% {
                        transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) rotate(${Math.random() * 270}deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Update color on dark mode toggle
        document.addEventListener('darkModeToggle', function() {
            setTimeout(() => {
                particle.style.backgroundColor = isDarkMode() ? getRandomDarkModeColor() : getRandomLightModeColor();
            }, Math.random() * 1000); // Stagger the updates
        });
    } catch (error) {
        logger.log('error', 'Error creating particle: ' + error.message);
        console.error('Error creating particle:', error);
    }
}

/**
 * Check if dark mode is active
 * @returns {boolean} Whether dark mode is active
 */
function isDarkMode() {
    return document.body.classList.contains('dark-mode');
}

/**
 * Get a random color for light mode
 * @returns {string} CSS color string
 */
function getRandomLightModeColor() {
    const colors = [
        'rgba(45, 70, 185, 0.3)',  // Blue
        'rgba(0, 184, 169, 0.3)',   // Teal
        'rgba(106, 76, 147, 0.3)',  // Purple
        'rgba(247, 61, 147, 0.3)'   // Pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Get a random color for dark mode
 * @returns {string} CSS color string
 */
function getRandomDarkModeColor() {
    const colors = [
        'rgba(0, 184, 169, 0.4)',   // Teal
        'rgba(247, 61, 147, 0.4)',  // Pink
        'rgba(255, 209, 102, 0.4)'  // Yellow
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Helper function: Add animation class to element
 * @param {HTMLElement} element - Element to animate
 * @param {string} animationClass - CSS animation class to add
 */
function animateElement(element, animationClass) {
    if (!element) return;
    
    element.classList.add(animationClass);
    
    element.addEventListener('animationend', function() {
        element.classList.remove(animationClass);
    });
}

// Create a custom event for dark mode toggle
function createDarkModeToggleEvent() {
    const darkModeToggleEvent = new Event('darkModeToggle');
    return darkModeToggleEvent;
}

// Make toggleNorthernLights available globally
window.toggleNorthernLights = toggleNorthernLights;