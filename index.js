const port = 8080 // extract to config
const fs = require('fs')
const path = require('path')

const express = require('express')
const app = express()
app.set('json spaces', 2)

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/graph.html'));
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
