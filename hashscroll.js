/**
 * HashScroll.js v0.1.2
 * https://github.com/tu4mo/hashscroll.js
 *
 * Copyright © 2016 tu4mo
 */

(function(window, document) {

	'use strict';

	function init() {
		addEventListeners();
		document.addEventListener('refreshHashscroll', function(e) { addEventListeners(); });
	}

	function addEventListeners() {
		var elements = document.querySelectorAll('.hashscroll');

		for (var i = 0; i < elements.length; i++) {
			elements[i].addEventListener('click', elementClicked);
		}
	}

	function elementClicked(event) {
		event.preventDefault();

		var href = this.getAttribute('href');
		var element = document.getElementById(href.substring(1));

		history.pushState(null, null, href);

		scrollTo(element.offsetTop - element.scrollTop + element.clientTop, 500);
	}

	/**
	 * Scrolls to position.
	 * Original code is from http://stackoverflow.com/a/16136789
	 */
	function scrollTo(to, duration) {
		var start = document.body.scrollTop || document.documentElement.scrollTop;
		var change = to - start;
		var increment = 20;

		var animateScroll = function(elapsedTime) {
			elapsedTime += increment;
			var position = easeInOut(elapsedTime, start, change, duration);
			document.body.scrollTop = document.documentElement.scrollTop = position;

			if (elapsedTime < duration) {
				setTimeout(function() {
					animateScroll(elapsedTime);
				}, increment);
			}
		};

		animateScroll(0);
	}

	/**
	 * Scroll smoothly.
	 * Original code is from http://stackoverflow.com/a/16136789
	 */
	function easeInOut(currentTime, start, change, duration) {
		currentTime /= duration / 2;

		if (currentTime < 1) {
			return change / 2 * currentTime * currentTime + start;
		}

		currentTime -= 1;

		return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
	}

	init();

})(window, document);
