// Objects and Arrays

var customer = {
    firstName: "Jonh",
    lastName: "Smith",
    cars: ["Volvo", "Toyota", "Mersedes"]
}

// Change values of the object
customer.lastName = 'Mike'
customer['lastName'] = "Silver"

// Dot Notation
console.log(customer.firstName)
console.log(customer.lastName)

// Bracket notation
console.log(customer['lastName'])

// Interpolation notation
console.log(`${customer.firstName} ${customer.lastName}`)


// Arrays
var cars = ["Volvo", "Toyota", "Mersedes"]
cars[0] = "BMW"
console.log(cars[0])

console.log(customer.cars[0])