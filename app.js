const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Listing = require("./models/listing");
mongoose
  .connect("mongodb://127.0.0.1:27017/airBnb")
  .then((res) => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({ extended: true }));
app.listen(8080, () => {
  console.log("server started");
});
app.get("/", (req, res) => {
  console.log("root path");
});

//*index route
app.get("/listing", async (req, res) => {
  let data = await Listing.find({});
  res.render("index.ejs", { data });
});

//*add route
app.post("/listing", (req, res) => {
  let { title, discription, price, location, country } = req.body;
  let newList = new Listing({
    title: title,
    discription: discription,
    price: price,
    location: location,
    country: country,
  });
  newList
    .save()
    .then(() => {
      console.log("data saved");
      res.redirect("index.ejs")
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/listing/new", (req, res) => {
  res.render("new.ejs");
});
//*show route
app.get("/listing/:id/show", async (req, res) => {
  let { id } = req.params;
  let data = await Listing.findById(id);
  res.render("show.ejs", { data });
});

// app.get("/sampleListing",async (req,res)=>{
//     let sampleData = new Listing({
//         title:"home sweet home",
//         description:"beach view",
//         price:1200,
//         location:"goa",
//         country:"india"
//     })

//     await sampleData.save()
//     console.log("sample data is created");
// })
