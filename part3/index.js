require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')
const Person = require('./models/person')
//%HOMEDRIVE%%HOMEPATH%
//Use development server on frontend at this stage!!!

//app.use(express.static('build'))
app.use(cors())

app.use(express.json())

const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({error: 'malformatted id'})
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({error: error.message})
  }
  next(error)
}

morgan.token('request-body', (request, response) => JSON.stringify(request.body))

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :request-body'))

app.get('/', (request, response) => {
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
    Person
      .find({})
      .then(persons => {
        response.json(persons)
      })
    
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person
    .findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))

})

app.get('/info', (request, response) => {
    const date = new Date()

    Person
      .find({})
      .then(persons => {
        const responseText = `<p>Phone has info for ${persons.length} people</p><p>${date}</p>`
        response.send(responseText) 
      })

    
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    response.status(400).json({error: "missing field(s)"})
    return
  }

  const person = new Person({...body})

  person
    .save()
    .then(addedPerson => {
      console.log('added ', addedPerson.name, 'number', addedPerson.number, 'to phonebook')
      response.json(addedPerson)
    })
    .catch(error => next(error))
  
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person
    .findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
  const id = request.params.id

  const body = request.body

  const person = {
    name: body.name,
    number: body.number,
  }

  Person
    .findByIdAndUpdate(id, person, {new: true})
    .then(updatedPerson => {
      if (updatedPerson) {
        response.json(updatedPerson)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`)
})