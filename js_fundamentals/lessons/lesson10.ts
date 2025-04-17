// You can assign data type to variables
var customerFirstName: string = "John"
var customerLastName: string = "Smith"
var customerAge: number = 25

// You can create your own data type and pass data types in your varible arguments
type Customer = {firstName: string, lastName: string, active: boolean}

var firstCustomer: Customer = {
    firstName: "Mary",
    lastName: "Johns",
    active: true
}

console.log(firstCustomer)
