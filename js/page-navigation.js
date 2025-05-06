/**
 * Page Navigation Script
 * Handles the interactive dot navigation on the side of the page
 */

document.addEventListener('DOMContentLoaded', function() {
    try {
        initPageNavigation();
        logger.log('info', 'Page navigation initialized');
    } catch (error) {
        logger.log('error', 'Error initializing page navigation: ' + error.message);
        console.error('Error initializing page navigation:', error);
    }
});

/**
 * Initialize page navigation system
 */
function initPageNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navDots = document.querySelectorAll('.nav-dot');
    
    // Highlight active section on scroll
    window.addEventListener('scroll', function() {
        let currentSection = '';
        let scrollPosition = window.pageYOffset;
        
        // Determine which section is currently visible
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Update active dot
        navDots.forEach(dot => {
            dot.classList.remove('active');
            if (dot.getAttribute('data-section') === currentSection) {
                dot.classList.add('active');
            }
        });
    });
    
    // Add click event to each dot
    navDots.forEach(dot => {
        dot.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Smooth scroll to target section
                window.scrollTo({
                    top: targetSection.offsetTop - 70, // Account for header height
                    behavior: 'smooth'
                });
                
                // Update active dot
                navDots.forEach(dot => {
                    dot.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // Initially activate the first dot
    if (navDots.length > 0) {
        navDots[0].classList.add('active');
    }
    
    // Add hover effects
    navDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            animateDot(this, true);
        });
        
        dot.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                animateDot(this, false);
            }
        });
    });
}

/**
 * Animate dot on hover
 * @param {HTMLElement} dot - The navigation dot
 * @param {boolean} isHovered - Whether the dot is being hovered
 */
function animateDot(dot, isHovered) {
    if (isHovered) {
        dot.style.transform = 'scale(1.2)';
    } else {
        dot.style.transform = 'scale(1)';
    }
}