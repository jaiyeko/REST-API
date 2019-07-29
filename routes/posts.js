const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

//GETS ALL POSTS IN FORM OF THE MODEL WE CREATED
router.get('/', async (req,res) => {
    try{
        const posts = await Post.find()
        res.json(posts)
    } catch(err) {
        res.json({ message: err })
    }
})

//POSTS TO MONGODB & RES WITH POST & CLG POST
router.post('/', async (req,res)=>{
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    })
    try{
       const savedPost = await post.save()
       res.json(savedPost)
       console.log(`${post.title} posted to mongoDB`)
    }
    catch (err){
        res.json({ message: "Enter correct format"})
    }
})

//FIND SPECIFIC POST
router.get('/:postId', async (req, res) => {
    try{
    const post = await Post.findById(req.params.postId)
    res.json(post)
    }catch(err){
        res.json({ message: "Cannot find specific post - post doesnt exist or incorrect id parsed" })
    }
})

//DELETE A SPECIFIC POST BY ID
router.delete('/:postId', async (req, res) => {
    try{
        const removedPost = await Post.remove({ _id: req.params.postId })
        res.json(`${req.params.postId} has been removed`)
    }catch(err){
        res.json({message: "Cannot remove post - post id either doesnt exists or has been wrong entered"})
    }
})

router.patch('/:postId', async (req, res) => {
    try{
        const updatedPost = await Post.updateMany(
            { _id: req.params.postId },
            { $set: { title: req.body.title }, $set: { description: req.body.description } },
            
        )
        res.json(updatedPost)
    }catch(err){
        res.json({ message: "Cannot patch post - either post id has been incorrectly entered or post doesnt exists" })
    }
})

module.exports = router