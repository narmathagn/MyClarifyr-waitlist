// Google Sheets Configuration
// The GOOGLE_SCRIPT_URL is loaded from env.js (which is ignored by Git)
let GOOGLE_SCRIPT_URL = '';

/**
 * Ensures global configuration is available
 */
function initConfig() {
    if (typeof ENV !== 'undefined' && ENV.GOOGLE_SCRIPT_URL) {
        GOOGLE_SCRIPT_URL = ENV.GOOGLE_SCRIPT_URL;
        console.log('Environment configuration loaded');
        return true;
    }
    console.warn('Configuration (env.js) not found or invalid.');
    return false;
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    initConfig();
    loadWaitlistCount();
    animateOnScroll();
});

// Smooth scroll functions
function scrollToWaitlist() {
    document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
}

function scrollToHowItWorks() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

// Waitlist form handling
const waitlistForm = document.getElementById('waitlistForm');
const emailInput = document.getElementById('emailInput');
const formMessage = document.getElementById('formMessage');
const waitlistCount = document.getElementById('waitlistCount');

// Feedback form handling
const feedbackContainer = document.getElementById('feedbackContainer');
const feedbackForm = document.getElementById('feedbackForm');
const feedbackInput = document.getElementById('feedbackInput');
const feedbackMessage = document.getElementById('feedbackMessage');
let userEmailForFeedback = ''; // Store email for feedback submission


// Form submission
waitlistForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // Validate email
    if (!isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return;
    }

    // Disable form during submission
    const submitButton = waitlistForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Joining...';

    try {
        // Send to Google Sheets
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: JSON.stringify({
                email: email,
                timestamp: new Date().toISOString()
            })
        });

        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);

        // Try to read the response
        const responseText = await response.text();
        console.log('Response text:', responseText);

        // Check if submission was successful
        if (response.ok || response.status === 200 || response.status === 302) {
            showMessage('🎉 Success! You\'re on the waitlist. We\'ll notify you when we launch!', 'success');
            emailInput.value = '';

            // Update count (increment locally)
            const currentCount = parseInt(waitlistCount.textContent);
            waitlistCount.textContent = currentCount + 1;

            // Store email for feedback and show feedback form
            userEmailForFeedback = email;
            setTimeout(() => {
                waitlistForm.style.display = 'none';
                feedbackContainer.style.display = 'block';
                feedbackContainer.scrollIntoView({ behavior: 'smooth' });
            }, 2000);

            // Store in localStorage as backup
            storeEmailLocally(email);
        } else {
            console.error('Submission failed:', responseText);
            showMessage('⚠️ There was an issue. Please check the console or try again.', 'error');
        }

    } catch (error) {
        console.error('Error submitting to waitlist:', error);
        showMessage('❌ Error: ' + error.message + '. Check browser console for details.', 'error');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Join the Waitlist';
    }
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Show form message
function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = `form-message ${type}`;

    // Clear message after 5 seconds
    setTimeout(() => {
        formMessage.textContent = '';
        formMessage.className = 'form-message';
    }, 5000);
}

// Store email locally as backup
function storeEmailLocally(email) {
    let emails = JSON.parse(localStorage.getItem('myclarifyr_waitlist') || '[]');
    if (!emails.includes(email)) {
        emails.push(email);
        localStorage.setItem('myclarifyr_waitlist', JSON.stringify(emails));
    }
}

// Load waitlist count from Google Sheets
async function loadWaitlistCount() {
    // 1. Immediately show cached count for instant loading
    const cachedCount = localStorage.getItem('myclarifyr_waitlist_count');
    if (cachedCount !== null) {
        waitlistCount.textContent = cachedCount;
    }

    try {
        // 2. Fetch fresh count in the background
        const cacheBuster = `?t=${new Date().getTime()}`;
        const fetchUrl = GOOGLE_SCRIPT_URL + cacheBuster;

        const response = await fetch(fetchUrl, {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            if (data.status === 'success' && typeof data.count === 'number') {
                // 3. Update UI if the count has changed
                waitlistCount.textContent = data.count;
                localStorage.setItem('myclarifyr_waitlist_count', data.count);
            }
        }
    } catch (error) {
        console.error('Could not fetch updated count:', error);
    }
}

// Animate elements on scroll
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Add floating animation to cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.step-card, .audience-card, .benefit-item');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Privacy Policy Modal Logic
const privacyModal = document.getElementById('privacyModal');
const privacyLink = document.getElementById('privacyLink');
const closeModal = document.querySelector('.close-modal');

if (privacyLink && privacyModal && closeModal) {
    // Open modal
    privacyLink.addEventListener('click', (e) => {
        e.preventDefault();
        privacyModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    });

    // Close modal clicking (X)
    closeModal.addEventListener('click', () => {
        privacyModal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
    });

    // Close modal clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target === privacyModal) {
            privacyModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }
    });
}

// Feedback Submission Logic
if (feedbackForm) {
    feedbackForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const feedback = feedbackInput.value.trim();
        if (!feedback) return;

        const submitButton = feedbackForm.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Posting...';

        try {
            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({
                    email: userEmailForFeedback,
                    feedback: feedback,
                    timestamp: new Date().toISOString()
                })
            });

            const data = await response.json();

            if (data.status === 'success') {
                feedbackForm.style.display = 'none';
                feedbackMessage.textContent = '🎉 Thank you for your feedback! It helps us build a better MyClarifyr.';
                feedbackMessage.className = 'form-message success';
            } else {
                throw new Error(data.message || 'Failed to post feedback');
            }
        } catch (error) {
            console.error('Error submitting feedback:', error);
            feedbackMessage.textContent = '⚠️ ' + (error.message.includes('Unexpected token') ? 'Please ensure the Google Script is correctly deployed.' : error.message);
            feedbackMessage.className = 'form-message error';
            submitButton.disabled = false;
            submitButton.textContent = 'Post Feedback';
        }
    });
}


// Reveal Animations on Scroll
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
});

const revealElements = document.querySelectorAll('.reveal');
revealElements.forEach(el => revealObserver.observe(el));
