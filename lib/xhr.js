var xhr  = XMLHttpRequest.prototype;
var send = xhr.send;

/**
 * Intercept xmlhttprequests allowing for custom headers on every request.
 * Emits a "request" with any changed headers being added and a "response"
 * with a get function to retrieve specific headers from a response.
 */
module.exports = function (emitter) {
	xhr.send = function () {
		var headers = {};
		emitter.emit("request", headers);

		this.addEventListener("readystatechange", function () {
			if (this.readyState !== 4) return;
			emitter.emit("response", { get: function (key) { return this.getResponseHeader(key); } });
		});

		for (var key in headers) this.setRequestHeader(key, headers[key]);
		send.apply(this, arguments);
	};
};