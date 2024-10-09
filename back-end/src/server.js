import express from "express"
import { MongoClient } from "mongodb"
import path from "path"

async function Start (){
    const url = `mongodb+srv://mertkuldemir92:lr9WmI2k34tdffBO@cluster0.fpmji.mongodb.net/`
    const client = new MongoClient(url);

    await client.connect();
    const database = client.db("fsv-db")
    
    const app = express();
    app.use(express.json())

    app.use("/images",express.static(path.join(__dirname,"../assets")))
    
    async function populatedCartIds(ids){
        return Promise.all (ids.map(id=>database.collection("products").findOne({id})))
    }
    
    app.get("/api/products",async(req,res)=>{
        const products = await database.collection("products").find({}).toArray()
        res.json(products);
    })
    
    app.get("/api/products/:productId",async (req,res)=>{
        const product = await database.collection("products").findOne({id : req.params.productId})
        res.json(product);
    })
    
    app.get("/api/users/:userId/cart",async(req,res)=>{
        const user = await database.collection("users").findOne({id : req.params.userId})
        const populatedCart = await populatedCartIds(user.cartItems);
        res.json(populatedCart)
    })
    
    app.post("/api/users/:userId/cart",async(req,res)=>{   
        const productId = req.body.id
        const userId= req.params.userId
       
        // const existingUser = await database.collection("users").findOne({id:userId});

        // if(!existingUser){
        //     await database.collection("users").insertOne({id:userId,cartItems:[]})
        // }

        await database.collection("users").updateOne({id:userId},{
            $addToSet:{cartItems:productId}
        })
        const user = await database.collection("users").findOne({id : req.params.userId})
        const populatedCart = await populatedCartIds(user.cartItems);
        res.json(populatedCart)
    })
    
    app.delete("/api/users/:userId/cart/:productId",async (req,res)=>{
        const productId = req.params.productId
        const userId= req.params.userId
        await database.collection("users").updateOne({id:userId},{
            $pull:{cartItems:productId}
        })
        const user = await database.collection("users").findOne({id : req.params.userId})
        const populatedCart = await populatedCartIds(user.cartItems);
        res.json(populatedCart)
    })
    
    const port = 3000;
    
    app.listen(port,()=>{
        console.log(`Server is listening on port ${port}`)
    })   
}

Start();
