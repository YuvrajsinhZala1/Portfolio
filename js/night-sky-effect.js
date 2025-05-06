/**
 * Night Sky Effect with Day/Night Toggle
 * Creates a starry night sky with shooting stars in dark mode and a sunny day in light mode
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        initDayNightEffect();
        logger.log('info', 'Day/Night effect initialized');
    } catch (error) {
        logger.log('error', 'Error initializing day/night effect: ' + error.message);
        console.error('Error initializing day/night effect:', error);
    }
});

/**
 * Initialize day/night effect
 */
function initDayNightEffect() {
    // Create night sky container
    const nightSky = document.createElement('div');
    nightSky.className = 'night-sky';
    nightSky.style.position = 'fixed';
    nightSky.style.top = '0';
    nightSky.style.left = '0';
    nightSky.style.width = '100%';
    nightSky.style.height = '100%';
    nightSky.style.pointerEvents = 'none';
    nightSky.style.zIndex = '-2';
    nightSky.style.opacity = '0';
    nightSky.style.transition = 'opacity 1s ease';
    
    // Add to body
    document.body.appendChild(nightSky);
    
    // Create day sky container
    const daySky = document.createElement('div');
    daySky.className = 'day-sky';
    daySky.style.position = 'fixed';
    daySky.style.top = '0';
    daySky.style.left = '0';
    daySky.style.width = '100%';
    daySky.style.height = '100%';
    daySky.style.pointerEvents = 'none';
    daySky.style.zIndex = '-2';
    daySky.style.opacity = '0';
    daySky.style.transition = 'opacity 1s ease';
    
    // Add to body
    document.body.appendChild(daySky);
    
    // Create stars
    createStars(nightSky, 100);
    
    // Create moon
    createMoon(nightSky);
    
    // Create sun
    createSun(daySky);
    
    // Create clouds for day sky
    createClouds(daySky, 5);
    
    // Listen for dark mode toggle
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            toggleSkyEffect(this.checked);
        });
        
        // Initial state
        if (document.body.classList.contains('dark-mode')) {
            toggleSkyEffect(true);
        } else {
            toggleSkyEffect(false);
        }
    }
    
    // Setup shooting stars interval
    setInterval(() => {
        if (document.body.classList.contains('dark-mode')) {
            createShootingStar(nightSky);
        }
    }, 5000);
}

/**
 * Toggle between day and night sky effects
 * @param {boolean} isDarkMode - Whether dark mode is active
 */
function toggleSkyEffect(isDarkMode) {
    const nightSky = document.querySelector('.night-sky');
    const daySky = document.querySelector('.day-sky');
    
    if (!nightSky || !daySky) return;
    
    if (isDarkMode) {
        nightSky.style.opacity = '1';
        daySky.style.opacity = '0';
    } else {
        nightSky.style.opacity = '0';
        daySky.style.opacity = '1';
    }
}

/**
/**
 * Create stars in the night sky
 * @param {HTMLElement} container - The night sky container
 * @param {number} count - Number of stars to create
 */
function createStars(container, count) {
    for (let i = 0; i < count; i++) {
        const star = document.createElement('div');
        const size = Math.random() * 2;
        
        star.className = 'star';
        star.style.position = 'absolute';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.backgroundColor = '#FFFFFF';
        star.style.borderRadius = '50%';
        star.style.opacity = Math.random() * 0.7 + 0.3;
        
        // Add twinkling animation
        const duration = Math.random() * 3 + 2;
        star.style.animation = `twinkle ${duration}s infinite ease-in-out`;
        
        // Add animation delay
        star.style.animationDelay = `${Math.random() * 5}s`;
        
        container.appendChild(star);
    }
    
    // Add twinkle keyframes
    if (!document.querySelector('#twinkle-animation')) {
        const style = document.createElement('style');
        style.id = 'twinkle-animation';
        style.textContent = `
            @keyframes twinkle {
                0%, 100% { opacity: 0.3; }
                50% { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Create moon in the night sky
 * @param {HTMLElement} container - The night sky container
 */
function createMoon(container) {
    const moon = document.createElement('div');
    
    moon.className = 'moon';
    moon.style.position = 'absolute';
    moon.style.right = '10%';
    moon.style.top = '15%';
    moon.style.width = '60px';
    moon.style.height = '60px';
    moon.style.borderRadius = '50%';
    moon.style.background = 'radial-gradient(circle at 35% 30%, #FFFFFF 0%, #F5F5F5 20%, #E0E0E0 40%, #CCCCCC 60%, #BBBBBB 80%)';
    moon.style.boxShadow = '0 0 20px rgba(255, 255, 255, 0.4)';
    moon.style.opacity = '0.7';
    moon.style.transform = 'scale(0)';
    moon.style.transition = 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Create moon craters
    for (let i = 0; i < 4; i++) {
        const crater = document.createElement('div');
        crater.className = 'crater';
        crater.style.position = 'absolute';
        crater.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        crater.style.borderRadius = '50%';
        
        // Position and size craters
        switch (i) {
            case 0:
                crater.style.width = '10px';
                crater.style.height = '10px';
                crater.style.top = '20%';
                crater.style.left = '25%';
                break;
            case 1:
                crater.style.width = '7px';
                crater.style.height = '7px';
                crater.style.top = '40%';
                crater.style.left = '60%';
                break;
            case 2:
                crater.style.width = '12px';
                crater.style.height = '12px';
                crater.style.top = '60%';
                crater.style.left = '30%';
                break;
            case 3:
                crater.style.width = '9px';
                crater.style.height = '9px';
                crater.style.top = '25%';
                crater.style.left = '70%';
                break;
        }
        
        moon.appendChild(crater);
    }
    
    container.appendChild(moon);
    
    // Add slight animation to the moon
    setInterval(() => {
        if (document.body.classList.contains('dark-mode')) {
            moon.style.transform = 'scale(1)';
        } else {
            moon.style.transform = 'scale(0)';
        }
    }, 100);
}

/**
 * Create a sun for the day sky
 * @param {HTMLElement} container - The day sky container
 */
function createSun(container) {
    const sun = document.createElement('div');
    
    sun.className = 'sun';
    sun.style.position = 'absolute';
    sun.style.right = '10%';
    sun.style.top = '15%';
    sun.style.width = '60px';
    sun.style.height = '60px';
    sun.style.borderRadius = '50%';
    sun.style.background = 'radial-gradient(circle at 65% 35%, #FFF176 0%, #FFEB3B 30%, #FFC107 60%, #FF9800 90%)';
    sun.style.boxShadow = '0 0 60px rgba(255, 235, 59, 0.8), 0 0 120px rgba(255, 193, 7, 0.4)';
    sun.style.opacity = '0.9';
    sun.style.transform = 'scale(0)';
    sun.style.transition = 'transform 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    
    // Create sun rays
    for (let i = 0; i < 12; i++) {
        const ray = document.createElement('div');
        ray.className = 'sun-ray';
        ray.style.position = 'absolute';
        ray.style.top = 'calc(50% - 1px)';
        ray.style.left = '50%';
        ray.style.width = '30px';
        ray.style.height = '2px';
        ray.style.backgroundColor = 'rgba(255, 235, 59, 0.6)';
        ray.style.transformOrigin = '0 50%';
        ray.style.transform = `rotate(${i * 30}deg) translateX(30px)`;
        ray.style.animation = `sunRayPulse 3s infinite alternate ${i * 0.25}s`;
        
        sun.appendChild(ray);
    }
    
    container.appendChild(sun);
    
    // Add sun ray animation keyframes
    if (!document.querySelector('#sun-ray-animation')) {
        const style = document.createElement('style');
        style.id = 'sun-ray-animation';
        style.textContent = `
            @keyframes sunRayPulse {
                0% {
                    width: 25px;
                    opacity: 0.4;
                }
                100% {
                    width: 35px;
                    opacity: 0.8;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add slight animation to the sun
    setInterval(() => {
        if (!document.body.classList.contains('dark-mode')) {
            sun.style.transform = 'scale(1)';
        } else {
            sun.style.transform = 'scale(0)';
        }
    }, 100);
}

/**
 * Create clouds for the day sky
 * @param {HTMLElement} container - The day sky container
 * @param {number} count - Number of clouds to create
 */
function createClouds(container, count) {
    for (let i = 0; i < count; i++) {
        const cloud = document.createElement('div');
        cloud.className = 'cloud';
        
        // Position cloud randomly
        cloud.style.position = 'absolute';
        cloud.style.left = `${Math.random() * 70 + 5}%`;
        cloud.style.top = `${Math.random() * 30 + 5}%`;
        cloud.style.opacity = '0.7';
        
        // Create cloud shape
        const cloudContainer = document.createElement('div');
        cloudContainer.style.position = 'relative';
        cloudContainer.style.width = `${Math.random() * 100 + 100}px`;
        cloudContainer.style.height = `${Math.random() * 40 + 40}px`;
        
        // Create cloud parts
        for (let j = 0; j < 5; j++) {
            const cloudPart = document.createElement('div');
            cloudPart.style.position = 'absolute';
            cloudPart.style.width = `${Math.random() * 40 + 40}px`;
            cloudPart.style.height = `${Math.random() * 40 + 40}px`;
            cloudPart.style.borderRadius = '50%';
            cloudPart.style.backgroundColor = '#FFFFFF';
            cloudPart.style.boxShadow = 'inset -5px -5px 10px rgba(0, 0, 0, 0.1)';
            cloudPart.style.left = `${j * 20}px`;
            cloudPart.style.top = `${Math.random() * 10}px`;
            
            cloudContainer.appendChild(cloudPart);
        }
        
        cloud.appendChild(cloudContainer);
        
        // Add animation
        cloud.style.animation = `cloudFloat ${Math.random() * 60 + 60}s linear infinite`;
        cloud.style.animationDelay = `${Math.random() * 60}s`;
        
        container.appendChild(cloud);
    }
    
    // Add cloud float animation keyframes
    if (!document.querySelector('#cloud-float-animation')) {
        const style = document.createElement('style');
        style.id = 'cloud-float-animation';
        style.textContent = `
            @keyframes cloudFloat {
                0% {
                    transform: translateX(-100%);
                }
                100% {
                    transform: translateX(100vw);
                }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Create a shooting star
 * @param {HTMLElement} container - The night sky container
 */
function createShootingStar(container) {
    if (!document.body.classList.contains('dark-mode')) return;
    
    const shootingStar = document.createElement('div');
    
    // Calculate a random angle (in radians) between -30 and -60 degrees
    const angleRad = (Math.random() * 30 + 30) * -Math.PI / 180;
    
    // Starting position: random horizontal position at the top area of the screen
    const startX = Math.random() * 80 + 10; // 10% to 90% of screen width
    const startY = Math.random() * 30; // 0% to 30% of screen height
    
    // Calculate end position based on the angle
    const length = Math.max(window.innerWidth, window.innerHeight);
    const endX = startX + Math.cos(angleRad) * length;
    const endY = startY - Math.sin(angleRad) * length;
    
    shootingStar.className = 'shooting-star';
    shootingStar.style.position = 'absolute';
    shootingStar.style.left = `${startX}%`;
    shootingStar.style.top = `${startY}%`;
    shootingStar.style.width = '2px';
    shootingStar.style.height = '2px';
    shootingStar.style.backgroundColor = '#FFFFFF';
    shootingStar.style.borderRadius = '50%';
    shootingStar.style.boxShadow = '0 0 5px 1px rgba(255, 255, 255, 0.8)';
    shootingStar.style.opacity = '0';
    
    // Add trail effect
    shootingStar.style.setProperty('--start-x', `${startX}%`);
    shootingStar.style.setProperty('--start-y', `${startY}%`);
    shootingStar.style.setProperty('--end-x', `${endX}%`);
    shootingStar.style.setProperty('--end-y', `${endY}%`);
    
    container.appendChild(shootingStar);
    
    // Add shooting star animation if not already added
    if (!document.querySelector('#shooting-star-animation')) {
        const style = document.createElement('style');
        style.id = 'shooting-star-animation';
        style.textContent = `
            @keyframes shootingStar {
                0% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0;
                }
                5% {
                    opacity: 1;
                }
                40% {
                    transform: translate(calc(var(--end-x) - var(--start-x)), calc(var(--end-y) - var(--start-y))) scale(0.2);
                    opacity: 0;
                }
                100% {
                    transform: translate(calc(var(--end-x) - var(--start-x)), calc(var(--end-y) - var(--start-y))) scale(0);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Animate the shooting star
    shootingStar.style.animation = 'shootingStar 2s ease-out forwards';
    
    // Remove shooting star after animation completes
    setTimeout(() => {
        if (shootingStar.parentNode) {
            shootingStar.parentNode.removeChild(shootingStar);
        }
    }, 2000);
}