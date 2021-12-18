import axios from 'axios'
const baseUrl = '/api/blogs'
let token
let config

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const blogService = { getAll, setToken }
export default blogService