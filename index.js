module.exports = wrapTypesafe

function trim(str) {
  return str.trim()
}

function typeofChecker(type) {
  return function (stuff) {
    return typeof stuff === type
  }
}

function getValidator(arg) {
  // support strFoo and str_foo
  var prefix = arg.split(/[A-Z_]/)[0]
  var prefixes =
  { 'str': 'string'
  , 'cb': 'function'
  , 'fn': 'function'
  , 'func': 'function'
  , 'num': 'number'
  , 'obj': 'object'
  , 'bool': 'boolean'
  }
  if (!prefixes.propertyIsEnumerable(prefix))
    throw new Error('unknown prefix '+prefix+'"')
  return typeofChecker(prefixes[prefix])
}

function getArgNames(fn) {
  return fn.toString().split(')')[0].split('(')[1].split(',').map(trim)
}

function wrapTypesafe(fnOrObj) {
  if (typeof fnOrObj === 'object') {
    if (Array.isArray(fnOrObj)) {
      return fnOrObj.map(wrapTypesafe)
    } else {
      var newObj = {}
      for (key in fnOrObj)
        newObj[key] = wrapTypesafe(fnOrObj[key])
      return newObj
    }
  }
  var validators = getArgNames(fnOrObj).map(getValidator)
  return function() {
    if (arguments.length !== validators.length)
      throw new Error("the arguments are too many/not enough")
    for (var i=0; i<arguments.length; i++)
      if (!validators[i](arguments[i]))
        throw new Error("argument #"+i+" doesn't have the right type")
    fnOrObj.apply(this, arguments)
  }
}
