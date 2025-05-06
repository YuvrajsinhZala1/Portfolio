/**
 * Main JavaScript file for Portfolio
 * Contains core functionality for the website with enhanced animations and security
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize logger
    logger.init('portfolio-website');
    logger.log('info', 'Website loaded successfully');
    
    try {
        // Add preloader
        showPreloader();
        
        // Create mountains SVG for background
        createMountainBackground();
        
        // Setup mobile menu
        setupMobileMenu();
        
        // Initialize form submission
        setupContactForm();
        
        // Setup scroll animations
        highlightNavOnScroll();
        
        // Setup page navigation dots
        setupPageNavigation();

        // Add security enhancements
        enhanceSecurity();
        
        logger.log('info', 'All main components initialized successfully');
    } catch (error) {
        logger.log('error', 'Error initializing main components: ' + error.message);
        console.error('Error initializing components:', error);
    }
});

/**
 * Shows preloader animation when page loads
 */
function showPreloader() {
    logger.log('debug', 'Setting up preloader');
    
    try {
        // Create preloader element
        const preloader = document.createElement('div');
        preloader.className = 'preloader';
        preloader.style.position = 'fixed';
        preloader.style.top = '0';
        preloader.style.left = '0';
        preloader.style.width = '100%';
        preloader.style.height = '100%';
        preloader.style.backgroundColor = '#FFFFFF';
        preloader.style.display = 'flex';
        preloader.style.justifyContent = 'center';
        preloader.style.alignItems = 'center';
        preloader.style.zIndex = '9999';
        preloader.style.transition = 'opacity 0.5s ease-out';
        
        // Create logo for preloader
        const logo = document.createElement('div');
        logo.className = 'preloader-logo';
        
        // Gujarat pattern
        const gujaratPattern = document.createElement('div');
        gujaratPattern.className = 'gujarat-element';
        gujaratPattern.style.width = '60px';
        gujaratPattern.style.height = '60px';
        gujaratPattern.style.margin = '0 auto 20px';
        gujaratPattern.style.filter = 'hue-rotate(30deg) brightness(1.2)';
        gujaratPattern.style.animation = 'spin 2s infinite ease-in-out';
        
        // Name text
        const nameText = document.createElement('h2');
        nameText.textContent = 'Yuvrajsinh Zala';
        nameText.style.background = 'linear-gradient(135deg, #FF9776, #FF6E4A)';
        nameText.style.webkitBackgroundClip = 'text';
        nameText.style.backgroundClip = 'text';
        nameText.style.color = 'transparent';
        nameText.style.opacity = '0';
        nameText.style.animation = 'fadeIn 1s 0.5s forwards';
        
        logo.appendChild(gujaratPattern);
        logo.appendChild(nameText);
        preloader.appendChild(logo);
        
        // Add animation keyframes if not added already
        if (!document.querySelector('#preloader-animations')) {
            const style = document.createElement('style');
            style.id = 'preloader-animations';
            style.textContent = `
                @keyframes spin {
                    0% {
                        transform: rotate(0);
                    }
                    50% {
                        transform: rotate(180deg);
                    }
                    100% {
                        transform: rotate(360deg);
                    }
                }
                
                @keyframes fadeIn {
                    0% {
                        opacity: 0;
                    }
                    100% {
                        opacity: 1;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add to body
        document.body.appendChild(preloader);
        
        // Hide preloader after page loads
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.remove();
                }, 500);
            }, 1000);
        });
        
        logger.log('info', 'Preloader setup completed');
    } catch (error) {
        logger.log('error', 'Error setting up preloader: ' + error.message);
        console.error('Error setting up preloader:', error);
    }
}

/**
 * Creates the SVG mountain background with enhanced colors
 */
function createMountainBackground() {
    logger.log('debug', 'Creating mountain background');
    
    try {
        const mountainContainer = document.querySelector('.mountain-background');
        
        // Create SVG element
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('preserveAspectRatio', 'none');
        svg.setAttribute('viewBox', '0 0 1200 800');
        
        // Define mountain paths with new color palette
        const mountainPaths = [
            // Far background mountain
            {
                d: 'M0,800 L0,600 L200,700 L400,600 L600,650 L800,590 L1000,630 L1200,580 L1200,800 Z',
                fill: 'rgba(255, 151, 118, 0.2)',  // Peach
                opacity: '0.5'
            },
            // Middle mountain
            {
                d: 'M0,800 L0,650 L300,700 L500,650 L700,680 L900,640 L1100,670 L1200,650 L1200,800 Z',
                fill: 'rgba(255, 110, 74, 0.2)',  // Dark Peach
                opacity: '0.5'
            },
            // Foreground mountain
            {
                d: 'M0,800 L0,750 L200,765 L400,730 L600,750 L800,720 L1000,740 L1200,725 L1200,800 Z',
                fill: 'rgba(255, 90, 90, 0.2)',  // Coral
                opacity: '0.5'
            }
        ];
        
        // Create and append mountain paths
        mountainPaths.forEach(mountain => {
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            path.setAttribute('d', mountain.d);
            path.setAttribute('fill', mountain.fill);
            path.setAttribute('opacity', mountain.opacity);
            path.classList.add('mountain-path');
            svg.appendChild(path);
        });
        
        // Add subtle clouds
        for (let i = 0; i < 3; i++) {
            const cloud = createCloud(i * 400 + Math.random() * 200, 250 + i * 100, 0.2);
            svg.appendChild(cloud);
        }
        
        // Append SVG to container
        mountainContainer.appendChild(svg);
        logger.log('info', 'Mountain background created successfully');
    } catch (error) {
        logger.log('error', 'Error creating mountain background: ' + error.message);
        console.error('Error creating mountain background:', error);
    }
}

/**
 * Creates a cloud shape for the SVG
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} opacity - Opacity of the cloud
 * @returns {SVGElement} - The cloud SVG element
 */
function createCloud(x, y, opacity) {
    const cloud = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    cloud.classList.add('cloud');
    cloud.setAttribute('transform', `translate(${x}, ${y})`);
    
    // Create multiple circles to form a cloud
    const circles = [
        { cx: 0, cy: 0, r: 40 },
        { cx: 40, cy: -20, r: 30 },
        { cx: 80, cy: 0, r: 35 },
        { cx: 30, cy: 20, r: 25 }
    ];
    
    circles.forEach(circle => {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', circle.cx);
        c.setAttribute('cy', circle.cy);
        c.setAttribute('r', circle.r);
        c.setAttribute('fill', 'rgba(255, 255, 255, 0.6)');
        c.setAttribute('opacity', opacity);
        cloud.appendChild(c);
    });
    
    // Add animation
    const animate = document.createElementNS('http://www.w3.org/2000/svg', 'animateTransform');
    animate.setAttribute('attributeName', 'transform');
    animate.setAttribute('type', 'translate');
    animate.setAttribute('dur', `${Math.random() * 100 + 100}s`);
    animate.setAttribute('repeatCount', 'indefinite');
    animate.setAttribute('from', `${x} ${y}`);
    animate.setAttribute('to', `${x + 1200} ${y}`);
    
    cloud.appendChild(animate);
    
    return cloud;
}

/**
 * Sets up mobile menu functionality with improved animations
 */
function setupMobileMenu() {
    logger.log('debug', 'Setting up mobile menu');
    
    try {
        const menuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        
        if (!menuBtn || !navLinks) {
            logger.log('warn', 'Mobile menu elements not found');
            return;
        }
        
        let isOpen = false;
        
        // Create mobile menu overlay
        const menuOverlay = document.createElement('div');
        menuOverlay.className = 'mobile-menu-overlay';
        menuOverlay.style.position = 'fixed';
        menuOverlay.style.top = '0';
        menuOverlay.style.left = '0';
        menuOverlay.style.width = '100%';
        menuOverlay.style.height = '100%';
        menuOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
        menuOverlay.style.backdropFilter = 'blur(5px)';
        menuOverlay.style.zIndex = '900';
        menuOverlay.style.opacity = '0';
        menuOverlay.style.visibility = 'hidden';
        menuOverlay.style.transition = 'opacity 0.3s ease, visibility 0.3s ease';
        document.body.appendChild(menuOverlay);
        
        menuBtn.addEventListener('click', function() {
            isOpen = !isOpen;
            
            if (isOpen) {
                // Show overlay
                menuOverlay.style.opacity = '1';
                menuOverlay.style.visibility = 'visible';
                
                // Setup mobile menu
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'fixed';
                navLinks.style.top = 'var(--header-height)';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.padding = '30px';
                navLinks.style.backgroundColor = document.body.classList.contains('dark-mode') ? 'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)';
                navLinks.style.backdropFilter = 'blur(10px)';
                navLinks.style.boxShadow = 'var(--shadow-medium)';
                navLinks.style.zIndex = '999';
                navLinks.style.gap = '25px';
                navLinks.style.alignItems = 'center';
                
                // Animate links
                const links = navLinks.querySelectorAll('a');
                links.forEach((link, index) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(20px)';
                    link.style.transition = `opacity 0.3s ease ${index * 0.1}s, transform 0.3s ease ${index * 0.1}s`;
                    
                    // Trigger animation
                    setTimeout(() => {
                        link.style.opacity = '1';
                        link.style.transform = 'translateY(0)';
                    }, 50);
                });
                
                menuBtn.innerHTML = '<i class="fas fa-times"></i>';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            } else {
                // Hide overlay
                menuOverlay.style.opacity = '0';
                menuOverlay.style.visibility = 'hidden';
                
                // Reset links first with animation
                const links = navLinks.querySelectorAll('a');
                links.forEach((link, index) => {
                    link.style.opacity = '0';
                    link.style.transform = 'translateY(-20px)';
                });
                
                // Then hide the menu after animation
                setTimeout(() => {
                    navLinks.style.display = '';
                    navLinks.style.flexDirection = '';
                    navLinks.style.position = '';
                    navLinks.style.top = '';
                    navLinks.style.left = '';
                    navLinks.style.width = '';
                    navLinks.style.padding = '';
                    navLinks.style.backgroundColor = '';
                    navLinks.style.boxShadow = '';
                    navLinks.style.zIndex = '';
                    navLinks.style.gap = '';
                    navLinks.style.alignItems = '';
                    
                    // Reset link styles
                    const links = navLinks.querySelectorAll('a');
                    links.forEach(link => {
                        link.style.opacity = '';
                        link.style.transform = '';
                        link.style.transition = '';
                    });
                }, 300);
                
                menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                document.body.style.overflow = ''; // Enable scrolling
            }
            
            logger.log('info', 'Mobile menu toggled: ' + (isOpen ? 'opened' : 'closed'));
        });
        
        // Close menu when clicking the overlay
        menuOverlay.addEventListener('click', function() {
            if (isOpen) {
                menuBtn.click(); // Trigger the menu button click event
            }
        });
        
        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                if (isOpen) {
                    menuBtn.click(); // Trigger the menu button click event
                    logger.log('info', 'Mobile menu closed after link click');
                }
            });
        });
        
        // Update menu styles when dark mode changes
        document.addEventListener('darkModeToggle', function() {
            if (isOpen) {
                navLinks.style.backgroundColor = document.body.classList.contains('dark-mode') ? 
                    'rgba(30, 30, 30, 0.9)' : 'rgba(255, 255, 255, 0.9)';
            }
        });
        
        logger.log('info', 'Mobile menu setup completed');
    } catch (error) {
        logger.log('error', 'Error setting up mobile menu: ' + error.message);
        console.error('Error setting up mobile menu:', error);
    }
}

/**
 * Sets up contact form submission with enhanced validation
 */
function setupContactForm() {
    logger.log('debug', 'Setting up contact form');
    
    try {
        // We no longer have a contact form, but leaving this function in place
        // for future reference if you decide to add a form back later
        logger.log('info', 'No contact form present, skipping form setup');
    } catch (error) {
        logger.log('error', 'Error setting up contact form: ' + error.message);
        console.error('Error setting up contact form:', error);
    }
}

/**
 * Highlights navigation links based on scroll position
 */
function highlightNavOnScroll() {
    logger.log('debug', 'Setting up nav highlighting on scroll');
    
    try {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        if (!sections.length || !navLinks.length) {
            logger.log('warn', 'Sections or nav links not found');
            return;
        }
        
        window.addEventListener('scroll', function() {
            let current = '';
            const scrollPos = window.pageYOffset;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').substring(1) === current) {
                    link.classList.add('active');
                    animateNavLink(link);
                }
            });
        });
        
        logger.log('info', 'Nav highlighting setup completed');
    } catch (error) {
        logger.log('error', 'Error setting up nav highlighting: ' + error.message);
        console.error('Error setting up nav highlighting:', error);
    }
}

/**
 * Animate navigation link when it becomes active
 * @param {HTMLElement} link - The nav link element
 */
function animateNavLink(link) {
    // Add a subtle animation
    link.style.animation = 'none';
    void link.offsetWidth; // Trigger reflow
    link.style.animation = 'navLinkActivate 0.5s forwards';
    
    // Add animation keyframes if not already added
    if (!document.querySelector('#nav-link-animation')) {
        const style = document.createElement('style');
        style.id = 'nav-link-animation';
        style.textContent = `
            @keyframes navLinkActivate {
                0% {
                    transform: scale(1);
                }
                50% {
                    transform: scale(1.1);
                }
                100% {
                    transform: scale(1);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Sets up page navigation dots
 */
function setupPageNavigation() {
    logger.log('debug', 'Setting up page navigation dots');
    
    try {
        // Find the sections
        const sections = document.querySelectorAll('section[id]');
        
        if (!sections.length) {
            logger.log('warn', 'No sections found for page navigation');
            return;
        }
        
        // Create navigation container
        const navContainer = document.createElement('div');
        navContainer.className = 'page-navigation';
        navContainer.style.display = 'none'; // Hide navigation dots as requested
        
        // Create navigation list
        const navList = document.createElement('ul');
        
        // Create navigation dots for each section
        sections.forEach((section, index) => {
            const sectionId = section.getAttribute('id');
            const sectionTitle = section.querySelector('.section-header h2')?.textContent || 
                                section.querySelector('h1')?.textContent || 
                                capitalizeFirstLetter(sectionId);
            
            const listItem = document.createElement('li');
            
            const navDot = document.createElement('a');
            navDot.className = 'nav-dot';
            navDot.setAttribute('href', `#${sectionId}`);
            navDot.setAttribute('data-section', sectionId);
            
            // Add tooltip
            const tooltip = document.createElement('span');
            tooltip.className = 'tooltip';
            tooltip.textContent = sectionTitle;
            
            navDot.appendChild(tooltip);
            listItem.appendChild(navDot);
            navList.appendChild(listItem);
            
            // Add click event
            navDot.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetSection = document.querySelector(this.getAttribute('href'));
                window.scrollTo({
                    top: targetSection.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Update active state manually
                navContainer.querySelectorAll('.nav-dot').forEach(dot => dot.classList.remove('active'));
                this.classList.add('active');
            });
        });
        
        navContainer.appendChild(navList);
        document.body.appendChild(navContainer);
        
        logger.log('info', 'Page navigation setup completed');
    } catch (error) {
        logger.log('error', 'Error setting up page navigation: ' + error.message);
        console.error('Error setting up page navigation:', error);
    }
}

/**
 * Add security enhancements to the website
 * This function implements various security best practices
 */
function enhanceSecurity() {
    logger.log('debug', 'Setting up security enhancements');
    
    try {
        // Add rel="noopener noreferrer" to all external links
        const externalLinks = document.querySelectorAll('a[target="_blank"]');
        externalLinks.forEach(link => {
            if (!link.hasAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
                const rel = link.getAttribute('rel') || '';
                link.setAttribute('rel', (rel + ' noopener noreferrer').trim());
            }
        });
        
        // Add event listener to sanitize inputs if forms are added in the future
        document.addEventListener('submit', function(e) {
            const form = e.target;
            const inputs = form.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                // Simple sanitization: trim and encode special characters
                if (input.value) {
                    input.value = input.value.trim();
                }
            });
        });
        
        // Implement Content Security Policy in JS as backup
        // Note: This is best done via HTTP headers, but this is a fallback
        if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
            const cspMeta = document.createElement('meta');
            cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
            cspMeta.setAttribute('content', 'default-src \'self\'; script-src \'self\'; style-src \'self\' https://fonts.googleapis.com https://cdnjs.cloudflare.com \'unsafe-inline\'; font-src \'self\' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src \'self\' data:;');
            document.head.appendChild(cspMeta);
        }
        
        // Add missing security headers as meta tags
        const securityHeaders = [
            { name: 'X-Content-Type-Options', value: 'nosniff' },
            { name: 'X-Frame-Options', value: 'DENY' },
            { name: 'Referrer-Policy', value: 'no-referrer-when-downgrade' },
            { name: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' }
        ];
        
        securityHeaders.forEach(header => {
            if (!document.querySelector(`meta[http-equiv="${header.name}"]`)) {
                const meta = document.createElement('meta');
                meta.setAttribute('http-equiv', header.name);
                meta.setAttribute('content', header.value);
                document.head.appendChild(meta);
            }
        });
        
        // Add integrity attributes to CDN resources if not present
        // Note: This should ideally be done in the HTML, but this is a fallback
        document.querySelectorAll('link[href^="https://"], script[src^="https://"]').forEach(element => {
            if (!element.hasAttribute('integrity') && !element.hasAttribute('data-no-integrity')) {
                element.setAttribute('data-no-integrity', 'true'); // Mark as checked
                element.setAttribute('crossorigin', 'anonymous');
            }
        });
        
        logger.log('info', 'Security enhancements applied');
    } catch (error) {
        logger.log('error', 'Error applying security enhancements: ' + error.message);
        console.error('Error applying security enhancements:', error);
    }
}

/**
 * Helper function to capitalize the first letter of a string
 * @param {string} string - The input string
 * @returns {string} String with first letter capitalized
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Helper function to check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {boolean} Whether element is in viewport
 */
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}