const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res) => {
  res.json({
    url: req.url,
    method: req.method,
    query: req.query,
    body: req.body
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
