// Declerative Functions
helloOne()
function helloOne(){
    console.log("Hello one!")
}
helloOne()

// Anoymus function
var helloTwo = function(){
    console.log("Hello two!")
}
helloTwo()

// ES6 Function syntax or arrow function
var helloThree = () => {
    console.log("Hello three!")
}
helloThree()

// Functions with argumets
function printName(name, lastName){
    console.log(name + ' ' + lastName)
}
printName("John", 'Smith')

// Function with return
function multiplyByTwo(number){
    var result = number * 2
    return result
}
var myResult = multiplyByTwo(20)
console.log(myResult)

// Import function
import { printAge } from '../helpers/printHelper.js'
printAge(5)

// Import everything
import * as helper from '../helpers/printHelper.js'
helper.printAge(10)