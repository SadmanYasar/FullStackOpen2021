const mongoose = require('mongoose')

if ( process.argv.length < 3 ) {
    console.log('please enter password to connect to database')
    process.exit(1)
}

const password = process.argv[2]

const name = process.argv[3]

const number = process.argv[4]

const url = `mongodb+srv://fullstackReactNode:${password}@cluster0.szixo.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url)

const recordSchema = new mongoose.Schema({
    name: String,
    number: String,
})

const Record = mongoose.model('Record', recordSchema)

if ( name === undefined || number === undefined ) {
    //show all
    console.log('phonebook:')
    Record
        .find({})
        .then(result => {
            result.forEach(record => {
                console.log(record.name, record.number)
            })
            mongoose.connection.close()
        })
} else {
    const record = new Record({
        name: name,
        number: number,
    })
    
    record
        .save()
        .then(result => {
            console.log('added ', result.name, 'number', result.number, 'to phonebook')
            mongoose.connection.close()
        })
}