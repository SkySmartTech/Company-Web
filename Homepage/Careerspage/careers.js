// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initScrollAnimations();
    initJobFilters();
    initSmoothScrolling();
    initParallaxEffect();
});

// Scroll Animations Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Add staggered animation for job cards
                if (entry.target.classList.contains('job-card')) {
                    const delay = Array.from(entry.target.parentElement.children).indexOf(entry.target) * 100;
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, delay);
                }
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToObserve = [
        '.value-card',
        '.benefit-card',
        '.job-card'
    ];

    elementsToObserve.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");

    menuBtn.addEventListener("click", function () {
      mobileMenu.classList.toggle("hidden");
    });
  });

// Job Filter System
function initJobFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const jobCards = document.querySelectorAll('.job-card');
    
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active class to clicked tab
            tab.classList.add('active');
            
            const filterValue = tab.getAttribute('data-filter');
            
            // Filter job cards with animation
            jobCards.forEach((card, index) => {
                const cardCategory = card.getAttribute('data-category');
                
                if (filterValue === 'all' || cardCategory === filterValue) {
                    // Show card with staggered animation
                    setTimeout(() => {
                        card.classList.remove('hidden');
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, index * 50);
                } else {
                    // Hide card
                    card.classList.add('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.9)';
                }
            });
        });
    });
}

// Smooth Scrolling for CTA Buttons
function initSmoothScrolling() {
    const ctaButton = document.querySelector('.cta-button');
    const primaryBtn = document.querySelector('.primary-btn');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            document.querySelector('[data-section="jobs"]')?.scrollIntoView({
                behavior: 'smooth'
            }) || document.querySelector('.filter-tab')?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    }
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', () => {
            // Simulate opening job board
            showJobModal();
        });
    }
    
    // Secondary button functionality
    const secondaryBtn = document.querySelector('.secondary-btn');
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', () => {
            showResumeModal();
        });
    }
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const hero = document.querySelector('section');
    const shapes = document.querySelectorAll('.shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.transform = `translateY(${rate}px)`;
        }
        
        // Move shapes at different speeds
        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 0.1;
            shape.style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
        });
    });
}

// Job Card Interactions
document.addEventListener('click', (e) => {
    if (e.target.closest('.job-card')) {
        const jobCard = e.target.closest('.job-card');
        const jobTitle = jobCard.querySelector('.job-title').textContent;
        showJobDetails(jobTitle, jobCard);
    }
});

// Modal Functions
function showJobModal() {
    const modal = createModal('All Open Positions', `
        <div class="space-y-4">
            <p class="text-gray-600">Explore all our current opportunities and find your perfect role.</p>
            <div class="grid gap-3">
                <div class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <h4 class="font-semibold">Engineering Positions</h4>
                    <p class="text-sm text-gray-600">5 open roles</p>
                </div>
                <div class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <h4 class="font-semibold">Design Positions</h4>
                    <p class="text-sm text-gray-600">2 open roles</p>
                </div>
                <div class="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                    <h4 class="font-semibold">Marketing Positions</h4>
                    <p class="text-sm text-gray-600">3 open roles</p>
                </div>
            </div>
            <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                View All Positions
            </button>
        </div>
    `);
}

function showResumeModal(jobTitle = "General Application") {
    const modal = createModal('Submit Your Resume', `
        <div class="space-y-4">
            <p class="text-gray-600">Applying for: <strong>${jobTitle}</strong></p>
            <form id="resumeForm" class="space-y-4">
                <input type="hidden" name="job_title" value="${jobTitle}">
                <div>
                    <label class="block text-sm font-medium mb-2">Full Name</label>
                    <input name="full_name" type="text" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Phone Number</label>
                    <input name="phone" type="tel" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="0771234567" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Email</label>
                    <input name="email" type="email" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com" required>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Resume/CV</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer relative">
                        <p id="fileLabel" class="text-gray-600">Drop your resume here or click to browse</p>
                        <input name="resume" type="file" class="absolute inset-0 opacity-0 cursor-pointer" accept=".pdf,.doc,.docx" required>
                    </div>
                </div>
                <button type="submit" id="submitBtn" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                    Submit Application
                </button>
            </form>
        </div>
    `);

    // Add event listener for form submission
    const form = document.getElementById('resumeForm');
    const submitBtn = document.getElementById('submitBtn');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Change button state to loading
        submitBtn.innerHTML = 'Submitting...';
        submitBtn.disabled = true;
        
        try {
            // Create FormData object to handle file upload
            const formData = new FormData(form);
            
            // Send data to PHP backend
            const response = await fetch('submit_resume.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                alert('Application submitted successfully!');
                modal.remove(); // Close modal
            } else {
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting your application. Please try again.');
        } finally {
            // Reset button state
            submitBtn.innerHTML = 'Submit Application';
            submitBtn.disabled = false;
        }
    });

    // File upload visual feedback
    const fileInput = document.querySelector('input[type="file"]');
    const fileLabel = document.getElementById('fileLabel');
    
    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            fileLabel.textContent = `Selected: ${e.target.files[0].name}`;
            fileLabel.parentElement.classList.add('border-green-400', 'bg-green-50');
        }
    });
}


function createModal(title, content) {
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';

    const modal = document.createElement('div');
    modal.className = 'bg-white p-6 rounded-lg max-w-2xl w-full shadow-lg relative';
    modal.innerHTML = `
        <h2 class="text-2xl font-bold mb-4">${title}</h2>
        ${content}
        <button class="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl">&times;</button>
    `;

    // Append modal and close logic
    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);

    modal.querySelector('button').addEventListener('click', () => {
        modalOverlay.remove();
    });

    return modal;
}

// Function to show job details in a modal
function showJobDetails(jobTitle, jobCard) {
    const jobType = jobCard.querySelector('.job-type')?.textContent || 'N/A';
    const jobLocation = jobCard.querySelector('.job-location')?.textContent || 'N/A';
    const jobSalary = jobCard.querySelector('.job-salary')?.textContent || 'Not specified';
    const jobDescription = jobCard.querySelector('.job-description')?.textContent || 'No description available.';
    const tags = Array.from(jobCard.querySelectorAll('.tag')).map(tag => tag.textContent);
    const responsibilities = Array.from(jobCard.querySelectorAll('.job-responsibilities li'))
        .map(li => `<li>${li.textContent}</li>`).join('');

    const modal = createModal(jobTitle, `
        <div class="space-y-6">
            <div class="flex flex-wrap gap-2 mb-4">
                <span class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">${jobType}</span>
                <span class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">${jobLocation}</span>
                <span class="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">${jobSalary}</span>
            </div>
            <div>
                <h4 class="font-semibold mb-2">Job Description</h4>
                <p class="text-gray-600 leading-relaxed">${jobDescription}</p>
            </div>
            <div>
                <h4 class="font-semibold mb-2">Required Skills</h4>
                <div class="flex flex-wrap gap-2">
                    ${tags.map(tag => `<span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">${tag}</span>`).join('')}
                </div>
            </div>
            <div>
                <h4 class="font-semibold mb-2">Responsibilities</h4>
                <ul class="text-gray-600 space-y-1 list-disc list-inside">
                    ${responsibilities}
                </ul>
            </div>
            <div class="flex gap-3 pt-4">
                <button onclick="showResumeModal('${jobTitle}')" class="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                    Apply Now
                </button>
            </div>
        </div>
    `);
}


// Attach click listeners to each job card
document.addEventListener("DOMContentLoaded", () => {
    const jobCards = document.querySelectorAll('.job-card');
    jobCards.forEach(card => {
        const titleElement = card.querySelector('.job-title');
        const jobTitle = titleElement?.textContent || 'Job Title';
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => {
            showJobDetails(jobTitle, card);
        });
    });
});

// Modal Creation Utility
function createModal(title, content) {
    // Remove existing modal
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modalHTML = `
        <div class="modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" style="animation: fadeIn 0.3s ease;">
            <div class="modal bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" style="animation: slideUp 0.3s ease;">
                <div class="modal-header p-6 border-b border-gray-200 flex justify-between items-center">
                    <h3 class="text-2xl font-bold text-gray-800">${title}</h3>
                    <button class="modal-close text-gray-400 hover:text-gray-600 text-2xl font-bold">&times;</button>
                </div>
                <div class="modal-body p-6">
                    ${content}
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    const modal = document.querySelector('.modal-overlay');
    const closeBtn = modal.querySelector('.modal-close');
    
    closeBtn.addEventListener('click', () => closeModal(modal));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal(modal);
    });
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return modal;
}

function closeModal(modal) {
    modal.style.animation = 'fadeOut 0.3s ease';
    setTimeout(() => {
        modal.remove();
        document.body.style.overflow = 'auto';
    }, 300);
}

// Add modal animations to CSS
const modalStyles = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
    
    @keyframes slideUp {
        from { 
            opacity: 0;
            transform: translateY(30px);
        }
        to { 
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject modal styles
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);

// Keyboard Navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.querySelector('.modal-overlay');
        if (modal) closeModal(modal);
    }
});

// Performance Optimization - Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16)); // ~60fps

console.log('🚀 Careers page loaded successfully!');