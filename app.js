/*
~Total word count
`10 most/least frequently occurring words
~Number of occurrences of a particular word
~Total number of sentences
*/

const express = require("express");
const app = express();

const queryRouter = require("./Routers/QueryRouter");
//Create a readable stream
app.use("/api",queryRouter);


app.listen(3000, function () {
  console.log("server started at PORT 3000");
});

