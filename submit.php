<?php
// Get form data
$nama = $_POST['nama'];
$instansi = $_POST['instansi'];
$email = $_POST['email'];
$hp = $_POST['hp'];
$keterangan = $_POST['keterangan'];
$surat = $_FILES['surat'];

// Set email recipient
$to = "youremail@example.com";

// Set email subject
$subject = "Form Submission - Pesan Form";

// Build email message
$message = "Nama: " . $nama . "\n\n";
$message .= "Instansi: " . $instansi . "\n\n";
$message .= "E-mail: " . $email . "\n\n";
$message .= "Nomor HP: " . $hp . "\n\n";
$message .= "Keterangan: " . $keterangan . "\n\n";

// Set headers
$headers = "From: " . $email . "\r\n";
$headers .= "Reply-To: " . $email . "\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"boundary\"\r\n";

// Build email content
$content = "--boundary\r\n";
$content .= "Content-Type: text/plain; charset=\"iso-8859-1\"\r\n";
$content .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$content .= $message . "\r\n";

// Add attachment (if uploaded)
if ($surat['error'] == 0) {
    $content .= "--boundary\r\n";
    $content .= "Content-Type: " . $surat['type'] . "; name=\"" . $surat['name'] . "\"\r\n";
    $content .= "Content-Transfer-Encoding: base64\r\n";
    $content .= "Content-Disposition: attachment; filename=\"" . $surat['name'] . "\"\r\n\r\n";
    $content .= chunk_split(base64_encode(file_get_contents($surat['tmp_name']))) . "\r\n";
    $content .= "--boundary--\r\n";
}

// Send email
mail($to, $subject, $content, $headers);

// Redirect to thank-you page
header("Location: thank-you.html");
?>
