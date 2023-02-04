const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const app = express ()
const port = 5000
let db

app.use(express.json())

mongoose
.connect(
    "mongodb+srv://fmcabalm:DqtkWYGtWMV8SB7e@cluster0.r7uuvfj.mongodb.net/sample_training?retryWrites=true&w=majority"
)
.then(() => {
    console.log('connect to Mongo Atlas')
    db = mongoose.connection.db
}
)

app.listen(port, () => {
   console.log(`Example app listening on port ${port}`)     
})


// creación de las API

app.get('/API1', async (req, res) => {
 try{
      const result = await db
     .collection ("companies")
      .find({email_address: {$regex: "@twitter.com"}})
        .limit(20)
       .toArray()
       return res.status(200).json({
            ok: true,
            data:result,
       })
    }   catch(error){
        console.log(error)
        res.status(400).json({
           ok: false,
            message: error.message,
        })    
 }  
})

app.get('/API2', async (req, res) => {
    try{
         const result = await db
        .collection ("companies")
         .find({
            founded_year: {
                $gte:2005,
                $lte:2008
            }})
           .limit(20)
          .toArray()
          return res.status(200).json({
               ok: true,
               data:result,
          })
       }   catch(error){
           console.log(error)
           res.status(400).json({
              ok: false,
               message: error.message,
           })    
    }  
   })

   app.get('/API3', async (req, res) => {
    try{
         const result = await db
        .collection ("companies")
         .find({
            name: {
                $eq:'Technorati'
                
            }})
           .limit(20)
          .toArray()
          return res.status(200).json({
               ok: true,
               data:result,
          })
       }   catch(error){
           console.log(error)
           res.status(400).json({
              ok: false,
               message: error.message,
           })    
    }  
   })

   app.get('/API4', async (req, res) => {
    try{
         const result = await db
        .collection ("companies")
         .find({ $and: [ { "category_code": {$eq: 'advertising'}}, { "founded_year": {$eq:2002}} ]})
           .limit(20)
          .toArray()
          return res.status(200).json({
               ok: true,
               data:result,
          })
       }   catch(error){
           console.log(error)
           res.status(400).json({
              ok: false,
               message: error.message,
           })    
    }  
   })

   app.get('/API5', async (req, res) => {
    try{
         const result = await db
        .collection ("companies")
         .find({ $or: [ { "category_code": {$eq: 'messaging'}}, { "category_code": {$eq:'games_video'}} ]})
         .sort({founded_year: 1})
           .limit(20)
          .toArray()
          return res.status(200).json({
               ok: true,
               data:result,
          })
       }   catch(error){
           console.log(error)
           res.status(400).json({
              ok: false,
               message: error.message,
           })    
    }  
   })

   app.get('/API6/:founded_year', async (req, res) => {
    try{
        let year= `${req.params.founded_year}`
         const result = await db
        .collection ("companies")
        
        .find({founded_year: {$eq:parseInt(year)}})         
        .limit(20)
        .toArray()
        return res.status(200).json({
               ok: true,
               data:result,
          })
       }   catch(error){
           console.log(error)
           res.status(400).json({
              ok: false,
               message: error.message,
           })    
    }  
   })

//    app.get('/api/companies', (req, res) => {
//     let foundedYear = req.query.foundedYear;
//     db.companies.find({
//         founded_year: parseInt(foundedYear)
//     }, (err, companies) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(companies);
//     });
// });