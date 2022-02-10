const jwt = require('jsonwebtoken')

const db=require('./db')

events={
    1:{userId:1,password:"1111",ename:"Holi",edate:"01/01/21",fname:"Abi",event:[]},
    2:{userId:2,password:"2222",ename:"Pongal",edate:"02/02/22",fname:"Lal",event:[]},
    3:{userId:3,password:"3333",ename:"BhaiThuj",edate:"03/03/22",fname:"Pappu",event:[]}
  }

const register=(userId,password,fname)=>{
    return db.Event.findOne({userId}).then(user=>{
        console.log(user)
        if(user){
          return{
            statusCode:401,
              status:false,
              message:"Account already exists...login please!!!"
          }
        }
            else{
              const newUser= new db.Event({
              userId,
              password,
              fname,
              event:[]
              })
              newUser.save()
              return{
                statusCode:200,
                  status:true,
                  message:"Account successfully created!!!"
              }
            }
            
          })
        }
        
        const login=(userId,password)=>{

    return db.Event.findOne({userId,password}).then(user=>{
      if(user){
        currentUid=userId
        currentUserName=user.fname
        //token generation
        const token=jwt.sign({cUsr:userId},"supersecretkey123")
        return{
          statusCode:200,
          status:true,
          message:"login successfully",
          currentUid,
          currentUserName,
          token
      }
      }
      else{
        return {
          statusCode:401,
          status:false,
          message:"Invalid credentials"
      }
      }
    })
  }
  // const addEvent=(ename,edate)=>{
  //   var amount=parseInt(amt)
  //   return db.Event.findOne({
  //     ename,
  //     edate
  //   }).then(user=>{
  //     if(user){
  //     user.ename=user.ename+amount
  //     user.transaction.push({
  //       amount:amount,
  //       type:"CREDIT"
  //     })
  //     user.save()
  //     return{
  //       statusCode:200,
  //         status:true,
  //         message:amt+" credited. New balance is :"+ user.balance
  //     }
  //   }
  //     return{
  //       statusCode:401,
  //       status:false,
  //       message:"Invalid credentials"
  //     }
  //   })
  // }



  const addEvent=(ename,edate)=>{

    return db.Event.findOne({ename,edate}).then(user=>{
      console.log(user)
      if(user){
        return{
          statusCode:401,
            status:false,
            message:"Event Already there..please try to add new!!!"
        }
      }
      else
      {
        const newUser= new db.Event({
        ename,
        edate,
        event:[]
        })
        newUser.save()
        newUser.event.push({
          Eventname:ename,
          Eventdate:edate
        })
        return{
          statusCode:200,
            status:true,
            message:"Event Added Succcesfully!!!"
        }
      }
      
    })
  }
        module.exports={
          register,
          login,
          addEvent
        }