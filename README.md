# Side-Step.
Allows intercepting headers of both XHR and Fetch requests with one api.

# Installation

#### Npm
```console
npm install side-step
```

# Example

```js
var emitter = require('side-step');

// An ajax request was fired somewhere.
emitter.on("request", function (headers) {
	// headers is an empty object, any additions will be sent as request headers.
	headers["custom-key"] = "Hello World";
});

emitter.on("response", function (headers) {
	// headers is a read only object for the response headers with a get method.
	headers.get("custom-key");
});
```

---

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
