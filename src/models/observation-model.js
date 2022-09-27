import mongoose from "mongoose";
const planetSchema = mongoose.Schema({
    location: {
        station: {type: String, required:true},
        coord: {
            lon: {type:Number, required:true},
            lat: {type:Number, required:true},
        },
        
    },
    name : {type: String, required:true, unique: true},
    discoveredBy : {type: String, index:true},
    discoveryDate: Date,
    temperature : Number,
    satellites:[String],
    position: {
        x: {type:Number, required:true, min:-1000, max:1000},
        y: {type:Number, required:true, min:-1000, max:1000},
        z: {type:Number, required:true, min:-1000, max:1000},
    }
},
{
    collection:'planets',
    strict:'throw',
    timestamps:true
});

export default mongoose.model('Planet', planetSchema);