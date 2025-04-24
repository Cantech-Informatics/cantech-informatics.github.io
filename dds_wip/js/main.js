// Main JavaScript file for Dental Diamonds Studio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Close mobile menu if open
            const mobileMenuEvent = new CustomEvent('toggle-menu-close');
            window.dispatchEvent(mobileMenuEvent);
            
            // Scroll to target
            const targetId = this.getAttribute('href');
            
            // Skip if the href is just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Toggle mobile menu close event listener
    window.addEventListener('toggle-menu-close', function() {
        // Find any open mobile menu and trigger click to close it
        const openMenus = document.querySelectorAll('[x-data]');
        openMenus.forEach(menu => {
            if (menu.__x && menu.__x.$data.open) {
                menu.__x.$data.open = false;
            }
        });
    });
    
    // Initialize click-to-call tracking (if needed)
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Add tracking code here if needed
            console.log('Phone call initiated');
        });
    });
    
    // Add active class to navigation links based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    function highlightNavigation() {
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('text-accent', 'font-medium');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('text-accent', 'font-medium');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // Run once on page load
    highlightNavigation();
    
    // Form validation enhanced
    const contactForms = document.querySelectorAll('form');
    contactForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            // Prevent the form from submitting
            e.preventDefault();
            
            // Basic validation
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('border-red-500');
                    
                    // Add or show error message
                    let errorMessage = field.parentNode.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('p');
                        errorMessage.className = 'text-red-500 text-sm mt-1 error-message';
                        errorMessage.textContent = 'This field is required';
                        field.parentNode.appendChild(errorMessage);
                    } else {
                        errorMessage.style.display = 'block';
                    }
                } else {
                    field.classList.remove('border-red-500');
                    
                    // Hide error message if exists
                    const errorMessage = field.parentNode.querySelector('.error-message');
                    if (errorMessage) {
                        errorMessage.style.display = 'none';
                    }
                }
            });
            
            // Email validation
            const emailField = form.querySelector('input[type="email"]');
            if (emailField && emailField.value.trim()) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailPattern.test(emailField.value.trim())) {
                    isValid = false;
                    emailField.classList.add('border-red-500');
                    
                    // Add or show error message
                    let errorMessage = emailField.parentNode.querySelector('.error-message');
                    if (!errorMessage) {
                        errorMessage = document.createElement('p');
                        errorMessage.className = 'text-red-500 text-sm mt-1 error-message';
                        errorMessage.textContent = 'Please enter a valid email address';
                        emailField.parentNode.appendChild(errorMessage);
                    } else {
                        errorMessage.style.display = 'block';
                        errorMessage.textContent = 'Please enter a valid email address';
                    }
                }
            }
            
            // If everything is valid, submit the form
            if (isValid) {
                console.log('Form is valid, submitting...');
                form.submit();
            }
        });
    });
});
