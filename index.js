const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let requests = []
const requestTrimThreshold = 5000
const requestTrimSize = 4000

app.get('/requests/:ms', function (req, res) {
  const now = Date.now()
  const since = now - (+req.params.ms)
  let cnt = 0
  for (var i = requests.length - 1; i >= 0; i--) {
    if (requests[i] >= since) {
      ++cnt
    } else {
      break
    }
  }
  res.end(`requests per ${req.params.ms} ms = ${cnt}`)
})

app.all('*', function (req, res, next) {
  requests.push(Date.now())
  if (requests.length > requestTrimThreshold) {
    requests = requests.slice(0, requests.length - requestTrimSize)
  }

  res.json({
    url: req.url,
    method: req.method,
    query: req.query,
    body: req.body
  })
})

app.listen(port, () => console.log(`App listening on port ${port}!`))
