const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const cors = require("cors");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "crudnode",
});
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/api/get", (req, res) => {
  const sqlSelect = "SELECT * FROM movie_reviews";
  db.query(sqlSelect, (err, result) => {
 
    res.send(result);
  });
});
app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReviews = req.body.ReviewName;
  const sqlInsert =
    "INSERT INTO movie_reviews (movieName, movieReviews) VALUES (?, ?);";

  db.query(sqlInsert, [movieName, movieReviews], (err, result) => {
      console.log("err",err)
  
  });
});
app.delete("/api/delete/:movieName", (req, res) => {
  const name = req.params.movieName;
  const sqlDelete = "DELETE FROM movie_reviews WHERE movieName=?";
  db.query(sqlDelete, name, (err, result) => {
 
  });
});
app.put("/api/update", (req, res) => {
  
  const name = req.body.movieName;
  const review = req.body.movieReviews;
  console.log("review",review)
  console.log("name",name)
  const sqlUpdate =
    "UPDATE movie_reviews SET movieReviews=? WHERE movieName =?";
  db.query(sqlUpdate, [review, name], (err, result) => {
    console.log("err", err);
  });
});

app.listen(3001, () => {
  console.log("running on port 3001");
});
