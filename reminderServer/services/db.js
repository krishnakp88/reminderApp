const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost:27017/RemainderDB',{
    useNewUrlParser:true
})

const Event=mongoose.model('Event',{
    userId:Number,
    password:String,
    fname:String,
    ename:String,
    edate:String,
    event:[]
})

module.exports={
    Event
}