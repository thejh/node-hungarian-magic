Installation:

    npm install hungarian-magic

Wraps a function, an array of functions or an object containing functions.

Supported hungarian prefixes:

 - str: String
 - cb: Function
 - fn: function
 - func: function
 - num: number
 - obj: Object
 - bool: boolean

Either just use the prefix as variable name or continue it either camelCase-like (`numAge`) or with an underscore (`num_age`).

Usage example with dnode:

    var hungarianWrap = require('hungarian-magic');
    var server = dnode(hungarianWrap({
        zing : function (num, cb) { cb(num * 100) }
    }));
