const algoliasearch = require("algoliasearch")
const client = algoliasearch("6WD57QQYHT", "830571740aff1b33d46043a34d8b3080");
const index  = client.initIndex("dev_Books");

//   index.saveObjects(data.books).then(({ objectIDs }) => {
//     console.log(objectIDs);
//   });
  index.saveObject({
    objectID: 'myId',
    firstname: 'Jimmie',
    lastname: 'Barninger'
  }).then(({ objectID }) => {
    console.log(objectID);
  });