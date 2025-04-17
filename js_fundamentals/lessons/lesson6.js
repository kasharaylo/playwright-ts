// Conditional Statements

/* if(condition){
    //execute some code here
} else {
    //execute some code here
} */

// If hour between 6 and 12 print "Good Morning"
// If hour between 12 and 18 print "Good Afternoon"
// Ohterwise: "Good Evening"

var hour = 18

if(hour >= 6 && hour < 12){
    console.log("Good Morning")
} else if (hour >=12 && hour < 18){
    console.log("Good Afternoon")
} else {
    console.log("Good Evening")
}

var ageIsMoreThanEighteen = false
var isUSCitizen = true

if(ageIsMoreThanEighteen && isUSCitizen){
    console.log("You have your license")
} else {
    console.log("You DO NOT have your license")
}