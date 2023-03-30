const express = require('express')

const postService = require('../service/post.service')

const router = express.Router()

router.get('/:start/:size', async (req, res) => {
  try {
    const posts = await postService.getPostsWithPagination(Number(req.params.start), Number(req.params.size))

    res.json({ posts })
  } catch (err) {
    res.status(500).send()
    //res.statusCode(500).json(err)
  }
})

module.exports = router