const express = require("express");
const router = express.Router();

const db = require("../config/db");

router.post("/", (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const image = req.body.image;
  const author = req.body.author;

  db.query(
    "INSERT INTO uploads (title, description, image, author) VALUES (?, ?, ?, ?);",
    [title, description, image, author],
    (err, results) => {
      console.log(err);
      res.send(results);
    }
  );
});

router.get("/", (req, res) => {
  db.query("SELECT * FROM uploads", (err, results) => {
    if (err) {
      console.log(err);
    }
    res.send(results);
  });
});

router.get("/byUser", (req, res) => {
  const userName = req.params.username;
  const userLinkDonation = req.params.link_donation;
  db.query(
    "SELECT * FROM users WHERE link_donation = ?;",
    userName,userLinkDonation,
    (err, results) => {
      if (err) {
        console.log(err);
      }
      res.send(results);
    }
  );
});

router.post("/like", (req, res) => {
  const userLiking = req.body.userLiking;
  const postId = req.body.postId;

  db.query(
    "INSERT INTO likes (userLiking, postid) VALUES (?,?)",
    [userLiking, postId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      db.query(
        "UPDATE uploads SET likes = likes + 1 WHERE id = ?",
        postId,
        (err2, results2) => {
          res.send(results);
        }
      );
    }
  );
});

module.exports = router;