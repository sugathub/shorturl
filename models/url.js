const mongoose = require("mongoose");

const urlSchema = new mongoosePopulatedDocumentMarker.urlSchema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    redirectURl:{
        type:Sting,
        required: true,
    },
    vistHistory:[{timetamp:{type:Number}}],
    timestamp:true
});

const Url = mongoose.model("url",urlSchema);

module.exports = URL;