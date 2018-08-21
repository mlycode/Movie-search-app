var express = require("express"),
    app     = express(),
    request = require("request"),
    bodyParser = require("body-parser");

//APP CONFIG
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

//ROUTES

//index/new search form
app.get("/", function(req, res){
    res.render("home");
});

//show search result
app.get("/results", function(req, res){
    var movieTitle = req.query.movieSearch;
    request("http://www.omdbapi.com/?s=" + movieTitle + "&apikey=thewdb", function(error, response, body){
        if(error){
            console.log(error);
            res.redirect("back");
        } else {
            var data = JSON.parse(body);
            res.render("results", {data: data});
        }
    });
});

//movie id show
app.get("/results/:id", function(req, res){
    var movieID = req.params.id;
    request("http://www.omdbapi.com/?i=" + movieID + "&plot=full&apikey=thewdb", function(error, response, body){
        if(error){
            console.log(error);
            res.redirect("back");
        } else {
            var showData = JSON.parse(body);
            res.render("show", {showData: showData});
        }
    });
});






app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Movie App has started");
});