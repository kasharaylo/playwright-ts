// Loops

// for loop (for i loop)
for(let i=0; i<5; i++){
    console.log("Hello World! " + i)
}

// for of loop ES5 syntax
var cars = ["Volvo", "Toyota", "Mersedes"]

for(let car of cars){
    console.log("This is my car " + car)
    if(car == "Toyota"){
        break
    }
}

// ES6 syntax for each loop
cars.forEach( car =>{
    console.log("This is my car " + car)
})