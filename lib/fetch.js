var isNative = /\{\s*\[native code\]\s*\}/;
var fnToStr  = Function.prototype.toString;
var xhr      = window.fetch;

/**
 * Intercept fetches allowing for custom headers on every request.
 * Emits a "request" with any changed headers being added and a "response"
 * with a get function to retrieve specific headers from a response.
 */
module.exports = function (emitter) {
	if (!isNative.test(fnToStr.call(xhr)) return;

	window.fetch = function fetch (url, opts) {
		opts        = opts || {};
		var headers = opts.headers = opts.headers || {};
		var method  = opts.method || "GET";

		emitter.emit("request", {
			url: url,
			method: method,
			headers: {
				set: function (key, val) { headers[key] = val; }
			}
		});

		return xhr(url, opts)
			.then(function (res) {
				emitter.emit("response", {
					url: url,
					method: method,
					headers: {
						get: function (key) { return res.headers.get(key); }
					}
				});
				return res;
			});
	}
};
