const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use('/api/products', productRoute)

app.get('/', (req,res) => {
    res.send('hello from Node API server')
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