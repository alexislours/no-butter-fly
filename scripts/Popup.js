"use strict";

function save() {
	chrome.storage.sync.set({
		enabled: document.getElementById("enabled").checked,
		url: document.getElementById("url").value,
		terms: document.getElementById("terms").value.toLowerCase()
	}, function() {
		document.getElementById("submit").value = "Saved";
	});
}

function restore() {
	chrome.storage.sync.get({
		enabled: true,
		url: "",
		terms: "",
	}, function(items) {
		document.getElementById("enabled").checked = items.enabled;
		document.getElementById("url").value = items.url;
		document.getElementById("terms").value = items.terms;
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
document.getElementById("url").addEventListener("input", changed);
document.getElementById("url").addEventListener("keyup", enter);
document.getElementById("text").addEventListener("input", changed);
document.getElementById("text").addEventListener("keyup", enter);