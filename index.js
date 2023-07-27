// const express = require("express");
import express from 'express';
import { MongoClient } from 'mongodb';
import cors from 'cors';
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import bodyParser from 'body-parser';
import morgan from 'morgan';

// const MONGO_URL = "mongodb://127.0.0.1:27017"
const MONGO_URL = "mongodb+srv://alokkushwaha96300:Alok2000@cluster0.ztxbbuz.mongodb.net/ishop"


const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: "*"
}));

const salt = 10;

async function connectMongoDB() {
    const client = new MongoClient(MONGO_URL)
    await client.connect();
    console.log("Mongo Connected");
    return client;
}

const client = await connectMongoDB();

app.get('/', (req, res) => {
    res.send("Home")
})
const auth = (req,res,next)=>{
    try{
        const token=req.header('x-auth-token');
        jwt.verify(token, "MYSECRETKEY");
        console.log(token)
        next();

    }
    catch(err){
        res.send({err:err.message})

    }

}

app.get("/mobiles", async (req, res) => {
    const mobiles = await client
        .db("ishop")
        .collection("mobiles")
        .find().toArray();

    res.send(mobiles)


})


app.get("/cart", async (req, res) => {
    const mobiles = await client
        .db("ishop")
        .collection("cart")
        .find().toArray();

    res.send(mobiles)


})

app.post("/mobiles", async (req, res) => {
    const mobilesdata = req.body;
    const result = await client
        .db("ishop")
        .collection("mobiles")
        .insertMany(mobilesdata);
    res.send(result)
})


app.put('/cart', async (req, res) => {
    const mobile = req.body;
    const { type } = req.query;
    const itemExist = await client
        .db("ishop")
        .collection("cart")
        .findOne({ _id: mobile._id });

    if (itemExist) {
        if (type === "decrement" && itemExist.qty <= 1) {
          await client
                .db("ishop")
                .collection("cart")
                .deleteOne({ _id: mobile._id });
                
        }
        else {
            await client
                .db("ishop")
                .collection("cart")
                .updateOne({ _id: mobile._id }, { $inc: { qty: type === "increment" ? +1 : -1 } });
          



        }
    }
    else {
       await client
            .db("ishop")
            .collection("cart")
            .insertOne({...mobile, qty:1});
       
    }
    const allCart = await client
    .db("ishop")
    .collection("cart")
    .find()
    .toArray();

    res.send(allCart)


})

app.post('/signup', async (req,res)=>{

    const {fname,lname,email,password} = req.body.body;
    console.log(fname)
    console.log(req.body)
    console.log(password)
    
    const isUserExist = await client
    .db("ishop")
    .collection("signupdetail")
    .findOne({email});

    if(isUserExist){
        res.status(400).send({msg:"user Already Exist"});
        return;
    }
    else{
        const hashpass = await bcrypt.hash(password, salt)
        
        console.log("inside else")

        const storedata = await client.db("ishop")
    .collection("signupdetail")
    .insertOne({fname : fname,lname:lname,email:email,password:hashpass});
    res.send(storedata)
         
    }

} )

app.post('/login', async (req,res)=>{

    const {email,password} = req.body.body;
    
    const isUserExist = await client
    .db("ishop")
    .collection("signupdetail")
    .findOne({email});

    if(!isUserExist){
        res.status(400).send({msg:"Invalid Credential"});

        return;
    }
    const passmatch = await bcrypt.compare(password,isUserExist.password)

    if(!passmatch){
        res.status(400).send({msg:"Invalid Password Credential"});

        return;
    }

    const token=jwt.sign({id:isUserExist._id},"MYSECRETKEY");
    res.send({msg:"Login Success", token})


    

})




app.listen(9000, () => {
    console.log("Server Running")
})
