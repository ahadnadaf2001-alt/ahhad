// ═══════════════════════════════════════════════════════════════════════
// STEP 1 FORM HANDLER - Initial Contact Information
// Handles form validation and navigation to Step 2
// Updated: 2025-11-15 21:35:03 UTC
// Current User: ahadnadaf2001-alt
// ═══════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    const step1Form = document.getElementById('lead-form-step1');

    if (step1Form) {
        step1Form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validate required fields
            const requiredFields = [
                'first-name', 
                'last-name', 
                'email', 
                'company', 
                'job-title', 
                'phone', 
                'address', 
                'city', 
                'zip', 
                'country', 
                'privacy'
            ];
            
            let isValid = true;
            let firstInvalidField = null;

            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                if (field) {
                    if (!field.value.trim()) {
                        isValid = false;
                        field.style.borderColor = '#ef4444';
                        if (!firstInvalidField) firstInvalidField = field;
                    } else {
                        field.style.borderColor = '';
                    }
                }
            });

            if (!isValid) {
                alert('Please fill in all required fields.');
                if (firstInvalidField) {
                    firstInvalidField.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    firstInvalidField.focus();
                }
                return;
            }

            // Validate email format
            const email = document.getElementById('email').value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                document.getElementById('email').focus();
                return;
            }

            // Validate privacy checkbox
            if (!document.getElementById('privacy').checked) {
                alert('You must agree to the Privacy Policy.');
                document.getElementById('privacy').focus();
                return;
            }

            // Collect form data
            const step1Data = {
                firstName: document.getElementById('first-name').value.trim(),
                lastName: document.getElementById('last-name').value.trim(),
                email: email.trim(),
                company: document.getElementById('company').value.trim(),
                jobTitle: document.getElementById('job-title').value.trim(),
                phone: document.getElementById('phone').value.trim(),
                address: document.getElementById('address').value.trim(),
                city: document.getElementById('city').value.trim(),
                zip: document.getElementById('zip').value.trim(),
                country: document.getElementById('country').value,
                newsletter: document.getElementById('newsletter').checked,
                privacy: document.getElementById('privacy').checked,
                submittedAt: new Date().toISOString(),
                articleTitle: 'How to Champion AI as an Executive',
                formStep: 'step1',
                submittedAtUTC: '2025-11-15 21:35:03',
                currentUser: 'ahadnadaf2001-alt'
            };

            console.log('Step 1 Data:', step1Data);

            // Store in sessionStorage (persists during navigation)
            sessionStorage.setItem('step1Data', JSON.stringify(step1Data));

            // Show loading message
            const submitBtn = step1Form.querySelector('.cta-submit-btn');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Loading...';
            submitBtn.disabled = true;

            // Redirect to Step 2 after short delay
            setTimeout(() => {
                window.location.href = 'download.html';
            }, 800);
        });
    }
});

// Share functionality
document.addEventListener('DOMContentLoaded', function() {
    const articleUrl = window.location.href;
    const articleTitle = "How to Champion AI as an Executive - DemandGenius Media";

    // LinkedIn Share
    const linkedinBtn = document.getElementById('linkedin-share');
    if (linkedinBtn) {
        linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
    }

    // Twitter Share
    const twitterBtn = document.getElementById('twitter-share');
    if (twitterBtn) {
        twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(articleUrl)}&via=DemandGeniusMedia`;
    }

    // Copy Link to Clipboard
    const copyBtn = document.getElementById('copy-link-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', function() {
            navigator.clipboard.writeText(articleUrl).then(() => {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = '✓ Copied!';
                copyBtn.style.background = 'var(--success-color)';
                
                setTimeout(() => {
                    copyBtn.textContent = originalText;
                    copyBtn.style.background = '';
                }, 2000);
            }).catch(() => {
                // Fallback for older browsers
                const textarea = document.createElement('textarea');
                textarea.value = articleUrl;
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
                
                copyBtn.textContent = '✓ Copied!';
                setTimeout(() => {
                    copyBtn.textContent = '📋 Copy';
                }, 2000);
            });
        });
    }
});