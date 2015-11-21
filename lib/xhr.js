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
		var self    = this;
		emitter.emit("request", headers);

		self.addEventListener("readystatechange", function () {
			if (self.readyState !== 4) return;
			emitter.emit("response", { get: function (key) { return self.getResponseHeader(key); } });
		});

		for (var key in headers) self.setRequestHeader(key, headers[key]);
		send.apply(self, arguments);
	};
};