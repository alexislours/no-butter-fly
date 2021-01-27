"use strict";

var url = "";
var terms = "";
var refresh = "";

function replace() {
	var images = document.getElementsByTagName("img");
	for (var i = 0; i < images.length; i++) {
		let alt = images[i].alt.toLowerCase();
		let imgUrl = images[i].src.startsWith("data") ? "" : images[i].src.toLowerCase();
		let srcUrl = images[i].srcset.startsWith("data") ? "" : images[i].srcset.toLowerCase();
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
		let alt = sources[i].alt?.toLowerCase();
		let imgUrl = sources[i].src.startsWith("data") ? "" : sources[i].src.toLowerCase();
		let srcUrl = sources[i].srcset.startsWith("data") ? "" : sources[i].srcset.toLowerCase();
		if (
			new RegExp(terms.join("|")).test(alt) ||
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
	all: false,
	url: "",
	terms: "",
	refresh: 1000,
}, function (items) {
	if (items.enabled) {
		url = items.url || "https://raw.githubusercontent.com/alexislours/no-butter-fly/master/icon.png";
		terms = items.terms.replace(/\s+/g,'').split(",");
		refresh = items.refresh || "1000";
		if (items.all) 
			terms = [""];
		replace();
		window.setInterval(replace, +refresh);
	}
});
