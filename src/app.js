const express = require('express')

const app = express()

//Orderof the route matters
// app.use will match al HTTP method calls
// app.get/post use for specific method

// request handler "/"

        // app.use("/hello/2", (req, res)=>{
        //     res.send("Hello from hello/2")
        // })

        // app.use("/hello",(req,res)=>{
        //     res.send("Hello route")
        // })


        // app.use("/test",(req, res)=>{
        //     res.send("Hello from test")
        // })
        // //request handler, "/hello" is an route
        // app.use("/hello",(req, res)=>{
        //     res.send("Namaste nodemon att post 7777")
        // })

        // app.use("/",(req, res)=>{
        //     res.send("Default route with /")
        // })


        // order matters, carefull on this.

    // app.use("/users", (req, res)=>{
    //     res.send("HAHAHAHAHAHA")
    // })

    // //GET users method
    //         app.get("/users", (req, res)=>{
    //             res.send({firstName: "Prashant", lname:"Kumbar"})
    //         })

    // // POST method
    //         app.post("/users", (req, res)=>{
    //             res.send("data saved successfully")
    //         })

    // //DELETE method
    //         app.delete("/users", (req, res)=>{
    //             res.send("data deleted successfully")
    //         })

// regular expression patterns:

        app.get("/users/:userID",(req, res)=>{
            console.log(req.params)
            res.send("Pattern testing successfull")
        })

//listen to the port
app.listen(7777, ()=>{
    console.log("Server is successfully listening on port num 7777")
})