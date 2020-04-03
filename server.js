const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require("cors");

const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use('/graphql',expressGraphQL({
    schema:schema,
    graphiql:true
}))


mongoose.connect('mongodb://localhost:27017/graphql-pra').then(
    ()=>{
        app.listen(4000,()=>{
            console.log('Listening port 4000')
        })
    }
    ).catch(err=>console.log(err))
    
    