var underpants = (function (w) {
	var nav = w.navigator,
		scr = w.screen,
		underpants = {
			screenSize: scr.width + 'x' + scr.height + 'x' + scr.colorDepth,
			devicePixelRatio: w.devicePixelRatio || 1,
			timezone: new Date().getTimezoneOffset(),
			mimeTypes: [],
			plugins: [],
			httpAcceptHeaders: HTTP_ACCEPT + ';' + HTTP_ACCEPT_ENCODING + ';' + HTTP_ACCEPT_LANGUAGE + ';' + HTTP_ACCEPT_CHARSET,
			fonts: ''
		},
		navParms = [
			'appCodeName',
			'appName',
			'appVersion',
			'cookieEnabled',
			'language',
			'platform',
			'product',
			'productSub',
			'userAgent',
			'vendor',
			'vendorSub'
		],
		fingerprint = '',
		flashTimeout,
		flashFailed;

	function init () {
		var i, l;

		// Get the Navigator params
		for ( i = 0, l = navParms.length; i < l; i++ ) {
			underpants[navParms[i]] = navParms[i] in nav ? nav[navParms[i]] : '';
		}

		// Get the mime types
		if ( 'mimeTypes' in nav ) {
			for ( i = 0, l = nav.mimeTypes.length; i < l; i++ ) {
				underpants.mimeTypes.push( nav.mimeTypes[i].description + ',' + nav.mimeTypes[i].suffixes + ',' + nav.mimeTypes[i].type );
			}

			underpants.mimeTypes = underpants.mimeTypes.join(',');
		}

		// Get the plugins
		if ( 'plugins' in nav ) {
			for ( i = 0, l = nav.plugins.length; i < l; i++ ) {
				underpants.plugins.push( nav.plugins[i].description + ',' + nav.plugins[i].filename + ',' + nav.plugins[i].name );
			}
		}

		swfobject.embedSWF("swf/FontList.swf", "flwobj", "1", "1", "9.0.0", null, null, null, null, flashCallback);
	}

	function flashCallback (result) {
		if ( !result.success ) {
			flashFailed = true;
			ready();
			return;
		}

		flashTimeout = setTimeout(function () {
			flashFailed = true;
			ready();
		}, 5000);
	}

	function addFonts (fonts) {
		clearTimeout(flashTimeout);

		if ( flashFailed ) return;

		underpants.fonts = fonts.join(',');
		ready();
	}

	function makeFingerprint () {
		var i,
			out = [];

		for ( i in underpants ) {
			out.push(underpants[i]);
		}

		return out.join(';');
	}

	function ready () {
		fingerprint = Crypto.SHA1(makeFingerprint());
		document.getElementById('fingerprint').innerHTML = fingerprint;
	}

	function ajax (url, parms) {
		var req = new XMLHttpRequest(),
			post = parms.post || null,
			callback = parms.callback || null,
			timeout = parms.timeout || null;

		req.onreadystatechange = function () {
			if ( req.readyState != 4 ) return;

			// Error
			if ( req.status != 200 && req.status != 304 ) {
				if ( callback ) callback(false);
				return;
			}

			if ( callback ) callback(req.responseText);
		};

		if ( post ) {
			req.open("POST", url, true);
			req.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
			req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		} else {
			req.open('GET', url, true);
		}

		req.send(post);

		if ( timeout ) {
			setTimeout(function () {
				req.onreadystatechange = function () {};
				req.abort();
				if ( callback ) callback(false);
			}, timeout);
		}
	}

	function sendWord () {
		var myForm = document.getElementById('myForm'),
			step2 = document.getElementById('step2'),
			word = document.getElementById('word').value;

		if ( word.length < 1 ) {
			alert('Please enter any string');
			return;
		}

		myForm.style.display = 'none';
		step2.style.display = 'block';
		step2.innerHTML = 'Loading...';

		ajax('store.php', {
			post: 'fp=' + escape(fingerprint) + '&word=' + escape(word),
			callback: function (result) {
				if ( !result ) {
					alert('Error connecting to server. Check your internet connect and retry.');
					myForm.style.display = 'block';
					step2.style.display = 'none';
					return;
				}

				result = w.JSON.parse(result);
				if ( result.status == 'error' ) {
					myForm.style.display = 'block';
					step2.style.display = 'none';
					alert(result.message);
					return;
				}

				step2.innerHTML = '<strong>Your word has been saved!</strong> Now point your browser to any of the following addresses (copy-n-paste) and watch the magic.<br><br>http://ghosttouch.com/underpants<br>http://libellu.la/underpants<br><br>Note: I ask you to copy-n-paste the address to prove that no extra data is transmitted.<br><br><a href="#" onclick="document.getElementById(\'myForm\').style.display=\'block\';document.getElementById(\'step2\').style.display=\'none\';return false">Want to change word?</a>';
			}
		});
	}

	init();

	return {
		addFonts: addFonts,
		sendWord: sendWord
	};
})(this);

function fontList (fonts) {
	underpants.addFonts(fonts);
}