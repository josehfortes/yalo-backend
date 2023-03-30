const axios = require('axios')
const POST_URL = `${process.env.MOCK_URL}/users`

const getUsers = async () => {
  const { data } = await axios.get(POST_URL)
  return data
}

module.exports = {
  getUsers
}