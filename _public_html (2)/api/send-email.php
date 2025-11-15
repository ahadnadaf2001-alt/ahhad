<?php
// ═══════════════════════════════════════════════════════════════════════
// EMAIL HANDLER FOR LEAD FORMS - HOSTINGER VERSION
// Sends emails via Hostinger SMTP (mail.hostinger.com)
// Updated: 2025-11-15 21:20:03 UTC
// Current User: ahadnadaf2001-alt
// ═══════════════════════════════════════════════════════════════════════

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

error_reporting(E_ALL);
ini_set('display_errors', 0);

// Log function
function logMessage($message) {
    $logFile = '../logs/email-handler.log';
    if (!file_exists('../logs')) {
        mkdir('../logs', 0755, true);
    }
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($logFile, "[$timestamp] $message\n", FILE_APPEND);
}

logMessage('═══════════════════════════════════════════════════════════════');
logMessage('🚀 Email Handler Started');
logMessage('Current Time (UTC): 2025-11-15 21:20:03');
logMessage('Current User: ahadnadaf2001-alt');
logMessage('Request Method: ' . $_SERVER['REQUEST_METHOD']);
logMessage('═══════════════════════════════════════════════════════════════');

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    logMessage('❌ Invalid request method: ' . $_SERVER['REQUEST_METHOD']);
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Load environment variables
$env = [];
$envFile = '../.env';

if (!file_exists($envFile)) {
    logMessage('❌ .env file not found at: ' . realpath($envFile));
    http_response_code(500);
    echo json_encode(['error' => '.env file not found']);
    exit;
}

logMessage('✅ .env file found');

$lines = file($envFile, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    if (strpos($line, '=') !== false && strpos($line, '#') !== 0) {
        list($key, $value) = explode('=', $line, 2);
        $env[trim($key)] = trim($value);
    }
}

logMessage('✅ Environment variables loaded: ' . count($env) . ' variables');

// Get JSON data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    logMessage('❌ No JSON input received');
    http_response_code(400);
    echo json_encode(['error' => 'No data received']);
    exit;
}

logMessage('📥 Form data received');

// Validate required fields
if (empty($input['email']) || empty($input['firstName']) || empty($input['lastName'])) {
    logMessage('❌ Missing required fields');
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields']);
    exit;
}

// Sanitize input
$firstName = sanitizeInput($input['firstName']);
$lastName = sanitizeInput($input['lastName']);
$email = filter_var($input['email'], FILTER_SANITIZE_EMAIL);
$company = sanitizeInput($input['company']);
$jobTitle = sanitizeInput($input['jobTitle']);
$phone = sanitizeInput($input['phone']);
$address = sanitizeInput($input['address']);
$city = sanitizeInput($input['city']);
$zip = sanitizeInput($input['zip']);
$country = sanitizeInput($input['country']);

$timeline = sanitizeInput($input['timeline']);
$aiSolutions = sanitizeInput($input['aiSolutions']);
$usecase = sanitizeInput($input['usecase']);
$readiness = sanitizeInput($input['readiness']);
$marketingConsent = $input['marketingConsent'] ? 'Yes' : 'No';
$newsletter = $input['newsletter'] ? 'Yes' : 'No';
$submittedAt = sanitizeInput($input['submittedAtReadable']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    logMessage('❌ Invalid email: ' . $email);
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email address']);
    exit;
}

logMessage('📋 Processing lead: ' . $firstName . ' ' . $lastName . ' (' . $email . ')');

// Generate Lead ID
$leadID = 'DGAI-' . strtoupper($firstName[0] . $lastName[0]) . '-' . time();

// ═══════════════════════════════════════════════════════════════════════
// EMAIL FOR ADMIN (marketing@demandgeniusmedia.com)
// ═══════════════════════════════════════════════════════════════════════

$adminEmail = 'marketing@demandgeniusmedia.com';
$adminSubject = "🔥 New Lead: $firstName $lastName - AI Leadership Guide";

$adminBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 700px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #0f1f2e 0%, #1a3a52 100%); color: white; padding: 30px; border-radius: 5px 5px 0 0; }
        .header h2 { margin: 0; font-size: 1.5rem; }
        .content { padding: 30px; background: #f9f9f9; }
        .section { background: white; padding: 20px; margin-bottom: 20px; border-left: 4px solid #f59e0b; border-radius: 3px; }
        .section h3 { color: #0f1f2e; margin-top: 0; border-bottom: 2px solid #f59e0b; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 10px; }
        td { padding: 10px; border-bottom: 1px solid #ddd; }
        td:first-child { font-weight: bold; width: 200px; background: #f0f0f0; }
        .footer { background: #0f1f2e; color: white; padding: 20px; text-align: center; border-radius: 0 0 5px 5px; font-size: 12px; }
        .badge { display: inline-block; background: #f59e0b; color: white; padding: 5px 10px; border-radius: 3px; margin-right: 5px; }
    </style>
</head>
<body>
    <div class=\"container\">
        <div class=\"header\">
            <h2>🔥 New Lead Submission</h2>
            <p style=\"margin: 10px 0 0 0;\">AI Leadership Guide Download - How to Champion AI as an Executive</p>
        </div>

        <div class=\"content\">
            <!-- Step 1 Information -->
            <div class=\"section\">
                <h3>✅ Contact Information (Step 1)</h3>
                <table>
                    <tr><td>Lead ID:</td><td><strong>$leadID</strong></td></tr>
                    <tr><td>First Name:</td><td>$firstName</td></tr>
                    <tr><td>Last Name:</td><td>$lastName</td></tr>
                    <tr><td>Email:</td><td><a href=\"mailto:$email\">$email</a></td></tr>
                    <tr><td>Phone:</td><td><a href=\"tel:$phone\">$phone</a></td></tr>
                    <tr><td>Company:</td><td>$company</td></tr>
                    <tr><td>Job Title:</td><td>$jobTitle</td></tr>
                    <tr><td>Address:</td><td>$address<br>$city, $zip<br>$country</td></tr>
                    <tr><td>Newsletter:</td><td><span class=\"badge\">$newsletter</span></td></tr>
                </table>
            </div>

            <!-- Step 2 Information -->
            <div class=\"section\">
                <h3>🤖 AI Assessment (Step 2)</h3>
                <table>
                    <tr><td>Evaluation Timeline:</td><td>$timeline</td></tr>
                    <tr><td>ERP/Accounting Systems:</td><td>$aiSolutions</td></tr>
                    <tr><td>Primary AI Use Case:</td><td>$usecase</td></tr>
                    <tr><td>Organizational Readiness:</td><td>$readiness</td></tr>
                    <tr><td>Marketing Consent:</td><td><span class=\"badge\">$marketingConsent</span></td></tr>
                </table>
            </div>

            <!-- Metadata -->
            <div class=\"section\">
                <h3>📊 Submission Details</h3>
                <table>
                    <tr><td>Submitted:</td><td>$submittedAt</td></tr>
                    <tr><td>Lead ID:</td><td><strong>$leadID</strong></td></tr>
                    <tr><td>Article:</td><td>How to Champion AI as an Executive</td></tr>
                </table>
            </div>

            <!-- Action Items -->
            <div class=\"section\" style=\"background: #fff3cd; border-left-color: #f59e0b;\">
                <h3 style=\"color: #856404;\">⚡ Action Items</h3>
                <ul style=\"margin: 10px 0; padding-left: 20px;\">
                    <li>Review and qualify lead immediately</li>
                    <li>Add to CRM system</li>
                    <li>Schedule follow-up communication within 24 hours</li>
                    <li>Send personalized content for use case: <strong>$usecase</strong></li>
                    <li>Note timeline: <strong>$timeline</strong></li>
                </ul>
            </div>
        </div>

        <div class=\"footer\">
            <p style=\"margin: 0;\">DemandGenius Media - Lead Generation System</p>
            <p style=\"margin: 10px 0 0 0; font-size: 11px;\">Lead ID: $leadID | Submitted: $submittedAt</p>
            <p style=\"margin: 5px 0 0 0; font-size: 10px;\">Reply to: $email</p>
        </div>
    </div>
</body>
</html>
";

// ═══════════════════════════════════════════════════════════════════════
// EMAIL FOR USER (confirmation)
// ═══════════════════════════════════════════════════════════════════════

$userSubject = "Your AI Leadership Guide Download - DemandGenius Media";

$userBody = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; }
        .header { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 30px; border-radius: 5px 5px 0 0; text-align: center; }
        .header h2 { margin: 0; }
        .content { padding: 30px; background: white; }
        .button { display: inline-block; background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); color: white; padding: 12px 30px; border-radius: 5px; text-decoration: none; margin-top: 20px; font-weight: bold; }
        .footer { background: #f9f9f9; padding: 20px; text-align: center; border-radius: 0 0 5px 5px; color: #666; font-size: 12px; }
        ul { line-height: 1.8; }
    </style>
</head>
<body>
    <div class=\"container\">
        <div class=\"header\">
            <h2>✓ Download Started!</h2>
        </div>

        <div class=\"content\">
            <p>Hi $firstName,</p>
            
            <p>Thank you for downloading the <strong>AI Leadership Guide: How to Champion AI as an Executive</strong>! Your PDF should have started downloading automatically.</p>
            
            <h3>📚 What You'll Get:</h3>
            <ul>
                <li>✓ 10 Strategic Frameworks for AI Leadership</li>
                <li>✓ Executive Action Plans & Best Practices</li>
                <li>✓ AI Implementation Roadmap</li>
                <li>✓ Case Studies & Real-World Insights</li>
                <li>✓ Governance & Ethical AI Guidelines</li>
            </ul>

            <h3>📧 What's Next:</h3>
            <p>Based on your interest in <strong>$usecase</strong> and your timeline of <strong>$timeline</strong>, we'll be sending you personalized insights including:</p>
            <ul>
                <li>📊 Industry benchmarks & research reports</li>
                <li>🎓 Executive webinars & training</li>
                <li>💡 Best practices for your industry</li>
                <li>🔔 Updates on AI trends & innovations</li>
            </ul>

            <p>
                <a href=\"https://demandgeniusmedia.com\" class=\"button\">Visit DemandGenius Media</a>
            </p>

            <p style=\"margin-top: 30px; color: #666;\">
                Questions? We're here to help! Contact us at <strong>marketing@demandgeniusmedia.com</strong>
            </p>

            <p>Best regards,<br><strong>DemandGenius Media Team</strong><br>B2B Research & Market Insights</p>
        </div>

        <div class=\"footer\">
            <p style=\"margin: 0;\">You received this email because you downloaded a resource from DemandGenius Media.</p>
            <p style=\"margin: 10px 0 0 0;\">
                <a href=\"https://demandgeniusmedia.com/terms.html\" style=\"color: #f59e0b; text-decoration: none;\">Privacy Policy</a> | 
                <a href=\"https://demandgeniusmedia.com/terms.html\" style=\"color: #f59e0b; text-decoration: none;\">Terms of Use</a>
            </p>
        </div>
    </div>
</body>
</html>
";

// ═══════════════════════════════════════════════════════════════════════
// SEND EMAILS USING PHP MAIL (Hostinger)
// ═══════════════════════════════════════════════════════════════════════

logMessage('📧 Preparing to send emails...');

// Email headers
$adminHeaders = "MIME-Version: 1.0\r\n";
$adminHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
$adminHeaders .= "From: noreply@demandgeniusmedia.com\r\n";
$adminHeaders .= "Reply-To: $email\r\n";
$adminHeaders .= "Return-Path: marketing@demandgeniusmedia.com\r\n";

$userHeaders = "MIME-Version: 1.0\r\n";
$userHeaders .= "Content-type: text/html; charset=UTF-8\r\n";
$userHeaders .= "From: marketing@demandgeniusmedia.com\r\n";
$userHeaders .= "Reply-To: marketing@demandgeniusmedia.com\r\n";
$userHeaders .= "Return-Path: marketing@demandgeniusmedia.com\r\n";

logMessage('📬 Sending admin email to: ' . $adminEmail);

// Send admin email
$adminEmailSent = mail($adminEmail, $adminSubject, $adminBody, $adminHeaders);

if ($adminEmailSent) {
    logMessage('✅ Admin email sent successfully to: ' . $adminEmail);
} else {
    logMessage('❌ Admin email failed to send');
}

logMessage('📬 Sending confirmation email to: ' . $email);

// Send user confirmation email
$userEmailSent = mail($email, $userSubject, $userBody, $userHeaders);

if ($userEmailSent) {
    logMessage('✅ User confirmation email sent successfully to: ' . $email);
} else {
    logMessage('❌ User confirmation email failed to send');
}

// ═══════════════════════════════════════════════════════════════════════
// RESPONSE
// ═══════════════════════════════════════════════════════════════════════

if ($adminEmailSent && $userEmailSent) {
    logMessage('✅ All emails sent successfully');
    logMessage('═══════════════════════════════════════════════════════════════');
    
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Emails sent successfully',
        'leadId' => $leadID,
        'adminEmailSent' => $adminEmailSent,
        'userEmailSent' => $userEmailSent
    ]);
} else {
    logMessage('⚠️ Partial email failure - Admin: ' . ($adminEmailSent ? 'OK' : 'FAIL') . ', User: ' . ($userEmailSent ? 'OK' : 'FAIL'));
    logMessage('═══════════════════════════════════════════════════════════════');
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error sending emails',
        'leadId' => $leadID,
        'adminEmailSent' => $adminEmailSent,
        'userEmailSent' => $userEmailSent,
        'error' => 'One or both emails failed to send'
    ]);
}

// ═══════════════════════════════════════════════════════════════════════
// UTILITY FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════

function sanitizeInput($input) {
    return htmlspecialchars(trim($input), ENT_QUOTES, 'UTF-8');
}

exit;
?>