/**
 * Project Filters
 * Handles filtering of projects by category
 */

document.addEventListener('DOMContentLoaded', function() {
    try {
        initProjectFilters();
        logger.log('info', 'Project filters initialized');
    } catch (error) {
        logger.log('error', 'Error initializing project filters: ' + error.message);
        console.error('Error initializing project filters:', error);
    }
});

/**
 * Initialize project filters
 */
function initProjectFilters() {
    const filterBtns = document.querySelectorAll('.project-filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (!filterBtns.length || !projectCards.length) {
        logger.log('warn', 'Filter buttons or project cards not found');
        return;
    }
    
    // Add click event listener to each filter button
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide projects based on filter
            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
            
            logger.log('info', 'Projects filtered by: ' + filterValue);
        });
    });
    
    logger.log('info', 'Project filters setup completed');
}