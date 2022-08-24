const express= require("express");
const bodyParser = require("body-parser");
const https = require("https");
const request = require("request");
const app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){

  const email = req.body.Email;
  const firstName = req.body.FirstName;
  const lastName = req.body.LastName;

  const data ={
  members:[
    {
      email_address:email,
      status:"subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }

    }
  ]
};
  const jsonData = JSON.stringify(data);

  const url = "https://us8.api.mailchimp.com/3.0/lists/fd9b96adb4";

  const options = {
    method : "POST",
    auth : "Tawseef:e51c6f57db36a31f28b83e6f4211bc66-us8"
  }

  const request = https.request(url,options,function(response){
  const server_res = response.statusCode;
  console.log(server_res);
  if(server_res===200){
    res.sendFile(__dirname+"/success.html");
  }
  else{
    res.sendFile(__dirname+"/failure.html");
  }

      response.on("data",function(data){
    // console.log(JSON.parse(data));

    })
  })
  request.write(jsonData);
  request.end();


});
app.get("/failure.html",function(req,res){
  res.sendFile(__dirname+"/failure.html");
})
app.get("/success.html",function(req,res){
  res.sendFile(__dirname+"/success.html");
})
app.post("/failure.html",function(req,res){
  res.redirect("/");
})
app.post("/success.html",function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT||3000,function(req,res){
  console.log("Server is running on port 3000");
})


// e51c6f57db36a31f28b83e6f4211bc66-us8 api-key
// fd9b96adb4. audience id
