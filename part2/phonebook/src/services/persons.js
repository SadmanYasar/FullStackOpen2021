import axios from 'axios'
const url = '/api/persons'

const getAll = () => {
    const request = axios.get(url)
    return request.then((response) => response.data)
}

const create = (PersonObject) => {
    const request = axios.post(url, PersonObject)
    return request.then((response) => response.data)
}

const update = (id, updateObject) => {
    const request = axios.put(`${url}/${id}`, updateObject)
    return request.then((response) => response.data)
}

const makeDelete = (id) => {
    const request = axios.delete(`${url}/${id}`)
    return request.then((response) => response.data)
}

const modules = {getAll, create, update, makeDelete}

export default modules