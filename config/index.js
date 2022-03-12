const mongoose = require('mongoose')

const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
}

mongoose.connect(process.env.MONGOURL, connectionParams)
    .then( () => {
        console.log('Connected to mongodb')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })