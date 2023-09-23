import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

const app = express();
const port = 4000;

mongoose.connect('mongodb+srv://admin-xiaoyu:che717191@cluster0.kxkjui2.mongodb.net/blogDB');
const postSchema = new mongoose.Schema({
  id: Number,
  title: String,
  content: String,
  author: String,
  date: String
});

const Post = mongoose.model("Post", postSchema);


let lastId = 3;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Write your code here//
//CHALLENGE 1: GET All posts
app.get("/posts", (req, res) => {
  Post.find({})
  .then((postsInDB)=>{
      //mongoose.connection.close();
      //console.log("All posts :", postsInDB);
      res.json(postsInDB);
  })
  .catch((err)=>{
      console.log(err);
  });
});


//CHALLENGE 2: GET a specific post by id
app.get("/posts/:id", (req, res) => {
  const postID = parseInt(req.params.id);
  Post.findOne({id: postID})
  .then((postInDB)=>{
      //mongoose.connection.close();
      console.log("Found post: ", postInDB);
      res.json(postInDB);
  })
  .catch((err)=>{
      console.log(err);
  });
});


//CHALLENGE 3: POST a new post
app.post("/posts", (req, res)=> {
  Post.countDocuments({})  
  .then((countDoc)=>{
    //mongoose.connection.close();
    console.log("Number of posts :", countDoc);

    const newPost = new Post ({
      id: countDoc + 1,
      title: req.body.title,
      content: req.body.content,
      author: req.body.author,
      date: new Date(),
    });
    newPost.save();
    res.json(newPost);
})
  .catch((err)=>{
    console.log(err);
  });
});


//CHALLENGE 4: PATCH a post when you just want to update one parameter
app.patch("/posts/:id", (req, res) => {
  const postID = parseInt(req.params.id);
  Post.findOne({id: postID})
  .then((postInDB)=>{
    //mongoose.connection.close();
    console.log("Selected post to patch: ", postInDB);
    if (req.body.title) postInDB.title = req.body.title;
    if (req.body.content) postInDB.content = req.body.content;
    if (req.body.author) postInDB.author = req.body.author;
    postInDB.date = new Date();
    postInDB.save();
    res.json(postInDB);
  })
  .catch((err)=>{
      console.log(err);
  });
});


//CHALLENGE 5: DELETE a specific post by providing the post id.
app.delete("/posts/:id", (req, res) => {
  const postID = parseInt(req.params.id);
  if (postID > -1 ) {
    Post.deleteOne({id: postID})
    .then((postInDB)=>{
      //mongoose.connection.close();
      console.log("The post has been deleted:", postInDB);
      res.sendStatus(200);
    })
    .catch((err)=>{
        console.log(err);
    });
  } else {
    res
    .status(404)
    .json({ error: `Post with id: ${id} not found.` });;
  }
})

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
