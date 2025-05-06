/**
 * Enhanced Mobile Experience
 * Improves the portfolio experience on mobile devices
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        enhanceMobileExperience();
        logger.log('info', 'Mobile experience enhancements initialized');
    } catch (error) {
        logger.log('error', 'Error initializing mobile enhancements: ' + error.message);
        console.error('Error initializing mobile enhancements:', error);
    }
});

/**
 * Set up all mobile experience enhancements
 */
function enhanceMobileExperience() {
    // Enhanced mobile menu
    setupEnhancedMobileMenu();
    
    // Mobile-specific optimizations
    optimizeForMobile();
    
    // Improve form experience on mobile
    enhanceMobileFormExperience();
    
    // Add touch-specific interactions
    addTouchInteractions();
    
    logger.log('info', 'Mobile enhancements setup completed');
}

/**
 * Set up an enhanced mobile menu with animations
 */
function setupEnhancedMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (!menuBtn || !navLinks) {
        logger.log('warn', 'Mobile menu elements not found');
        return;
    }
    
    // Create overlay for mobile menu
    const overlay = document.createElement('div');
    overlay.className = 'mobile-menu-overlay';
    document.body.appendChild(overlay);
    
    let isOpen = false;
    
    menuBtn.addEventListener('click', function() {
        isOpen = !isOpen;
        
        if (isOpen) {
            // Show overlay with fade in
            overlay.style.visibility = 'visible';
            overlay.style.opacity = '1';
            
            // Add mobile active class
            navLinks.classList.add('mobile-active');
            
            // Change icon to close
            menuBtn.innerHTML = '<i class="fas fa-times"></i>';
            
            // Prevent background scrolling
            document.body.style.overflow = 'hidden';
            
            // Animate links appearance
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
        } else {
            // Hide overlay with fade out
            overlay.style.opacity = '0';
            setTimeout(() => {
                overlay.style.visibility = 'hidden';
            }, 300);
            
            // Remove mobile active class
            navLinks.classList.remove('mobile-active');
            
            // Change icon back to menu
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            
            // Enable background scrolling again
            document.body.style.overflow = '';
        }
        
        logger.log('info', `Mobile menu toggled: ${isOpen ? 'opened' : 'closed'}`);
    });
    
    // Close menu when clicking on overlay
    overlay.addEventListener('click', function() {
        if (isOpen) {
            menuBtn.click();
        }
    });
    
    // Close menu when clicking on links
    const links = navLinks.querySelectorAll('a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (isOpen) {
                menuBtn.click();
            }
        });
    });
    
    logger.log('info', 'Enhanced mobile menu setup completed');
}

/**
 * Apply mobile-specific optimizations
 */
function optimizeForMobile() {
    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        logger.log('info', 'Mobile device detected, applying optimizations');
        
        // Optimize hero section for mobile
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.querySelectorAll('*').forEach(el => {
                if (el.tagName === 'H1') {
                    el.style.fontSize = '2.2rem';
                } else if (el.tagName === 'H2') {
                    el.style.fontSize = '1.4rem';
                } else if (el.tagName === 'P') {
                    el.style.fontSize = '1rem';
                }
            });
        }
        
        // Optimize images for mobile
        document.querySelectorAll('img').forEach(img => {
            // Add loading="lazy" attribute for better performance
            img.setAttribute('loading', 'lazy');
            
            // Add decoding="async" for better rendering performance
            img.setAttribute('decoding', 'async');
        });
        
        // Optimize project cards for mobile viewing
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            // Make project images smaller on mobile
            const img = card.querySelector('.project-img');
            if (img) {
                img.style.height = '180px';
            }
            
            // Reduce padding for project info
            const info = card.querySelector('.project-info');
            if (info) {
                info.style.padding = '20px';
            }
        });
        
        // Optimize timeline for mobile
        const timeline = document.querySelector('.mountain-timeline-container');
        if (timeline) {
            // Move the path to the left on mobile
            const path = timeline.querySelector('.mountain-path');
            if (path) {
                path.style.left = '30px';
            }
            
            // Adjust timeline milestone layout
            const milestones = timeline.querySelectorAll('.timeline-milestone');
            milestones.forEach(milestone => {
                milestone.style.flexDirection = 'row-reverse';
                milestone.style.marginLeft = '30px';
                
                const content = milestone.querySelector('.milestone-content');
                if (content) {
                    content.style.maxWidth = 'calc(100% - 80px)';
                }
            });
        }
    }
    
    // Listen for orientation changes
    window.addEventListener('orientationchange', function() {
        logger.log('info', 'Orientation changed, adjusting layout');
        
        // Delay adjustment to let the orientation change complete
        setTimeout(() => {
            // Re-run optimizations
            optimizeForMobile();
        }, 300);
    });
    
    logger.log('info', 'Mobile optimizations applied');
}

/**
 * Enhance form experience on mobile devices
 */
function enhanceMobileFormExperience() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Get form elements
        const form = document.getElementById('contactForm');
        if (!form) return;
        
        const inputs = form.querySelectorAll('input, textarea');
        
        // Prevent zoom on focus in iOS
        inputs.forEach(input => {
            // Set font size to 16px to prevent zoom
            input.style.fontSize = '16px';
            
            // Add better touch targets
            input.style.padding = '16px';
            
            // Add better visual feedback on touch
            input.addEventListener('touchstart', function() {
                this.style.backgroundColor = 'rgba(129, 85, 230, 0.05)';
            });
            
            input.addEventListener('touchend', function() {
                this.style.backgroundColor = '';
            });
        });
        
        // Make submit button full width on mobile
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.style.width = '100%';
            submitButton.style.padding = '16px';
        }
        
        // Better validation messages for mobile
        inputs.forEach(input => {
            input.addEventListener('invalid', function(e) {
                // Prevent browser default validation bubble
                e.preventDefault();
                
                // Add custom validation message
                const name = this.name.charAt(0).toUpperCase() + this.name.slice(1);
                showMobileValidationMessage(this, `${name} is required`);
            });
        });
    }
    
    logger.log('info', 'Mobile form enhancements applied');
}

/**
 * Show custom validation message for mobile forms
 * @param {HTMLElement} input - The form input element
 * @param {string} message - The validation message
 */
function showMobileValidationMessage(input, message) {
    // Remove any existing message
    const existingMessage = input.parentNode.querySelector('.mobile-validation-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create validation message
    const validationMessage = document.createElement('div');
    validationMessage.className = 'mobile-validation-message';
    validationMessage.textContent = message;
    validationMessage.style.color = '#e53e3e';
    validationMessage.style.fontSize = '0.85rem';
    validationMessage.style.marginTop = '5px';
    validationMessage.style.paddingLeft = '5px';
    
    // Add message after input
    input.parentNode.appendChild(validationMessage);
    
    // Add red border to input
    input.style.borderColor = '#e53e3e';
    
    // Remove message when input is changed
    input.addEventListener('input', function onInput() {
        validationMessage.remove();
        input.style.borderColor = '';
        input.removeEventListener('input', onInput);
    });
    
    // Auto-hide after 3 seconds
    setTimeout(() => {
        if (validationMessage.parentNode) {
            validationMessage.remove();
        }
    }, 3000);
}

/**
 * Add mobile-specific touch interactions
 */
function addTouchInteractions() {
    // Check if device supports touch events
    if ('ontouchstart' in window) {
        logger.log('info', 'Touch device detected, adding touch interactions');
        
        // Add better touch feedback to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            btn.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.style.transform = '';
                }, 100);
            });
        });
        
        // Add swipe detection for project cards
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card => {
            let touchStartX = 0;
            let touchEndX = 0;
            
            card.addEventListener('touchstart', function(e) {
                touchStartX = e.changedTouches[0].screenX;
            });
            
            card.addEventListener('touchend', function(e) {
                touchEndX = e.changedTouches[0].screenX;
                handleSwipe(this, touchStartX, touchEndX);
            });
        });
    }
}

/**
 * Handle swipe gestures on elements
 * @param {HTMLElement} element - The element being swiped
 * @param {number} startX - Touch start X position
 * @param {number} endX - Touch end X position
 */
function handleSwipe(element, startX, endX) {
    const threshold = 100; // Minimum swipe distance
    const swipeDistance = endX - startX;
    
    // Right swipe
    if (swipeDistance > threshold) {
        // Show or highlight previous content
        element.style.transform = 'translateX(10px)';
        setTimeout(() => {
            element.style.transform = '';
        }, 300);
    }
    // Left swipe
    else if (swipeDistance < -threshold) {
        // Show or highlight next content
        element.style.transform = 'translateX(-10px)';
        setTimeout(() => {
            element.style.transform = '';
        }, 300);
    }
}