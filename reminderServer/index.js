const express = require("express")

const dataService = require("./services/dataService")

const cors=require('cors')

const app=express()

app.listen(3000,()=>{
    console.log("server started at 3000");
})

app.use(cors({
    origin:'http://localhost:4200'
}))

const jwt=require("jsonwebtoken")

app.use(express.json())


// const jwtMiddleware=(req,res,next)=>{
//   try{
//   const token=req.headers["x-access"]
//   const data=jwt.verify(token,'supersecretkey123')
//   req.currentUserId=data.cUsr
//   next()
//   }
// catch{
//   res.json({
//       statusCode:401,
//       status:false,
//       message:"plz log in"
//   })
// }
// }


app.post('/register',(req,res)=>{
  dataService.register(req.body.userId,req.body.password,req.body.fname).then(result=>{
    res.status(result.statusCode).json(result)
  })
})

app.post('/login',(req,res)=>{
  dataService.login(req.body.userId,req.body.password).then(result=>{
      res.status(result.statusCode).json(result)
  })
  })

  app.post('/addEvent',(req,res)=>{
    dataService.addEvent(req.body.ename,req.body.edate).then(result=>{
      res.status(result.statusCode).json(result)
    })
  })