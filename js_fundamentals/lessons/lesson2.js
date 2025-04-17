// Concatenation and Interpolation

var price = 70
var itemName = "Table"

var messageToPrint = "The price for your " + itemName + " is " + price + " dollars" // Concatenation
var messageToPrint2 = `The price for your ${itemName} is ${price} dollars` // Interpolation
console.log(messageToPrint)
console.log(messageToPrint2)