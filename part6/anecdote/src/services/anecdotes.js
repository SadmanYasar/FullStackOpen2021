import axios from 'axios';

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const result = await axios.post(baseURL, object)
    return result.data
}

const anecdoteService = { getAll, createNew }

export default anecdoteService
