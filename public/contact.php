<?php
/**
 * Contact form handler for Kitaa Digital Solutions.
 *
 * Sends through Hostinger's authenticated mail server (SMTP) so messages are
 * DKIM-signed and SPF-aligned and land in the inbox, not spam.
 *
 * The mailbox password is NOT stored here (this repository is public). It is read
 * from a private file one folder ABOVE the website root, e.g.
 *   /home/<user>/domains/kitaadigitalsolutions.tech/kitaa-mail-config.php
 * containing:
 *   <?php return ['host' => 'smtp.hostinger.com', 'port' => 465,
 *                 'user' => 'no-reply@kitaadigitalsolutions.tech', 'pass' => 'MAILBOX_PASSWORD'];
 * If that file is missing or SMTP fails, it falls back to PHP mail().
 */

// ---- Settings -------------------------------------------------------------
$TO_EMAIL   = 'info@kitaadigitalsolutions.tech';
$FROM_EMAIL = 'no-reply@kitaadigitalsolutions.tech';
$FROM_NAME  = 'Kitaa Website';
$MAX_PER_HOUR_PER_IP = 5;
$CONFIG_FILE = dirname(__DIR__) . '/kitaa-mail-config.php';
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

function encode_header($text) {
    return '=?UTF-8?B?' . base64_encode($text) . '?=';
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

$fullSubject = 'Website enquiry: ' . $subject;

/**
 * Minimal SMTP client (implicit TLS on port 465, AUTH LOGIN).
 * Returns true on success, or an error string.
 */
function smtp_send($cfg, $fromEmail, $fromName, $toEmail, $replyEmail, $replyName, $subject, $body) {
    $host = $cfg['host'] ?? 'smtp.hostinger.com';
    $port = (int)($cfg['port'] ?? 465);
    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $fp = @stream_socket_client("ssl://$host:$port", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
    if (!$fp) {
        return "connect failed: $errstr ($errno)";
    }
    stream_set_timeout($fp, 15);

    // Read a (possibly multi-line) reply and return its 3-digit code.
    $read = function () use ($fp) {
        $reply = '';
        while (($line = fgets($fp, 1024)) !== false) {
            $reply .= $line;
            if (strlen($line) < 4 || $line[3] === ' ') {
                break;
            }
        }
        return [(int)substr($reply, 0, 3), trim($reply)];
    };
    $cmd = function ($line, $expect) use ($fp, $read) {
        fwrite($fp, $line . "\r\n");
        list($code, $reply) = $read();
        if (!in_array($code, (array)$expect, true)) {
            throw new Exception("'" . strtok($line, ' ') . "' got: $reply");
        }
    };

    try {
        list($code, $reply) = $read();
        if ($code !== 220) {
            throw new Exception("greeting: $reply");
        }
        $cmd('EHLO kitaadigitalsolutions.tech', 250);
        $cmd('AUTH LOGIN', 334);
        $cmd(base64_encode($cfg['user']), 334);
        $cmd(base64_encode($cfg['pass']), 235);
        $cmd("MAIL FROM:<$fromEmail>", 250);
        $cmd("RCPT TO:<$toEmail>", [250, 251]);
        $cmd('DATA', 354);

        $headers = [
            'Date: ' . date('r'),
            'From: ' . encode_header($fromName) . " <$fromEmail>",
            "To: <$toEmail>",
            'Reply-To: ' . encode_header($replyName) . " <$replyEmail>",
            'Subject: ' . encode_header($subject),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@kitaadigitalsolutions.tech>',
            'MIME-Version: 1.0',
            'Content-Type: text/plain; charset=UTF-8',
            'Content-Transfer-Encoding: 8bit',
        ];
        // Normalise line endings and dot-stuff lines that start with ".".
        $text = preg_replace("/\r\n|\r|\n/", "\r\n", $body);
        $text = preg_replace('/^\./m', '..', $text);
        $cmd(implode("\r\n", $headers) . "\r\n\r\n" . $text . "\r\n.", 250);
        fwrite($fp, "QUIT\r\n");
        fclose($fp);
        return true;
    } catch (Exception $e) {
        @fwrite($fp, "QUIT\r\n");
        @fclose($fp);
        return $e->getMessage();
    }
}

$sent = false;

// 1) Preferred: authenticated SMTP (inbox-friendly).
if (is_file($CONFIG_FILE)) {
    $cfg = include $CONFIG_FILE;
    if (is_array($cfg) && !empty($cfg['user']) && !empty($cfg['pass'])) {
        $result = smtp_send($cfg, $FROM_EMAIL, $FROM_NAME, $TO_EMAIL, $email, $name, $fullSubject, $body);
        if ($result === true) {
            $sent = true;
        } else {
            error_log('Kitaa contact form SMTP error: ' . $result);
        }
    }
}

// 2) Fallback: PHP mail(), so the form keeps working even without SMTP settings.
if (!$sent) {
    $headers  = 'From: ' . encode_header($FROM_NAME) . " <$FROM_EMAIL>\r\n";
    $headers .= 'Reply-To: ' . encode_header($name) . " <$email>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $sent = @mail($TO_EMAIL, encode_header($fullSubject), $body, $headers, '-f' . $FROM_EMAIL);
}

if (!$sent) {
    respond(500, false, 'Could not send your message. Please email or WhatsApp us directly.');
}

respond(200, true, "Message sent! We'll get back to you soon.");
