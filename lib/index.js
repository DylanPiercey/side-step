var EventEmitter = require("events").EventEmitter;
var emitter      = module.exports = new EventEmitter();
require("./fetch")(emitter);
require("./xhr")(emitter);