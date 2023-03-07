<?php
$name = $_POST['name'];
$instansi = $_POST['instansi'];
$visitor_email = $_POST['email'];
$subject = $_POST['subjet'];
$message = $_POST['message'];

$email_from = 'info@yourwebsite.com';

$email_subject = 'New Form Submission';

$email_body = "User name: $name.\n".
                "User Email: $visitor_email.\n".
                    "Subject: $subject.n\".
                    "User Message: $message.n\".

$to = 'malutbiroumum@gmail.com';

$headers = "From: $email_from \r\n";

$headers .= "Reply-To: $visitor_email \r\n";


mail($to,$email_subject,$email_body,$headers);

header("Location: )