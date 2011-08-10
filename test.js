var wrapTypesafe = require('./index')

// object
var funcs = wrapTypesafe(
  { "foo": function(strName, numAge) {
    return strName + " is " + numAge + " years old"
  }}
)

try {
  funcs.foo("Max", 5)
  console.log(":) correct use didn't throw")
} catch (e) {
  console.log(":( correct use threw")
  console.log(e.stack)
}

try {
  funcs.foo(5, "Max")
  console.log(":( wrong use didn't throw")
} catch (e) {
  console.log(":) wrong use threw")
}

// plain
var func = wrapTypesafe(function(strName, numAge) {
    return strName + " is " + numAge + " years old"
})

try {
  func("Max", 5)
  console.log(":) correct use didn't throw")
} catch (e) {
  console.log(":( correct use threw")
  console.log(e.stack)
}

try {
  func(5, "Max")
  console.log(":( wrong use didn't throw")
} catch (e) {
  console.log(":) wrong use threw")
}


// array
var funcArr = wrapTypesafe(
  [ function(strName, numAge) {
    return strName + " is " + numAge + " years old"
  }]
)

try {
  funcArr[0]("Max", 5)
  console.log(":) correct use didn't throw")
} catch (e) {
  console.log(":( correct use threw")
  console.log(e.stack)
}

try {
  funcArr[0](5, "Max")
  console.log(":( wrong use didn't throw")
} catch (e) {
  console.log(":) wrong use threw")
}
