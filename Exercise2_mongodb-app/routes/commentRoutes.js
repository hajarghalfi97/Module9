let express = require("express");
let router = express.Router();
let Controllers = require("../controllers"); //index.js

router.get("/", (req, res) => {
    Controllers.commentController.getComments(res);
});

router.post("/create", (req, res) => {
    Controllers.commentController.createComment(req.body, res);
});

router.put('/:id', (req, res) => {
    Controllers.commentController.updateComment(req, res);
})

router.delete('/:id', (req, res) => {
    Controllers.commentController.deleteComment(req, res);
})

router.get('/post/:pid', (req, res) => { // dynamic param to get comments for post
    Controllers.commentController.getPostComments(req, res);
})

module.exports = router;
