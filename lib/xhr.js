var xhr  = XMLHttpRequest.prototype;
var send = xhr.send;
var open = xhr.open;

/**
 * Intercept xmlhttprequests allowing for custom headers on every request.
 * Emits a "request" with any changed headers being added and a "response"
 * with a get function to retrieve specific headers from a response.
 */
module.exports = function (emitter) {
	xhr.open = function (method, url) {
		method = method || "GET";
		this._side_step = { method: method, url: url };
		return open.apply(this, arguments);
	};

	xhr.send = function () {
		var headers = {};
		var self    = this;
		var opts    = this._side_step || {};
		emitter.emit("request", {
			url:     opts.url,
			method:  opts.method,
			headers: {
				set: function (key, val) { self.setRequestHeader(key, val); }
			}
		});

		self.addEventListener("readystatechange", function () {
			if (self.readyState !== 4) return;
			emitter.emit("response", {
				url:     opts.url,
				method:  opts.method,
				headers: {
					get: function (key) { return self.getResponseHeader(key); }
				}
			});
		});

		send.apply(self, arguments);
	};
};
