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

const create = async (newBlog) => {
  config = {
    headers: {Authorization: token}
  }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const updateBlog = async (newBlog) => {
  config = {
    headers: {Authorization: token}
  }

  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog, config)
  return response.data
}

const deleteBlog = async (id) => {
  config = {
    headers: {Authorization: token}
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data;
}

const blogService = { getAll, create, updateBlog, deleteBlog, setToken }
export default blogService