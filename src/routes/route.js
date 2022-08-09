const express = require('express');
const abc = require('../introduction/intro')
const router = express.Router();


router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
    abc.printName()
    logger.welcome()

    res.send('My second ever api!')
});

router.get('/students', function (req, res){
    let students = ['Sabiha', 'Neha', 'Akash']
    res.send(students)
})

//Aug09 Assignment

router.get('/sol1', function(req,res){
  arr=[1,2,3,5,6,7]
  // Given Array
let sumOfArraytotal=0 
//Creating Global variable bcz I want to acces this value from Globally
for (let i = 0; i < arr.length; i++){
    sumOfArraytotal+=arr[i]
    //ittreatting arr and adding each number/element
}
console.log("Sum of array P1-->",sumOfArraytotal)
//Console for test only
let missingNumber= (arr[arr.length-1]*(arr[arr.length-1]+1)/2)-sumOfArraytotal
//here N*(N+1)-S is going on 
console.log("Missing Number P1-->",missingNumber)
//Getting Error Note dont pass number to res.send() 
let missingNumber1=missingNumber.toString()
//Converting Number to string
res.send(missingNumber1)



})

router.get('/sol2',function(req,res){
    let arr=[33,34,35,37,38]
    //Given Array
    //Global variable
    let sumOfArray=0
    //Finding Sum of array
    for(i=0;i<arr.length;i++){
        sumOfArray+=arr[i]
        

    }
    console.log("Sum of given Array P2-->",sumOfArray)
    //Finding missing number
    //To do that need to do N element multiple by (first+Nth)/2
    let missingNumber= (arr.length+1)*(arr[0]+arr[arr.length-1])/2 -sumOfArray
    //Note adding plus +1 in length bcz one Number is missing 
    console.log("Missing number P2-->",missingNumber)
    // res.send(missingNumber)
    let missingNumber1= missingNumber.toString()
    //Converting Number to String Bcz res.send( ) dont acept number
    res.send(missingNumber1)
})


router.get('/student-details/:name', function(req, res){
    /*
    params is an attribute inside request that contains 
    dynamic values.
    This value comes from the request url in the form of an 
    object where key is the variable defined in code 
    and value is what is sent in the request
    */

    let requestParams = req.params

    // JSON strigify function helps to print an entire object
    // We can use any ways to print an object in Javascript, JSON stringify is one of them
    console.log("This is the request "+ JSON.stringify(requestParams))
    let studentName = requestParams.name
    console.log('Name of the student is ', studentName)
    
    res.send('Dummy response')
})

module.exports = router;