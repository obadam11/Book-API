const fetch = require('node-fetch');
const dotenv = require("dotenv");
const readline = require('readline');

dotenv.config();
const APIKey = process.env.GOOGLE_BOOKS_API_KEY;


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Search: ", (searchingString) => {
  fetch('https://www.googleapis.com/books/v1/volumes?q=' +  searchingString + ':keyes&key=' + APIKey)
  .then(response => response.json())
  .then(data => {
    representData(data);
  })
  .catch(err => console.log(err))

  rl.close();
})


const representData = (data) => {
    console.log("We found " + data.items.length + " books");
    console.log("The tiles and the authors of the books are the following: ");
    for (let i = 0; i < data.items.length; i++) {
        console.log("\n");
        console.log("Title: ", data.items[i].volumeInfo.title);

        if (data.items[i].volumeInfo.authors) {
            console.log("Author/s: ", ...data.items[i].volumeInfo.authors);
        }

        console.log("Book cover: ", data.items[i].volumeInfo.imageLinks.thumbnail);
    }
}

// fetch('https://www.googleapis.com/books/v1/volumes?q=' +  searchingString + ':keyes&key=AIzaSyBQd2F1Vk5IxLypfOlXG6LXKcPAVrYep3E')
//   .then(response => response.json())
//   .then(data => {
//     representData(data);
//   })
//   .catch(err => console.log(err))