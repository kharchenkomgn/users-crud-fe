const url = 'http://localhost:8080'
const prefix = `${url}/api/`

export const apiMap = {
  getAllUsers: {
    url: `${prefix}users`,
    method: 'get',
  },
  getUserDetails: {
    url: `${prefix}user`,
    method: 'get',
  },
  addUser: {
    url: `${prefix}user`,
    method: 'post',
  },
  updateUser: {
    url: `${prefix}user`,
    method: 'put',
  },
}
