const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')

const dbUrl =
    'mongodb+srv://mohamed:en44oUFCjcCBNIFQ@cluster0.b074otc.mongodb.net'

mongoose
    .connect(dbUrl)
    .then(() => {
        console.log('Database Connected')
        // mongoose.connection
        //     .useDb('node-db-test')
        //     .collection('students')
        //     .insertOne({
        //         name: 'Ahmed',
        //     })
    })
    .catch((err) => console.log(err))

// create collection with string value
const User = mongoose.model('User', {
    id: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
})
const Tool = mongoose.model('Tool', {
    name: {
        type: String,
        required: true,
    },
    usage: {
        type: String,
        required: true,
        unique: true,
    },
})
const Factory = mongoose.model('Factory', {
    id: {
        type: String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    main_dep: {
        type: String,
        enum: ['Mechanics', 'Electric', 'Civil', 'Architecture'],
        default: 'Mechanics',
    },
})

User.create({
    name: 'Tarek Alaa',
    id: 104,
})
    .then((user) => console.log(user))
    .catch((err) => console.log(err))

Tool.create({
    name: 'Magrapha',
    usage: 'kans',
})
    .then((tool) => console.log(tool))
    .catch((err) => console.log(err))

Factory.create({
    id: 'FF211',
    name: 'Tesla',
    industry: 'Electric Cars',
    main_dep: 'Electric',
})
    .then((factory) => console.log(factory))
    .catch((err) => console.log(err))

const password = 'Red12345!'
bcryptjs.hash(password, 8).then((hashedPassword) => {
    console.log(hashedPassword)
    console.log(bcryptjs.compareSync(password, hashedPassword))
})
