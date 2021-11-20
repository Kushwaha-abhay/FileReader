const express = require("express");
const queryRouter = express.Router();
const {getTotalWordCount, getFrequentlyOccuringWord,getSentenceCount, getWordFreq} = require("../Controller/QueryController");


queryRouter.route("/wordCount").get(getTotalWordCount);
queryRouter.route("/frequentlyOccuring/:type").get(getFrequentlyOccuringWord);
queryRouter.route("/sentenceCount").get(getSentenceCount);
queryRouter.route("/wordFreq/:word").get(getWordFreq);


module.exports = queryRouter;