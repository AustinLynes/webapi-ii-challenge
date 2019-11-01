const express = require('express')
const router = express.Router()
const commentRouter = require('./comment-router')
const db = require('../data/db')

router.use('/', commentRouter)

router.get('/', (req, res) => {
    db.find()
        .then(post => {
            res.json(post)
        }).catch(() => {
            res.status(500).json({
                error: 'the post information could not be retrieved'
            })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
        .then(post => {
            res.json(post)
        }).catch(() => {
            res.status(500).json({
                errorMessage: 'the Post information could not be retrieved...'
            })
        })
})

router.post('/', (req, res) => {
    const post = req.body
    db.insert(post)
        .then(post => {
            if (!post) {
                res.status(400).json({ errorMessage: "Please Provide Title and Contents for the Post." })
            }
            res.status(201).json({ message: 'post created successfully!' })
        })
        .catch(() => {
            res.status(500).json({ error: 'there was an error while saving the post to the database' })
        })
})

router.put('/:id', (req, res) => {
    const _post = req.body
    const { id } = req.params
    db.findById(id)
        .then(post => {
            if (!post) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
            } else {
                db.update(id, _post)
                    .then(() => {
                        res.status(200).json(_post)
                    }).catch(() => {
                        res.status(500).json({ error: "The post information could not be modified." })
                    })

            }
        })
        .catch(() => {
            res.status(404).json({ error: "The post with the specified ID does not exist." })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
        .then(post => {
            if (!post) {
                res.status(500).json({
                    error: 'the post could not be removed.'
                })
            }
            else {
                db.remove(id).then(
                    res.json({message:'post has been deleted'})
                )
            }
        })
        .catch(() => {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        })
})

module.exports = router