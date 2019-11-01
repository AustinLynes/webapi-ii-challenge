const express = require('express')
const router = express.Router()
const db = require('../data/db')

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    db.findPostComments(id)
        .then(post => {
            if (!post) {
                res.status(500).json({
                    message: 'there was a error while retrivng the Post data '
                })
            } else {
                res.status(200).json(post)
            }
        })
        .catch(() => {
            res.status(404).json({ errorMessage: 'the post with the specified id Does not exist' })
        })
})

router.post('/:id/comments', (req, res) => {
    const _comment = req.body
    const {id} = req.params
    db.findCommentById(id)
    .then(post=>{
        if(!post){
            res.status(400).json({
                message: 'there was a error while retrivng the Post data '
            })
        }else{
            db.insertComment(_comment)
            .then(()=>{
                res.status(201).json(_comment)
            }).catch(()=>{
                res.status(500).json({ error: "There was an error while saving the comment to the database" })
            })
        }
    })
    .catch(()=>{
        res.status(404).json({errorMessage: 'the post with the specified id Does not exist' })
    })
})

module.exports = router