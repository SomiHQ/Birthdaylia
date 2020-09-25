
const express = require("express");
const bodyParser =  require("body-parser");
const request = require("request");
const https = require ("https");


const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({entended: true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
const firstName =  req.body.fName;
const lastName = req.body.lName;
const email = req.body.email;
const bDay = req.body.cDay;

const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName,
        BIRTHDAY: bDay,
      }

    }
  ]
};

const jsonData = JSON.stringify(data);
const url = "https://us2.api.mailchimp.com/3.0/lists/ed62d31a21";

const options = {
  method: "POST",
  auth: "Somi1:82fcf61e34001c0fe96886675af11683-us2"
}

const request = https.request(url, options, function(response) {

  if (response.statusCode === 200) {
    res.sendFile(__dirname + "/success.html" );
  } else {
    res.sendFile(__dirname + "/failure.html");
  }

  response.on("data", function(data) {
    console.log(JSON.parse(data));
  })
})

request.write(jsonData);
request.end();

});


app.post("/failure", function(req, res) {
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000!!")
});



// API KEY
// 82fcf61e34001c0fe96886675af11683-us2

// LIST ID
// ed62d31a21
