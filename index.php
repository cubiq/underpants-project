<!DOCTYPE html>
<html lang="en">
<head>
<title>Underpants</title>

<script type="text/javascript">

var HTTP_ACCEPT = "<?php echo !empty($_SERVER['HTTP_ACCEPT']) ? htmlspecialchars($_SERVER['HTTP_ACCEPT']) : '' ?>",
	HTTP_ACCEPT_ENCODING = "<?php echo !empty($_SERVER['HTTP_ACCEPT_ENCODING']) ? htmlspecialchars($_SERVER['HTTP_ACCEPT_ENCODING']) : '' ?>",
	HTTP_ACCEPT_LANGUAGE = "<?php echo !empty($_SERVER['HTTP_ACCEPT_LANGUAGE']) ? htmlspecialchars($_SERVER['HTTP_ACCEPT_LANGUAGE']) : '' ?>",
	HTTP_ACCEPT_CHARSET = "<?php echo !empty($_SERVER['HTTP_ACCEPT_CHARSET']) ? htmlspecialchars($_SERVER['HTTP_ACCEPT_CHARSET']) : '' ?>",
	REMOTE_ADDR = "<?php echo !empty($_SERVER['REMOTE_ADDR']) ? htmlspecialchars($_SERVER['REMOTE_ADDR']) : '' ?>";

</script>
<script type="text/javascript" src="js/swfobject.js"></script>
<script type="text/javascript" src="js/sha1.js"></script>
<script type="text/javascript" src="js/underpants.js"></script>

<link rel="stylesheet" type="text/css" href="css/style.css">

</head>
<body>

	<div id="wrapper">
		<h1>Welcome to the Underpants Project</h1>
		<p>This is a proof of concept aimed to raise concern over privacy (or lack of it) on the internet. The following is your <strong>unique fingerprint</strong> on the web:</p>
		<p id="fingerprint">loading...</p>
		<p>This fingerprint can be used to track you across domains with no need of sessions or cookies or -not to mention- your agreement.<br><br>To prove the risk we all are exposed to, enter any word in the field below, hit <strong>track me!</strong> and follow the instructions (no worries, no personal information is stored).</p>
		<form action="" method="post" onsubmit="underpants.sendWord();return false" id="myForm"><p><input type="text" placeholder="Any word will do" name="word" id="word"><input type="submit" value="Track me!" id="submit"></p></form>
		<p id="step2" style="display:none"></p>
	</div>
	<p id="credits">Brought to you by <a href="https://twitter.com/#!/cubiq">@cubiq</a> and <a href="https://twitter.com/#!/maboa">@maboa</a></p>

	<div id="flwobj"></div>

</body>

</html>