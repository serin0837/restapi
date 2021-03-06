# 1. What is a REST API?

- API : Application Programming Interface
- REST : REpresentaitional State Transfer
- API?

  - TV(application) - remote control(interface)
    - interaction is very human and you're actively and pressing buttons with your finger!
    - Application HUMAN interface
  - Youtube(application) - interface(series of endpoints)
    - instead of buttons(human interaction) this would be application programming interface
    - popular API: youtube, google, uber, twitter

- REST?

  - Architectual style of the web
  - A standard / set of guidelines by which we can structure and create API's
  - REST API's have identifiable properties

    - REST properties?

      - They make use of Resource-based URL's

        - example: http://www.football.com/scores, http://www.football.com/teams/arsenal
          (request for a resource, resource is the webpage with html, css and JS/ **get request url**
          http://www.football.com/api/scores, http://www.footvall.com/api/teames/aresenal
          return data(maybe jason data)

      - They Make use of HTTP Methods
        - GET,POST, PUT, DELETE
      - They make use of HTTP Status Codes
        - 200, 404, 500

# 2. install

- node, mongodb
- our setup
  mongoDB - Node.js(Express App) - front-end, mobile app, other website

# 3. HTTP Methods

- A way of telling the server what type of request we are making
  - POST ( Create a new ninja and store it)
  - GET ( Reading / retrieving a list of ninja)
  - PUT ( Edit an existing ninja)
  - DELETE ( Delete a ninja from the db)
- API Routes
  - Read/ Retrieve a list of ninjas
    - GET request to http://www.ninjago.com/api/ninjas
  - Create a new ninja
    - POST request to http://www.ninjago.com/api/ninjas
  - Updating an existing ninja
    - PUT request to http://www.ninjago.com/api/ninjas/id
  - Delete a ninja
    - Delete request to http://www.ninjago.com/api/ninjas/id

# 4. Creating an Express app

- `npm install express`
- create index.js
- set up express and listen

# 5. Handling Requests

- we send request to a server
- server then respond to the client

  ```js
  console.log("GET request"); //go to localhost:4000/ keep running and give me console.log because i did not put end and respond
  res.end(); // end server// not keep running

  res.send();
  ```

- handle request with methods, route, and callback function(req,res) and we send a response and send some data.
- example

  ````js
  // get request

    app.get("/api", function (req, res) {
    // listen for this get request in "/"/ how response?
    console.log("get request");
    res.send({ name: "Yoshi" }); // we want to put data here
    });
    ```
  ````

# 6. Creating Routes

- install nodemon
  `npm install nodemon -D nodemon`
- create routes folder and create api.js file
- set up routes with `app.use`

# 7. Handling POST Requests

- postman
- localhost:4000/api/ninjas
- body /raw/ json send data but can not see in postman because we did not handle with data that we send
- to do that we can use body parser(middleware)
- middleware?
  - request -> express app(route handlers<- middle ware: between request and response and code fired) -> response
  - body parser? look the body of the request and is going to take it, pass it and attach to the request object
  - body parser need to be first because it attach to the request object / if not we can not access to the body data
  - install body parser
    `npm install body-parser ` and put it in index.js
  - we can access req.body and we can use in response!!

# 8. Models & Schemas

- Model?
  - Model represent collections in MongoDB
  - user model to represent a collection of users
  - ninja model to represent a collection of ninjas
  - collections like series of data
- Schemas?
- Schemas define the structure of our data objects
- ex)
  {
  name:string,
  rank:string,
  availability:boolean  
  }
- install mongooses
  - mongoose?
    - adds a layer of methods to easily save, edit, retrieve and delete data from mongodb
    - allows us to create our models and schemas easily
    - `npm install mongooses`
    - create models folder and ninja.js file
    - set schemas
    - set model

# 9. Saving Data to MongoDB

- in index.js add mongoose
- connect with mongoDB
- change mongoDB to global Promise
- in api.js ` let ninja = new Ninja` and import Ninja
- ```js
  let ninja = new Ninja(req.body);
  ninja.save(); ///save to data base
  ```
  but instead we can do
  ```js
  Ninja.create(req.body);
  ```
  mongoose method create() : create a new instance and then save to database
- create method is promise so its going to take time and then !! we need to wait
- check in postman yay! i check with robomongo and I can see data is there
- in ninja.js -> without name its not go to data and have error, so valiadation is working! but in response we can not see anything, so we need something to handle error

# 10. Error handling

- we need to add another middleware to handle error
- add .catch in api.js
- next third parameter : if something is fail we going to catch next so I will go to next
- and in index make our own catch method

# 11. delete request

- check with console.log and postman
- we want to add mongoose method which is findByIdAndRemove();
- match with url id so i copy from mongodb and copy to my url and i can see ond data in postman
- and in mongodb data gone!!

# 12. put requests

- findByIdAndUpdate()
- what we want to update? need to add as second parameter req.body
- send changed name with postman
- in robomongo name has update but respond is same name
- why? send old ninja db
- so update db and send updated db so use findOne()
- but a lot of comment said that
  can put third parameter {new:true}

# 13. Geo JSON

- show ninja near by geo location
- geojson website copy structure and use ours
- 2dsphere?more accurate than 2d
- create new schema and put in ninja schema

# 14. Handling GET Requests

- post different ninjas with postman
- find(): find every ninjas

```js
Ninja.find({}).then(function (ninjas) {
  res.send(ninjas);
}); //find all ninja
```

- we want to find ninja which is near in geo
- so we can use URL params
  - can add on parameters in request URL's
  - ex) www.ninjago.com/api/ninjas?lng=50.45&lat=42.35
  - add geoNear() in api.js
  - geoNear said that it's a bit outdated so! change with one of comment one
  ```js
  Ninja.geoNear(
    {
      type: "Point",
      coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
    },
    { maxDistance: 100000, spherical: true } //100000m
    //in url number is string so we need to change to numnber
  );
  ```
  - check in postman with params key, value
  - not working!!

# 15. front end

- react
- add `app.use(express.static("public"));`
  going to serve static file and look for public folder
  and in url if we search localhost:4000/index.html we can see!

# 16. React

- a lot of issues so maybe not follow???
- I can only see empty array and can not do with my app.
