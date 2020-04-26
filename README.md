# Augusto Souza - 2017376 - IWACA2 2020
# Pisa-Italian Restaurant using NodeRestApi 


Create Routes for the REST API endpoint
The REST API that we build will have the following functions.
Method	Endpoints	Notes
GET	 /product	Get all products
GET	 /product/:id	Get single product
POST	 /product	Add product
PUT	 /product/:id	Update product
DELETE	 /product/:id	Delete product
To achieve that, add the javascript file to the routes folder.
touch routes/products.js
Open and edit routes/products.js then add these lines of codes.
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Product = require('../models/Product.js');

/* GET ALL PRODUCTS */
router.get('/', function(req, res, next) {
  Product.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  }).sort({cate:-1});
});

/* GET SINGLE PRODUCT BY ID */
router.get('/:id', function(req, res, next) {
  Product.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE PRODUCT */
router.post('/', function(req, res, next) {
  Product.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE PRODUCT */
router.put('/:id', function(req, res, next) {
  Product.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE PRODUCT */
router.delete('/:id', function(req, res, next) {
  Product.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
Next, open and edit app.js then add product route as require after users require.
var products = require('./routes/products');
Then add use after use of users.
app.use('/products', products);
 

Test REST API Endpoints
After everything is ready, this time to testing our created Node.js, Express.js, Mongoose.js and MongoDB REST API. There are so many tools for testing REST API, but for now, we are testing using CURL from the terminal.
We start with Add/Save product data first. Open a new terminal tab or windows then type this command.
curl -i -X POST -H "Content-Type: application/json" -d '{ "prod_name":"XBox One","prod_desc":"New Microsoft XBox One, the latest games console","prod_price": 520 }' localhost:3000/ api/v1/ products
If you get a response like below, then you save a new product successfully.
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 185
ETag: W/"b9-ymiFjoNdt5wABoii1CiYbg"
Date: Sun, 19 Feb 2017 03:30:35 GMT
Connection: keep-alive

{"__v":0,"prod_name":"XBox One","prod_desc":"New Microsoft XBox One, the latest games console","prod_price":520,"_id":"58a9115abed027087df7133b","updated_at":"2017-02-19T03:30:34.415Z"}
We can create the same POST with different data to populate more records to product collection.
curl -i -X POST -H "Content-Type: application/json" -d '{ "prod_name":"Sony PS 4","prod_desc":"Sony playstation 4","prod_price": 580 }' localhost:3000/ api/v1/ products
Next, we are testing to get all product data using this command.
curl -i -H "Accept: application/json" localhost:3000/ api/v1/ products
That command will response to products data with JSON format.
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 344
ETag: W/"158-V1WRYZrNC8yW7HFEfOSSew"
Date: Sun, 19 Feb 2017 03:34:26 GMT
Connection: keep-alive

[{"_id":"58a9115abed027087df7133b","prod_name":"XBox One","prod_desc":"New Microsoft XBox One, the latest games console","prod_price":520,"__v":0,"updated_at":"2017-02-19T03:30:34.415Z"},{"_id":"58a91204bed027087df7133c","prod_name":"Sony PS 4","prod_desc":"Sony playstation 4","prod_price":580,"__v":0,"updated_at":"2017-02-19T03:33:24.941Z"}]
Next, we are testing to get one product by id using this command.
curl -i -H "Accept: application/json" localhost:3000/api/v1/ products/58a91204bed027087df7133c
The response should be like this.
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 156
ETag: W/"9c-NYW3p4BkPVbiNf05Ezj+zA"
Date: Sun, 19 Feb 2017 03:45:48 GMT
Connection: keep-alive

{"_id":"58a91204bed027087df7133c","prod_name":"Sony PS 4","prod_desc":"Sony playstation 4","prod_price":580,"__v":0,"updated_at":"2017-02-19T03:33:24.941Z"}
Next, we are editing and update one of a product by id using this command. First, copy id from one of product from the response before then paste it as the parameter.
curl -i -X PUT -H "Content-Type: application/json" -d '{"prod_desc":"Microsoft XBox One"}' localhost:3000/ api/v1/ products/58a9115abed027087df7133b
It should response like this.
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 185
ETag: W/"b9-k9Wipgusc9JVZAMyHgjVXw"
Date: Sun, 19 Feb 2020 03:38:24 GMT
Connection: keep-alive

{"_id":"58a9115abed027087df7133b","prod_name":"XBox One","prod_desc":..
Finally, we are testing to delete one product by id using this command.
curl -i -X DELETE localhost:3000/ api/v1/ products/58a9115abed027087df7133b
It will response like this and the product with that id will be removed from product collection.
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: application/json; charset=utf-8
Content-Length: 155
ETag: W/"9b-pP1KXaQhyqcMkvBlLa6pFQ"
Date: Sun, 19 Feb 2020 03:41:54 GMT
Connection: keep-alive

{"_id":"58a9115abed027087df7133b","prod_name":"XBox One","prod_desc":"Microsoft XBox One","prod_price":520,"__v":0,"updated_at":"2017-02-19T03:30:34.415Z"}

