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

function showResumeModal() {
    const modal = createModal('Submit Your Resume', `
        <div class="space-y-4">
            <p class="text-gray-600">Don't see the perfect role? We'd love to hear from you anyway!</p>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium mb-2">Full Name</label>
                    <input type="text" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="John Doe">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Email</label>
                    <input type="email" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="john@example.com">
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Area of Interest</label>
                    <select class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none">
                        <option>Engineering</option>
                        <option>Design</option>
                        <option>Marketing</option>
                        <option>Sales</option>
                        <option>Other</option>
                    </select>
                </div>
                <div>
                    <label class="block text-sm font-medium mb-2">Resume/CV</label>
                    <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors cursor-pointer">
                        <p class="text-gray-600">Drop your resume here or click to browse</p>
                        <input type="file" class="hidden" accept=".pdf,.doc,.docx">
                    </div>
                </div>
                <button type="submit" class="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                    Submit Application
                </button>
            </form>
        </div>
    `);
}

function showJobDetails(jobTitle, jobCard) {
    const jobType = jobCard.querySelector('.job-type').textContent;
    const jobLocation = jobCard.querySelector('.job-location').textContent.replace('📍 ', '');
    const jobSalary = jobCard.querySelector('.job-salary').textContent.replace('💰 ', '');
    const jobDescription = jobCard.querySelector('.job-description').textContent;
    const tags = Array.from(jobCard.querySelectorAll('.tag')).map(tag => tag.textContent);
    
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
                    <li>Collaborate with cross-functional teams to deliver high-quality solutions</li>
                    <li>Participate in code reviews and maintain coding standards</li>
                    <li>Contribute to architectural decisions and technical documentation</li>
                    <li>Mentor junior team members and share knowledge</li>
                </ul>
            </div>
            
            <div class="flex gap-3">
                <button class="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all">
                    Apply Now
                </button>
                <button class="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Save Job
                </button>
            </div>
        </div>
    `);
}

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