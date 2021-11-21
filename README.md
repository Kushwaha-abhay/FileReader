# FileReader

Componenets used
- Express
- fs

To get the Node server running locally:
- Clone the repository to local folder.

- `npm install` to install all required dependencies from package.json:
    ```bash
    $ npm install
    ```
- `app.js` to start the local server at 3000 port:
    ```bash
    $ node app.js
    ```
    
# API usage
 - http://localhost:3000/api/WordCount -> To get the total word count of the file
 - http://localhost:3000/api/wordfreq/abc -> To get the frequency of word `abc` in file
 - http://localhost:3000/api/SentenceCount -> To get the total sentence count in the file
 - http://localhost:3000/api/frequentlyOccuring/most -> To get the 10 most frequently occuring words in the file
 - http://localhost:3000/api/frequentlyOccuring/least -> To get the 10 least frequently occuring words in the file
      
    
    
