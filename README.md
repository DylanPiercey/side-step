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
emitter.on("request", ({ url, method, headers })=> {
	// Headers has a set function to modifiy the request headers.
	headers.set("custom-key", "Hello World");
});

// An ajax request got a response.
emitter.on("response", ({ url, method, headers })=> {
	// Headers has a get function to retrieve the response headers.
	headers.get("custom-key");
});
```

---

### Contributions

* Use gulp to run tests.

Please feel free to create a PR!
