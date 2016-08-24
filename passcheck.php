<?php
$array = [
		'ivan' => '123',
		'petar' => '456',
		'georgi' => '789'
];

$username = $_POST['username'];
$password = $_POST['password'];

$check = false;

foreach ($array as $key => $value) {
	if ($key == $username && $value == $password) {
		$check = true;
		break;
	}
}

echo json_encode($check);