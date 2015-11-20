var isNative = /\{\s*\[native code\]\s*\}/;
var xhr      = window.fetch;

/**
 * Intercept fetches allowing for custom headers on every request.
 * Emits a "request" with any changed headers being added and a "response"
 * with a get function to retrieve specific headers from a response.
 */
module.exports = function (emitter) {
	if (!isNative.test(fetch)) return;

	window.fetch = function (url, opts) {
		opts         = opts || {};
		opts.headers = opts.headers || {};
		var headers = {};

		emitter.emit("request", headers);
		for (var key in headers) opts.headers[key] = headers[key];
		return xhr(url, opts)
			.then(function (res) {
				emitter.emit("response", { get: function (key) { return res.headers.get(key); } });
				return res;
			});
	}
};