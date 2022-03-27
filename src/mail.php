<?
require_once 'PHPMailer/PHPMailerAutoload.php';

$mail = new PHPMailer;
$mail->CharSet = 'UTF-8';

$name = $_POST['user_name'];
$email = $_POST['user_email'];
$text = $_POST['user_comments'];


// От кого
$mail->setFrom('adm@' . $_SERVER['HTTP_HOST'], 'High pass - фото студия');
 
// Кому
$mail->addAddress('kribedko@yandex.ru');
$mail->addAddress('kribedko@gmail.com');

// Тема письма
$mail->Subject = 'High pass. Новая заявка';
 
// Тело письма
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
$mail->Body    = 'Новая заявка от <b>' . $name . '</b>. 
<p> Контактный e-mail: ' . $email . '</p> 
<p>Комментарий:' .$text. '</p>';
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    echo 'Ok';
}
?>