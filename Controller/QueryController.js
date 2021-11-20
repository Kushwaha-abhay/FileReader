const fs = require("fs");
const file = "Input.txt";


//http://localhost:3000/WordCount
function getTotalWordCount(req, res) {
  let wordCount = 0;
  const readerStream = fs.createReadStream(file);
  readerStream.setEncoding("UTF8"); // Set the encoding to be utf8.
  readerStream.on("data", function (chunk) {
    //counting the number of words per chunk
    wordCount += chunk.split(" ").length;
  });

  readerStream.on("end", function () {
    res.status(200).send("count= " + wordCount);
  });

  readerStream.on("error", function (err) {
    console.log(err.stack);
  });
}

//http://localhost:3000/frequentlyOccuring/most
//http://localhost:3000/frequentlyOccuring/least
function getFrequentlyOccuringWord(req,res)
{
  let {type} = req.params;
  let map = {};
  let keys = [];
  const readerStream = fs.createReadStream(file);
  readerStream.setEncoding("UTF8"); // Set the encoding to be utf8.
  readerStream.on("data", function (chunk) {
    
    let chunkWordArray = chunk.split(" ");
    //getting frequency of each word per chunk
    map = getfrequencyMap(chunkWordArray, map);
  });

  readerStream.on("end", function () {
    //getting words sorted on thier frequencies
    keys = getFreqWord(map);

    if (type.toLowerCase() == "least") {
      //last 10 items in array will be least frequent words   
      keys = keys.slice(keys.length - 10, keys.length);
      res.status(200).send(keys.toString());
    } else if (type.toLowerCase() == "most") {
      //first 10 items in array will be most frequent words 
      keys = keys.slice(0, 10);
      res.status(200).send(keys.toString());
    } else 
        res.status(200).status("Incorrect parameter");
});
readerStream.on("error", function (err) {
    console.log(err.stack);
  });
}

//Creating frequency map
function getfrequencyMap(arr, map) {
    for (let i = 0; i < arr.length; i++) {
      if (map[arr[i]]) {
        map[arr[i]]++;
      } else {
        map[arr[i]] = 1;
      }
    }
    return map;
  }
//sorting words by thier frequencies
function getFreqWord(map) {
    let keys = [];
    for (let i in map) {
      keys.push(i);
    }
    keys = keys.sort((a, b) => {
      if (map[a] === map[b]) {
        if (a > b) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return map[b] - map[a];
      }
    });
    return keys;
  }

//http://localhost:3000/wordfreq/a
function getWordFreq(req,res){
    let {word} = req.params;
    let freq = 0;
    const readerStream = fs.createReadStream(file);
    readerStream.setEncoding("UTF8"); // Set the encoding to be utf8.
    readerStream.on("data", function (chunk) {
      
      let chunkWord = chunk.split(" ");
      //checking words per chunk matching with queried word
      for (let item of chunkWord) {
        if (word.toLowerCase() == item.toLowerCase()) 
            freq++;
      }
    });
    readerStream.on("end", function () {
      
      res.status(200).send(`frequency of ${word} is ${freq}`);
    });
  
    readerStream.on("error", function (err) {
      console.log(err.stack);
    });
  }
//http://localhost:3000/SentenceCount
function getSentenceCount(req,res){
    let sentenceCount = 0;
  const readerStream = fs.createReadStream(file);
  readerStream.setEncoding("UTF8"); // Set the encoding to be utf8.
  readerStream.on("data", function (chunk) {
    
    sentenceCount += chunk.split(".").length;
  });

  readerStream.on("end", function () {
    
    sentenceCount -= 1;
    
    res.status(200).send("Sentence count = " + sentenceCount);
  });

  readerStream.on("error", function (err) {
    console.log(err.stack);
  });
}


module.exports.getFrequentlyOccuringWord = getFrequentlyOccuringWord;
module.exports.getTotalWordCount = getTotalWordCount;
module.exports.getWordFreq = getWordFreq;
module.exports.getSentenceCount = getSentenceCount;