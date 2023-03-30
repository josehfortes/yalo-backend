const { getUsers } = require('./user.service')

const axios = require('axios')
jest.mock('axios')

describe(`getUsers`, () => {
  test(`should call axios users url`, () => {
    const usersMock = [{
      userId: 1
    }]

    axios.get.mockResolvedValueOnce(usersMock)
    getUsers()
    console.log(axios.get)

    expect(axios.get).toHaveLength(1)
  })
})

