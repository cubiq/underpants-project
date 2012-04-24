<?php
include 'config.php';

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

if ( !isset($_POST['fp']) || empty($_POST['word']) ) {
	echo json_encode( array(
		'status' => 'error',
		'message' => '')
	);
	exit;
}

$fingerprint = strip_tags(trim(urldecode($_POST['fp'])));
$word = substr(strip_tags(trim(urldecode($_POST['word']))), 0, 127);

if ( $word == "" ) {
	echo json_encode( array(
		'status' => 'error',
		'message' => 'Word is empty')
	);
	exit;
}

$db = new PDO($config['db'], $config['dbUser'], $config['dbPassword']);
$db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);

$stmt = $db->prepare( "SELECT `id` FROM `words` WHERE `fingerprint` = :fingerprint LIMIT 1" );
$stmt->execute( array(':fingerprint' => $fingerprint) );
$user = $stmt->fetch();

if ( !$user ) {
	$stmt = $db->prepare( "INSERT INTO `words` (`fingerprint`, `word`) VALUES (:fingerprint, :word)" );
} else {
	$stmt = $db->prepare( "UPDATE `words` SET `word` = :word WHERE `fingerprint` = :fingerprint" );
}
$stmt->execute( array(':fingerprint' => $fingerprint, ':word' => $word) );

echo json_encode( array(
	'status' => 'success',
	'message' => 'word saved')
);
