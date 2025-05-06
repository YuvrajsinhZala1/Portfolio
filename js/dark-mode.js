/**
 * Dark Mode Toggle Functionality
 * Handles the switching between light and dark modes with improved animations
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        initDarkMode();
        logger.log('info', 'Dark mode functionality initialized');
    } catch (error) {
        logger.log('error', 'Error initializing dark mode: ' + error.message);
        console.error('Error initializing dark mode:', error);
    }
});

/**
 * Initialize dark mode functionality
 */
function initDarkMode() {
    logger.log('debug', 'Setting up dark mode toggle');
    
    // Get the toggle checkbox
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    if (!darkModeToggle) {
        logger.log('warn', 'Dark mode toggle element not found');
        return;
    }
    
    // Create custom event for dark mode toggle
    const darkModeToggleEvent = new Event('darkModeToggle');
    
    // Auto-set dark mode based on current time
    setInitialThemeBasedOnTime();
    
    // When toggle is clicked, toggle dark mode
    darkModeToggle.addEventListener('change', function() {
        if (this.checked) {
            enableDarkMode();
            localStorage.setItem('darkMode', 'enabled');
            logger.log('info', 'Dark mode enabled by user');
        } else {
            disableDarkMode();
            localStorage.setItem('darkMode', 'disabled');
            logger.log('info', 'Dark mode disabled by user');
        }
        
        // Dispatch custom event for dark mode toggle
        document.dispatchEvent(darkModeToggleEvent);
    });
    
    // Also check for system preference if user hasn't manually set preference
    checkSystemPreference();
}

/**
 * Set initial theme based on time of day
 */
function setInitialThemeBasedOnTime() {
    // Get current hour
    const currentHour = new Date().getHours();
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Check for saved user preference, if any
    const darkMode = localStorage.getItem('darkMode');
    
    // If user has a saved preference, use that
    if (darkMode === 'enabled') {
        enableDarkMode();
        darkModeToggle.checked = true;
        logger.log('info', 'Dark mode applied from stored preference');
    } else if (darkMode === 'disabled') {
        disableDarkMode();
        darkModeToggle.checked = false;
        logger.log('info', 'Light mode applied from stored preference');
    } else {
        // If no saved preference, set based on time
        // Daytime: 6am to 6pm (6-18)
        if (currentHour >= 6 && currentHour < 18) {
            disableDarkMode();
            darkModeToggle.checked = false;
            logger.log('info', 'Light mode applied based on time of day');
        } else {
            enableDarkMode();
            darkModeToggle.checked = true;
            logger.log('info', 'Dark mode applied based on time of day');
        }
    }
}

/**
 * Check system preference for dark/light mode
 */
function checkSystemPreference() {
    logger.log('debug', 'Checking system preference for dark mode');
    
    // Check if the media query is supported
    if (window.matchMedia) {
        // Check if the dark-mode Media-Query matches
        const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
        
        // Initial check - only apply if user hasn't manually set preference
        if (localStorage.getItem('darkMode') === null) {
            if (prefersDarkMode.matches) {
                enableDarkMode();
                document.getElementById('darkModeToggle').checked = true;
                logger.log('info', 'Dark mode enabled based on system preference');
            }
        }
        
        // Add change listener
        prefersDarkMode.addEventListener('change', function(e) {
            // Only apply if user hasn't manually set preference
            if (localStorage.getItem('darkMode') === null) {
                if (e.matches) {
                    enableDarkMode();
                    document.getElementById('darkModeToggle').checked = true;
                    logger.log('info', 'Dark mode enabled based on system preference change');
                } else {
                    disableDarkMode();
                    document.getElementById('darkModeToggle').checked = false;
                    logger.log('info', 'Dark mode disabled based on system preference change');
                }
                
                // Dispatch custom event for dark mode toggle
                const darkModeToggleEvent = new Event('darkModeToggle');
                document.dispatchEvent(darkModeToggleEvent);
            }
        });
    }
}

/**
 * Enable dark mode with enhanced animations
 */
function enableDarkMode() {
    logger.log('debug', 'Enabling dark mode');
    
    try {
        // Animate the transition
        animateColorTransition(false, true);
        
        // Add the dark-mode class to the body after a slight delay for smoother transition
        setTimeout(() => {
            document.body.classList.add('dark-mode');
            document.documentElement.setAttribute('data-theme', 'dark');
        }, 100);
        
        // Apply special dark mode effects
        applyDarkModeEffects(true);
        
        // Add a subtle pulse animation to buttons and interactive elements
        addPulseEffect(true);
        
        logger.log('info', 'Dark mode enabled successfully');
    } catch (error) {
        logger.log('error', 'Error enabling dark mode: ' + error.message);
        console.error('Error enabling dark mode:', error);
    }
}

/**
 * Disable dark mode with enhanced animations
 */
function disableDarkMode() {
    logger.log('debug', 'Disabling dark mode');
    
    try {
        // Animate the transition
        animateColorTransition(true, false);
        
        // Remove the dark-mode class from the body
        setTimeout(() => {
            document.body.classList.remove('dark-mode');
            document.documentElement.setAttribute('data-theme', 'light');
        }, 100);
        
        // Remove special dark mode effects
        applyDarkModeEffects(false);
        
        // Remove pulse effect
        addPulseEffect(false);
        
        logger.log('info', 'Dark mode disabled successfully');
    } catch (error) {
        logger.log('error', 'Error disabling dark mode: ' + error.message);
        console.error('Error disabling dark mode:', error);
    }
}

/**
 * Animate color transition between light and dark modes
 * @param {boolean} fromDark - If transitioning from dark mode
 * @param {boolean} toDark - If transitioning to dark mode
 */
function animateColorTransition(fromDark, toDark) {
    try {
        // Create an overlay element for the transition
        const overlay = document.createElement('div');
        overlay.className = 'mode-transition-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100%';
        overlay.style.height = '100%';
        overlay.style.backgroundColor = toDark ? 'rgba(18, 18, 18, 0)' : 'rgba(255, 255, 255, 0)';
        overlay.style.zIndex = '9999';
        overlay.style.pointerEvents = 'none';
        overlay.style.transition = 'background-color 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        
        document.body.appendChild(overlay);
        
        // Force reflow
        void overlay.offsetWidth;
        
        // Animate the overlay
        overlay.style.backgroundColor = toDark ? 'rgba(18, 18, 18, 0.1)' : 'rgba(255, 255, 255, 0.1)';
        
        // Remove the overlay after the animation completes
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500);
    } catch (error) {
        logger.log('error', 'Error during color transition: ' + error.message);
        console.error('Error during color transition:', error);
    }
}

/**
 * Apply special effects for dark mode
 * @param {boolean} isDarkMode - Whether dark mode is enabled
 */
function applyDarkModeEffects(isDarkMode) {
    logger.log('debug', 'Applying special dark mode effects: ' + isDarkMode);
    
    try {
        // Get elements that should have special effects
        const primaryElements = [
            ...document.querySelectorAll('.btn.primary-btn'),
            ...document.querySelectorAll('.highlight'),
            ...document.querySelectorAll('.skill-icon'),
            ...document.querySelectorAll('.milestone-icon'),
            ...document.querySelectorAll('.contact-method i')
        ];
        
        if (isDarkMode) {
            // Add glow effect to elements
            primaryElements.forEach(element => {
                element.style.transition = 'all 0.5s ease, box-shadow 1s ease';
                
                // Different elements may need different glow effects
                if (element.classList.contains('highlight')) {
                    element.style.textShadow = '0 0 8px rgba(0, 184, 169, 0.4)';
                } else {
                    element.classList.add('dark-glow-effect');
                }
            });
            
            // Add transition to mountain background for subtle movement
            const mountainSvg = document.querySelector('.mountain-background svg');
            if (mountainSvg) {
                mountainSvg.style.transition = 'transform 60s ease, filter 1s ease';
                mountainSvg.style.transform = 'scale(1.05)';
                mountainSvg.style.filter = 'brightness(0.8) hue-rotate(180deg)';
            }
            
            // Toggle additional effects
            toggleNeonGlow(true);
            
            logger.log('info', 'Dark mode effects applied');
        } else {
            // Remove glow effects
            primaryElements.forEach(element => {
                if (element.classList.contains('highlight')) {
                    element.style.textShadow = '';
                } else {
                    element.classList.remove('dark-glow-effect');
                }
            });
            
            // Reset mountain background
            const mountainSvg = document.querySelector('.mountain-background svg');
            if (mountainSvg) {
                mountainSvg.style.transform = '';
                mountainSvg.style.filter = '';
            }
            
            // Toggle additional effects
            toggleNeonGlow(false);
            
            logger.log('info', 'Dark mode effects removed');
        }
        
        // Update Gujarat elements
        updateGujaratElements(isDarkMode);
        
    } catch (error) {
        logger.log('error', 'Error applying dark mode effects: ' + error.message);
        console.error('Error applying dark mode effects:', error);
    }
}

/**
 * Toggle neon glow effect
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function toggleNeonGlow(isDarkMode) {
    try {
        // Create or get glow style element
        let glowStyles = document.getElementById('neon-glow-styles');
        
        if (!glowStyles) {
            glowStyles = document.createElement('style');
            glowStyles.id = 'neon-glow-styles';
            document.head.appendChild(glowStyles);
        }
        
        if (isDarkMode) {
            // Add glow keyframes and styles
            glowStyles.textContent = `
                @keyframes neonPulse {
                    0% {
                        box-shadow: 0 0 7px rgba(0, 184, 169, 0.5);
                    }
                    50% {
                        box-shadow: 0 0 12px rgba(0, 184, 169, 0.8), 0 0 20px rgba(0, 184, 169, 0.4);
                    }
                    100% {
                        box-shadow: 0 0 7px rgba(0, 184, 169, 0.5);
                    }
                }
                
                @keyframes neonTextPulse {
                    0% {
                        text-shadow: 0 0 7px rgba(0, 184, 169, 0.5);
                    }
                    50% {
                        text-shadow: 0 0 12px rgba(0, 184, 169, 0.8), 0 0 20px rgba(0, 184, 169, 0.4);
                    }
                    100% {
                        text-shadow: 0 0 7px rgba(0, 184, 169, 0.5);
                    }
                }
                
                .dark-glow-effect {
                    animation: neonPulse 4s infinite;
                }
                
                body.dark-mode .section-header h2 {
                    animation: neonTextPulse 4s infinite;
                }
            `;
        } else {
            // Clear glow styles
            glowStyles.textContent = '';
        }
    } catch (error) {
        logger.log('error', 'Error toggling neon glow: ' + error.message);
        console.error('Error toggling neon glow:', error);
    }
}

/**
 * Update Gujarat elements based on dark mode
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function updateGujaratElements(isDarkMode) {
    try {
        const gujaratElements = document.querySelectorAll('.gujarat-element');
        
        gujaratElements.forEach(element => {
            if (isDarkMode) {
                element.style.filter = 'hue-rotate(140deg) brightness(1.5) saturate(1.5)';
            } else {
                element.style.filter = 'hue-rotate(240deg) brightness(1.2)';
            }
        });
    } catch (error) {
        logger.log('error', 'Error updating Gujarat elements: ' + error.message);
        console.error('Error updating Gujarat elements:', error);
    }
}

/**
 * Add subtle pulse effect to interactive elements
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function addPulseEffect(isDarkMode) {
    try {
        // Get interactive elements
        const interactiveElements = [
            ...document.querySelectorAll('.btn'),
            ...document.querySelectorAll('.project-card'),
            ...document.querySelectorAll('.social-links a')
        ];
        
        interactiveElements.forEach(element => {
            if (isDarkMode) {
                // Add event listeners for hover effects
                element.addEventListener('mouseenter', function() {
                    this.style.transition = 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
                    this.style.transform = this.style.transform ? this.style.transform + ' scale(1.05)' : 'scale(1.05)';
                    
                    // Add stronger shadow
                    if (this.classList.contains('btn')) {
                        this.style.boxShadow = '0 0 15px rgba(0, 184, 169, 0.6)';
                    }
                });
                
                element.addEventListener('mouseleave', function() {
                    this.style.transform = this.style.transform ? this.style.transform.replace(' scale(1.05)', '') : '';
                    
                    // Reset shadow
                    if (this.classList.contains('btn')) {
                        this.style.boxShadow = '';
                    }
                });
            } else {
                // Remove event listeners
                element.removeEventListener('mouseenter', null);
                element.removeEventListener('mouseleave', null);
                element.style.transform = '';
                element.style.boxShadow = '';
            }
        });
    } catch (error) {
        logger.log('error', 'Error adding pulse effect: ' + error.message);
        console.error('Error adding pulse effect:', error);
    }
}

// Check dark mode status
function isDarkMode() {
    return document.body.classList.contains('dark-mode');
}

// Make toggleNorthernLights available globally
if (typeof window.toggleNorthernLights !== 'function') {
    window.toggleNorthernLights = function(isDarkMode) {
        logger.log('debug', 'Northern lights toggle function called, but actual implementation not loaded yet');
    };
}