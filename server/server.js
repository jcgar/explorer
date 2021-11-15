const express = require('express')
const cors = require('cors')
const api = require('./api')

const app = express()
const port = process.env.PORT || 9000


const corsOptions = {
  origin: (origin, callback) => callback(null, true),
  optionsSuccessStatus: 200,
  credentials: true
}

app.use(cors(corsOptions))
app.use(express.json())

// Headers and CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Accept, Content-Type, tsec, consumerrequestid, authenticationchallenge, authenticationtype, authenticationdata, authenticationstate, contactid, consumeruuid, consumerapplicationid, perimetertsec, authorization, responsewarningcode, responsewarningdescription, cuf, prefer, phoneNumber, Location, X-RHO-PARENTSPANID, X-RHO-TRACEID, preferredauthenticationtype, X-HTTP-Method-Override, Access-Control-Allow-Methods, iv-remote-address, thirdparty-x-forwarded-for, thirdparty-user-agent, thirdparty-geolocation, thirdparty-calculated-scoring, thirdparty-deviceid, vnd.bbva.security-client-certificate, order-preferredaction, authenticationresponse')
  res.header('Access-Control-Expose-Headers', 'Accept, Content-Type, tsec, consumerrequestid, authenticationchallenge, authenticationtype, authenticationdata, authenticationstate, contactid, consumeruuid, consumerapplicationid, perimetertsec, authorization, responsewarningcode, responsewarningdescription, cuf, prefer, phoneNumber, Location, X-RHO-PARENTSPANID, X-RHO-TRACEID, preferredauthenticationtype, X-HTTP-Method-Override, Access-Control-Allow-Methods, iv-remote-address, thirdparty-x-forwarded-for, thirdparty-user-agent, thirdparty-geolocation, thirdparty-calculated-scoring, thirdparty-deviceid, vnd.bbva.security-client-certificate, order-preferredaction, authenticationresponse, Access-Control-Max-Age')
  res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT, OPTIONS, PATCH')
  res.header('Access-Control-Max-Age', '86400')
  res.header('Connection', 'Keep-Alive')

  next()
})

// API
app.post('/list-folder', (req, res) => {
  try {
    res.header('Content-Type', 'application/json')
    res.send(api.listFolder(req.body.path))
  } catch (e) {
    console.log(`Server error: ${e}`)
    res.status(204)
    res.send()
  }
})
app.post('/download-file', async (req, res) => {
  try {
    const file = await api.downloadFile(req.body.path)
    res.status(200)
    res.header('Content-Type', file.mime)
    res.send(file.data)
  } catch (e) {
    console.log(`Server error: ${e}`)
    res.status(204)
    res.send()
  }
})

app.listen(port)

console.log('Server started! At http://localhost:' + port)