const express = require('express');
const router = express.Router();

router.get('/students/:name', function(req, res) {
    let studentName = req.params.name
    console.log(studentName)
    res.send(studentName)
})

router.get("/random" , function(req, res) {
    res.send("hi there")
})


router.get("/test-api" , function(req, res) {
    res.send("hi FunctionUp")
})


router.get("/test-api-2" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API")
})


router.get("/test-api-3" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's ")
})


router.get("/test-api-4" , function(req, res) {
    res.send("hi FunctionUp. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})



router.get("/test-api-5" , function(req, res) {
    res.send("hi FunctionUp5. This is another cool API. And NOw i am bored of creating API's. PLZ STOP CREATING MORE API;s ")
})

router.get("/test-api-6" , function(req, res) {
    res.send({a:56, b: 45})
})

router.post("/test-post", function(req, res) {
    res.send([ 23, 45 , 6])
})


router.post("/test-post-2", function(req, res) {
    res.send(  { msg: "hi" , status: true }  )
})

router.post("/test-post-3", function(req, res) {
    let id = req.body.user
    let pwd= req.body.password

    console.log( id , pwd)

    console.log( req.body )

    res.send(  { msg: "hi" , status: true }  )
})



router.post("/test-post-4", function(req, res) {
    let arr= [ 12, "functionup"]
    let ele= req.body.element
    arr.push(ele)
    res.send(  { msg: arr , status: true }  )
})
//


//Assignment 10Aug2022--------------->
//----------------------------------------------
let players=[{"name":"manish",
            "dob":"1/1/1995",
            "gender":"male",
        "city":"jalandhar",
        "sports":["swwimming"]},
        {"name":"gopal",
        "dob":"1/09/1995",
        "gender":"male",
    "city":"delhi",
    "sports":["soccer"]},
    {"name":"lokesh",
    "dob":"1/1/1990",
    "gender":"male",
"city":"mumbai",
"sports":["soccerr"]}]
//Creating one flag globaly
let nameIsExist=false

router.post('/players', function (req, res) {
    let queryParams = req.body 
    //players data store inside of this variable which comming from body input
    
    for (i = 0; i < players.length; i++){
        if (players[i].name === queryParams.name) {
            //Accesing array of objects Dot method
            nameIsExist=true 
            break
        }  
    }
    if (nameIsExist) {
        //true
        res.send("Name is Exist")
    }
    else {
        //false
        players.push(queryParams)
        res.send(players)
        //res.send() function does not allow numeric numbers or undefine
    }
    //to see application is working fine or not 
    console.log("----------------new Output--------------------")
    console.log(players)

    

})
//------------------end----------------------------------


// let arr = [25, 45, 54, 67, 20183, 32]
// router.post('/filter', function (req, res) {
//     let input1 = req.query
    
// })

module.exports = router;