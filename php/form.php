<?php

ini_set("display_errors", 1);
ini_set("display_startup_errors", 1);
error_reporting(E_ALL);

require_once "../vendor/autoload.php";


// Data
$name = $_POST["name"];
$email = $_POST["email"];
$phone = $_POST["telephone"];
$province = $_POST["province"];
$comments = $_POST["comments"];

/* Send email to dusan@hqfinance.org

Subject Line: Name Submitted a Contact Form

Body:
Hello Dusan,
A user has submited a contact form on the site, here are their details:

Name: Enter their name here
Email: Enter the customer email here
Phone: Enter the customer phone number here
Province: provide the province from the map selected here
Comment: enter any comment if customer had any

*/

if ($comments == '') {
  $comments = "N/A";
}

$body = "<!DOCTYPE html>
<html>
  <head>
    <meta charset='utf-8'>
    <title>Contact Form Email</title>
  </head>
  <body>
    <p>Hello Dusan,</p>
    <p>A user has submitted a contact form on the site, here are their details:</p>
    <br />
    <p>Name: $name</p>
    <p>Email: $email</p>
    <p>Phone: $phone</p>
    <p>Province: $province</p>
    <p>Comment: $comments</p>
  </body>
</html>";

$plain_body = "Hello Dusan, A user has submited a contact form on the site, here are their details: Name: $name Email: $email Phone: $phone Province: $province Comment: $comments";

//PHPMailer Object
$mail = new PHPMailer;

//From email address and name
$mail->setFrom("noalea@codeyourfreedom.com", "Noa Lea");
$mail->addReplyTo("noalea@codeyourfreedom.com", "Reply");

//To address and name
$mail->addAddress("dusan@hqfinance.org", "Dusan");

$mail->SMTPSecure = "ssl";
//Send HTML or Plain Text email
$mail->isHTML(true);

$mail->Subject = "$name Submitted a Contact Form";
$mail->Body = $body;
$mail->AltBody = $plain_body;

if(!$mail->send())
{
    echo "Mailer Error: " . $mail->ErrorInfo;
}
else
{
    echo "Message has been sent successfully";
}

?>
