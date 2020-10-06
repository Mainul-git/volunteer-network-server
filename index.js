
const express = require('express')
const bodyParser= require('body-parser')
const cors=require('cors');
const  ObjectId = require('mongodb').ObjectId;
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config()




const uri = `mongodb+srv://Mau:hungry@cluster0.wwsul.mongodb.net/volunteerAssign?retryWrites=true&w=majority`;
const app = express()


app.use(bodyParser.json())
 app.use(cors())



const port = 9000



const client = new MongoClient(uri, { useNewUrlParser: true,useUnifiedTopology: true });
client.connect(err => {
  const volunteerTasks = client.db("volunteerAssign").collection("volunteerRepeat");
  const userDetail = client.db("volunteerAssign").collection("information");

app.post('/addVolunteer',(req,res)=>{
  const detail=req.body
  userDetail.insertOne(detail)
  .then(result=>{
    res.send(result.insertedCount>0)
  })
  console.log()
})

app.get('/getVolunteer',(req,res)=>{
        volunteerTasks.find({})
        .toArray((err,documents)=>{
          res.send(documents)
        })
      })
//   perform actions on the collection object
app.get('/getVolunteerInfo',(req,res)=>{
    userDetail.find({email:req.query.email})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
  app.get('/getVolunteerInfos',(req,res)=>{
    userDetail.find({})
    .toArray((err,documents)=>{
      res.send(documents)
    })
  })
  app.delete('/deleteItem/:id',(req,res)=>{
    userDetail.deleteOne({_id:ObjectId(req.params.id)})
    .then(result=>{
      res.send( result.deletedCount > 0);
    })
  


  })
});



app.listen(port)