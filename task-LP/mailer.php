<?php 
	header('Content-Type: text/html; charset=utf-8');
	
	$username = $_POST['name'];
	$email = $_POST['email'];
	$tel = $_POST['tel'];
	$number = $_POST['order-number'];


	$username = htmlspecialchars($username);
	$email = htmlspecialchars($email);
	$tel = htmlspecialchars($tel);
	$number = htmlspecialchars($number);

	$username = urldecode($username);
	$email = urldecode($email);
	$tel = urldecode($tel);
	$number = urldecode($number);


	$username = trim($username);
	$email = trim($email);
	$tel = trim($tel);
	$number = trim($number);


	$to = $email.",";
	$to .= "mira55@yandex.ru";

	mail($to,
		"Тестовое задание, заказ забора №".$number,
		$username .", заказ №".$number." сформирован. В ближайшее время наш специалист свяжется с вами по телефону ".$tel.".",
		"From: order@j4.liderpoiska.ru"
	);


	// echo("WOW! Perenos \n".$username." Perenos \n".$email.' PERENOS \n'.$tel);
	// echo '<script>
	// 	location.href= "/success.html";
	// 	</script>';
	header('Location: success.html');
?>