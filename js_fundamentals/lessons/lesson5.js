var ageIsMoreThanEighteen = true
var isUSCitizen = false

// Logical "AND" 
console.log(true && true) // all values have to be TRUE for expresion to be TRUE

var eligibilityForDriverLicense = ageIsMoreThanEighteen && isUSCitizen
console.log('This customer is eligibele for DL: ' + eligibilityForDriverLicense)

// Logical "OR"
console.log(true || false) // any value should to be TRUE for the expresion to be TRUE

var eligibilityForDriverLicense = ageIsMoreThanEighteen || isUSCitizen
console.log('This customer is eligibele for DL: ' + eligibilityForDriverLicense)

// Logical "NOT"
console.log(!true)
console.log(!false)
console.log(6 !== 10)