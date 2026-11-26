<?php
/**
 * Contact form handler for Kitaa Digital Solutions.
 *
 * 1. Emails the enquiry to info@ through Hostinger's authenticated mail server
 *    (SMTP), so it is DKIM-signed and SPF-aligned and lands in the inbox.
 * 2. Sends the visitor a short, branded "thanks for contacting us" auto-reply.
 *
 * The mailbox password is NOT stored here (this repository is public). It is read
 * from a private file kept OUTSIDE the website folder, next to public_html:
 *   kitaa-mail-config.php
 *   <?php return ['host' => 'smtp.hostinger.com', 'port' => 465,
 *                 'user' => 'no-reply@kitaadigitalsolutions.tech', 'pass' => 'MAILBOX_PASSWORD'];
 * If no config is found or SMTP fails, the enquiry falls back to PHP mail()
 * (and no auto-reply is sent, to avoid spam-folder or relay problems).
 */

// ---- Settings -------------------------------------------------------------
$TO_EMAIL   = 'info@kitaadigitalsolutions.tech';
$FROM_EMAIL = 'no-reply@kitaadigitalsolutions.tech';
$FROM_NAME  = 'Kitaa Digital Solutions';
$WHATSAPP   = '+255 763 346 078';
$WHATSAPP_LINK = 'https://wa.me/255763346078';
$SITE_URL   = 'https://kitaadigitalsolutions.tech';
$MAX_PER_HOUR_PER_IP = 5;
$MAX_AUTOREPLIES_PER_DAY_PER_EMAIL = 2; // stops the form being used to flood one inbox
$MAX_AUTOREPLIES_PER_HOUR_TOTAL = 30;   // hard cap, even if many IPs are used
// Only these sites may submit the form (blocks other websites posting to it).
$ALLOWED_HOSTS = ['kitaadigitalsolutions.tech', 'www.kitaadigitalsolutions.tech'];

// Where the private config may live. Hostinger's Git deploy can place the site in
// .builds/... behind a public_html link, so several locations are checked.
$docRoot = rtrim((string)($_SERVER['DOCUMENT_ROOT'] ?? ''), '/');
$CONFIG_CANDIDATES = array_unique(array_filter([
    $docRoot ? dirname($docRoot) . '/kitaa-mail-config.php' : null,
    dirname(__DIR__) . '/kitaa-mail-config.php',
    dirname(__DIR__, 2) . '/kitaa-mail-config.php',
    dirname(__DIR__, 3) . '/kitaa-mail-config.php',
]));
// ---------------------------------------------------------------------------

header('Content-Type: application/json; charset=utf-8');
header('X-Content-Type-Options: nosniff');
header('Cache-Control: no-store');

function respond($status, $ok, $message, $extra = []) {
    http_response_code($status);
    echo json_encode(array_merge(['ok' => $ok, 'message' => $message], $extra));
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    respond(405, false, 'Method not allowed.');
}

// Same-site check: browsers always send Origin (or at least Referer) with a form POST,
// so a request from another website, or with neither header, is refused.
$source = (string)($_SERVER['HTTP_ORIGIN'] ?? '');
if ($source === '' || $source === 'null') {
    $source = (string)($_SERVER['HTTP_REFERER'] ?? '');
}
$sourceHost = strtolower((string)parse_url($source, PHP_URL_HOST));
if ($sourceHost === '' || !in_array($sourceHost, $ALLOWED_HOSTS, true)) {
    respond(403, false, 'Please send your message from our website.');
}

/**
 * Sliding-window counter stored in a temp file. Returns true if under $max within
 * $window seconds (and records this hit), false if the limit is reached.
 */
function rate_ok($key, $max, $window) {
    $file = sys_get_temp_dir() . '/kitaa_contact_' . md5($key);
    $now = time();
    $fp = @fopen($file, 'c+');
    if (!$fp) {
        return true; // fail open rather than lose real enquiries
    }
    flock($fp, LOCK_EX);
    $hits = array_filter(
        array_map('intval', explode(',', (string)stream_get_contents($fp))),
        function ($t) use ($now, $window) { return $t > $now - $window; }
    );
    $ok = count($hits) < $max;
    if ($ok) {
        $hits[] = $now;
        ftruncate($fp, 0);
        rewind($fp);
        fwrite($fp, implode(',', $hits));
    }
    flock($fp, LOCK_UN);
    fclose($fp);
    return $ok;
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

// Simple per-IP rate limit (also limits how many auto-replies one visitor can trigger).
$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
if (!rate_ok('ip:' . $ip, $MAX_PER_HOUR_PER_IP, 3600)) {
    respond(429, false, 'Too many messages. Please try again later or contact us on WhatsApp.');
}

/**
 * Minimal SMTP client (implicit TLS on port 465, AUTH LOGIN).
 * $message = ['to', 'replyEmail', 'replyName', 'subject', 'text', 'html' (optional)].
 * Returns true on success, or an error string.
 */
function smtp_send($cfg, $fromEmail, $fromName, $message) {
    $host = $cfg['host'] ?? 'smtp.hostinger.com';
    $port = (int)($cfg['port'] ?? 465);
    $context = stream_context_create(['ssl' => ['verify_peer' => true, 'verify_peer_name' => true]]);
    $fp = @stream_socket_client("ssl://$host:$port", $errno, $errstr, 15, STREAM_CLIENT_CONNECT, $context);
    if (!$fp) {
        return "connect failed: $errstr ($errno)";
    }
    stream_set_timeout($fp, 15);

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
    $cmd = function ($line, $expect, $label = null) use ($fp, $read) {
        fwrite($fp, $line . "\r\n");
        list($code, $reply) = $read();
        if (!in_array($code, (array)$expect, true)) {
            throw new Exception("'" . ($label ?? strtok($line, ' ')) . "' got: $reply");
        }
    };
    $crlf = function ($s) {
        $s = preg_replace("/\r\n|\r|\n/", "\r\n", $s);
        return preg_replace('/^\./m', '..', $s); // dot-stuffing
    };

    try {
        list($code, $reply) = $read();
        if ($code !== 220) {
            throw new Exception("greeting: $reply");
        }
        $cmd('EHLO kitaadigitalsolutions.tech', 250);
        $cmd('AUTH LOGIN', 334);
        $cmd(base64_encode($cfg['user']), 334, 'AUTH username');
        $cmd(base64_encode($cfg['pass']), 235, 'AUTH password');
        $cmd("MAIL FROM:<$fromEmail>", 250);
        $cmd('RCPT TO:<' . $message['to'] . '>', [250, 251]);
        $cmd('DATA', 354);

        $headers = [
            'Date: ' . date('r'),
            'From: ' . encode_header($fromName) . " <$fromEmail>",
            'To: <' . $message['to'] . '>',
            'Reply-To: ' . encode_header($message['replyName']) . ' <' . $message['replyEmail'] . '>',
            'Subject: ' . encode_header($message['subject']),
            'Message-ID: <' . bin2hex(random_bytes(12)) . '@kitaadigitalsolutions.tech>',
            'MIME-Version: 1.0',
        ];
        if (!empty($message['autoReply'])) {
            $headers[] = 'Auto-Submitted: auto-replied';
        }

        if (!empty($message['html'])) {
            $boundary = 'kitaa' . bin2hex(random_bytes(8));
            $headers[] = "Content-Type: multipart/alternative; boundary=\"$boundary\"";
            $body = "--$boundary\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n"
                . $message['text'] . "\r\n"
                . "--$boundary\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\n\r\n"
                . $message['html'] . "\r\n"
                . "--$boundary--";
        } else {
            $headers[] = 'Content-Type: text/plain; charset=UTF-8';
            $headers[] = 'Content-Transfer-Encoding: 8bit';
            $body = $message['text'];
        }

        $cmd(implode("\r\n", $headers) . "\r\n\r\n" . $crlf($body) . "\r\n.", 250);
        fwrite($fp, "QUIT\r\n");
        fclose($fp);
        return true;
    } catch (Exception $e) {
        @fwrite($fp, "QUIT\r\n");
        @fclose($fp);
        return $e->getMessage();
    }
}

// ---- 1) The enquiry to Kitaa ----------------------------------------------
$fullSubject = 'Website enquiry: ' . $subject;
$text  = "New message from the website contact form\n";
$text .= "------------------------------------------\n\n";
$text .= "Name:    $name\n";
$text .= "Email:   $email\n";
$text .= "Subject: $subject\n\n";
$text .= "Message:\n$message\n\n";
$text .= "------------------------------------------\n";
$text .= "Sent: " . date('Y-m-d H:i') . " | IP: $ip\n";

$cfg = null;
foreach ($CONFIG_CANDIDATES as $path) {
    if (@is_file($path)) {
        $loaded = include $path;
        if (is_array($loaded) && !empty($loaded['user']) && !empty($loaded['pass'])) {
            $cfg = $loaded;
            break;
        }
    }
}

$via = 'mail';
$sent = false;
if ($cfg) {
    $result = smtp_send($cfg, $FROM_EMAIL, 'Kitaa Website', [
        'to' => $TO_EMAIL, 'replyEmail' => $email, 'replyName' => $name,
        'subject' => $fullSubject, 'text' => $text,
    ]);
    if ($result === true) {
        $sent = true;
        $via = 'smtp';
    } else {
        error_log('Kitaa contact form SMTP error: ' . $result);
    }
}
if (!$sent) {
    $headers  = 'From: ' . encode_header('Kitaa Website') . " <$FROM_EMAIL>\r\n";
    $headers .= 'Reply-To: ' . encode_header($name) . " <$email>\r\n";
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $sent = @mail($TO_EMAIL, encode_header($fullSubject), $text, $headers, '-f' . $FROM_EMAIL);
}
if (!$sent) {
    respond(500, false, 'Could not send your message. Please email or WhatsApp us directly.');
}

// ---- 2) Auto-reply to the visitor (only over authenticated SMTP) -----------
// Deliberately does NOT echo the visitor's message, so the form can't be used to
// send arbitrary content to other people.
$autoReplied = false;
if ($via === 'smtp'
    && rate_ok('reply:' . strtolower($email), $MAX_AUTOREPLIES_PER_DAY_PER_EMAIL, 86400)
    && rate_ok('reply:all', $MAX_AUTOREPLIES_PER_HOUR_TOTAL, 3600)) {
    $firstName = mb_substr(preg_split('/\s+/', $name)[0], 0, 40);
    $safeName = htmlspecialchars($firstName, ENT_QUOTES, 'UTF-8');

    $replyText = "Hi $firstName,\n\n"
        . "Thanks for contacting Kitaa Digital Solutions. We've received your message, and someone from our team will get back to you within 24 hours (usually much sooner).\n\n"
        . "Need us sooner? Chat with us on WhatsApp: $WHATSAPP ($WHATSAPP_LINK)\n\n"
        . "In the meantime, see some of our recent work: $SITE_URL/portfolio\n\n"
        . "Talk soon,\nThe Kitaa Digital Solutions team\nArusha, Tanzania\n$SITE_URL\n\n"
        . "You're receiving this because a message was sent from our website using this email address. If that wasn't you, you can ignore this email.";

    $replyHtml = '<!doctype html><html><body style="margin:0;padding:0;background:#f4f4f5;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f5;padding:24px 12px;"><tr><td align="center">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#111113;border-radius:16px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">'
        . '<tr><td style="padding:28px 32px 8px 32px;color:#f3f1ec;font-size:18px;font-weight:bold;">Kitaa Digital Solutions</td></tr>'
        . '<tr><td style="padding:8px 32px 0 32px;color:#f3f1ec;font-size:26px;font-weight:bold;line-height:1.25;">Thanks for reaching out, ' . $safeName . '<span style="color:#2a7cf6;">.</span></td></tr>'
        . '<tr><td style="padding:16px 32px 0 32px;color:#c9c7c2;font-size:15px;line-height:1.6;">We\'ve received your message, and someone from our team will get back to you <strong style="color:#f3f1ec;">within 24 hours</strong> (usually much sooner).</td></tr>'
        . '<tr><td style="padding:24px 32px 0 32px;"><a href="' . $WHATSAPP_LINK . '" style="display:inline-block;background:#1f74f2;color:#ffffff;text-decoration:none;font-weight:bold;font-size:14px;padding:12px 22px;border-radius:999px;">Chat with us on WhatsApp</a></td></tr>'
        . '<tr><td style="padding:16px 32px 0 32px;color:#c9c7c2;font-size:14px;line-height:1.6;">Or call ' . $WHATSAPP . '. In the meantime, see <a href="' . $SITE_URL . '/portfolio" style="color:#5b9bff;">some of our recent work</a>.</td></tr>'
        . '<tr><td style="padding:28px 32px 28px 32px;color:#8a8883;font-size:13px;line-height:1.6;border-top:1px solid #2a2a2e;margin-top:24px;">Talk soon,<br>The Kitaa Digital Solutions team &middot; Arusha, Tanzania<br><a href="' . $SITE_URL . '" style="color:#8a8883;">kitaadigitalsolutions.tech</a></td></tr>'
        . '</table>'
        . '<p style="max-width:560px;color:#9a9aa0;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.5;margin:16px auto 0;">You\'re receiving this because a message was sent from our website using this email address. If that wasn\'t you, you can ignore this email.</p>'
        . '</td></tr></table></body></html>';

    $result = smtp_send($cfg, $FROM_EMAIL, $FROM_NAME, [
        'to' => $email, 'replyEmail' => $TO_EMAIL, 'replyName' => $FROM_NAME,
        'subject' => 'Thanks for contacting Kitaa Digital Solutions',
        'text' => $replyText, 'html' => $replyHtml, 'autoReply' => true,
    ]);
    if ($result === true) {
        $autoReplied = true;
    } else {
        error_log('Kitaa contact form auto-reply error: ' . $result);
    }
}

respond(
    200,
    true,
    $autoReplied
        ? "Message sent! We've emailed you a confirmation and will reply within 24 hours."
        : "Message sent! We'll get back to you within 24 hours.",
    ['via' => $via]
);
