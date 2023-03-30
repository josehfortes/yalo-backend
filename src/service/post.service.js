const axios = require('axios')
const { getUsers } = require('./user.service')

const POST_URL = `${process.env.MOCK_URL}/posts`

const getPosts = async () => {
  const { data } = await axios.get(POST_URL)
  return data
}

const getCommentsByPostId = async (postId) => {
  const { data } = await axios.get(`${POST_URL}/${postId}/comments`)
  return {
    postId,
    comments: data
  }
}

const getCommentsByPostList = async (postList) => {
  let promises = postList.map(({ id }) => (getCommentsByPostId(id)))
  return Promise.all(promises)
}

const mapPostUsersAndComments = (posts, users, comments) => {
  return posts.map((post) => ({
    ...post,
    user: users.find(({ id }) => id === post.userId),
    comments: comments.find(({ postId }) => postId === post.id).comments
  }))
}

const getPostsWithPagination = async (start, size) => {
  const posts = await getPosts()
  let filteredPosts = posts.splice(start, size)

  const users = await getUsers()
  const comments = await getCommentsByPostList(filteredPosts)

  filteredPosts = mapPostUsersAndComments(filteredPosts, users, comments)
  return filteredPosts
}

module.exports = {
  getPostsWithPagination
}