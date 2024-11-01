const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");


app.use(bodyParser.json())

app.post('/getResponse', (req, res) => {
    console.log(req.body.question)
    // Make sure to include these imports:
    // import { GoogleGenerativeAI } from "@google/generative-ai";
    const genAI = new GoogleGenerativeAI('AIzaSyA7J31BU8esdP9eNN6g2Iy0JVuS4ye0HSc');
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    model.generateContent(req.body.question).then(result=>{
        console.log(result.response.text());
        const response = result.response.text();
        res.status(200).json({
            response:response
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    })
})

app.get('*',()=>{
    res.status(404).json({
        msg:'bad request'
    })
})



module.exports = app;