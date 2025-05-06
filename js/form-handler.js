/**
 * Form Handler Script
 * Handles the contact form submission with enhanced user feedback
 */

document.addEventListener('DOMContentLoaded', function() {
    try {
        initFormHandler();
        logger.log('info', 'Form handler initialized');
    } catch (error) {
        logger.log('error', 'Error initializing form handler: ' + error.message);
        console.error('Error initializing form handler:', error);
    }
});

/**
 * Initialize form handler
 */
function initFormHandler() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) {
        logger.log('warn', 'Contact form not found');
        return;
    }
    
    // Add input animations
    const formInputs = contactForm.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentNode.classList.add('input-focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentNode.classList.remove('input-focused');
            }
        });
        
        // Check for existing values (e.g., on page reload)
        if (input.value) {
            input.parentNode.classList.add('input-focused');
        }
    });
    
    // Set up form submission
    contactForm.addEventListener('submit', function(event) {
        // Let the form submit naturally to formsubmit.co service
        // Just add some visual feedback
        
        try {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;
            
            // Get form data for logging
            const formData = {
                name: document.getElementById('name').value.trim(),
                email: document.getElementById('email').value.trim(),
                subject: document.getElementById('subject').value.trim(),
                message: document.getElementById('message').value.trim()
            };
            
            logger.log('info', 'Form submitted with data: ' + JSON.stringify({
                name: formData.name,
                email: formData.email,
                subject: formData.subject,
                message: formData.message.substring(0, 20) + '...' // Log only start of message for privacy
            }));
            
            // Create a hidden thank you page to redirect to after form submission
            createThankYouPage();
            
            // We're allowing the form to submit naturally to formsubmit.co
            // No need to preventDefault()
        } catch (error) {
            logger.log('error', 'Error during form submission: ' + error.message);
            console.error('Error during form submission:', error);
            
            // Show error message
            showFormError('Sorry, there was an error sending your message. Please try again later.');
            
            // Prevent form submission on error
            event.preventDefault();
        }
    });
    
    logger.log('info', 'Form handler setup completed');
}

/**
 * Create a thank you page for redirect after form submission
 */
function createThankYouPage() {
    // Check if thank you page already exists
    if (!document.querySelector('a[href="thank-you.html"]')) {
        try {
            // Create a simple HTML file with thank you message
            const thankYouHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Thank You | Yuvrajsinh Zala</title>
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/dark-mode.css">
    <style>
        .thank-you-container {
            text-align: center;
            padding: 100px 20px;
            max-width: 600px;
            margin: 0 auto;
        }
        .thank-you-icon {
            font-size: 4rem;
            color: var(--primary);
            margin-bottom: 20px;
        }
        .back-button {
            margin-top: 30px;
        }
    </style>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css">
</head>
<body>
    <div class="thank-you-container">
        <div class="thank-you-icon">
            <i class="fas fa-check-circle"></i>
        </div>
        <h1>Thank You!</h1>
        <p>Your message has been sent successfully. I'll get back to you soon.</p>
        <a href="index.html" class="btn primary-btn back-button">Back to Homepage</a>
    </div>
    <script>
        // Redirect back to homepage after 5 seconds
        setTimeout(function() {
            window.location.href = "index.html";
        }, 5000);
    </script>
</body>
</html>
            `;
            
            // Create a download link for the HTML file
            const downloadLink = document.createElement('a');
            downloadLink.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(thankYouHtml));
            downloadLink.setAttribute('download', 'thank-you.html');
            downloadLink.style.display = 'none';
            
            // Add to body, trigger click, then remove
            document.body.appendChild(downloadLink);
            
            // Log creation but don't actually trigger download
            // The developer will need to manually create this file
            logger.log('info', 'Thank you page template prepared (developer needs to create thank-you.html)');
            
            document.body.removeChild(downloadLink);
        } catch (error) {
            logger.log('error', 'Error creating thank you page: ' + error.message);
            console.error('Error creating thank you page:', error);
        }
    }
}

/**
 * Show form success message
 * @param {string} message - Success message to display
 */
function showFormSuccess(message) {
    // Remove any existing alert
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create success alert
    const successAlert = document.createElement('div');
    successAlert.className = 'form-alert success';
    successAlert.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    
    // Add to form
    const contactForm = document.getElementById('contactForm');
    contactForm.prepend(successAlert);
    
    // Animate
    successAlert.style.opacity = '0';
    successAlert.style.transform = 'translateY(-10px)';
    successAlert.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Trigger animation
    setTimeout(() => {
        successAlert.style.opacity = '1';
        successAlert.style.transform = 'translateY(0)';
    }, 10);
    
    // Auto dismiss after some time
    setTimeout(() => {
        successAlert.style.opacity = '0';
        successAlert.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            successAlert.remove();
        }, 300);
    }, 5000);
}

/**
 * Show form error message
 * @param {string} message - Error message to display
 */
function showFormError(message) {
    // Remove any existing alert
    const existingAlert = document.querySelector('.form-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create error alert
    const errorAlert = document.createElement('div');
    errorAlert.className = 'form-alert error';
    errorAlert.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
    
    // Add to form
    const contactForm = document.getElementById('contactForm');
    contactForm.prepend(errorAlert);
    
    // Animate
    errorAlert.style.opacity = '0';
    errorAlert.style.transform = 'translateY(-10px)';
    errorAlert.style.transition = 'opacity 0.3s, transform 0.3s';
    
    // Trigger animation
    setTimeout(() => {
        errorAlert.style.opacity = '1';
        errorAlert.style.transform = 'translateY(0)';
    }, 10);
    
    // Reset submit button
    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
        submitButton.innerHTML = 'Send Message';
        submitButton.disabled = false;
    }
    
    // Auto dismiss after some time
    setTimeout(() => {
        errorAlert.style.opacity = '0';
        errorAlert.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            errorAlert.remove();
        }, 300);
    }, 5000);
}