/**
 * Enhanced Preloader for Portfolio Website
 * Creates an attractive loading animation with progress indicator
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    try {
        createEnhancedPreloader();
        logger.log('info', 'Enhanced preloader initialized');
    } catch (error) {
        logger.log('error', 'Error initializing enhanced preloader: ' + error.message);
        console.error('Error initializing enhanced preloader:', error);
    }
});

/**
 * Create an enhanced, visually attractive preloader
 */
function createEnhancedPreloader() {
    // Create preloader container
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    
    // Create preloader content container
    const preloaderContent = document.createElement('div');
    preloaderContent.className = 'preloader-content';
    
    // Create spinner container
    const spinnerContainer = document.createElement('div');
    spinnerContainer.className = 'preloader-logo';
    
    // Create triple-layered spinner
    const spinner = document.createElement('div');
    spinner.className = 'preloader-spinner';
    
    const spinnerOuter = document.createElement('div');
    spinnerOuter.className = 'preloader-spinner-outer';
    
    const spinnerMiddle = document.createElement('div');
    spinnerMiddle.className = 'preloader-spinner-middle';
    
    const spinnerInner = document.createElement('div');
    spinnerInner.className = 'preloader-spinner-inner';
    
    spinner.appendChild(spinnerOuter);
    spinner.appendChild(spinnerMiddle);
    spinner.appendChild(spinnerInner);
    
    // Create Gujarat pattern element
    const gujaratElement = document.createElement('div');
    gujaratElement.className = 'gujarat-element';
    gujaratElement.style.width = '60px';
    gujaratElement.style.height = '60px';
    gujaratElement.style.margin = '20px auto';
    gujaratElement.style.animation = 'rotate 3s infinite ease-in-out';
    
    // Add rotate animation if not already added
    if (!document.querySelector('#rotate-animation')) {
        const style = document.createElement('style');
        style.id = 'rotate-animation';
        style.textContent = `
            @keyframes rotate {
                0% { transform: rotate(0deg); }
                50% { transform: rotate(180deg); }
                100% { transform: rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Add elements to spinner container
    spinnerContainer.appendChild(spinner);
    spinnerContainer.appendChild(gujaratElement);
    
    // Create text content
    const textContent = document.createElement('div');
    textContent.className = 'preloader-text';
    
    const title = document.createElement('h2');
    title.textContent = 'Yuvrajsinh Zala';
    
    const subtitle = document.createElement('p');
    subtitle.textContent = 'AI/ML & Data Science Specialist';
    
    textContent.appendChild(title);
    textContent.appendChild(subtitle);
    
    // Create progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'preloader-progress';
    
    const progressBar = document.createElement('div');
    progressBar.className = 'preloader-progress-bar';
    
    progressContainer.appendChild(progressBar);
    
    // Assemble preloader
    preloaderContent.appendChild(spinnerContainer);
    preloaderContent.appendChild(textContent);
    preloaderContent.appendChild(progressContainer);
    preloader.appendChild(preloaderContent);
    
    // Add preloader to body
    document.body.appendChild(preloader);
    
    // Define resources to preload
    const resources = [
        'img/profile.jpg',
        'img/projects/face-auth-system.jpg',
        'img/projects/attendance-system.jpg',
        'img/projects/ocr-system.jpg',
        'img/projects/sentiment-analysis.jpg',
        'img/gujarat-patterns/pattern1.svg',
        'img/gujarat-patterns/pattern3.svg'
    ];
    
    // Initialize counters
    let loadedResources = 0;
    const totalResources = resources.length;
    
    // Simulate resource loading with actual preloading
    resources.forEach(resource => {
        const img = new Image();
        img.onload = img.onerror = () => {
            loadedResources++;
            updateProgress(loadedResources, totalResources);
            
            // When all resources are loaded, hide preloader
            if (loadedResources === totalResources) {
                setTimeout(() => {
                    hidePreloader(preloader);
                }, 500); // Add a small delay for smoother transition
            }
        };
        img.src = resource;
    });
    
    // Fallback for unexpected issues: hide preloader after 5 seconds
    setTimeout(() => {
        if (loadedResources < totalResources) {
            logger.log('warn', `Preloader timeout: ${loadedResources}/${totalResources} resources loaded`);
            hidePreloader(preloader);
        }
    }, 5000);
}

/**
 * Update preloader progress bar
 * @param {number} loaded - Number of loaded resources
 * @param {number} total - Total number of resources
 */
function updateProgress(loaded, total) {
    const progressBar = document.querySelector('.preloader-progress-bar');
    if (progressBar) {
        const percent = (loaded / total) * 100;
        progressBar.style.width = `${percent}%`;
    }
}

/**
 * Hide preloader with smooth transition
 * @param {HTMLElement} preloader - The preloader element
 */
function hidePreloader(preloader) {
    // Add fade-out animation
    preloader.style.opacity = '0';
    
    // Remove preloader after animation completes
    setTimeout(() => {
        if (preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
            logger.log('info', 'Preloader removed');
            
            // Add appear animations to various elements
            animateContentAppearance();
        }
    }, 500);
}

/**
 * Add appear animations to page content after preloader is gone
 */
function animateContentAppearance() {
    // Elements to animate in sequence
    const elements = [
        document.querySelector('header'),
        document.querySelector('.hero-content'),
        document.querySelector('.scroll-indicator')
    ];
    
    // Animate elements with delay
    elements.forEach((element, index) => {
        if (element) {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 200 * index);
        }
    });
}