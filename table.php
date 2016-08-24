<?php
session_start();


if (!empty($_POST)) {
	$i = $_POST['number'] - 1;
	
	if (!empty($_POST['delete'])) {
		unset($_SESSION['rows'][$i]);
		$_SESSION['rows'] = array_values($_SESSION['rows']);
	} else {
		$_SESSION['rows'][$i] = [
				'name' => $_POST['name'],
				'quantity' => $_POST['quantity'],
				'price' => $_POST['price']
		];
	}
	
}
$table = isset($_SESSION['rows']) ? $_SESSION['rows'] : [];

echo json_encode($table);