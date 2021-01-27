"use strict";

function save() {
	chrome.storage.sync.set({
		enabled: document.getElementById("enabled").checked,
		all: document.getElementById("all").checked,
		url: document.getElementById("url").value,
		terms: document.getElementById("terms").value.toLowerCase(),
		refresh: document.getElementById("refresh").value,
	}, function() {
		document.getElementById("submit").value = "Saved";
	});
}

function restore() {
	chrome.storage.sync.get({
		enabled: true,
		all: false,
		url: "",
		terms: "",
		refresh: "",
	}, function(items) {
		document.getElementById("enabled").checked = items.enabled;
		document.getElementById("all").checked = items.all;
		document.getElementById("url").value = items.url;
		document.getElementById("terms").value = items.terms;
		document.getElementById("refresh").value = items.terms;
	});
}

function changed() {
	document.getElementById("submit").value = "Save";
}

function enter(e) {
	e.preventDefault();
	if (e.keyCode === 13) {
		save();
	}
}

document.addEventListener("DOMContentLoaded", restore);
document.getElementById("submit").addEventListener("click", save);
document.getElementById("enabled").addEventListener("click", changed);
document.getElementById("all").addEventListener("click", changed);
document.getElementById("url").addEventListener("input", changed);
document.getElementById("url").addEventListener("keyup", enter);
document.getElementById("text").addEventListener("input", changed);
document.getElementById("text").addEventListener("keyup", enter);
document.getElementById("refresh").addEventListener("input", changed);
document.getElementById("refresh").addEventListener("keyup", enter);