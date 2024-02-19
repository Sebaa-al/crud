const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product.model.js')

const app = express();

app.use(express.json());


app.get('/', (req,res) => {
    res.send('hello from Node API server')
});

app.get('/api/products', async (req,res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.get('/api/product/:id', async (req,res) => {
    try {
        const { id }  = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.post('/api/products', async (req,res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


app.put('/api/product/:id', async (req,res) => {
    try {
        const { id }  = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message:'Product not found'})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

app.delete('/api/product/:id', async (req, res) => {
    
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!Product){
            res.status(404).json({message: 'Product Not Found'});
        }   
        res.status(200).json('Product Delted Succesfully');
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

mongoose.connect('mongodb+srv://sumonsky:FyZrrvrmOobXkYoT@backenddb.jvy9rl8.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(() => {
    console.log('connected to database');
    app.listen(3000, () => {
        console.log('server is running on port 3000');
    });
})
.catch(() => {
    console.log('connection failed');
});