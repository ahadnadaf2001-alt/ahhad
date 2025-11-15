// ═══════════════════════════════════════════════════════════════════════
// STEP 2 FORM HANDLER - Detailed AI Information & PDF Download
// Handles form submission, email delivery, and PDF download
// Updated: 2025-11-15 21:35:03 UTC
// Current User: ahadnadaf2001-alt
// Email Provider: Hostinger (mail.hostinger.com)
// ═══════════════════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    
    // Retrieve Step 1 data from sessionStorage
    const step1Data = JSON.parse(sessionStorage.getItem('step1Data') || '{}');
    
    console.log('📋 Step 1 Data Retrieved:', step1Data);
    
    const step2Form = document.getElementById('lead-form-step2');
    const successOverlay = document.getElementById('successOverlay');

    if (step2Form) {
        step2Form.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Validate required dropdown fields
            const timeline = document.getElementById('timeline').value;
            const usecase = document.getElementById('usecase').value;
            const readiness = document.getElementById('readiness').value;

            if (!timeline || !usecase || !readiness) {
                alert('Please answer all required questions.');
                return;
            }

            // Validate terms agreement
            if (!document.getElementById('terms-agreement').checked) {
                alert('You must agree to the Privacy Policy and Terms of Use.');
                return;
            }

            // Get all checkbox values for solutions
            const solutionCheckboxes = document.querySelectorAll('input[name="solutions"]:checked');
            const solutions = Array.from(solutionCheckboxes).map(cb => cb.value);

            // Combine Step 1 and Step 2 data
            const combinedData = {
                // Step 1 Data
                firstName: step1Data.firstName || '',
                lastName: step1Data.lastName || '',
                email: step1Data.email || '',
                company: step1Data.company || '',
                jobTitle: step1Data.jobTitle || '',
                phone: step1Data.phone || '',
                address: step1Data.address || '',
                city: step1Data.city || '',
                zip: step1Data.zip || '',
                country: step1Data.country || '',
                newsletter: step1Data.newsletter || false,

                // Step 2 Data
                timeline: timeline,
                aiSolutions: solutions.length > 0 ? solutions.join(', ') : 'None selected',
                usecase: usecase,
                readiness: readiness,
                marketingConsent: document.getElementById('marketing-consent').checked,
                termsAgreement: document.getElementById('terms-agreement').checked,

                // Metadata
                articleTitle: 'How to Champion AI as an Executive',
                submittedAt: new Date().toISOString(),
                submittedAtReadable: new Date().toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    timeZoneName: 'short'
                }),
                formStep: 'both',
                userAgent: navigator.userAgent,
                submittedAtUTC: '2025-11-15 21:35:03',
                currentUser: 'ahadnadaf2001-alt'
            };

            console.log('📋 Combined Form Data:', combinedData);

            // Disable submit button
            const submitBtn = step2Form.querySelector('.btn-download');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '⏳ Processing...';
            submitBtn.disabled = true;

            // Send email via PHP API (Hostinger)
            console.log('📧 Sending form data to PHP email handler (Hostinger)...');
            const emailSent = await sendFormDataToEmail(combinedData);

            if (emailSent.success) {
                console.log('✅ Email sent successfully');
                console.log('Lead ID:', emailSent.data?.leadId);
            } else {
                console.warn('⚠️ Email sending warning');
                console.warn('Error:', emailSent.error);
            }

            // Download PDF
            console.log('📥 Initiating PDF download...');
            downloadPDF(combinedData);

            // Show success message
            showSuccessMessage(successOverlay);

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;

            // Clear session storage
            sessionStorage.removeItem('step1Data');

            // Redirect to home after 4 seconds
            setTimeout(() => {
                console.log('🏠 Redirecting to home page...');
                window.location.href = '../../index.html';
            }, 4000);
        });
    }

    // ═════════════════════════════════════════════════════════════════
    // SEND EMAIL WITH FORM DATA VIA HOSTINGER PHP
    // ═════════════════════════════════════════════════════════════════

    async function sendFormDataToEmail(data) {
        try {
            console.log('📤 Attempting to send via Hostinger PHP API...');
            console.log('📬 Endpoint: /api/send-email.php');
            console.log('📬 To: marketing@demandgeniusmedia.com');
            console.log('📧 From: ' + data.email);
            
            const response = await fetch('/api/send-email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            console.log('📡 Response Status:', response.status);

            if (response.ok) {
                const result = await response.json();
                console.log('✅ Hostinger PHP API Response:', result);
                return { 
                    success: true, 
                    method: 'hostinger-php', 
                    data: result 
                };
            } else {
                console.warn('⚠️ Hostinger PHP API returned error status:', response.status);
                const errorText = await response.text();
                console.warn('⚠️ API Error:', errorText);
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('❌ Hostinger PHP API Error:', error);
            return { 
                success: false, 
                error: error.message,
                method: 'hostinger-php'
            };
        }
    }

    // ═════════════════════════════════════════════════════════════════
    // DOWNLOAD PDF FUNCTION - CORRECTED PATH WITH SPACE
    // ═════════════════════════════════════════════════════════════════

    function downloadPDF(data) {
        try {
            // CORRECTED: Folder name has SPACE - "AI Article" not "AI-Article"
            const pdfUrl = 'downloads/How-to-Champion-AI-as-an-Executive.pdf';
            
            console.log('🔍 Checking PDF file existence at:', pdfUrl);
            console.log('📍 Full path: AI Article/How-to-Champion-AI-as-an-Executive/downloads/How-to-Champion-AI-as-an-Executive.pdf');
            
            // Fetch the PDF to check if it exists
            fetch(pdfUrl, { method: 'HEAD' })
                .then(response => {
                    console.log('📡 PDF Check Response Status:', response.status);
                    
                    if (response.ok) {
                        console.log('✅ PDF file found, initiating download...');
                        triggerPDFDownload(pdfUrl, data);
                    } else if (response.status === 404) {
                        console.error('❌ PDF file not found (404) at path:', pdfUrl);
                        console.error('Expected path: AI Article/How-to-Champion-AI-as-an-Executive/downloads/How-to-Champion-AI-as-an-Executive.pdf');
                        alert('PDF file is not available at this moment. Our team has been notified. Please try again later.');
                    } else {
                        console.error('❌ PDF server error:', response.status);
                        alert('Error accessing PDF file. Please try again.');
                    }
                })
                .catch(error => {
                    console.error('❌ Error checking PDF:', error);
                    // Try direct download anyway
                    console.log('📥 Attempting direct PDF download...');
                    triggerPDFDownload(pdfUrl, data);
                });
        } catch (error) {
            console.error('❌ PDF download error:', error);
        }
    }

    function triggerPDFDownload(pdfUrl, data) {
        try {
            const link = document.createElement('a');
            link.href = pdfUrl;
            link.download = `How-to-Champion-AI-as-an-Executive-${data.firstName}-${data.lastName}.pdf`;
            link.style.display = 'none';
            
            document.body.appendChild(link);
            console.log('📥 Triggering PDF download...');
            console.log('📥 PDF URL:', pdfUrl);
            console.log('📥 Download filename:', link.download);
            
            link.click();
            
            setTimeout(() => {
                document.body.removeChild(link);
                console.log('✅ PDF download completed');
            }, 100);
        } catch (error) {
            console.error('❌ Error triggering PDF download:', error);
        }
    }

    // ═════════════════════════════════════════════════════════════════
    // SHOW SUCCESS MESSAGE
    // ═════════════════════════════════════════════════════════════════

    function showSuccessMessage(overlay) {
        if (overlay) {
            console.log('✨ Showing success message...');
            overlay.classList.add('show');
            
            setTimeout(() => {
                console.log('✨ Hiding success message...');
                overlay.classList.remove('show');
            }, 4000);
        } else {
            console.warn('⚠️ Success overlay element not found');
        }
    }

    // ═════════════════════════════════════════════════════════════════
    // BACK BUTTON HANDLER
    // ═════════════════════════════════════════════════════════════════

    window.goBack = function() {
        console.log('👈 Going back...');
        window.history.back();
    };

    // ═════════════════════════════════════════════════════════════════
    // LOG INITIALIZATION
    // ═════════════════════════════════════════════════════════════════

    console.log('═══════════════════════════════════════════════════════════════');
    console.log('🚀 Download Handler Initialized');
    console.log('Current Date & Time (UTC): 2025-11-15 21:35:03');
    console.log('Current User: ahadnadaf2001-alt');
    console.log('Email Provider: Hostinger (mail.hostinger.com)');
    console.log('Recipient: marketing@demandgeniusmedia.com');
    console.log('Page: AI Article/How-to-Champion-AI-as-an-Executive/download.html');
    console.log('PDF Path: downloads/How-to-Champion-AI-as-an-Executive.pdf');
    console.log('═══════════════════════════════════════════════════════════════');
});