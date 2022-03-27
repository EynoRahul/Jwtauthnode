//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String,required: true },
    price: { type:Number,required:true}, 
    size:{type:String,requires:true},
    image:{type:String,required:true},
},{timestamps:true});

export default mongoose.model('product',productSchema,'products');