const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(cors())
app.use(express.json())

morgan.token('request-body', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const getRandomInt = () => {
  const min = 1
  const max = 10000
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateId = () => {
  const id = persons.length > 0
  ? getRandomInt()
  : 0
  
  return id
}

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const match = persons.find(person => id === person.id)

  if (match) {
    response.json(match)
  } else {
    response.status(404).end()
  }

})

app.get('/info', (request, response) => {
    const date = new Date()
    const responseText = `<p>Phone has info for ${persons.length} people</p><p>${date}</p>`
    response.send(responseText)
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    response.status(400).json({error: "missing field(s)"})
    return
  }

  const match = persons.find(person => person.name === body.name)

  if ( match !== undefined ) {
    response.status(409).json({error: "name must be unique"})
    return
  }

  const Person = {...body, id: generateId()}
  persons = persons.concat(Person)

  response.json(Person)

})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => id !== person.id)
  response.status(204).end() 
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})