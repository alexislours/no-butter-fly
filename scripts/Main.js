"use strict";

var url = "";
var terms = "";
var refresh = "";

function replace() {
	var images = document.getElementsByTagName("img");
	for (var i = 0; i < images.length; i++) {
		let alt = images[i].alt.toLocaleLowerCase();
		let imgUrl = images[i].src.startsWith("data") ? "" : images[i].src.toLocaleLowerCase();
		let srcUrl = images[i].srcset.startsWith("data") ? "" : images[i].srcset.toLocaleLowerCase();
		if (
			new RegExp(terms.join("|")).test(alt) ||
			new RegExp(terms.join("|")).test(imgUrl) ||
			new RegExp(terms.join("|")).test(srcUrl)
		) {
			images[i].src = url;
			images[i].srcset = url;
		}
	}

	var sources = document.getElementsByTagName("source");
	for (var i = 0; i < sources.length; i++) {
		let imgUrl = sources[i].src.startsWith("data") ? "" : sources[i].src.toLocaleLowerCase();
		let srcUrl = sources[i].srcset.startsWith("data") ? "" : sources[i].srcset.toLocaleLowerCase();
		if (
			new RegExp(terms.join("|")).test(imgUrl) ||
			new RegExp(terms.join("|")).test(srcUrl)
		) {
			sources[i].src = url;
			sources[i].srcset = url;
		}
	}
}

chrome.storage.sync.get({
	enabled: true,
	url: "",
	terms: "",
	refresh: 1000,
}, function (items) {
	if (items.enabled) {
		url = items.url || "https://raw.githubusercontent.com/alexislours/no-butter-fly/master/icon.png";
		terms = items.terms.split(",");
		refresh = items.refresh || "1000";
		replace();
		window.setInterval(replace, +refresh);
	}
});
