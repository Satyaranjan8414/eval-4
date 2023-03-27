const express = require("express");
const { PostModel } = require("../models/postModel");

const PostRoutes = express.Router();

PostRoutes.get("/", async (req, res, next) => {
  if (req.query) {
    try {
      const data = await PostModel.find(req.query);
      res.send(data);
    } catch (error) {
      res.send("No Posts found with given query");
    }
  } else next();
});

PostRoutes.get("/", async (req, res) => {
  const use = await PostModel.find();
  res.send(use);
});

PostRoutes.get("/top", async (req, res) => {
  try {
    const data = await PostModel.find({}).sort({ no_of_comments: -1 });
    res.send(data);
  } catch (error) {
    res.send("Error while getting posts !");
  }
});

PostRoutes.post("/add", async (req, res) => {
  const { title, body, device, no_of_comments, userId } = req.body;
  console.log(req.body);
  try {
    const new_user = new PostModel({
      title,
      body,
      device,
      no_of_comments,
      userId,
    });
    await new_user.save();
    res.send("created post successfully");
  } catch (error) {
    res.send("error occured while creating post");
  }
});

PostRoutes.delete("/delete/:post", async (req, res) => {
  const postid = req.params.post;
  try {
    await PostModel.findByIdAndDelete(postid);
    res.send("Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.send("Error occured whie Deleting the post");
  }
});

PostRoutes.patch("/update/:post", async (req, res) => {
  const postid = req.params.post;
  try {
    await PostModel.findByIdAndUpdate(postid, req.body);
    res.send("sending update req");
  } catch (error) {
    console.log(error);
    res.send("Error occured whie updating");
  }
});

module.exports = { PostRoutes };
