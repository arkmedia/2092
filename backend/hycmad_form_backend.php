<?php
$type = $_POST['type'];
$email = $_POST['email'];
$fname = $_POST['firstname'];
$lname = $_POST['lastname'];
$phone = $_POST['phone'];
$note = $_POST['message'];

$to = 'amjohnson@froedterthealth.org';



// subject
if($type=='hycmad') {
	$subject = 'I Want to Make A Difference - Please Contact Me';
	$head = 'Contact Me So I Can Make a Difference';
} else {
	$subject = 'I Want to be Notified of Special Events - Please Notify Me';
	$head = 'I Want to be Notified of Special Events';
}


// message
$message = "
<html>
<body>
  <p>$head<br/>
  First Name: $fname<br/>
  Last Name: $lname<br/>
  Phone: $phone<br/>
  Email: $email<br/>
  Message: $note
  </p>
</body>
</html>
";

// To send HTML mail, the Content-type header must be set
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
//$headers .= 'To: Mary <mary@example.com>, Kelly <kelly@example.com>' . "\r\n";
$headers .= 'From: donotreply@arkmediagrp.com' . "\r\n";
$headers .= 'Cc: signage@arkmediagrp.com' . "\r\n";
//$headers .= 'Bcc: birthdaycheck@example.com' . "\r\n";

// Mail it
mail($to, $subject, $message, $headers);
echo "OK";
?>