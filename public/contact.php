<?php
/**
 * Contact form handler for Kitaa Digital Solutions.
 * Receives JSON from the Contact page and emails it using the host's mail().
 */

// ---- Settings -------------------------------------------------------------
$TO_EMAIL   = 'info@kitaadigitalsolutions.tech';
// Must be an address on YOUR domain, or most hosts will reject/spam the mail.
$FROM_EMAIL = 'no-reply@kitaadigitalsolutions.tech';
$FROM_NAME  = 'Kitaa Website';
$MAX_PER_HOUR_PER_IP = 5;
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');

function respond($status, $ok, $message) {
    http_response_code($status);
    echo json_encode(['ok' => $ok, 'message' => $message]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

$data = json_decode(file_get_contents('php://input'), true);
if (!is_array($data)) {
    $data = $_POST; // fallback for normal form posts
}

// Honeypot: real visitors never fill this hidden field.
if (!empty($data['website'])) {
    respond(200, true, 'Message sent.');
}

function clean_line($value, $max) {
    $value = trim((string)($value ?? ''));
    $value = str_replace(["\r", "\n", "%0a", "%0d"], ' ', $value); // block header injection
    return mb_substr($value, 0, $max);
}

$name    = clean_line($data['name'] ?? '', 100);
$email   = clean_line($data['email'] ?? '', 150);
$subject = clean_line($data['subject'] ?? '', 150);
$message = mb_substr(trim((string)($data['message'] ?? '')), 0, 5000);

if ($name === '' || $email === '' || $subject === '' || $message === '') {
    respond(422, false, 'Please fill in all fields.');
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Please enter a valid email address.');
}

// Simple per-IP rate limit.
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/kitaa_contact_' . md5($ip);
$now = time();
$hits = [];
if (is_file($rateFile)) {
    $hits = array_filter(
        array_map('intval', explode(',', (string)file_get_contents($rateFile))),
        function ($t) use ($now) { return $t > $now - 3600; }
    );
}
if (count($hits) >= $MAX_PER_HOUR_PER_IP) {
    respond(429, false, 'Too many messages. Please try again later or contact us on WhatsApp.');
}
$hits[] = $now;
@file_put_contents($rateFile, implode(',', $hits));

$body  = "New message from the website contact form\n";
$body .= "------------------------------------------\n\n";
$body .= "Name:    $name\n";
$body .= "Email:   $email\n";
$body .= "Subject: $subject\n\n";
$body .= "Message:\n$message\n\n";
$body .= "------------------------------------------\n";
$body .= "Sent: " . date('Y-m-d H:i') . " | IP: $ip\n";

$encodedSubject = '=?UTF-8?B?' . base64_encode('Website enquiry: ' . $subject) . '?=';
$headers  = "From: $FROM_NAME <$FROM_EMAIL>\r\n";
$headers .= "Reply-To: $name <$email>\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

$sent = @mail($TO_EMAIL, $encodedSubject, $body, $headers, '-f' . $FROM_EMAIL);

if (!$sent) {
    respond(500, false, 'Could not send your message. Please email or WhatsApp us directly.');
}

respond(200, true, "Message sent! We'll get back to you soon.");
