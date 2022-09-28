import dayjs from "dayjs";
import mongoose from "mongoose";
const planetSchema = mongoose.Schema({
    location: {
        station: {type: String, required:true, index:true, uppercase:true},
        coord: {
            lon: {type:Number, required:true},
            lat: {type:Number, required:true},
        },
        
    },
    temperature: {type:Number, required:true},
    pressure: {type:Number, required:true},
    humidity: {type:Number, required:true},
    feelslike: {type:Number, required:true},
    uvIndex: {type:Number, required:true, min: 0, max:11},
    wind: {
        speed: {type:Number, required:true,},
        degree: {type:Number, required:true, min: 0, max: 359},
        direction: String,
    },
    clouds: {
        cloudcover: {type:Number, required:true, min:0, max:1},
    },
    observationDate: {type:Date, default:dayjs()},
    hexMatrix: [String, String, String, String]
},
{
    collection:'planets',
    strict:'throw',
    timestamps:true
});

export default mongoose.model('Planet', planetSchema);